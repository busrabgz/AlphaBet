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


@app.route('/', methods=['GET', 'POST'])
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

        if input["filter"]["sort_type"] == "popularity":

            cur.execute("WITH active_bet AS ( SELECT bet_id, match_id FROM bet WHERE active = TRUE), "
                        "all_placed_bets AS ( SELECT * FROM included_bet NATURAL JOIN bet_slip NATURAL JOIN "
                        "active_bet WHERE placed = TRUE) SELECT bet_id, match_id, Count(bet_slip_id) AS play_count "
                        "FROM all_placed_bets GROUP BY bet_id, match_id")

            popularity_columns = [column[0] for column in cur.description]

            popularity_results = []

            for row in cur.fetchall():
                popularity_results.append(dict(zip(popularity_columns, row)))

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
                             "bet NATURAL JOIN final_filter WHERE active = TRUE AND result = 'PENDING') SELECT * "
                             "FROM match_data NATURAL JOIN bet_data NATURAL JOIN all_sides"
                    )
        match_data_columns = [column[0] for column in cur.description]

        match_data_results = []

        for row in cur.fetchall():
            match_data_results.append(dict(zip(match_data_columns, row)))

        matches = []

        for row in match_data_results:

            composite_already_added = False
            match_found = False

            if row["side"] == "HOME":
                home_side = row["competitor_name"]
                away_side = ""

            else:
                home_side = ""
                away_side = row["competitor_name"]

            total_odd = row["odd"]

            for match in matches:

                if match["match_id"] == row["match_id"]:
                    match_found = True

                    for bet in match["bets"]:
                        if bet["bet_id"] == row["bet_id"]:
                            composite_already_added = True

                            if bet["home_side"] == "":
                                bet["home_side"] = row["competitor_name"]
                            else:
                                bet["away_side"] = row["competitor_name"]
                    if not composite_already_added:

                        bet_to_add = {
                            "bet_id": row["bet_id"],
                            "home_side": home_side,
                            "away_side": away_side,
                            "odd": total_odd,
                            "mbn": row["mbn"],
                            "play_count": 0,
                            "old_odd": "",
                            "bet_type": row["bet_type"]
                        }

                        if input["filter"]["sort_type"] == "popularity":
                            for bet in popularity_results:
                                if bet["match_id"] == match["match_id"] and bet["bet_id"] == row["bet_id"]:
                                    bet_to_add["play_count"] = bet["play_count"]

                        match["bets"].append(bet_to_add)

            if not match_found:
                bets = [{
                    "bet_id": row["bet_id"],
                    "home_side": home_side,
                    "away_side": away_side,
                    "odd": total_odd,
                    "mbn": row["mbn"],
                    "play_count": 0,
                    "old_odd": "",
                    "bet_type": row["bet_type"]
                }]

                if input["filter"]["sort_type"] == "popularity":
                    for bet in popularity_results:
                        if bet["match_id"] == row["match_id"] and bet["bet_id"] == row["bet_id"]:
                            bets[0]["play_count"] = bet["play_count"]
                matches.append({
                    "match_id": row["match_id"],
                    "match_start_date": row["start_date"],
                    "bets": bets
                })

        cur.execute(filter + "SELECT match_id, bet_id, bet_type, MAX(change_date) AS change_date, odd FROM (SELECT * "
                             "FROM bet NATURAL JOIN final_filter WHERE active = FALSE) AS inactive_bets GROUP BY "
                             "match_id, bet_id, bet_type, odd")

        old_odds_columns = [column[0] for column in cur.description]

        old_odds_results = []

        for row in cur.fetchall():
            old_odds_results.append(dict(zip(old_odds_columns, row)))

        for match in matches:

            for old_odd in old_odds_results:
                if old_odd["match_id"] == match["match_id"]:

                    for bet in match["bets"]:
                        if old_odd["bet_type"] == bet["bet_type"]:
                            bet["old_odd"] = old_odd["odd"]

        return {
            "matches": matches,
        }

    elif input["request_type"] == "play_betslip":  # Requires the input["played_amount"]

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

                        cur.execute("INSERT INTO bet_slip (placed, played_amount, creator_id) VALUES (FALSE, 0, {0})"
                                    .format(person_id))
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

    elif input["request_type"] == "add_bet_to_betslip":  # Editor also adds bet to betslip using this request
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

        if personDetails.get('type') == "user":
            cur.execute("INSERT INTO bet_slip_creator(creator_id) VALUES({0})".format(id))
            mysql.connection.commit()
            cur.execute("SELECT creator_id FROM bet_slip_creator WHERE creator_id = {0}".format(id))
            creator = cur.fetchone()
            creator_id = creator[0]

            cur.execute("INSERT INTO bet_slip(creator_id, placed, played_amount) VALUES({0}, {1}, {2})"
                        .format(creator_id, False, 0))
            mysql.connection.commit()

            cur.execute("INSERT INTO user(user_id, account_balance, total_winnings, alpha_coins) "
                        "VALUES(%s,%s,%s,%s)", (id, 0, 0, 0))
            mysql.connection.commit()

        if personDetails.get('type') == "editor":
            cur.execute("INSERT INTO approves(editor_id, state) "
                        "VALUES(%s,%s)", (id, "PENDING"))
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
                user = cur.execute("SELECT * FROM user WHERE user_id = %s", ([person[0]]))
                users = cur.fetchone()
                if user > 0:
                    ban = cur.execute("SELECT * FROM bans WHERE user_id = %s", ([users[0]]))
                    if ban > 0:
                        result = {
                            "success": "false",
                            "ban": "true"
                        }
                    else:
                        type = "user"
                        result = {
                            "success": "true",
                            "type": type,
                            "user_id": users[0],
                            "username": personDetails['username'],
                            "account_balance": users[1],
                            "alpha_coins": users[3]
                        }
                else:
                    editor = cur.execute("SELECT editor_id FROM editor WHERE editor_id = %s", ([person[0]]))
                    if editor > 0:
                        type = "editor"
                        result = {
                            "success": "true",
                            "type": type,
                            "user_id": person[0],
                            "username": personDetails['username']
                        }
                    else:
                        admin = cur.execute("SELECT admin_id FROM admin WHERE admin_id = %s", ([person[0]]))
                        if admin > 0:
                            type = "admin"
                            result = {
                                "success": "true",
                                "type": type,
                                "user_id": person[0],
                                "username": personDetails['username']
                            }
                        else:
                            result = {
                                "success": "false",
                                "pending": "true"
                            }
        else:
            result = {
                "success": "false",
                "ban": "false"
            }
        return jsonify({"result": result})


