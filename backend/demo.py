from flask import Flask, request, jsonify
import yfinance as yf
import pandas as pd
from flask_mysqldb import MySQL
from dotenv import load_dotenv
import os
from flask import Blueprint
from routes.auth import auth_bp
from routes.stockprices import stockprice_bp
from routes.sell_stock import sellstock_bp
from routes.buy_stock import buystock_bp
from flask_cors import CORS

load_dotenv()

app = Flask(__name__)

CORS(app)


# MySQL configurations
app.config['MYSQL_HOST'] = os.getenv('HOST')
app.config['MYSQL_PORT'] = int(os.getenv('DATABASE_PORT')) # Default MySQL port
app.config['MYSQL_USER'] =  os.getenv('DATABASE_USER')
app.config['MYSQL_PASSWORD'] = os.getenv('DATABASE_PASSWORD')
app.config['MYSQL_DB'] =  os.getenv('DATABASE_NAME')


mysql = MySQL(app)

@app.route("/")
def home():
    user_data = {
        "name": "ashutosh",
        "age":23
    }
    return user_data

app.register_blueprint(auth_bp)
app.register_blueprint(stockprice_bp)
app.register_blueprint(buystock_bp)
app.register_blueprint(sellstock_bp)





if __name__=="__main__":
    app.run(debug=True)
