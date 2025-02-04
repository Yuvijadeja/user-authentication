from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from database import query_db
from auth import generate_token
import sqlite3

user_routes = Blueprint('user_routes', __name__)

@user_routes.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    first_name = data.get('first_name')
    last_name = data.get('last_name')
    phone = data.get('phone')

    if not email or not password or not first_name or not last_name or not phone:
        return jsonify({'type': 'error', 'message': 'email, password, first name, last name and phone number are required!'}), 400

    hashed_password = generate_password_hash(password, method='pbkdf2:sha256')
    try:
        query_db('''
            INSERT INTO users (email, password, first_name, last_name, phone) 
            VALUES (?, ?, ?, ?, ?)
        ''', [email, hashed_password, first_name, last_name, phone])
        
        return jsonify({'type': 'success', 'message': f'User {email} registered successfully!'}), 201
    except sqlite3.IntegrityError as e:
        return jsonify({'type': 'error', 'message': f'User with {email} already registered!'}), 400


@user_routes.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'type': 'error', 'message': 'Email and password are required!'}), 400

    user = query_db('SELECT * FROM users WHERE email = ?', [email], one=True)
    
    # user[2] is the password column
    if not user or not check_password_hash(user[2], password):
        return jsonify({'type': 'error', 'message': 'Invalid email or password!'}), 401

    token = generate_token(user[1])  # user[1] is the email column
    return jsonify({'type': 'success', 'message': token}), 200
