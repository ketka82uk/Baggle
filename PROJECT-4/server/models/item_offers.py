from app import db


item_offers_join = db.Table('item_offers_join',
    db.Column('item_id', db.Integer, db.ForeignKey('items.id'), primary_key=True),
    db.Column('offer_item',db.Integer, db.ForeignKey('items.id'), primary_key=True)
)