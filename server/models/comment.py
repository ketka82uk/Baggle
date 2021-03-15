from app import db
from models.base import BaseModel


class Comment(db.Model, BaseModel):

    __tablename__ = 'comments'
    id = db.Column(db.Integer, primary_key=True)
    
    content = db.Column(db.Text, nullable=False)

    item_id = db.Column(db.Integer, db.ForeignKey('items.id', ondelete="CASCADE"))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete="CASCADE"))
    

    

