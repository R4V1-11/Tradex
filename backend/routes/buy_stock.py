from flask import Flask, request, jsonify
import yfinance as yf
import pandas as pd
import datetime
import os
from flask import Blueprint


buystock_bp = Blueprint('buystock' , __name__)

@buystock_bp.route("/buy_stock", methods=["POST"])
def buy_stock():
    from demo import mysql
    data = request.get_json()
    ticker = data.get("ticker")
    userid = data.get("userid")
    price = data.get("price")
    quantity = data.get("quantity")
    cur = mysql.connection.cursor()
# Check if a stock entry with the same ticker and userid exists
    cur.execute("SELECT * FROM stock_entry WHERE ticker = %s AND userid = %s", (ticker, userid))
    existing_entry = cur.fetchone()
    print(price)
    print(quantity)
    if existing_entry:
# If entry exists, increment the price and quantity
        updated_price = existing_entry[2] + price
        updated_quantity = existing_entry[3] + quantity
        print(updated_price)
        print(updated_quantity)
        print(ticker)
        print(userid)
        cur.execute("UPDATE stock_entry SET price = %s, quantity = %s WHERE ticker = %s AND userid = %s",
        (updated_price, updated_quantity, ticker, userid))
       
    else:
        # If entry doesn't exist, save a new row
        cur.execute("INSERT INTO stock_entry (ticker, userid, price, quantity) VALUES (%s, %s, %s, %s)",
        (ticker, userid, price, quantity))
    cur.execute("INSERT INTO transaction_history (userid, ticker, price,actions, quantity) VALUES (%s,%s, %s, %s,%s)",(userid,ticker, price, "buy",quantity))
    mysql.connection.commit()
    cur.close()
    return jsonify({"message": "User data saved successfully"})
 