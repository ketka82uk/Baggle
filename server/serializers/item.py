from app import ma
from models.item import Item
# from serializers.user import UserSchema
from marshmallow import fields


class ItemSchema(ma.SQLAlchemyAutoSchema):
   
    class Meta:
        model = Item
        load_instance = True
    
    user = fields.Nested('UserSchema')
    comments = fields.Nested('CommentSchema', many=True)
    image = fields.Nested('ImageSchema')
    