@app.route('/feed', methods=['GET', 'POST'])
def feed():
    cur = mysql.connection.cursor()

    input = {
        "user_id": request.get_json(force=True)["user_id"],
        "request_type": request.get_json(force=True)["request_type"],
        "comment_text": request.get_json(force=True)["comment_text"],
        "focused_bet_slip_id": request.get_json(force=True)["focused_bet_slip_id"]
    }

    if input["request_type"] == "display_shared_bets":

        friend_slip_id_query = "WITH friend_id_set AS (SELECT friend_id AS person_id FROM user_friend " \
                               "WHERE user_id = {0}), friend_data AS (SELECT username, person_id AS sharer_id FROM friend_id_set " \
                               "NATURAL JOIN person), friend_slip_id AS (SELECT * FROM (shared_bet_slip NATURAL JOIN (SELECT " \
                               "person_id AS sharer_id FROM friend_id_set) AS sharing_friend ))".format(
            input["user_id"])

        cur.execute(friend_slip_id_query + " SELECT bet_slip_id, comment_id, comment, username FROM friend_slip_id"
                                           " NATURAL JOIN bet_slip_comment NATURAL JOIN comment NATURAL JOIN person")

        comment_results = []

        comment_columns = [column[0] for column in cur.description]

        for row in cur.fetchall():
            comment_results.append(dict(zip(comment_columns, row)))

        cur.execute(friend_slip_id_query + " SELECT comment_id, Count(user_id) as comment_like_count FROM"
                                           " friend_slip_id NATURAL JOIN bet_slip_comment NATURAL JOIN comment_likes GROUP BY comment_id")

        comment_like_results = []

        comment_like_columns = [column[0] for column in cur.description]

        for row in cur.fetchall():
            comment_like_results.append(dict(zip(comment_like_columns, row)))

        cur.execute(friend_slip_id_query + " SELECT bet_slip_id, Count(bet_slip_id) as like_count FROM friend_slip_id"
                                           " NATURAL JOIN bet_slip_like GROUP BY bet_slip_id")

        bet_slip_like_results = []

        bet_slip_like_columns = [column[0] for column in cur.description]

        for row in cur.fetchall():
            bet_slip_like_results.append(dict(zip(bet_slip_like_columns, row)))

        cur.execute(friend_slip_id_query + ", friend_slip_bet AS ( SELECT * "
                                           "FROM (included_bet NATURAL JOIN friend_slip_id)), friend_slip_bet_data AS (SELECT * FROM "
                                           "friend_slip_bet NATURAL JOIN bet), match_data AS (SELECT * FROM friend_slip_bet_data NATURAL JOIN "
                                           "competitor_match), all_competitors AS (SELECT competitor_name, competitor_id FROM (SELECT "
                                           "player_id AS competitor_id, CONCAT(forename, ' ', surname) AS competitor_name FROM"
                                           " individual_player) AS temp UNION (SELECT team_name AS competitor_name, team_id AS competitor_id"
                                           " FROM team)) SELECT DISTINCT *  FROM match_data NATURAL JOIN all_competitors NATURAL JOIN (SELECT "
                                           "sharer_id, username FROM friend_data) AS friend_temp")

        friend_bet_slip_results = []

        feed_columns = [column[0] for column in cur.description]

        for row in cur.fetchall():
            friend_bet_slip_results.append(dict(zip(feed_columns, row)))

        friend_bet_slip_map = []

        for row in friend_bet_slip_results:
            composite_already_added = False
            bet_slip_found = False
            friend_found = False

            if row["side"] == "HOME":
                home_side = row["competitor_name"]
                away_side = ""

            else:
                home_side = ""
                away_side = row["competitor_name"]

            total_odd = row["odd"]
            sharer_id = row["sharer_id"]

            for friend in friend_bet_slip_map:
                if friend["user_id"] == sharer_id:

                    friend_found = True
                    for bet_slip in friend["bet_slips"]:

                        if bet_slip["bet_slip_id"] == row["bet_slip_id"]:
                            bet_slip_found = True
                            for bet in bet_slip["bets"]:
                                if bet["bet_id"] == row["bet_id"] and bet["match_id"] == row["match_id"]:
                                    composite_already_added = True

                                    if bet["home_side"] == "":
                                        bet["home_side"] = row["competitor_name"]
                                    else:
                                        bet["away_side"] = row["competitor_name"]
                            if not composite_already_added:
                                bet_to_add = {
                                    "bet_id": row["bet_id"],
                                    "match_id": row["match_id"],
                                    "home_side": home_side,
                                    "away_side": away_side,
                                    "odd": total_odd,
                                    "result": row["result"],
                                    "bet_type": row["bet_type"]
                                }
                                bet_slip["bets"].append(bet_to_add)

                    if not bet_slip_found:
                        bets = [{
                            "bet_id": row["bet_id"],
                            "match_id": row["match_id"],
                            "home_side": home_side,
                            "away_side": away_side,
                            "odd": total_odd,
                            "result": row["result"],
                            "bet_type": row["bet_type"]
                        }]
                        friend["bet_slips"].append({
                            "bet_slip_id": row["bet_slip_id"],
                            "bets": bets
                        })
            if not friend_found:
                friend_to_add = {
                    "user_id": sharer_id,
                    "username": row["username"],
                    "bet_slips": []
                }

                bets = [{
                    "bet_id": row["bet_id"],
                    "match_id": row["match_id"],
                    "home_side": home_side,
                    "away_side": away_side,
                    "odd": total_odd,
                    "result": row["result"],
                    "bet_type": row["bet_type"]
                }]

                friend_to_add["bet_slips"].append({
                    "bet_slip_id": row["bet_slip_id"],
                    "bets": bets
                })

                friend_bet_slip_map.append(friend_to_add)

        comment_map = []

        for row in comment_results:
            bet_slip_found = False

            comment_to_add = {
                "username": row["username"],
                "comment_id": row["comment_id"],
                "comment": row["comment"],
                "comment_like_count": ""
            }

            for liked_comment in comment_like_results:
                if liked_comment["comment_id"] == comment_to_add["comment_id"]:
                    comment_to_add["comment_like_count"] = liked_comment["comment_like_count"]

            for bet_slip in comment_map:

                if row["bet_slip_id"] == bet_slip["bet_slip_id"]:
                    bet_slip_found = True

                    bet_slip["bet_slip_comments"].append(comment_to_add)
            if not bet_slip_found:
                comment_map_to_add = {
                    "bet_slip_id": row["bet_slip_id"],
                    "bet_slip_comments": [comment_to_add]
                }

                comment_map.append(comment_map_to_add)

        for friend in friend_bet_slip_map:

            for friend_bet_slip in friend["bet_slips"]:

                for like in bet_slip_like_results:
                    if like["bet_slip_id"] == friend_bet_slip["bet_slip_id"]:
                        friend_bet_slip["like_count"] = like["like_count"]

                for bet_slip_comments in comment_map:

                    if bet_slip_comments["bet_slip_id"] == friend_bet_slip["bet_slip_id"]:
                        friend_bet_slip["comments"] = bet_slip_comments["bet_slip_comments"]

        return {"users": friend_bet_slip_map}

    elif input["request_type"] == "user_like_bet_slip":
        cur.execute("INSERT INTO bet_slip_like (user_id, bet_slip_id) VALUES"
                    " ({0}, {1})".format(input["user_id"], input["focused_bet_slip_id"]))

    elif input["request_type"] == "comment_on_bet_slip":

        cur.execute("INSERT INTO comment (comment, person_id, comment_date) VALUES ('{0}', {1}, NOW())"
                    .format(input["comment_text"], input["user_id"]))

        cur.execute("SELECT LAST_INSERT_ID()")

        last_comment_id = cur.fetchone()[0]

        cur.execute("INSERT INTO bet_slip_comment(comment_id, bet_slip_id) VALUES ({0}, {1})"
                    .format(last_comment_id, input["focused_bet_slip_id"]))

    cur.connection.commit()

    return {
        "status": "success"
    }


