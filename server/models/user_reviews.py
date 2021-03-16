from app import db

user_reviews_join = db.Table('user_reviews',
    db.Column('author_id', db.Integer, db.ForeignKey('user.id'), primary_key=True),
    db.Column('user_id', db.Integer, db.ForeignKey('user.id'), primary_key=True)
)