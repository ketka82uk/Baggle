from app import ma
from models.review import Review
from marshmallow import fields
from serializers.user import UserSchema

class ReviewSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Review
        load_instance = True
    
    author = fields.Nested(UserSchema(only=("username", "id")))
    user = fields.Nested(UserSchema(only=("username", "id")))