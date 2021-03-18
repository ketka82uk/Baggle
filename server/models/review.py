from app import db
from models.base import BaseModel
from sqlalchemy.orm import relationship


class Review(db.Model, BaseModel):

    __tablename__ = 'reviews'
    id = db.Column(db.Integer, primary_key=True)
    
    content = db.Column(db.Text, nullable=False)
    rating = db.Column(db.Integer, nullable=True)

    author_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete="CASCADE"))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete="CASCADE"))

    