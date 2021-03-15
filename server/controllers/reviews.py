from flask import Blueprint, request, g
from models.user import User
from serializers.user import UserSchema
from models.item import Item
from models.comment import Comment
from serializers.comment import CommentSchema
from models.review import Review
from serializers.review import ReviewSchema
from marshmallow.exceptions import ValidationError
from decorators.logger import logger
from decorators.secure_route import secure_route

user_schema = UserSchema()
comment_schema = CommentSchema()
review_schema = ReviewSchema()

router = Blueprint(__name__, "reviews")


@router.route("users/<int:user_id>/review", methods=["POST"])
@secure_route
def create_review(user_id):
    review_dictionary = request.json
    user = User.query.get(user_id)
    author = g.current_user
    try:
        review = review_schema.load(review_dictionary)
        review.user = user
        review.author = author
    except ValidationError as e:
        return {"errors": e.messages, "message": "Something went wrong"}
    review.save()
    return review_schema.jsonify(review)
