from app import ma
from models.image import Image

class ImageSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Image
        load_instance = True