@app.route('/time')
def get_current_time():
    return {'time': time.time()}


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

        pending_bet_slips_results = []

        pending_bet_slips_columns = [column[0] for column in cur.description]

        for row in cur.fetchall():
            pending_bet_slips_results.append(dict(zip(pending_bet_slips_columns, row)))

        user_map = {
            "user_id": input["user_id"],
            "bet_slips": []
        }

        for row in pending_bet_slips_results:
            composite_already_added = False
            bet_slip_found = False

            if row["side"] == "HOME":
                home_side = row["competitor_name"]
                away_side = ""

            else:
                home_side = ""
                away_side = row["competitor_name"]

            total_odd = row["odd"]

            for bet_slip in user_map["bet_slips"]:

                if bet_slip["bet_slip_id"] == row["bet_slip_id"]:
                    bet_slip_found = True
                    for bet in bet_slip["bets"]:
                        if bet["bet_id"] == row["bet_id"] and bet["match_id"] == row["match_id"]:
                            composite_already_added = True

                            if bet["home_side"] == "":
                                bet["home_side"] = row["competitor_name"]
                            else:
                                bet["away_side"] = row["competitor_name"]
                    if not composite_already_added:
                        bet_to_add = {
                            "bet_id": row["bet_id"],
                            "match_id": row["match_id"],
                            "home_side": home_side,
                            "away_side": away_side,
                            "result": row["result"],
                            "odd": total_odd,
                            "bet_type": row["bet_type"]
                        }
                        bet_slip["bets"].append(bet_to_add)

            if not bet_slip_found:
                bets = [{
                    "bet_id": row["bet_id"],
                    "match_id": row["match_id"],
                    "home_side": home_side,
                    "away_side": away_side,
                    "result": row["result"],
                    "odd": total_odd,
                    "bet_type": row["bet_type"]
                }]
                user_map["bet_slips"].append({
                    "bet_slip_id": row["bet_slip_id"],
                    "bets": bets
                })

        return user_map

    if input["request_type"] == "get_ended_bet_slips":
        cur = mysql.connection.cursor()

        cur.execute("WITH user_bet_slips AS (SELECT bet_slip_id FROM bet_slip WHERE creator_id = {0}), ended_slip AS"
                    " (SELECT DISTINCT u.bet_slip_id FROM user_bet_slips u WHERE NOT EXISTS (SELECT bet_id FROM "
                    "user_bet_slips NATURAL JOIN included_bet NATURAL JOIN bet WHERE bet_slip_id = u.bet_slip_id AND"
                    " result = 'PENDING')), all_bet_data AS (SELECT * FROM ended_slip NATURAL JOIN included_bet"
                    " NATURAL JOIN bet), match_data AS (SELECT * FROM all_bet_data NATURAL JOIN competitor_match),"
                    " all_competitors AS (SELECT competitor_name, competitor_id FROM (SELECT player_id AS"
                    " competitor_id, CONCAT(forename, ' ', surname) AS competitor_name FROM individual_player) AS"
                    " temp UNION (SELECT team_name AS competitor_name, team_id AS competitor_id FROM team)) SELECT"
                    " * FROM match_data NATURAL JOIN all_competitors;".format(input["user_id"]))

        ended_bet_slips_results = []

        ended_bet_slips_columns = [column[0] for column in cur.description]

        for row in cur.fetchall():
            ended_bet_slips_results.append(dict(zip(ended_bet_slips_columns, row)))

        user_map = {
            "user_id": input["user_id"],
            "bet_slips": []
        }

        for row in ended_bet_slips_results:
            composite_already_added = False
            bet_slip_found = False

            if row["side"] == "HOME":
                home_side = row["competitor_name"]
                away_side = ""

            else:
                home_side = ""
                away_side = row["competitor_name"]

            total_odd = row["odd"]

            for bet_slip in user_map["bet_slips"]:

                if bet_slip["bet_slip_id"] == row["bet_slip_id"]:
                    bet_slip_found = True
                    for bet in bet_slip["bets"]:
                        if bet["bet_id"] == row["bet_id"] and bet["match_id"] == row["match_id"]:
                            composite_already_added = True

                            if bet["home_side"] == "":
                                bet["home_side"] = row["competitor_name"]
                            else:
                                bet["away_side"] = row["competitor_name"]
                    if not composite_already_added:
                        bet_to_add = {
                            "bet_id": row["bet_id"],
                            "match_id": row["match_id"],
                            "home_side": home_side,
                            "away_side": away_side,
                            "result": row["result"],
                            "odd": total_odd,
                            "bet_type": row["bet_type"]
                        }
                        bet_slip["bets"].append(bet_to_add)

            if not bet_slip_found:
                bets = [{
                    "bet_id": row["bet_id"],
                    "match_id": row["match_id"],
                    "home_side": home_side,
                    "away_side": away_side,
                    "result": row["result"],
                    "odd": total_odd,
                    "bet_type": row["bet_type"]
                }]
                user_map["bet_slips"].append({
                    "bet_slip_id": row["bet_slip_id"],
                    "bets": bets
                })

        return user_map

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


