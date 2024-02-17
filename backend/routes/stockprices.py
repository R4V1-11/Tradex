from flask import Flask, request, jsonify
import yfinance as yf
import pandas as pd
from flask import Blueprint
import datetime
from flask_jwt_extended import JWTManager, jwt_required
from yahooquery import Ticker


stockprice_bp = Blueprint('stockprice' , __name__)
def fetch_stock_price(ticker):
    stock = yf.Ticker(ticker)
    data = stock.history(period="1d")
    if not data.empty:
        return data['Close'][0]
    else:
        return None


def fetch_stock_price1(ticker):
    stock = Ticker(ticker)
    data = stock.history(period="1d", timeout=10)
    if not data.empty:
        return data['close'][0]
    else:
        return None        





        
            
#return the stock price in the form of list
@stockprice_bp.route("/get_prices_wl1", methods=["GET"])
@jwt_required()
def get_prices():
    # Read tickers from CSV
    df = pd.read_csv("stocks.csv")
    tickers = df['watchlist1'].tolist()
    current_time = datetime.datetime.now()
    print(current_time)
    # Fetch prices for each ticker
    prices = {}
    for ticker in tickers:
        price = fetch_stock_price(ticker)
        if price is not None:
            prices[ticker] = {'price': price, 'current_time': current_time.strftime('%Y-%m-%d %H:%M:%S')}
 
    return jsonify(prices)
 
 
 
 
@stockprice_bp.route("/get_prices_wl2", methods=["GET"])
def get_priceswl2():
    # Read tickers from CSV
    df = pd.read_csv("stocks.csv")
    df['watchlist2'] = df['watchlist2'].astype(str)
    tickers = df['watchlist2'].tolist()
    current_time = datetime.datetime.now()
    print(current_time)
    # Fetch prices for each ticker
    prices = {}
    for ticker in tickers:
        price = fetch_stock_price(ticker)
        if price is not None:
            prices[ticker] = {'price': price, 'current_time': current_time.strftime('%Y-%m-%d %H:%M:%S')}
 
    return jsonify(prices)
 