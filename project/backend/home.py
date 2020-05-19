import time
from flask import Flask, render_template, request, flash, session, jsonify, redirect
from flask_mysqldb import MySQL
from flask_bcrypt import Bcrypt
from flask_cors import CORS

app = Flask(__name__)
app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'

# configure db
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_PASSWORD'] = '123456789'
app.config['MYSQL_DB'] = 'alpha'
app.config['MYSQL_USER'] = 'root'
app.config['JWT_SECRET_KEY'] = 'secret'
app.config['CORS_HEADERS'] = 'Content-Type'
mysql = MySQL(app)
bcrypt = Bcrypt(app)
CORS(app)


@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response


@app.route('/', methods=['POST'])
def home():
    cur = mysql.connection.cursor()

    '''
    Filter input is a dictionary. Contest is a list.
    
    Example:
        input: {
            "username": "mert",
            .
            .
            .
            filter: {
                "sport_name": "FOOTBALL",
                "max_mbn": 3,
                "contest": ["Champions League", "Turkish Super League"],
                "sort_type": "popularity",
                "search_text": "galatasaray"
            }
        }
    '''
    input = {
        "username": request.get_json(force=True)["username"],
        "request_type": request.get_json(force=True)["request_type"],
        "played_amount": request.get_json(force=True)["played_amount"],
        "match_id": request.get_json(force=True)["match_id"],
        "bet_id": request.get_json(force=True)["bet_id"],
        "editor_comment": request.get_json(force=True)["editor_comment"],
        "vote_side": request.get_json(force=True)["vote_side"],
        "filter": request.get_json(force=True)["filter"]
    }

    '''
    Filter request uses input["filter"], 
    '''

    if input["request_type"] == "filter":

        if len(input["filter"]["contest"]) == 1:
            contest = str(tuple(input["filter"]["contest"])).replace(",", "")
        elif len(input["filter"]["contest"]) == 0:
            cur.execute("SELECT name FROM contest")
            temp = cur.fetchall()

            contest = tuple([contest[0] for contest in temp])

        else:
            contest = str(tuple(input["filter"]["contest"]))

        filter = "WITH sport_filter AS (SELECT match_id FROM `match` WHERE sport_name = '{0}'), " \
                 "bet_filter AS (SELECT match_id FROM bet WHERE active = TRUE AND mbn <= {1}), " \
                 "contest_filter AS (SELECT match_id FROM `match` NATURAL JOIN contest WHERE contest.name IN " \
                 "{2}), individual_player_filter AS (SELECT match_id FROM competitor_match NATURAL " \
                 "JOIN individual_player WHERE forename LIKE {3} OR surname LIKE {4}), " \
                 "team_filter AS (SELECT match_id FROM competitor_match JOIN team ON " \
                 "competitor_match.competitor_id = team.team_id WHERE team_name LIKE " \
                 "{5}), competitor_union AS (SELECT match_id FROM individual_player_filter UNION TABLE team_filter)," \
                 " final_filter AS (SELECT DISTINCT match_id FROM sport_filter INNER JOIN bet_filter " \
                 "USING(match_id) INNER JOIN contest_filter USING(match_id) INNER JOIN competitor_union " \
                 "USING(match_id))".format(input["filter"]["sport_name"], input["filter"]["max_mbn"], contest,
                                           '\'' + input["filter"]["search_text"] + '%\'',
                                           '\'' + input["filter"]["search_text"] + '%\'',
                                           '\'' + input["filter"]["search_text"] + '%\'')

        cur.execute(filter + ", match_data AS (SELECT * FROM final_filter NATURAL JOIN `match`), "
                             "all_competitors AS (SELECT competitor_name, competitor_id FROM (SELECT player_id AS "
                             "competitor_id, CONCAT(forename, ' ', surname) AS competitor_name FROM individual_player) "
                             "AS temp UNION (SELECT team_name AS competitor_name , team_id AS competitor_id FROM team))"
                             ", current_competitors AS (SELECT competitor_id, side, match_id FROM competitor_match "
                             "NATURAL JOIN final_filter), all_sides AS (SELECT competitor_name, side, match_id FROM "
                             "all_competitors NATURAL JOIN current_competitors), bet_data AS (SELECT * FROM "
                             "bet NATURAL JOIN final_filter WHERE active = TRUE) SELECT * FROM match_data NATURAL "
                             "JOIN bet_data NATURAL JOIN all_sides"
                    )
        match_data_columns = [column[0] for column in cur.description]

        results = []

        for row in cur.fetchall():
            results.append(dict(zip(match_data_columns, row)))

        cur.execute(filter + "SELECT match_id, bet_type, MAX(change_date) AS change_date, odd FROM (SELECT * FROM bet "
                             "NATURAL JOIN final_filter WHERE active = FALSE) AS inactive_bets GROUP BY "
                             "match_id, bet_type, odd")

        old_odds_columns = [column[0] for column in cur.description]

        for row in cur.fetchall():
            results.append(dict(zip(old_odds_columns, row)))

        if input["filter"]["sort_type"] == "popularity":

            cur.execute("WITH active_bet AS ( SELECT bet_id, match_id FROM bet WHERE active = TRUE), "
                        "all_placed_bets AS ( SELECT * FROM included_bet NATURAL JOIN bet_slip NATURAL JOIN "
                        "active_bet WHERE placed = TRUE) SELECT bet_id, match_id, Count(bet_slip_id) AS count "
                        "FROM all_placed_bets GROUP BY bet_id, match_id")

            popularity_columns = [column[0] for column in cur.description]

            for row in cur.fetchall():
                results.append(dict(zip(popularity_columns, row)))

        return {
            "response": results
        }

    elif input["request_type"] == "play_betslip": #Requires the input["played_amount"]

        if cur.execute("SELECT person_id FROM person WHERE username = '{0}'".format(input["username"])) > 0:
            person_id = cur.fetchone()[0]

        if cur.execute("WITH user_bet_slip AS (SELECT bet_slip_id FROM bet_slip WHERE creator_id = "
                       "{0} AND placed = FALSE ),user_current_bets AS (SELECT * FROM user_bet_slip NATURAL JOIN "
                       "included_bet NATURAL JOIN bet ),cur_no_bet AS (SELECT Count(bet_slip_id) AS bet_count FROM "
                       "user_current_bets), max_mbn_no AS (SELECT Max(mbn) AS max_mbn FROM user_current_bets) SELECT "
                       "CASE WHEN cur_no_bet.bet_count < max_mbn_no.max_mbn THEN 'MBN_not_satisfied' "
                       "WHEN cur_no_bet.bet_count >= max_mbn_no.max_mbn THEN 'MBN_satisfied' "
                       "END AS response FROM cur_no_bet, max_mbn_no".format(person_id)) > 0:

            mbn_result = cur.fetchone()[0]

            print(mbn_result)
            if mbn_result == "MBN_satisfied":

                if cur.execute("SELECT CASE WHEN user.account_balance < 3 THEN 'insufficent_credits'"
                               "WHEN user.account_balance > 3 THEN 'enough_credits' END AS response "
                               "FROM user WHERE user_id = {0}".format(person_id)) > 0:

                    balance_result = cur.fetchone()[0]
                    if balance_result == "enough_credits":
                        cur.execute("UPDATE bet_slip SET played_amount = {0}, placed = TRUE WHERE "
                                    "creator_id = {1}".format(input["played_amount"], person_id))

                        cur.execute("UPDATE user SET alpha_coins = user.alpha_coins + ({0} * 3), account_balance = "
                                    "user.account_balance - {1} WHERE user_id = {2}".format(input["played_amount"],
                                                                                            input["played_amount"],
                                                                                            person_id))
                        mysql.connection.commit()
                        return {"status": "success"}
                    else:
                        return {"status": "not_enough_credits"}
            else:
                return {"status": "mbn_not_satisfied"}

    elif input["request_type"] == "editor_share_betslip":
        if cur.execute("SELECT person_id FROM person WHERE username = '{0}'".format(input["username"])) > 0:
            person_id = cur.fetchone()[0]

        if cur.execute(
                "SELECT bet_slip_id FROM bet_slip WHERE placed = FALSE AND creator_id = {0}".format(person_id)) > 0:
            bet_slip_id = cur.fetchone()[0]

        cur.execute("INSERT INTO shared_bet_slip (bet_slip_id, sharer_id) VALUES ({0}, {1})"
                    .format(bet_slip_id, person_id))

    elif input["request_type"] == "suggest_bet":
        if cur.execute("SELECT person_id FROM person WHERE username = '{0}'".format(input["username"])) > 0:
            person_id = cur.fetchone()[0]

        cur.execute("INSERT INTO suggested_bet (editor_id, bet_id, match_id, comment) VALUES ({0}, {1}, {2}, '{3}')"
                    .format(person_id, input["bet_id"], input["match_id"], input["editor_comment"]))

    elif input["request_type"] == "add_bet_to_betslip": #Editor also adds bet to betslip using this request
        if cur.execute("SELECT person_id FROM person WHERE username = '{0}'".format(input["username"])) > 0:
            person_id = cur.fetchone()[0]

        if cur.execute(
                "SELECT bet_slip_id FROM bet_slip WHERE placed = FALSE AND creator_id = {0}".format(person_id)) > 0:
            bet_slip_id = cur.fetchone()[0]

        cur.execute("INSERT INTO included_bet (bet_slip_id, bet_id, match_id) VALUES "
                    "({0}, {1}, {2})".format(bet_slip_id, input["bet_id"], input["match_id"]))

    elif input["request_type"] == "view_votes":

        home_votes = 0
        away_votes = 0
        tie_votes = 0

        if cur.execute("SELECT COUNT(side) AS home_vote_count FROM votes GROUP BY side, match_id HAVING side = 'HOME'"
                       " AND match_id = {0}".format(input["match_id"])) > 0:
            home_votes = cur.fetchone()[0]

        if cur.execute("SELECT COUNT(side) AS away_vote_count FROM votes GROUP BY side, match_id HAVING side = 'AWAY'"
                       " AND match_id = {0}".format(input["match_id"])) > 0:
            away_votes = cur.fetchone()[0]

        if cur.execute("SELECT COUNT(side) AS tie_vote_count FROM votes GROUP BY side, match_id HAVING side = 'TIE'"
                       " AND match_id = {0}".format(input["match_id"])) > 0:
            tie_votes = cur.fetchone()[0]

        return {
            "home_votes": home_votes,
            "away_votes": away_votes,
            "tie_votes": tie_votes
        }

    elif input["request_type"] == "insert_vote":

        if cur.execute("SELECT person_id FROM person WHERE username = '{0}'".format(input["username"])) > 0:
            person_id = cur.fetchone()[0]

        cur.execute("INSERT INTO votes (match_id, user_id, side) VALUES ({0}, {1}, '{2}')"
                    .format(input["match_id"], person_id, input["vote_side"]))

    mysql.connection.commit()
    return "Hello World!"


