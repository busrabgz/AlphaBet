import time
from flask import Flask, render_template, request, flash, session, jsonify, redirect
from flask_mysqldb import MySQL
from flask_bcrypt import Bcrypt
from flask_cors import CORS

app = Flask(__name__)
app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'

# configure db
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_PASSWORD'] = ''
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

@app.route('/')
def home():
    cur = mysql.connection.cursor()
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
        #bcrypt.generate_password_hash(personDetails.get('password')).decode('utf-8')
        cur.execute("INSERT INTO person(username, password, forename, surname, email) " 
                    "VALUES(%s,%s,%s,%s,%s)", (personDetails.get('username'), password,
                                               personDetails.get('forename'), personDetails.get('surname'), personDetails.get('email')))
        mysql.connection.commit()

        cur.execute("SELECT person_id FROM person WHERE username = %s", ([personDetails['username']]))
        person = cur.fetchone()
        id = person[0]

        cur.execute("INSERT INTO bet_slip_creator(creator_id) VALUES({0})".format(id))
        mysql.connection.commit()

        cur.execute("INSERT INTO bet_slip(creator_id, placed, played_amount) VALUES({0}, {1}, {2})".format(id, False, 0))
        mysql.connection.commit()

        if personDetails.get('type') == "user":
            cur.execute("INSERT INTO user(user_id, account_balance, total_winnings, alpha_coins) " 
                        "VALUES(%s,%s,%s,%s)", (id, 0, 0, 0))
            mysql.connection.commit()

        if personDetails.get('type') == "editor":
            cur.execute("INSERT INTO editor(editor_id, winrate, total_winnings) "
                        "VALUES(%s,%s,%s)", (id, 0, 0, 0))
            mysql.connection.commit()

        result = {
            "success": "true",
            "username": personDetails.get('username'),
            "password": password,
            "forename": personDetails.get('forename'),
            "surname": personDetails.get('surname'),
            "email": personDetails.get('email'),
            "type": personDetails.get('type')
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
                    "success" : "true",
                    "type": type,
                    "username": personDetails['username']
                }
        else:
            result = {
                "success": "false",
                "username": personDetails['username']
            }
        return jsonify(({"result": result}))

@app.route('/time')
def get_current_time():
    return {'time': time.time()}


if __name__ == "__main__":
    app.secret_key = 'super secret key'
    app.run(debug=True)
