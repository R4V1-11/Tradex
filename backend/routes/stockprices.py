from flask import Flask, request, jsonify
import yfinance as yf
import pandas as pd
from flask import Blueprint
import datetime
from flask_jwt_extended import JWTManager, jwt_required
from concurrent.futures import ThreadPoolExecutor


stockprice_bp = Blueprint('stockprice' , __name__)
def fetch_stock_price(ticker):
    stock = yf.Ticker(ticker)
    data = stock.history(period="1d")
    if not data.empty:
        return data['Close'][0]
    else:
        return None

      

# This function fetches stock prices for a list of tickers using multithreading
def get_prices_concurrently(tickers):
    current_time = datetime.datetime.now()
    print(current_time)
    prices = {}

    # Create a ThreadPoolExecutor
    with ThreadPoolExecutor() as executor:
        # Use the executor to map the fetch_stock_price function to the list of tickers
        results = executor.map(fetch_stock_price, tickers)

        # Iterate over the results and store the prices
        for ticker, price in zip(tickers, results):
            if price is not None:
                prices[ticker] = {'price': price, 'current_time': current_time.strftime('%Y-%m-%d %H:%M:%S')}

    return prices



        
            
#return the stock price in the form of list
@stockprice_bp.route("/get_prices_wl1", methods=["GET"])
@jwt_required()
def get_prices():
    # Read tickers from CSV
    df = pd.read_csv("stocks.csv")
    tickers = df['watchlist1'].tolist()
    # Fetch prices for each ticker concurrently
    prices = get_prices_concurrently(tickers)
 
    return jsonify(prices)
 
 
 
 
@stockprice_bp.route("/get_prices_wl2", methods=["GET"])
def get_priceswl2():
    # Read tickers from CSV
    df = pd.read_csv("stocks.csv")
    df['watchlist2'] = df['watchlist2'].astype(str)
    tickers = df['watchlist2'].tolist()
    # Fetch prices for each ticker concurrently
    prices = get_prices_concurrently(tickers)
 
    return jsonify(prices)
 