@app.route('/editor', methods=["GET", "POST"])
def editor():
    cur = mysql.connection.cursor()

    input = request.get_json(force=True)

    if input["request_type"] == "display_editors":  # ["user_id"]

        cur.execute("SELECT forename, surname, editor_id_table.winrate, total_winnings, person_id AS editor_id FROM "
                    "( (SELECT editor.editor_id AS person_id, winrate, total_winnings FROM editor) AS editor_id_table "
                    "NATURAL JOIN person)")

        editor_results = []
        editor_columns = [column[0] for column in cur.description]

        for row in cur.fetchall():
            editor_results.append(dict(zip(editor_columns, row)))

        cur.execute("SELECT editor_id FROM user_follows WHERE user_id = {0}".format(input["user_id"]))

        user_follows_results = []

        user_follows_columns = [column[0] for column in cur.description]

        for row in cur.fetchall():
            user_follows_results.append(dict(zip(user_follows_columns, row)))

        cur.execute("WITH editor_slip_data  AS (SELECT * FROM ((SELECT bet_slip_id, sharer_id as editor_id FROM "
                    "shared_bet_slip WHERE sharer_id IN (SELECT editor_id FROM editor)) as editor_slips NATURAL JOIN"
                    " included_bet NATURAL JOIN bet)), match_data AS (SELECT * FROM editor_slip_data NATURAL JOIN "
                    "competitor_match), all_competitors AS (SELECT competitor_name, competitor_id FROM (SELECT"
                    " player_id AS competitor_id, CONCAT(forename, ' ', surname) AS competitor_name FROM"
                    " individual_player) AS temp UNION (SELECT team_name AS competitor_name, team_id AS competitor_id"
                    " FROM team)), match_date AS (SELECT match_id, start_date FROM `match` NATURAL JOIN "
                    "editor_slip_data) SELECT DISTINCT * FROM match_data NATURAL JOIN editor_slip_data NATURAL JOIN"
                    " all_competitors NATURAL JOIN match_date")

        editor_slips_results = []

        editor_slip_columns = [column[0] for column in cur.description]

        for row in cur.fetchall():
            editor_slips_results.append(dict(zip(editor_slip_columns, row)))

        editor_bet_slip_comment_query = \
            "WITH editor_bet_slips AS (SELECT bet_slip_id, sharer_id as editor_id FROM shared_bet_slip WHERE" \
            " sharer_id IN (SELECT editor_id FROM editor)) "

        cur.execute(editor_bet_slip_comment_query + " SELECT bet_slip_id, comment_id, comment, username "
                                                    "FROM editor_bet_slips NATURAL JOIN"
                                                    " bet_slip_comment NATURAL JOIN comment NATURAL JOIN person")

        bet_slip_comments_results = []

        bet_slip_comments_columns = [column[0] for column in cur.description]

        for row in cur.fetchall():
            bet_slip_comments_results.append(dict(zip(bet_slip_comments_columns, row)))

        cur.execute(editor_bet_slip_comment_query + " SELECT bet_slip_id, Count(bet_slip_id) as like_count FROM"
                                                    " editor_bet_slips NATURAL JOIN bet_slip_like GROUP BY bet_slip_id")

        bet_slip_like_results = []

        bet_slip_like_columns = [column[0] for column in cur.description]

        for row in cur.fetchall():
            bet_slip_like_results.append(dict(zip(bet_slip_like_columns, row)))

        cur.execute(editor_bet_slip_comment_query + " SELECT comment_id, Count(user_id) as comment_like_count FROM"
                                                    " editor_bet_slips NATURAL JOIN bet_slip_comment "
                                                    "NATURAL JOIN comment_likes GROUP BY comment_id")

        bet_slip_comments_likes_results = []

        bet_slip_comments_likes_columns = [column[0] for column in cur.description]

        for row in cur.fetchall():
            bet_slip_comments_likes_results.append(dict(zip(bet_slip_comments_likes_columns, row)))

        bet_slip_comment_map = []

        for row in bet_slip_comments_results:
            bet_slip_found = False

            comment_to_add = {
                "username": row["username"],
                "comment_id": row["comment_id"],
                "comment": row["comment"],
                "comment_like_count": ""
            }

            for liked_comment in bet_slip_comments_likes_results:
                if liked_comment["comment_id"] == comment_to_add["comment_id"]:
                    comment_to_add["comment_like_count"] = liked_comment["comment_like_count"]

            for bet_slip in bet_slip_comment_map:

                if row["bet_slip_id"] == bet_slip["bet_slip_id"]:
                    bet_slip_found = True

                    bet_slip["comment"].append(comment_to_add)
            if not bet_slip_found:
                comment_map_to_add = {
                    "bet_slip_id": row["bet_slip_id"],
                    "bet_slip_comments": [comment_to_add]
                }

                bet_slip_comment_map.append(comment_map_to_add)

        cur.execute("SELECT editor_id FROM editor")

        editor_id_results = []

        editor_id_columns = [column[0] for column in cur.description]

        for row in cur.fetchall():
            editor_id_results.append(dict(zip(editor_id_columns, row)))

        editor_won_lost_results_dict = []

        for editor_id in editor_id_results:

            editor_to_add = {
                "editor_id": editor_id["editor_id"],
                "bet_slips_won": 0,
                "bet_slips_lost": 0,
                "single_bet_win_count": 0,
                "single_bet_lose_count": 0
            }
            if cur.execute("WITH editor_slips AS (SELECT bet_slip_id, creator_id as editor_id FROM bet_slip WHERE "
                           "creator_id = {0}), editor_bet_id AS (SELECT * FROM included_bet NATURAL JOIN editor_slips)"
                           " SELECT COUNT(bet_slip_id) AS won_bet_slip_count FROM editor_slips WHERE NOT EXISTS (SELECT"
                           " bet_id, match_id FROM editor_bet_id NATURAL JOIN bet WHERE bet_slip_id = bet_slip_id "
                           "AND (result = 'LOST' OR result = 'PENDING')) GROUP BY editor_id"
                                   .format(editor_id["editor_id"])) > 0:
                won_count = cur.fetchone()[0]
                editor_to_add["bet_slips_won"] = won_count

            if cur.execute("WITH editor_slips AS (SELECT bet_slip_id, creator_id as editor_id FROM bet_slip WHERE"
                           " creator_id = {0}), editor_bet_id AS (SELECT * FROM included_bet NATURAL JOIN editor_slips)"
                           "SELECT COUNT(bet_slip_id ) AS lost_bet_slip_count FROM editor_slips WHERE "
                           "EXISTS (SELECT bet_id, match_id FROM editor_bet_id NATURAL JOIN bet WHERE "
                           "editor_slips.bet_slip_id = bet_slip_id AND (result = 'LOST')) GROUP BY editor_id"
                                   .format(editor_id["editor_id"])) > 0:
                lost_count = cur.fetchone()[0]
                editor_to_add["bet_slips_lost"] = lost_count

            if cur.execute("WITH editor_bets AS (SELECT bet_id, match_id, editor_id FROM suggested_bet WHERE editor_id"
                           " = {0}) SELECT COUNT(bet_id) AS won_count FROM editor_bets NATURAL JOIN bet"
                           " GROUP BY editor_id, result HAVING result = 'WON'".format(editor_id["editor_id"])) > 0:
                single_bet_win_count = cur.fetchone()[0]
                editor_to_add["single_bet_win_count"] = single_bet_win_count

            if cur.execute("WITH editor_bets AS (SELECT bet_id, match_id, editor_id FROM suggested_bet WHERE editor_id"
                           " = {0}) SELECT COUNT(bet_id) AS won_count FROM editor_bets NATURAL JOIN bet"
                           " GROUP BY editor_id, result HAVING result = 'LOST'".format(editor_id["editor_id"])) > 0:
                single_bet_lose_count = cur.fetchone()[0]
                editor_to_add["single_bet_lose_count"] = single_bet_lose_count

            editor_won_lost_results_dict.append(editor_to_add)

        cur.execute("WITH suggested_bet_data AS (SELECT * FROM ((SELECT * FROM suggested_bet) as suggested NATURAL JOIN"
                    " bet)), match_data AS (SELECT * FROM suggested_bet_data NATURAL JOIN "
                    "competitor_match), all_competitors AS (SELECT competitor_name, competitor_id FROM (SELECT"
                    " player_id AS competitor_id, CONCAT(forename, ' ', surname) AS competitor_name FROM"
                    " individual_player) AS temp UNION (SELECT team_name AS competitor_name, team_id AS competitor_id "
                    "FROM team)), match_date AS (SELECT match_id, start_date FROM `match` NATURAL JOIN "
                    "suggested_bet_data) SELECT * FROM match_data NATURAL JOIN suggested_bet_data NATURAL JOIN"
                    " all_competitors NATURAL JOIN match_date")

        suggested_bet_results = []

        suggested_bet_columns = [column[0] for column in cur.description]

        for row in cur.fetchall():
            suggested_bet_results.append(dict(zip(suggested_bet_columns, row)))

        suggested_bet_map = []

        for row in suggested_bet_results:
            composite_already_added = False
            editor_found = False

            if row["side"] == "HOME":
                home_side = row["competitor_name"]
                away_side = ""

            else:
                home_side = ""
                away_side = row["competitor_name"]

            total_odd = row["odd"]
            editor_id = row["editor_id"]

            for editor in suggested_bet_map:

                if editor["editor_id"] == editor_id:
                    editor_found = True

                    for bet in editor["suggested_bets"]:
                        if bet["bet_id"] == row["bet_id"] and bet["match_id"] == row["match_id"]:
                            composite_already_added = True

                            if bet["home_side"] == "":
                                bet["home_side"] = row["competitor_name"]
                            else:
                                bet["away_side"] = row["competitor_name"]
                    if not composite_already_added:
                        bet_to_add = {
                            "bet_id": row["bet_id"],
                            "match_id": row["match_id"],
                            "home_side": home_side,
                            "away_side": away_side,
                            "odd": total_odd,
                            "start_date": row["start_date"],
                            "bet_type": row["bet_type"],
                            "comment": row["comment"]
                        }
                        editor["suggested_bets"].append(bet_to_add)
            if not editor_found:
                editor_to_add = {
                    "editor_id": editor_id,
                    "suggested_bets": []
                }

                suggested_bet = {
                    "bet_id": row["bet_id"],
                    "match_id": row["match_id"],
                    "home_side": home_side,
                    "away_side": away_side,
                    "odd": total_odd,
                    "start_date": row["start_date"],
                    "bet_type": row["bet_type"],
                    "comment": row["comment"]
                }

                editor_to_add["suggested_bets"].append(suggested_bet)

                suggested_bet_map.append(editor_to_add)

        editor_bet_slip_map = []

        for row in editor_slips_results:
            composite_already_added = False
            bet_slip_found = False
            editor_found = False

            if row["side"] == "HOME":
                home_side = row["competitor_name"]
                away_side = ""

            else:
                home_side = ""
                away_side = row["competitor_name"]

            total_odd = row["odd"]
            editor_id = row["editor_id"]

            for editor in editor_bet_slip_map:
                if editor["editor_id"] == editor_id:

                    editor_found = True
                    for bet_slip in editor["bet_slips"]:

                        if bet_slip["bet_slip_id"] == row["bet_slip_id"]:
                            bet_slip_found = True
                            for bet in bet_slip["bets"]:
                                if bet["bet_id"] == row["bet_id"] and bet["match_id"] == row["match_id"]:
                                    composite_already_added = True

                                    if bet["home_side"] == "":
                                        bet["home_side"] = row["competitor_name"]
                                    else:
                                        bet["away_side"] = row["competitor_name"]
                            if not composite_already_added:
                                bet_to_add = {
                                    "bet_id": row["bet_id"],
                                    "match_id": row["match_id"],
                                    "home_side": home_side,
                                    "away_side": away_side,
                                    "odd": total_odd,
                                    "start_date": row["start_date"],
                                    "result": row["result"],
                                    "bet_type": row["bet_type"]
                                }
                                bet_slip["bets"].append(bet_to_add)

                    if not bet_slip_found:
                        bets = [{
                            "bet_id": row["bet_id"],
                            "match_id": row["match_id"],
                            "home_side": home_side,
                            "away_side": away_side,
                            "odd": total_odd,
                            "start_date": row["start_date"],
                            "result": row["result"],
                            "bet_type": row["bet_type"]
                        }]
                        editor["bet_slips"].append({
                            "bet_slip_id": row["bet_slip_id"],
                            "bets": bets,
                            "comments": [],
                            "bet_slip_like_count": 0
                        })
            if not editor_found:
                editor_to_add = {
                    "editor_id": editor_id,
                    "bet_slips": []
                }

                bets = [{
                    "bet_id": row["bet_id"],
                    "match_id": row["match_id"],
                    "home_side": home_side,
                    "away_side": away_side,
                    "odd": total_odd,
                    "start_date": row["start_date"],
                    "result": row["result"],
                    "bet_type": row["bet_type"]
                }]

                editor_to_add["bet_slips"].append({
                    "bet_slip_id": row["bet_slip_id"],
                    "bets": bets,
                    "comments": [],
                    "bet_slip_like_count": 0
                })

                editor_bet_slip_map.append(editor_to_add)

        for editor in editor_bet_slip_map:

            for editor_bet_slip in editor["bet_slips"]:

                for like in bet_slip_like_results:
                    if like["bet_slip_id"] == editor_bet_slip["bet_slip_id"]:
                        editor_bet_slip["bet_slip_like_count"] = like["like_count"]

                for bet_slip_comments in bet_slip_comment_map:

                    if bet_slip_comments["bet_slip_id"] == editor_bet_slip["bet_slip_id"]:
                        editor_bet_slip["comments"] = bet_slip_comments["bet_slip_comments"]

        editor_final = []

        for editor in editor_results:
            editor_to_add = {
                "forename": editor["forename"],
                "surname:": editor["surname"],
                "winrate": editor["winrate"],
                "total_winnings": editor["total_winnings"],
                "followed_by_user": False,
                "single_bet_win_count": 0,
                "single_bet_lose_count": 0,
                "bet_slips_won": 0,
                "bet_slips_lost": 0,
                "bet_slips": [],
                "suggested_bets": []
            }
            for row in user_follows_results:
                if editor["editor_id"] == row["editor_id"]:
                    editor_to_add["followed_by_user"] = True

            for row in editor_won_lost_results_dict:
                if editor["editor_id"] == row["editor_id"]:
                    editor_to_add["single_bet_win_count"] = row["single_bet_win_count"]
                    editor_to_add["single_bet_lose_count"] = row["single_bet_lose_count"]
                    editor_to_add["bet_slips_won"] = row["bet_slips_won"]
                    editor_to_add["bet_slips_lost"] = row["bet_slips_lost"]

            for editor_map in editor_bet_slip_map:
                if editor_map["editor_id"] == editor["editor_id"]:
                    editor_to_add["bet_slips"] = editor_map["bet_slips"]

            for suggested_map in suggested_bet_map:
                if suggested_map["editor_id"] == editor["editor_id"]:
                    editor_to_add["suggested_bets"] = suggested_map["suggested_bets"]

            editor_final.append(editor_to_add)

        return {"editors": editor_final}

    elif input["request_type"] == "follow_editor":

        cur.execute("INSERT INTO user_follows (editor_id, user_id) VALUES ({0}, {1})".format(input["editor_id"],
                                                                                             input["user_id"]))

        mysql.connection.commit()

    elif input["request_type"] == "unfollow_editor":

        cur.execute("DELETE FROM user_follows WHERE user_id = {0} AND editor_id = {1}".format(input["user_id"],
                                                                                              input["editor_id"]))

        mysql.connection.commit()

    elif input["request_type"] == "play_editor_bet_slip":

        cur.execute("SELECT match_id, bet_id FROM (SELECT match_id, bet_id FROM included_bet WHERE bet_slip_id = {0})"
                    " bets NATURAL JOIN bet WHERE result = 'PENDING'".format(input["bet_slip_id"]))

        editor_pending_bets_results = []

        editor_pending_bets_columns = [column[0] for column in cur.description]

        for row in cur.fetchall():
            editor_pending_bets_results.append(dict(zip(editor_pending_bets_columns, row)))

        cur.execute("WITH user_bet_slip AS (SELECT bet_slip_id FROM bet_slip WHERE creator_id = {0} AND placed = FALSE)"
                    " SELECT match_id, bet_id FROM user_bet_slip NATURAL JOIN included_bet".format(input["user_id"]))

        user_current_bets_results = []

        user_current_bets_columns = [column[0] for column in cur.description]

        for row in cur.fetchall():
            user_current_bets_results.append(dict(zip(user_current_bets_columns, row)))

        for row in editor_pending_bets_results:

            bet_found = False

            for bet in user_current_bets_results:

                if bet["match_id"] == row["match_id"] and bet["bet_id"] == row["bet_id"]:
                    bet_found = True
                    break
            if not bet_found:
                cur.execute("SELECT bet_slip_id FROM bet_slip WHERE creator_id = {0} AND placed = FALSE"
                            .format(input["user_id"]))

                user_bet_slip_id = cur.fetchone()[0]

                if cur.execute("INSERT INTO included_bet (bet_slip_id, bet_id, match_id) VALUES ({0}, {1}, {2})"
                                       .format(user_bet_slip_id, row["bet_id"], row["match_id"])) > 0:

                    mysql.connection.commit()

                else:
                    return {"status": "Could not add bet to user betslip."}

        return {"status": "success"}


