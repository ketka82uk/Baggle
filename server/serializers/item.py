from app import ma
from models.item import Item
from marshmallow import fields
from serializers.user import UserSchema


class ItemSchema(ma.SQLAlchemyAutoSchema):
   
    class Meta:
        model = Item
        load_instance = True
    
    owner = fields.Nested('UserSchema', only=('id', 'username', 'lat', 'lng'))
    comments = fields.Nested('CommentSchema', many=True)
    offers = fields.Nested(lambda: ItemSchema(exclude=('offers', 'sale_item'), only=('id', 'name', 'owner.id'), many=True))
    sale_item = fields.Nested(lambda: ItemSchema(exclude=('offers', 'sale_item'), only=('id', 'name', 'owner.id'), many=True))
    
    
