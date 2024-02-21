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
from routes.addFunds import addfund_bp
from routes.getStockByUserID import userStock_bp
from routes.withdrawFunds import withdrawfund_bp
from flask_jwt_extended import JWTManager
from flask_cors import CORS


load_dotenv()

app = Flask(__name__)




# MySQL configurations
CORS(app)
app.config['MYSQL_HOST'] = os.getenv('HOST')
app.config['MYSQL_PORT'] = int(os.getenv('DATABASE_PORT')) # Default MySQL port
app.config['MYSQL_USER'] =  os.getenv('DATABASE_USER')
app.config['MYSQL_PASSWORD'] = os.getenv('DATABASE_PASSWORD')
app.config['MYSQL_DB'] =  os.getenv('DATABASE_NAME')
app.config["JWT_SECRET_KEY"] = "OmGPpOKe5mJueB70myLGoktizUU8Jc3N"  # Change this to your secret key!
app.config["JWT_ACCESS_TOKEN_EXPIRES"] =  7 *  24 *  60 *  60
jwt = JWTManager(app)


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
app.register_blueprint(addfund_bp)
app.register_blueprint(userStock_bp)
app.register_blueprint(withdrawfund_bp)





if __name__=="__main__":
    app.run(debug=True)
