from app import ma
from models.image import Image
from marshmallow import fields
from serializers.user import UserSchema

class ImageSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Image
        load_instance = True

    user = fields.Nested(UserSchema(only=("name", "id")))