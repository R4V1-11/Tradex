from flask import Flask, request, jsonify
import yfinance as yf
import pandas as pd
import datetime
import os
from flask import Blueprint
from flask_jwt_extended import JWTManager, jwt_required


buystock_bp = Blueprint('buystock' , __name__)
@buystock_bp.route("/buy_stock", methods=["POST"])
@jwt_required()
def buy_stock():
    from demo import mysql
    data = request.get_json()
    ticker = data.get("ticker")
    userid = data.get("userid")
    price = data.get("price")
    quantity = data.get("quantity")
    cursor = mysql.connection.cursor()
# Check if a stock entry with the same ticker and userid exists
    try:
        # Call the stored procedure
        cursor.callproc('UpdateStockAndTransactionHistory', (ticker, userid, price, quantity))
        
        # Commit the transaction
        mysql.connection.commit()

        # Close the cursor and connection
        cursor.close()
        mysql.connection.commit()

        return jsonify({"message": "Stock and transaction updated successfully."}),  200
    except Exception as e:
        # Rollback the transaction in case of error
        mysql.connection.rollback()
        cursor.close()
        return jsonify({"error": str(e)}),  500
 