@app.route('/admin-dashboard/modify-bets', methods=["POST"])
def admin_dashboard_modify_bets():
    cur = mysql.connection.cursor()

    input = {
        "bet_id": request.get_json(force=True)["bet_id"],
        "match_id": request.get_json(force=True)["match_id"],
        "request_type": request.get_json(force=True)["request_type"],
    }
    if input["request_type"] == "change_odd":

        input["new_odd_value"] = request.get_json(force=True)["new_odd_value"]

        cur.execute("SELECT bet_type, mbn FROM bet WHERE bet_id = {0} AND match_id = {1}"
                    .format(input["bet_id"], input["match_id"]))

        result_tuple = cur.fetchone()

        bet_type = result_tuple[0]
        mbn = result_tuple[1]

        print(bet_type, mbn)

        if cur.execute("UPDATE bet SET active = FALSE WHERE bet_id = {0} AND match_id = {1}"
                               .format(input["bet_id"], input["match_id"])) > 0:
            if cur.execute("INSERT INTO bet (match_id, bet_type, change_date, odd, mbn, result, active) VALUES ({0},"
                           " '{1}', NOW(), {2}, {3}, 'PENDING', TRUE)".format(input["match_id"], bet_type,
                                                                              input["new_odd_value"], mbn)) > 0:
                mysql.connection.commit()
                return {"status": "success"}

            else:
                return {"status": "New bet not added."}
        else:
            return {"status": "Bet not deactivated."}

    elif input["request_type"] == "cancel_bet":

        if cur.execute("UPDATE bet SET active = FALSE WHERE bet_id = {0} AND match_id = {1}"
                               .format(input["bet_id"], input["match_id"])) > 0:
            mysql.connection.commit()
            return {"status": "success"}
        else:
            return {"status": "Couldn't remove bet!"}


