from flask import Flask, request, jsonify
import yfinance as yf
import pandas as pd
from flask import Blueprint
from flask_jwt_extended import JWTManager, jwt_required
import json

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
        column_names = ["ticker", "userid", "price", "quantity"]

    # Convert the list of lists into a list of dictionaries
        result1 = [dict(zip(column_names, row)) for row in result]
        return jsonify(result1)
    except Exception as e:
        # Log the error or return a message
        return jsonify({"error": str(e)}),  500
    finally:
        # Close the cursor
        mycursor.close()







@userStock_bp.route("/get_fund_by_userid", methods=["POST"])
@jwt_required()
def getFundByUserId():
    from demo import mysql
    data = request.get_json()
    userid = data.get("userid")
    
    # Create a cursor object
    mycursor = mysql.connection.cursor()

    # Define the SQL query with a placeholder for the userid
    sql_query = "SELECT id,name,email,fund FROM users WHERE id = %s"

    try:
        # Execute the query with the userid as a parameter
        mycursor.execute(sql_query, (userid,))

        # Fetch all the rows
        result = mycursor.fetchall()

        # Check if result is not empty
        if not result:
            return jsonify({"error": "No stocks found for the given userid"}),  404

        # Return the first row of the result set
        column_names = ["id", "name", "email", "fund"]

    # Convert the list of lists into a list of dictionaries
        result1 = [dict(zip(column_names, row)) for row in result]
        return jsonify(result1)
    except Exception as e:
        # Log the error or return a message
        return jsonify({"error": str(e)}),  500
    finally:
        # Close the cursor
        mycursor.close()

