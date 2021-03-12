from flask import Blueprint, request
from models.user import User
from serializers.user import UserSchema
from marshmallow.exceptions import ValidationError
from decorators.logger import logger
from decorators.secure_route import secure_route

user_schema = UserSchema()

router = Blueprint(__name__, "users")


@router.route("/signup", methods=["POST"])
@logger
def signup():
    try:
        user = user_schema.load(request.json)
    except ValidationError as e:
        user.save()
    return user_schema.jsonify(user)


@router.route("/login", methods=["POST"])
@logger

def login():
    user = User.query.filter_by(email=request.json['email']).first()
    if not user:
        return { "message": "No user found with that email..." }

    if not user.validate_password(request.json['password']):
        return { "message": "Unauthorized" }

    token = user.generate_token()
    return { "token": token, "message": "login successfull" }


@router.route("/users", methods=["GET"])
@logger
def get_all_users():
    try:
        users = User.query.all()
    except ValidationError as e:
        return { "errors": e.messages, "messages": "Something went wrong" }
    return user_schema.jsonify(users, many=True), 200


@router.route("/users/<int:user_id>", methods=["GET"])
@logger
def get_single_user(user_id):
    try:
        user = User.query.get(user_id)
    except ValidationError as e:
        return { "errors": e.messages, "messages": "Something went wrong" }
    return user_schema.jsonify(user), 200


@router.route("/users/<int:item_id>", methods=["PUT"])
@secure_route
def update_user(user_id):
    existing_item = User.query.get(user_id)
    user_dict = request.json
    try:
        user = user_schema.load(user_dict, instance=existing_item, partial=True)

    except ValidationError as e:
        return { "errors": e.messages, "messages": "Too bad, something went wrong" }

    user.save()
    return user_schema.jsonify(user), 201


@router.route("/users/<int:user_id>", methods=["DELETE"])
@secure_route
@logger
def delete_user(user_id):
    try:
        user = User.query.get(user_id)
        user.remove()
    except ValidationError as e:
        return { "errors": e.messages, "messages": "Something went wrong" }
    return { 'message': 'User deleted successfully' }, 200


@router.route('/profile', methods=['GET'])
@secure_route
def get_user_profile():
    return user_schema.jsonify(g.current_user)
