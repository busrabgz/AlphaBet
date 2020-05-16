import time
from flask import Flask, render_template, request, flash, session, jsonify
from flask_mysqldb import MySQL
from flask_jwt_extended import JWTManager, create_access_token
from flask_bcrypt import Bcrypt

app = Flask(__name__)
app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'

# configure db
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'alpha'
app.config['MYSQL_USER'] = 'root'
app.config['JWT_SECRET_KEY'] = 'secret'
mysql = MySQL(app)
jwt = JWTManager(app)
bcrypt = Bcrypt(app)


@app.route('/')
def home():
    cur = mysql.connection.cursor()
    return "Hello World!"


@app.route('/register', methods=["GET", "POST"])
def register():
    if request.method == 'POST':
        personDetails = request.form
        if personDetails['password'] != personDetails['confirm_password']:
            return render_template('register.html')
        cur = mysql.connection.cursor()
        password = bcrypt.generate_password_hash(personDetails['password']).decode('utf-8')
        cur.execute("INSERT INTO person(username, password, forename, surname, email) " \
                    "VALUES(%s,%s,%s,%s,%s)", (personDetails['username'], password, \
                                               personDetails['forename'], personDetails['surname'], personDetails['email']))
        mysql.connection.commit()

        result = {
            "username": personDetails['username'],
            "password": password,
            "forename": personDetails['forename'],
            "surname": personDetails['surname'],
            "email": personDetails['email']
        }
        return jsonify({"result": result})
    return render_template('register.html')

@app.route('/login', methods=["GET", "POST"])
def login():
    if request.method == 'POST':
        personDetails = request.form
        cur = mysql.connection.cursor()
        val = cur.execute("SELECT * FROM person WHERE username = %s", ([personDetails['username']]))
        if val > 0:
            person = cur.fetchone();
            if bcrypt.check_password_hash(person['password'], personDetails['password']):
                access_token = create_access_token(identity={'username': person['username']})

                result = {
                    "username": personDetails['username'],
                    "access_token" : access_token
                }
                return jsonify(({"result": result}))
    return render_template('login.html')

@app.route('/time')
def get_current_time():
    return {'time': time.time()}


if __name__ == "__main__":
    app.secret_key = 'super secret key'
    app.run(debug=True)
