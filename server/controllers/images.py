from flask import Blueprint, jsonify, request
from models.image import Image
from serializers.image import ImageSchema
from marshmallow.exceptions import ValidationError

router = Blueprint(__name__, 'images')
image_schema = ImageSchema()

#GET all images

@router.route("/images", methods=["GET"])
def get_images():
    images = Image.query.all()
    return image_schema.jsonify(images, many=True), 200


#GET individual image

@router.route('/images/<int:id>', methods=['GET'])
def get_single_image(id):
    image = Image.query.get(id)
    if not Image:
        return jsonify({'message': 'Image not found'}), 404
    return image_schema.jsonify(image), 200


#POST image

@router.route('/images', methods=['POST'])
def create_image():
    image_dict = request.json
    try:
        image = image_schema.load(image_dict)
    except ValidationError as e:
        return { 'errors': e.messages, 'messages': 'Something went wrong' }
    image.save()
    return image_schema.jsonify(image), 200

#PUT image

@router.route("/images/<int:image_id>", methods=["PUT"])
def update_image(image_id):
    existing_image = Image.query.get(image_id)
    image_dict = request.json
    try:
        image = image_schema.load(
            image_dict,
            instance=existing_image,
            partial=True,
        )
    except ValidationError as e:
        return {"errors": e.messages, "messages": "Something went wrong"}
    image.save()
    return image_schema.jsonify(image), 201

#DELETE image

@router.route("/images/<int:image_id>", methods=["DELETE"])
def delete_image(image_id):
    image = Image.query.get(image_id)
    image.remove()
    return {'message': '💀 Image deleted'}, 200

