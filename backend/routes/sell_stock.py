from flask import Flask, request, jsonify
import yfinance as yf
import pandas as pd
from flask import Blueprint
from flask_jwt_extended import JWTManager, jwt_required


sellstock_bp = Blueprint('sellstock' , __name__)
@sellstock_bp.route("/sell_stock", methods=["POST"])
@jwt_required()
def sell_stock():
    from demo import mysql
    data = request.get_json()
    ticker = data.get("ticker")
    userid = data.get("userid")
    price = data.get("price")
    quantity = data.get("quantity")
    cur = mysql.connection.cursor()
    try:
        # Call the stored procedure
        cur.callproc('SellStock', (ticker, userid, price, quantity))
        
        # Check if the stored procedure returned an error (e.g., not enough stocks)
        if cur.rowcount ==  0:  # Assuming the stored procedure returns affected rows count
            return jsonify({"error": "Not enough stocks to sell."}),  422

        # Commit the transaction
        mysql.connection.commit()

        # Close the cursor
        cur.close()

        return jsonify({"message": "Stock sold and transaction recorded."}),  200
    except mysql.connect.Error as err:
        # Rollback the transaction in case of error
        mysql.connection.rollback()

        # Close the cursor
        cur.close()

        return jsonify({"error": str(err)}),  500