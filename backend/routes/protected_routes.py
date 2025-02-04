from flask import Blueprint, jsonify
from auth import token_required
from database import query_db

protected_routes = Blueprint('protected_routes', __name__)

@protected_routes.route('/user', methods=['GET'])
@token_required
def user(current_user):
    user = query_db('SELECT * FROM users WHERE email = ?', [current_user[1]], one=True) # user[1] is the email column
    if not user:
        return jsonify({'type': 'error', 'message': 'User not found!'}), 404
    
    user_first_name = user[3]
    return jsonify({'type': 'success', 'message': {'first_name': user_first_name}}), 200
