#!/user/local/bin/python3
import psycopg2
from json import dumps
from flask import Flask, request, make_response
from iexfinance.stocks import Stock
from iexfinance.refdata import get_symbols
from flask_cors import CORS

import os

app = Flask(__name__)

CORS(app)

symbol_list = get_symbols(
    output_format="pandas", token="sk_5f01a41d887241bfb8c3675938eedfc9"
)


@app.route("/")
def hello():
    print(symbol_list.name)
    return dumps(symbol_list.symbol.values.tolist())


if __name__ == "__main__":
    app.run(debug=True)