@app.route('/admin-dashboard/editors', methods=["GET", "POST"])
def admin_dashboard_editors():
    cur = mysql.connection.cursor()

    input = request.get_json(force=True)

    if input["request_type"] == "display_editor_requests":

        cur.execute("SELECT username FROM approves AS a INNER JOIN person AS p ON a.editor_id = p.person_id"
                    " WHERE state = 'PENDING'")

        editors = []

        editors_columns = [column[0] for column in cur.description]

        for row in cur.fetchall():
            editors.append(dict(zip(editors_columns, row)))

        return {"editor_usernames": editors}

    elif input["request_type"] == "display_editor_information":

        if cur.execute("SELECT username, forename, surname, email FROM approves AS a INNER JOIN person AS p ON"
                       " a.editor_id = p.person_id WHERE state = 'PENDING' AND p.person_id = {0}"
                               .format(input["person_id"])) > 0:

            editor_desc = []

            editors_columns = [column[0] for column in cur.description]

            for row in cur.fetchall():
                editor_desc.append(dict(zip(editors_columns, row)))

            return {"editor": editor_desc[0]}
        else:
            return {"status": "Editor request not found."}

    elif input["request_type"] == "accept_editor_request":

        if cur.execute("INSERT INTO bet_slip_creator (creator_id) VALUES ({0})".format(input["person_id"])) > 0:

            if cur.execute("INSERT INTO editor(editor_id, winrate, total_winnings) VALUES ({0}, 0, 0)"
                                   .format(input["person_id"])) > 0:

                if cur.execute("UPDATE approves SET state = 'APPROVED' WHERE editor_id = {0}"
                                       .format(input["person_id"])) > 0:

                    mysql.connection.commit()
                    return {"status": "success"}
                else:
                    return {"status": "State not updated"}
            else:
                return {"status": "Editor not added."}
        else:
            return {"status": "Bet slip creator not created."}

    elif input["request_type"] == "decline_editor_request":

        if cur.execute("DELETE FROM person WHERE person_id = {0}".format(input["person_id"])) > 0:
            mysql.connection.commit()
            return {"status": "success"}
        else:
            return {"status": "Could not delete person."}


