from flask import Flask, request, jsonify
import yfinance as yf
import pandas as pd
from flask import Flask
import datetime
from flask_jwt_extended import JWTManager, jwt_required
from concurrent.futures import ThreadPoolExecutor
from routes.stockprices import fetch_stock_price
import time
import asyncio




def fetch_stocks_from_db(mysql):
    # Placeholder for fetching stocks from the database
    # This should be replaced with actual database query logic

    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM stock_bid")
    result = cur.fetchall()
    column_names = ["id", "userid" ,"ticker", "price", "quantity", "action"]
    # Convert the list of lists into a list of dictionaries
    stocks = [dict(zip(column_names, row)) for row in result]
    return stocks



# Placeholder functions for buy and sell operations
def buy_stock(mysql,ticker, userid, price,quantity, threshold_price):
    cursor = mysql.connection.cursor()

    try:
        
        cursor.callproc('UpdateStockAndTransactionHistory', (ticker, userid, price, quantity))
        cursor.execute("Delete from stock_bid where userid = %s and ticker_symbol = %s and price = %s and actions = 'buy'",(userid, ticker, threshold_price))
        
        mysql.connection.commit()

        
        cursor.close()
        mysql.connection.commit()
        return
        return jsonify({"message": "Stock and transaction updated successfully."}),  200
    except Exception as e:
        
        mysql.connection.rollback()
        cursor.close()
        return
        return jsonify({"error": str(e)}),  500

def sell_stock(mysql, ticker, userid, price,quantity, threshold_price):


    cur = mysql.connection.cursor()
    try:
       
        cur.callproc('SellStock', (ticker, userid, price, quantity))
        
       
        if cur.rowcount ==  0: 
            return jsonify({"error": "Not enough stocks to sell."}),  422

        cur.execute("Delete from stock_bid where userid = %s and ticker_symbol = %s and price = %s and actions = 'sell'",(userid, ticker, threshold_price))
        mysql.connection.commit()

        
        cur.close()
        return
        return jsonify({"message": "Stock sold and transaction recorded."}),  200
    except mysql.connect.Error as err:
        # Rollback the transaction in case of error
        mysql.connection.rollback()

        
        cur.close()
        return
        return jsonify({"error": str(err)}),  500
# Function to check if the stock price has fallen below the threshold
def check_price_below_threshold(mysql,app):
    with app.app_context():
        while True:
            print("background")
            stocks = fetch_stocks_from_db(mysql)
            for stock in stocks:
                stock_price = fetch_stock_price(stock["ticker"])  # Simulated function
                threshold_price = stock["price"]
                action = stock["action"]
                if stock_price <= threshold_price and action == "buy":
                    print("buy")
                    # Call buy and sell functions
                    buy_stock(mysql,stock["ticker"],stock["userid"],stock_price,stock["quantity"], threshold_price)
                if stock_price >= threshold_price and action == "sell":
                    print("sold")
                    sell_stock(mysql,stock["ticker"],stock["userid"],stock_price,stock["quantity"], threshold_price)
            time.sleep(5)


