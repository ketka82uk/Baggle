from app import db
from models.base import BaseModel


class Review(db.Model, BaseModel):

    __tablename__ = 'reviews'
    id = db.Column(db.Integer, primary_key=True)
    
    content = db.Column(db.Text, nullable=False)
    positive_rating = db.Column(db.Boolean, nullable=True)
    negative_rating = db.Column(db.Boolean, nullable=True)

    author_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete="CASCADE"))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete="CASCADE"))
    