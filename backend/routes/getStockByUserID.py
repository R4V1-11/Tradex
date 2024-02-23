from flask import Flask, request, jsonify
import yfinance as yf
import pandas as pd
from flask import Blueprint
from flask_jwt_extended import JWTManager, jwt_required
import json
from routes.stockprices import get_prices_concurrently


userStock_bp = Blueprint('userStock' , __name__)

# @userStock_bp.route("/get_stock_by_userid", methods=["POST"])
# @jwt_required()
# def getStockByUserId():
#     from demo import mysql
#     data = request.get_json()
#     userid = data.get("userid")
   
    
#     # Create a cursor object
#     mycursor = mysql.connection.cursor()

#     # Call the stored procedure
#     mycursor.callproc('GetUserStocks', [userid])

#     # Fetch all the rows
#     result = mycursor.fetchall()

#     column_names = [column[0] for column in mycursor.description]
#     result1 = [dict(zip(column_names, row)) for row in result]
#     # Convert the result to JSON
#     # json_result = json.dumps(result)
#     print(result1)
#     print(type(result1[0]))
#     # Close the cursor and connection
#     mycursor.close()
#     print("1")
#     mysql.connection.commit()
#     print("2")
#     mysql.connection.close()
#     print("3")
#     print(result1[0])

#     return jsonify(result1[0])


# @userStock_bp.route("/get_stock_by_userid", methods=["POST"])
# @jwt_required()
# def getStockByUserId():
#     from demo import mysql
#     data = request.get_json()
#     userid = data.get("userid")
    
#     # Create a cursor object
#     mycursor = mysql.connection.cursor()

#     # Define the SQL query with a placeholder for the userid
#     sql_query = "SELECT * FROM stock_entry WHERE userid = %s"

#     try:
#         # Execute the query with the userid as a parameter
#         mycursor.execute(sql_query, (userid,))

#         # Fetch all the rows
#         result = mycursor.fetchall()

#         # Check if result is not empty
#         if not result:
#             return jsonify({"error": "No stocks found for the given userid"}),  404

#         # Return the first row of the result set
#         column_names = ["ticker", "userid", "price", "quantity"]

#     # Convert the list of lists into a list of dictionaries
#         result1 = [dict(zip(column_names, row)) for row in result]
#         return jsonify(result1)
#     except Exception as e:
#         # Log the error or return a message
#         return jsonify({"error": str(e)}),  500
#     finally:
#         # Close the cursor
#         mycursor.close()







@userStock_bp.route("/get_fund_by_userid", methods=["POST"])
@jwt_required()
def getFundByUserId():
    from demo import mysql
    data = request.get_json()
    userid = data.get("userid")
    
    
    mycursor = mysql.connection.cursor()

   
    sql_query = "SELECT id,name,email,fund FROM users WHERE id = %s"

    try:
        
        mycursor.execute(sql_query, (userid,))

        
        result = mycursor.fetchall()

       
        if not result:
            return jsonify({"error": "No stocks found for the given userid"}),  404

        
        column_names = ["id", "name", "email", "fund"]

      
        result1 = [dict(zip(column_names, row)) for row in result]
        return jsonify(result1)
    except Exception as e:
        
        return jsonify({"error": str(e)}),  500
    finally:
       
        mycursor.close()






# @userStock_bp.route("/get_stock_by_userid", methods=["POST"])
# @jwt_required()
# def getStockByUserId():
#     from demo import mysql
#     data = request.get_json()
#     userid = data.get("userid")
    
#     # Create a cursor object
#     mycursor = mysql.connection.cursor()

#     # Define the SQL query with a placeholder for the userid
#     sql_query = "SELECT * FROM stock_entry WHERE userid = %s"

#     try:
#         # Execute the query with the userid as a parameter
#         mycursor.execute(sql_query, (userid,))

#         # Fetch all the rows
#         result = mycursor.fetchall()

#         # Check if result is not empty
#         if not result:
#             return jsonify({"error": "No stocks found for the given userid"}),  404

#         # Define the column names
#         column_names = ["ticker", "userid", "price", "quantity"]

#         # Convert the list of lists into a list of dictionaries
#         result_dicts = [dict(zip(column_names, row)) for row in result]

#         # Fetch the current price for each stock
#         for stock_dict in result_dicts:
#             ticker = stock_dict['ticker']
#             stock = yf.Ticker(ticker)
#             todays_data = stock.history(period='1d')
#             stock_dict['current_price'] = todays_data['Close'][0] if not todays_data.empty else None

#         return jsonify(result_dicts)

#     except Exception as e:
#         # Log the error or return a message
#         return jsonify({"error": str(e)}),  500
#     finally:
#         # Close the cursor
#         mycursor.close()




@userStock_bp.route("/get_stock_by_userid", methods=["POST"])
@jwt_required()
def getStockByUserId():
    from demo import mysql
    data = request.get_json()
    userid = data.get("userid")
    
    # Create a cursor object
    mycursor = mysql.connection.cursor()

    # Define the SQL query with a placeholder for the userid
    sql_query = "SELECT * FROM stock_entry WHERE userid = %s"

    try:
        # Execute the query with the userid as a parameter
        mycursor.execute(sql_query, (userid,))

        # Fetch all the rows
        result = mycursor.fetchall()

        # Check if result is not empty
        if not result:
            return jsonify({"error": "No stocks found for the given userid"}),  404

        # Return the first row of the result set
                # Extract the ticker symbols
        tickers = [row[0] for row in result]
        print(tickers)
        # Fetch the current prices for the tickers
        prices = get_prices_concurrently(tickers)
        print(prices)
        result_with_prices = []
        # Include the prices in the JSON response
        for row in result:
            ticker = row[0]
            if ticker in prices:
                updated_row = list(row) + [prices[ticker]['price'], prices[ticker]['current_time']]
                result_with_prices.append(updated_row)  # Append the new list to the result_with_prices list
                
        print(result)
        # Convert the list of lists into a list of dictionaries
        column_names = ["ticker", "userid", "price", "quantity", "current_price", "current_time"]

        result1 = [dict(zip(column_names, row)) for row in result_with_prices]
        
        return jsonify(result1)
    
    except Exception as e:
        # Log the error or return a message
        return jsonify({"error": str(e)}),  500
    finally:
        # Close the cursor
        mycursor.close()





# get transaction history by userid
@userStock_bp.route("/get_history_by_userid", methods=["POST"])
@jwt_required()
def getHistroyByUserId():
    from demo import mysql
    data = request.get_json()
    userid = data.get("userid")
    
    # Create a cursor object
    mycursor = mysql.connection.cursor()

    # Define the SQL query with a placeholder for the userid
    sql_query = "SELECT * FROM transaction_history WHERE userid = %s"

    try:
        # Execute the query with the userid as a parameter
        mycursor.execute(sql_query, (userid,))

        # Fetch all the rows
        result = mycursor.fetchall()
        # Check if result is not empty
        if not result:
            return jsonify({"error": "No stocks found for the given userid"}),  404

        # Return the first row of the result set
        column_names = ["id", "userid" ,"ticker", "price", "action", "quantity" ,"date"]

    # Convert the list of lists into a list of dictionaries
        result1 = [dict(zip(column_names, row)) for row in result]
        return jsonify(result1)
    except Exception as e:
        # Log the error or return a message
        return jsonify({"error": str(e)}),  500
    finally:
        # Close the cursor
        mycursor.close()



