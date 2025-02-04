from flask import Flask
from flask_cors import CORS
from config import Config
from database import init_db
from routes import protected_routes, user_routes

# Initialize Flask app
app = Flask(__name__)
CORS(app)
app.config.from_object(Config)

# Initialize database
init_db()

# Register blueprints
app.register_blueprint(user_routes.user_routes)
app.register_blueprint(protected_routes.protected_routes)

if __name__ == '__main__':
    app.run(debug=True)
