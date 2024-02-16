from flask import Flask, request, jsonify
import yfinance as yf
import pandas as pd
from flask import Blueprint
from flask_jwt_extended import JWTManager, jwt_required
import json

userStock_bp = Blueprint('userStock' , __name__)

@userStock_bp.route("/get_stock_by_userid", methods=["POST"])
@jwt_required()
def getStockByUserId():
    from demo import mysql
    data = request.get_json()
    userid = data.get("userid")
   
    
    # Create a cursor object
    mycursor = mysql.connection.cursor()

    # Call the stored procedure
    mycursor.callproc('GetUserStocks', [userid])

    # Fetch all the rows
    result = mycursor.fetchall()

    column_names = [column[0] for column in mycursor.description]
    result1 = [dict(zip(column_names, row)) for row in result]
    # Convert the result to JSON
    # json_result = json.dumps(result)
    print(result1)
    print(type(result1[0]))
    # Close the cursor and connection
    mycursor.close()
    print("1")
    mysql.connection.commit()
    print("2")
    mysql.connection.close()
    print("3")
    print(result1[0])

    return jsonify(result1[0])