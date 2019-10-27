from flask import Flask
from iexfinance.stocks import Stock

import os

app = Flask(__name__)


@app.route("/")
def hello():
    a = Stock("AAPL", token="sk_5f01a41d887241bfb8c3675938eedfc9")
    print(os.environ)
    return "hi"

