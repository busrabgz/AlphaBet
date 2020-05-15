import time
from flask import Flask, render_template, request, flash, session
from flask_mysqldb import MySQL

app = Flask(__name__)
app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'

# configure db
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'alpha'
app.config['MYSQL_USER'] = 'root'
mysql = MySQL(app)


@app.route('/')
def home():
    cur = mysql.connection.cursor()
    return "Hello World!"


@app.route('/register', methods=["GET", "POST"])
def register():
    if request.method == 'POST':
        userDetails = request.form
        if userDetails['password'] != userDetails['confirm_password']:
            return render_template('register.html')
        cur = mysql.connection.cursor()
        cur.execute("INSERT INTO person(username, password, forename, surname, email) " \
                    "VALUES(%s,%s,%s,%s,%s)", (userDetails['username'], userDetails['password'], \
                                               userDetails['forename'], userDetails['surname'], userDetails['email']))
        mysql.connection.commit()
        cur.close()
        flash('Registration successful! Please login.', 'success')
    return render_template('register.html')

@app.route('/login', methods=["GET", "POST"])
def login():
    if request.method == 'POST':
        userDetails = request.form
        cur = mysql.connection.cursor()
        val = cur.execute("SELECT * FROM person WHERE username = %s", ([userDetails['username']]))
        if val > 0:
            session['logged_in'] = True
            flash('Registration successful! Please login.', 'success')
            return render_template('register.html')

        mysql.connection.commit()
        cur.close()
    return render_template('login.html')

@app.route('/time')
def get_current_time():
    return {'time': time.time()}


if __name__ == "__main__":
    app.secret_key = 'super secret key'
    app.run(debug=True)
