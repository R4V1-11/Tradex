from flask import Flask, request, jsonify
import yfinance as yf
import pandas as pd
from flask_mysqldb import MySQL


app = Flask(__name__)




# MySQL configurations
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_PORT'] = 3307  # Default MySQL port
app.config['MYSQL_USER'] = 'root'
#app.config['MYSQL_DATABASE_PASSWORD'] = 'root'
app.config['MYSQL_DB'] = 'tradex'


mysql = MySQL(app)

@app.route("/")
def home():
    user_data = {
        "name": "ashutosh",
        "age":23
    }
    return user_data

@app.route("/save_user", methods=["POST"])
def save_user():
    data = request.get_json()
    print(data)
    return jsonify({"message": "User data updated successfully"})

#fetch stock price 
def fetch_stock_price(ticker):
    stock = yf.Ticker(ticker)
    data = stock.history(period="1d")
    if not data.empty:
        return data['Close'][0]
    else:
        return None
#return the stock price in the form of list 
@app.route("/get_prices", methods=["GET"])
def get_prices():
    # Read tickers from CSV
    df = pd.read_csv("stocks.csv")
    tickers = df['ticker'].tolist()

    # Fetch prices for each ticker
    prices = {}
    for ticker in tickers:
        price = fetch_stock_price(ticker)
        if price is not None:
            prices[ticker] = price

    return jsonify(prices)




#to register user


@app.route("/register_user", methods=["POST"])
def register_user():
    data = request.get_json()
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    # Insert user data into the database
    cur = mysql.connection.cursor()
    cur.execute("INSERT INTO users (name, email, password) VALUES (%s, %s, %s)", (name, email, password))
    mysql.connection.commit()
    cur.close()

    return jsonify({"message": "User data saved successfully"})



#login 

@app.route("/login", methods=["POST"])
def login_user():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    cur = mysql.connection.cursor()
    # Execute SQL query to retrieve user based on email and password
    cur.execute("SELECT * FROM users WHERE email = %s AND password = %s", (email, password))
    user = cur.fetchone()

    if user:
        # User found, fetch all user information
        user_info = {
            "id": user[0],
            "name": user[1],
            "email": user[2],
            # Include other fields as needed
        }
        return jsonify({"user": user_info}), 200
    else:
        # User not found, return error message
        return jsonify({"error": "Invalid email or password"}), 404





if __name__=="__main__":
    app.run(debug=True)