@app.route('/admin-dashboard/ban-users', methods=["GET", "POST"])
def admin_dashboard_ban_users():
    cur = mysql.connection.cursor()

    input = request.get_json(force=True)

    if input["request_type"] == "search_users":

        cur.execute("SELECT username FROM user AS u INNER JOIN person AS p ON u.user_id = p.person_id WHERE "
                    "username LIKE {0}".format('\'' + input["username"] + '%\''))

        username_results = []

        username_columns = [column[0] for column in cur.description]

        for row in cur.fetchall():
            username_results.append(dict(zip(username_columns, row)))

        return {"users": username_results}

    elif input["request_type"] == "display_details_of_user":

        cur.execute("SELECT username, forename, surname, account_balance, total_winnings FROM user AS u INNER JOIN"
                    " person AS p ON user_id = person_id WHERE user_id = {0}".format(input["user_id"]))

        user_desc = []

        user_desc_columns = [column[0] for column in cur.description]

        for row in cur.fetchall():
            user_desc.append(dict(zip(user_desc_columns, row)))

        return {"user": user_desc[0]}

    elif input["request_type"] == "ban_user":

        if cur.execute("INSERT INTO bans (user_id, admin_id) VALUES ({0}, {1})"
                               .format(input["user_id"], input["admin_id"])) > 0:

            mysql.connection.commit()
            return {"status": "success"}
        else:
            return {"status": "Couldn't ban user."}

    elif input["request_type"] == "unban_user":

        if cur.execute("DELETE FROM bans WHERE user_id = {0}".format(input["user_id"])) > 0:
            mysql.connection.commit()
            return {"status": "success"}
        else:
            return {"status": "Could not unban user."}


