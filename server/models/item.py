from app import db
from models.base import BaseModel
from models.item_offers import item_offers_join
from models.comment import Comment


class Item(db.Model, BaseModel):

    # * You need this __tablename__ field. It's used by SA.
    __tablename__ = 'items'

    # ? nullable=False means it's required.
    # ? unique=True means its unique.
    name = db.Column(db.String(40), nullable=False, unique=True)
    typeof = db.Column(db.String(40), nullable=False)
    category = db.Column(db.String(40), nullable=False)
    image = db.Column(db.Text, nullable=False)
    description = db.Column(db.Text, nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete="CASCADE"))
    private = db.Column(db.Boolean, nullable=False)
    available = db.Column(db.Boolean, nullable= False)

    

<<<<<<< HEAD:server/models/item.py
    # offers = db.relationship(
    #     'Item', 
    #     backref='sale_item',
    #     secondary= item_offers_join,
    #     primaryjoin=id== item_offers_join.c.offer_item,
    #     secondaryjoin=id== item_offers_join.c.item_id)
=======
    offers = db.relationship('Item', backref='sale_item',
    primaryjoin=id== item_offers_join.c.offer_item,
    secondary=id== item_offers_join.c.item_id)
    comments = db.relationship('Comment', backref='item', cascade="all, delete")


    # secondary= item_offers_join,
>>>>>>> development:PROJECT_4_STARTER/server/models/items.py
