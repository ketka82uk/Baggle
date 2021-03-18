from app import ma
from models.user import User
from models.item import Item
from models.review import Review
# from serializers.user import UserSchema
from marshmallow import fields 

class UserSchema(ma.SQLAlchemyAutoSchema):

    class Meta:
        model = User
        load_instance = True
        exclude = ('password_hash',)
        load_only = ('email', 'password')

    password = fields.String(required=True)
    inventory = fields.Nested('ItemSchema', only=('name', 'id', 'image', 'category', 'typeof', 'listed', 'wishlisted', 'comments', 'created_at', 'offers'), many=True)
    wishlist = fields.Nested('ItemSchema', only=('name', 'id', 'image', 'owner.username', 'owner.location', 'comments', 'created_at', 'wishlisted'), many=True)
    comments = fields.Nested('CommentSchema', many=True)
    follows = fields.Nested('UserSchema', only=('username', 'id', 'location', 'image', 'profile_image'), many=True)
    followers = fields.Nested('UserSchema', only=('username', 'id', 'location', 'image', 'profile_image'), many=True)
    # reviews = fields.Nested('ReviewSchema', many=True)
    # offered = fields.Nested('ItemSchema', many=True)
    offered = fields.Nested('ItemSchema', only=('name', 'id', 'image', 'owner.username', 'owner.location', 'comments', 'created_at'), many=True)

    user_reviews = fields.Nested('ReviewSchema', many=True)
    other_reviews = fields.Nested('ReviewSchema', many=True)

    userReviews = fields.Nested('ReviewSchema', many=True)
    yourReviews = fields.Nested('ReviewSchema', many=True)