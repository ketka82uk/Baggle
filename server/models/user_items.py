from app import db

user_items_join = db.Table('user_items_join',
    db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('item_id',db.Integer, db.ForeignKey('items.id'), primary_key=True)
)