from flask import Flask
from models.base import BaseModel
from models.user import User

class Image(db.Model):

    __tablename__ = 'images'

    url = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE')) 


