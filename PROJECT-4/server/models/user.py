from app import db, bcrypt
from models.base import BaseModel
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import validates

import jwt
from datetime import *
from config.environment import secret

class User(db.Model, BaseModel):

    __tablename__ = 'users'

    username = db.Column(db.String(20), nullable=False, unique=True)
    email = db.Column(db.Text, nullable=False, unique=True)

    @validates('email')
    def validate_email(self, key, email):
        # assert '@' in email
        return email
    
    name = db.Column(db.String(100), nullable=False, unique=False)
    bio = db.Column(db.Text, nullable=True, unique=False)
    location = db.Column(db.Text, nullable=True, unique=False)
    rating = db.Column(db.Integer, nullable=True, unique=False)
    inventory = db.relationship('Item', backref='owner', cascade='all, delete')
    image = db.Column(db.Text, nullable=True, unique=False)
    barter_number = db.Column(db.Integer, nullable=True, unique=False)
    successfull_trans = db.Column(db.Integer, nullable=True, unique=False)
    failed_trans = db.Column(db.Integer, nullable=True, unique=False)

    password_hash = db.Column(db.String(128), nullable=True)

     @hybrid_property
    def password(self):
        pass

    @password.setter
    def password(self, password_plaintext):
        encoded_pw = bcrypt.generate_password_hash(password_plaintext)
        self.password_hash = encoded_pw.decode('utf-8')


    def validate_password(self, password_plaintext):
        # returns True/False
        return bcrypt.check_password_hash(self.password_hash, password_plaintext)

    def generate_token(self):
        payload = {
            # sub is user_id
            "sub": self.id,
            # Current time when the token is created
            "iat": datetime.utcnow(),
            # Expiry time
            "exp": datetime.utcnow() + timedelta(days=1)
        }

        token = jwt.encode(payload, secret, 'HS256')

        return token
