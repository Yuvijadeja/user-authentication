from functools import wraps
from flask import request, jsonify
import jwt
from config import Config
from database import query_db
import datetime

def token_required(f):
    """Decorator to check for a valid JWT token."""
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('x-access-token')
        if not token:
            return jsonify({'type': 'error', 'message': 'Token is missing!'}), 401
        try:
            data = jwt.decode(token, Config.SECRET_KEY, algorithms=["HS256"])
            current_user = query_db('SELECT * FROM users WHERE email = ?', [data['username']], one=True)
            if not current_user:
                raise ValueError("User does not exist")
        except Exception as e:
            return jsonify({'type': 'error', 'message': 'Token is invalid!'}), 401
        return f(current_user, *args, **kwargs)
    return decorated

def generate_token(username):
    """Generate a JWT token for the given username."""
    return jwt.encode({
        'username': username,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(days=30)
    }, Config.SECRET_KEY, algorithm="HS256")
