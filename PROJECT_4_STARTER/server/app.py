from flask import Flask
app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = db_URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

ma = Marshmallow(app)

bcrypt = Bcrypt(app)

@app.route('/api')
def index():
    return { 'message': "Hello, World!" }