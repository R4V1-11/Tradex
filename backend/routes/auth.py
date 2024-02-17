from flask import Flask, request, jsonify
from flask_mysqldb import MySQL
from flask import Blueprint
import bcrypt
from flask_jwt_extended import create_access_token



def hash_password(password):
    password = password.encode('utf-8')  # Convert to bytes
    salt = bcrypt.gensalt()  # Generate a salt
    hashed_password = bcrypt.hashpw(password, salt)  # Hash the password with the salt
    return hashed_password.decode('utf-8')  # Return the hashed password as a string

def check_password(provided_password, stored_hashed_password):
    provided_password = provided_password.encode('utf-8')
    stored_hashed_password = stored_hashed_password.encode('utf-8')
    return bcrypt.checkpw(provided_password, stored_hashed_password)

auth_bp = Blueprint('auth' , __name__)
#to register user
@auth_bp.route("/register_user", methods=["POST"])
def register_user():
    from demo import mysql
    data = request.get_json()
    name = data.get("name")
    email = data.get("email")
    password_original = data.get("password")
    password = hash_password(password_original)
    # Insert user data into the database
    cur = mysql.connection.cursor()
    cur.execute("INSERT INTO users (name, email, password) VALUES (%s, %s, %s)", (name, email, password))
    mysql.connection.commit()
    cur.close()

    return jsonify({"message": "User data saved successfully"})



#login 

@auth_bp.route("/login", methods=["POST"])
def login_user():
    from demo import mysql
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")
    cur = mysql.connection.cursor()
    # Execute SQL query to retrieve user based on email and password
    cur.execute("SELECT * FROM users WHERE email = %s", (email,))
    user_record = cur.fetchone()

    if user_record:
        hash_password= user_record[3]
        print(hash_password)
    else:
        # User not found, return error message
        return jsonify({"error": "Invalid password"}), 401

    userPresent = check_password(password, hash_password)
    
    if userPresent:
        # User found, fetch all user information
        cur.execute("SELECT * FROM users WHERE email = %s AND password = %s" , (email,hash_password))
        user = cur.fetchone()
        user_info = {
            "id": user[0],
            "name": user[1],
            "email": user[2],
            # Include other fields as needed
        }
        access_token = create_access_token(identity=data["email"]) 
        return jsonify({"user": user_info, "access_token": access_token}),  200
    else:
        # User not found, return error message
        return jsonify({"error": "Invalid email"}), 401
    
