from flask import Flask
from flask_mysqldb import MySQL
from config import Config
from flask_cors import CORS

mysql = MySQL()

def create_app():
    app = Flask(__name__)
    CORS(app, resources={r"/*":{"origins":"*"}})
    app.config.from_object(Config)
    mysql.init_app(app)

    from routes import main
    app.register_blueprint(main)

    return app
