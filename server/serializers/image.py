from app import db, ma
from models.image import Image
from marshmallow import fields

class ImageSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Image
        load_instance = True

    user = fields.Nested('UserSchema')