@app.route('/register', methods=["GET", "POST"])
def register():
    if request.method == 'POST':
        personDetails = request.get_json()
        if personDetails.get('password') != personDetails.get('confirm_password'):
            result = {
                "success": "false"
            }
            return jsonify({"result": result})
        cur = mysql.connection.cursor()
        password = personDetails.get('confirm_password')
        # bcrypt.generate_password_hash(personDetails.get('password')).decode('utf-8')
        cur.execute("INSERT INTO person(username, password, forename, surname, email) "
                    "VALUES(%s,%s,%s,%s,%s)", (personDetails.get('username'), password,
                                               personDetails.get('forename'), personDetails.get('surname'),
                                               personDetails.get('email')))
        mysql.connection.commit()

        cur.execute("SELECT person_id FROM person WHERE username = %s", ([personDetails['username']]))
        person = cur.fetchone()
        id = person[0]

        cur.execute("INSERT INTO bet_slip_creator(creator_id) VALUES({0})".format(id))
        mysql.connection.commit()

        # cur.execute("INSERT INTO bet_slip(creator_id, placed, played_amount) VALUES({0}, {1}, {2})".format(creator_id, False, 0))
        # mysql.connection.commit()

        if personDetails.get('type') == "user":
            cur.execute("INSERT INTO user(user_id, account_balance, total_winnings, alpha_coins) "
                        "VALUES(%s,%s,%s,%s)", (id, 0, 0, 0))
            mysql.connection.commit()

        if personDetails.get('type') == "editor":
            cur.execute("INSERT INTO editor(editor_id, winrate, total_winnings) "
                        "VALUES(%s,%s,%s)", (id, 0, 0))
            mysql.connection.commit()

        result = {
            "success": "true",
            "type": personDetails.get('type'),
            "user_id": id,
            "username": personDetails.get('username')
        }
        return jsonify({"result": result})


