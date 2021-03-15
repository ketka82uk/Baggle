from app import ma
from models.user import User
from models.item import Item
from marshmallow import fields 

class UserSchema(ma.SQLAlchemyAutoSchema):

    class Meta:
        model = User
        load_instance = True
        exclude = ('password_hash',)
        load_only = ('email', 'password')

    password = fields.String(required=True)
    inventory = fields.Nested('ItemSchema', only=('name', 'id', 'image', 'category', 'typeof', 'listed', 'wishlisted', 'comments', 'created_at'), many=True)
    wishlist = fields.Nested('ItemSchema', only=('name', 'id', 'image', 'owner.username', 'owner.location', 'comments', 'created_at', 'wishlisted'), many=True)
    comments = fields.Nested('CommentSchema', many=True)
    # offered = fields.Nested('ItemSchema', many=True)
    