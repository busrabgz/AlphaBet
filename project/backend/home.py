import time
from flask import Flask
from flask_mysqldb import MySQL

app = Flask(__name__)

#configure db
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'alpha'
app.config['MYSQL_USER'] = 'root'
mysql = MySQL(app)

@app.route('/')
def home():
    cur = mysql.connection.cursor()
    cur.execute("INSERT INTO sport VALUES(%s)", ('M'))
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
