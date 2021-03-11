from app import ma
from models.item import Item
# from serializers.user import UserSchema
from marshmallow import fields
from serializers.user import UserSchema


class ItemSchema(ma.SQLAlchemyAutoSchema):
   
    class Meta:
        model = Item
        load_instance = True
    
<<<<<<< HEAD
    user = fields.Nested(UserSchema(only=("name", "id")))
=======
    user = fields.Nested('UserSchema')
    comments = fields.Nested('CommentSchema', many=True)
    image = fields.Nested('ImageSchema')
>>>>>>> 3c0d73d91a172563d21981503565b25b2945afcc
    

