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


@router.route("/swap/<int:item1_id>/<int:item2_id>", methods=["PUT"])
@secure_route
def swap_item(item1_id, item2_id):
    
    item1 = Item.query.get(item1_id)
    item2 = Item.query.get(item2_id)

    user1 = item1.owner
    user2 = item2.owner

    item2.owner = user1
    item1.owner = user2

    user1.successfull_trans = user1.successfull_trans + 1
    user2.successfull_trans = user2.successfull_trans + 1

    user1.save()
    user2.save()

    items = Item.query.all()

    return item_schema.jsonify(items, many=True), 201




    
    
    
    
    
@router.route('/swap/<int:user_id>/items/<int:item_id>', methods=["PUT"])
def add_item_to_wishlist(user_id, item_id):
    user = User.query.get(user_id)
    item = Item.query.get(item_id)
    user.offered.append(item)
    user.save()
    return user_schema.jsonify(user), 200

    
