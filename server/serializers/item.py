from app import ma
from models.item import Item
from marshmallow import fields
from serializers.user import UserSchema


class ItemSchema(ma.SQLAlchemyAutoSchema):
   
    class Meta:
        model = Item
        load_instance = True
    
    owner = fields.Nested('UserSchema')
    comments = fields.Nested('CommentSchema', many=True)
    
    
