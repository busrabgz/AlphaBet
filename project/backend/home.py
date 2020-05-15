import time
from flask import Flask

app = Flask(__name__)


@app.route('/')
def home():
    return "Hello World!"


@app.route('/search')
def search():
    return "Searching for a keyword..."

@app.route('/time')
def get_current_time():
    return {'time': time.time()}

if __name__ == "__main__":
    app.run(debug=True)