@app.route('/signin', methods=["GET", "POST"])
def login():
    if request.method == 'POST':
        personDetails = request.get_json()

        cur = mysql.connection.cursor()
        val = cur.execute("SELECT * FROM person WHERE username = %s", ([personDetails['username']]))
        if val > 0:
            person = cur.fetchone()
            if person[2] == personDetails['password']:
                user = cur.execute("SELECT user_id FROM user WHERE user_id = %s", ([person[0]]))
                if user > 0:
                    type = "user"
                else:
                    editor = cur.execute("SELECT editor_id FROM editor WHERE editor_id = %s", ([person[0]]))
                    if editor > 0:
                        type = "editor"
                    else:
                        type = "admin"

                result = {
                    "success": "true",
                    "type": type,
                    "user_id": person[0],
                    "username": personDetails['username']
                }
        else:
            result = {
                "success": "false"
            }
        return jsonify({"result": result})


@app.route('/profile', methods=["GET", "POST", "DELETE", "UPDATE"])
def profile():
    input = request.get_json()
    if input["request_type"] == "get_user_info":
        cur = mysql.connection.cursor()
        cur.execute("WITH user_person AS (SELECT user_id AS person_id, account_balance, total_winnings, alpha_coins "
                    "FROM user) SELECT username, forename, surname, account_balance, total_winnings, alpha_coins, "
                    "email FROM user_person NATURAL JOIN person WHERE person_id = {0}".format(input["user_id"]))

        user = cur.fetchone()
        result = {
            "username": user[0],
            "forename": user[1],
            "surname": user[2],
            "account_balance": user[3],
            "total_winnings": user[4],
            "alpha_coins": user[5],
            "email": user[6]
        }
        return jsonify({"result": result})

    if input["request_type"] == "get_pending_bet_slips":
        cur = mysql.connection.cursor()

        cur.execute("WITH user_bet_slips AS (SELECT bet_slip_id FROM bet_slip WHERE creator_id = {0} AND "
                    "placed = TRUE), pending_slip AS (SELECT DISTINCT bet_slip_id FROM user_bet_slips NATURAL JOIN "
                    "included_bet NATURAL JOIN bet WHERE result = 'PENDING'), all_bet_data AS (SELECT * "
                    "FROM pending_slip NATURAL JOIN included_bet NATURAL JOIN bet), match_data AS "
                    "(SELECT * FROM all_bet_data NATURAL JOIN competitor_match), all_competitors AS "
                    "(SELECT competitor_name, competitor_id FROM (SELECT player_id AS competitor_id, "
                    "CONCAT(forename, ' ', surname) AS competitor_name FROM individual_player) AS temp UNION "
                    "(SELECT team_name AS competitor_name, team_id AS competitor_id FROM team)) SELECT * FROM "
                    "match_data NATURAL JOIN all_competitors".format(input["user_id"]))


        bet_slips = cur.fetchall()
        slips = []

        for row in bet_slips:
            slips.append(row[0])

        result = {
            "pending_bet_slips": slips
        }
        return jsonify({"result": result})

    if input["request_type"] == "get_ended_bet_slips":
        cur = mysql.connection.cursor()

        cur.execute("WITH user_bet_slips AS (SELECT bet_slip_id FROM bet_slip WHERE creator_id = {0}), "
                    "ended_slip AS (SELECT DISTINCT bet_slip_id FROM user_bet_slips NATURAL JOIN "
                    "included_bet NATURAL JOIN bet WHERE result = 'WON' OR result = 'LOST'), all_bet_data AS (SELECT * "
                    "FROM ended_slip NATURAL JOIN included_bet NATURAL JOIN bet), match_data AS "
                    "(SELECT * FROM all_bet_data NATURAL JOIN competitor_match), all_competitors AS "
                    "(SELECT competitor_name, competitor_id FROM (SELECT player_id AS competitor_id, "
                    "CONCAT(forename, ' ', surname) AS competitor_name FROM individual_player) AS temp UNION "
                    "(SELECT team_name AS competitor_name, team_id AS competitor_id FROM team)) SELECT * FROM "
                    "match_data NATURAL JOIN all_competitors".format(input["user_id"]))

        bet_slips = cur.fetchall()
        slips = []

        for row in bet_slips:
            slips.append(row[0])

        result = {
            "ended_bet_slips": slips
        }
        return jsonify({"result": result})

    if input["request_type"] == "get_gained_achievements":
        cur = mysql.connection.cursor()
        cur.execute("WITH achieved_id AS (SELECT achievement_id, user_id FROM gained_achievement "
                    "NATURAL JOIN user WHERE user_id = {0}) "
                    "SELECT achievement_name, achievement_description FROM achieved_id NATURAL JOIN achievement"
                    .format(input["user_id"]))

        val = cur.fetchall()
        gained_achievements = []

        for row in val:
            achievement = [row[0], row[1]]
            gained_achievements.append(achievement)

        result = {
            "gained_achievements": gained_achievements
        }
        return jsonify({"result": result})

    if input["request_type"] == "get_total_achievement_count":
        cur = mysql.connection.cursor()
        cur.execute("SELECT COUNT(achievement_id) AS total_count FROM achievement")

        val = cur.fetchone()

        result = {
            "total_achievement_count": val[0]
        }
        return jsonify({"result": result})

    if input["request_type"] == "get_gained_achievement_count":
        cur = mysql.connection.cursor()
        cur.execute("WITH achieved_id AS (SELECT achievement_id, user_id FROM gained_achievement NATURAL JOIN user "
                    "WHERE user_id = {0}) SELECT COUNT(achievement_id) AS gained_count FROM achieved_id"
                    .format(input["user_id"]))

        val = cur.fetchone()

        result = {
            "gained_achievement_count": val[0]
        }
        return jsonify({"result": result})

    if input["request_type"] == "get_friends":
        cur = mysql.connection.cursor()

        cur.execute("WITH friends AS (SELECT friend_id AS person_id, user_id "
                    "FROM user_friend) SELECT username FROM friends NATURAL JOIN person "
                    "WHERE user_id = '{0}'".format(input["user_id"]))


        user = cur.fetchall()
        friends = []

        for row in user:
            friends.append(row[0])

        result = {
            "friends": friends
        }
        return jsonify({"result": result})

    if input["request_type"] == "search_users":
        cur = mysql.connection.cursor()
        cur.execute("SELECT user_id, username FROM user AS u INNER JOIN person AS p ON u.user_id = p.person_id "
                    "WHERE username LIKE {0} AND u.user_id <> {1}"
                    .format('\'' + input["search_text"] + '%\'', input["user_id"]))

        val = cur.fetchall()
        users = []

        for row in val:
            friend = {"user_id": row[0], "username": row[1]}
            users.append(friend)

        result = {
            "searched_users": users
        }
        return jsonify({"result": result})

    if input["request_type"] == "add_friend":
        cur = mysql.connection.cursor()
        val1 = cur.execute("INSERT INTO user_friend (user_id, friend_id) VALUES ({0}, {1})"
                           .format(input["user_id"], input["friend_id"]))
        mysql.connection.commit()

        val2 = cur.execute("INSERT INTO user_friend (user_id, friend_id) VALUES ({1}, {0})"
                           .format(input["user_id"], input["friend_id"]))
        mysql.connection.commit()

        if val1 > 0 and val2 > 0:
            result = {
                "success": True
            }
        else:
            result = {
                "success": False
            }

        return jsonify({"result": result})

    if input["request_type"] == "update_balance":
        cur = mysql.connection.cursor()
        val = cur.execute("UPDATE user SET account_balance = ( account_balance + {1} ) "
                          "WHERE user_id = {0}".format(input["user_id"], input["balance_change"]))

        mysql.connection.commit()

        if val > 0:
            result = {
                "success": True
            }
        else:
            result = {
                "success": False
            }

        return jsonify({"result": result})

    if input["request_type"] == "edit_profile":
        cur = mysql.connection.cursor()

        check = cur.execute("SELECT * FROM person WHERE username = '{0}'".format(input["new_username"]))
        if check > 0:
            result = {
                "success": False
            }
            return jsonify({"result": result})
        else:
            val1 = cur.execute("UPDATE person SET username = '{1}' WHERE person_id = '{0}'"
                               .format(input["user_id"], input["new_username"]))
            mysql.connection.commit()

            val2 = cur.execute("UPDATE person SET password = '{1}' WHERE person_id = '{0}'"
                               .format(input["user_id"], input["new_password"]))
            mysql.connection.commit()

            if val1 > 0 and val2 > 0:
                result = {
                    "success": True
                }
            else:
                result = {
                    "success": False
                }

            return jsonify({"result": result})


if __name__ == "__main__":
    app.secret_key = 'super secret key'
    app.run(debug=True)
