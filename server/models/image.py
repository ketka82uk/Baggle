from app import db
from models.base import BaseModel

class Image(db.Model, BaseModel):

    __tablename__ = 'images'
    id = db.Column(db.Integer, primary_key=True)

    url = db.Column(db.Text, nullable=False)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'))


