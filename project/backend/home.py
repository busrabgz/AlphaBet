import time
from flask import Flask, request
from flask_mysqldb import MySQL

app = Flask(__name__)

# configure db
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'alpha'
app.config['MYSQL_USER'] = 'root'
mysql = MySQL(app)


@app.route('/', methods = ['POST'])
def home():
    cur = mysql.connection.cursor()

    '''
    Contest input is a dictionary
    '''
    input = {
        "username": request.get_json(force=True)["username"],
        "request_type": request.get_json(force=True)["request_type"],
        "bet_id": request.get_json(force=True)["bet_id"],
        "search_text": request.get_json(force=True)["search_text"],
        "max_mbn": request.get_json(force=True)["max_mbn"],
        "contest": request.get_json(force=True)["contest"]
    }

    if cur.execute("SELECT person_id FROM person WHERE username = '{0}'".format(input["username"])) > 0:
        person_id = cur.fetchone()[0]

    if input["request_type"] == "play_betslip":
        return

    elif input["request_type"] == "add_bet_to_betslip":

        if cur.execute("SELECT match_id FROM bet WHERE bet_id = '{0}'".format(input["bet_id"])) > 0:
            match_id = cur.fetchone()[0]

        if cur.execute("SELECT bet_slip_id FROM bet_slip WHERE placed = FALSE AND creator_id = {0}".format(person_id)) > 0:
            bet_slip_id = cur.fetchone()[0]

        cur.execute("INSERT INTO included_bet (bet_slip_id, bet_id, match_id) VALUES ({0}, {1}, {2})".format(bet_slip_id, input["bet_id"], match_id))

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