@app.route('/admin-dashboard/modify-achievements', methods=["GET", "POST"])
def admin_dashboard_modify_achievements():
    cur = mysql.connection.cursor()

    input = request.get_json(force=True)

    if input["request_type"] == "display_all_achievements":

        cur.execute("SELECT * FROM achievement")

        achv_results = []

        achv_columns = [column[0] for column in cur.description]

        for row in cur.fetchall():
            achv_results.append(dict(zip(achv_columns, row)))

    elif input["request_type"] == "add_achievement":

        if cur.execute("INSERT INTO achievement (achievement_name, achievement_description) VALUES ('{0}', '{1}')"
                               .format(input["achievement_name"], input["achievement_description"])) > 0:

            cur.execute("SELECT LAST_INSERT_ID()")

            last_achievement_id = cur.fetchone()[0]

            if cur.execute("INSERT INTO added_achievement(admin_id, achievement_id) VALUES({0}, {1})"
                                   .format(input["admin_id"], last_achievement_id)) > 0:
                mysql.connection.commit()
                return {"status": "success"}
            else:
                return {"status": "Could not add to added_achievement"}
        else:
            return {"status": "Could not add to achievement"}

    elif input["request_type"] == "remove_achievement":
        if cur.execute("DELETE FROM achievement WHERE achievement_id = {0}".format(input["achievement_id"])) > 0:

            mysql.connection.commit()
            return {"status": "success"}
        else:
            return {"status": "Could not remove achievement."}


@app.route('/admin-dashboard/modify-market', methods=["GET", "POST"])
def admin_dashboard_modify_market():
    cur = mysql.connection.cursor()

    input = request.get_json(force=True)

    if input["request_type"] == "add_item":

        if cur.execute("INSERT INTO shop_item(item_type, item_description, cost) VALUES ('{0}', '{1}', {2})"
                               .format(input["item_type"], input["item_description"],
                                       input["item_cost"])) > 0:

            cur.execute("SELECT LAST_INSERT_ID()")

            last_item_id = cur.fetchone()[0]

            if cur.execute("INSERT INTO added_item(admin_id, shop_item_id, item_type) VALUES({0},"
                           " {1}, '{2}')".format(input["admin_id"], last_item_id, input["item_type"])) > 0:
                mysql.connection.commit()
                return {"status": "success"}
            else:
                return {"status": "Could not add to added_item"}
        else:
            return {"status": "Could not add to shop_item"}

    elif input["request_type"] == "display_all_items":

        cur.execute("SELECT * FROM shop_item")

        item_results = []

        item_results_columns = [column[0] for column in cur.description]

        for row in cur.fetchall():
            item_results.append(dict(zip(item_results_columns, row)))

        return {"items": item_results}

    elif input["request_type"] == "update_cost":

        if cur.execute("SELECT item_type FROM shop_item WHERE shop_item_id = {0}"
                               .format(input["selected_item_id"])) > 0:

            item_type = cur.fetchone()[0]

            if cur.execute("UPDATE shop_item SET cost = {0} WHERE item_type = '{1}'"
                                   .format(input["new_cost"], item_type)) > 0:

                mysql.connection.commit()
                return {"status": "success"}
            else:
                return {"status": "New cost can't be equal to old cost"}
        else:
            return {"status": "No item found"}

    elif input["request_type"] == "update_description":

        if cur.execute("SELECT item_type FROM shop_item WHERE shop_item_id = {0}"
                               .format(input["selected_item_id"])) > 0:
            item_type = cur.fetchone()[0]

            if cur.execute("UPDATE shop_item SET item_description = '{0}' WHERE item_type = '{1}'"
                                   .format(input["new_description"], item_type)) > 0:

                mysql.connection.commit()
                return {"status": "success"}
            else:
                return {"status": "New description can't be equal to old description"}

    elif input["request_type"] == "remove_item":

        if cur.execute("DELETE FROM shop_item WHERE shop_item_id = {0} AND item_type = '{1}' AND NOT EXISTS (SELECT"
                       " shop_item_id, item_type FROM bought_item WHERE shop_item_id = {0} AND item_type = '{1}')"
                               .format(input["selected_item_id"], input["item_type"])) > 0:

            mysql.connection.commit()
            return {"status": "success"}
        else:
            return {"status": "Could not remove the item. Item may be already bought"}


@app.route('/market', methods=["GET", "POST"])
def market():
    cur = mysql.connection.cursor()

    input = request.get_json()

    # get request_type, user_id
    if input["request_type"] == "get_items":
        cur.execute("WITH non_bought_items AS (SELECT shop_item_id FROM shop_item WHERE shop_item_id NOT IN ("
                    "SELECT shop_item_id FROM bought_item WHERE user_id = {0})) "
                    "SELECT * FROM shop_item NATURAL JOIN non_bought_items"
                    .format(input["user_id"]))
        val = cur.fetchall()
        items = []

        for row in val:
            item = [{"item_id": row[0],
                     "item_type": row[1],
                     "item_description": row[2],
                     "cost": row[3]}]
            items.append(item)

        result = {
            "items": items
        }
        return jsonify({"result": result})

    # get request_type, user_id, shop_item_id, item_type
    if input["request_type"] == "buy_item":
        val = cur.execute("INSERT INTO bought_item (shop_item_id, user_id, item_type) VALUES ('{0}', '{1}', '{2}')"
                          .format(input["shop_item_id"], input["user_id"], input["item_type"]))
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


if __name__ == "__main__":
    app.secret_key = 'super secret key'
    app.run(debug=True)
