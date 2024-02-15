from flask import Flask, request, jsonify
import yfinance as yf
import pandas as pd
from flask import Blueprint
import datetime

stockprice_bp = Blueprint('stockprice' , __name__)
def fetch_stock_price(ticker):
    stock = yf.Ticker(ticker)
    data = stock.history(period="1d")
    if not data.empty:
        return data['Close'][0]
    else:
        return None
#return the stock price in the form of list
@stockprice_bp.route("/get_prices", methods=["GET"])
def get_prices():
    # Read tickers from CSV
    df = pd.read_csv("stocks.csv")
    tickers = df['ticker'].tolist()
    current_time = datetime.datetime.now()
    print(current_time)
    # Fetch prices for each ticker
    prices = {}
    for ticker in tickers:
        price = fetch_stock_price(ticker)
        if price is not None:
            prices[ticker] = {'price': price, 'current_time': current_time.strftime('%Y-%m-%d %H:%M:%S')}
 
 
    return jsonify(prices)