from app import ma
from models.comment import Comment
from marshmallow import fields
from serializers.user import UserSchema

class CommentSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Comment
        load_instance = True
    
    user = fields.Nested(UserSchema(only=("username", "id")))