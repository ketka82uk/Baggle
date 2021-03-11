from flask import Blueprint, request, g
from models.item import Item
from serializers.item import ItemSchema
from models.comment import Comment
from serializers.user import UserSchema
from models.user import User
from decorators.logging import logging
from decorators.secure_route import secure_route
from decorators.time_taken import time_taken
from decorators.logging import logging

item_schema = ItemSchema()
user_schema = UserSchema()


router = Blueprint(__name__, "swap")


@router.route("/swap/<int:user_id>/<int:item_id>", methods=["PUT"])
@secure_route
def update_comment(item_id, user_id):
    
    item = Item.query.get(item_id)
    user = User.query.get(user_id)

    return item_schema.jsonify(item)
    
    
    
    
    
    
    
    # comment_dictionary = request.json
    # existing_comment = Comment.query.get(comment_id)
    # try:
    #     comment = comment_schema.load(
    #         comment_dictionary, instance=existing_comment, partial=True
    #     )
    # except ValidationError as e:
    #     return {"errors": e.messages, "messages": "Something went wrong"}
    # comment.save()
    # item = Item.query.get(item_id)
    # return item_schema.jsonify(item), 201