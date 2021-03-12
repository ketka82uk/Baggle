from app import db

user_follows_join = db.Table('user_follows_join',
    db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('followed_user',db.Integer, db.ForeignKey('users.id'), primary_key=True)
)