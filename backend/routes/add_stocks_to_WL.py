# Endpoint for adding the data to watch list
from flask import Flask, request, jsonify
import yfinance as yf
import pandas as pd
import datetime
import os
from flask import Blueprint
from flask_jwt_extended import JWTManager, jwt_required
 
 
add_to_WL_bp = Blueprint('addstock',__name__)
@add_to_WL_bp.route("/add_stock_WL",methods=["POST"])
@jwt_required()
def add_stock():
        from demo import mysql
        data = request.get_json()
        ticker_in = data.get("ticker")
        userid_in = data.get("userId")
        wl_no_in = data.get("WL_no")
        print(ticker_in)
        print(userid_in)
        print(wl_no_in)
        cursor = mysql.connection.cursor()
 
        try:
 
            cursor.callproc("add_stock",(ticker_in,userid_in,wl_no_in))
            mysql.connection.commit()
            cursor.close()
            mysql.connection.commit()
            return jsonify({"message":"Stock and userid updated successfully."})
           
        except Exception as e:
            mysql.connection.rollback()
            cursor.close()
            return jsonify({"error": str(e)}), 500  