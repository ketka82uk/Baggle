from app import db
from models.base import BaseModel
from models.item_offers import item_offers_join
from models.comment import Comment
from models.image import Image


class Item(db.Model, BaseModel):

    # * You need this __tablename__ field. It's used by SA.

    __tablename__ = 'items'

    # ? nullable=False means it's required.
    # ? unique=True means its unique.
    id = db.Column(db.Integer, primary_key=True)

    name = db.Column(db.String(100), nullable=False)
    typeof = db.Column(db.String(40), nullable=False)
    category = db.Column(db.String(40), nullable=False)
    description = db.Column(db.Text, nullable=True)
    private = db.Column(db.Boolean, nullable=False)
    available = db.Column(db.Boolean, nullable= False)

    offers = db.relationship(
        'Item', 
        backref='sale_item',
        secondary= item_offers_join,
        primaryjoin=id== item_offers_join.c.offer_item,
        secondaryjoin=id== item_offers_join.c.item_id)
    
    # ! One to many
    
    image = db.relationship('Image', backref='item', cascade="all, delete")
    comments = db.relationship('Comment', backref='item', cascade="all, delete")

    user = db.Column(db.Integer, db.ForeignKey('users.id', ondelete="CASCADE"))



