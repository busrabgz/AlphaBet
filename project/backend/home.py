import time
from flask import Flask, request
from flask_mysqldb import MySQL

app = Flask(__name__)

# configure db
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_PASSWORD'] = '123456789'
app.config['MYSQL_DB'] = 'alpha'
app.config['MYSQL_USER'] = 'root'
mysql = MySQL(app)


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
        "vote_side": request.get_json(force=True)["vote_side"],
        "filter": request.get_json(force=True)["filter"]
    }

    '''
    Filter request uses input["filter], 
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

    elif input["request_type"] == "add_bet_to_betslip":
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


@app.route('/search')
def search():
    return "Searching for a keyword..."


@app.route('/time')
def get_current_time():
    return {'time': time.time()}


if __name__ == "__main__":
    app.run(debug=True)
