# from flask import Blueprint, request, g
# from models.item import Item
# from serializers.item_offer import OfferSchema
# from serializers.item import ItemSchema
# from decorators.secure_route import secure_route


# item_schema = ItemSchema()
# offer_schema = OfferSchema()

# router = Blueprint(__name__, "offers")





# @router.route("/offers", methods=["GET"])
# def get_all_items():
#     items = Item.query.all()
#     return offer_schema.jsonify(items, many=True), 200



# @router.route("/offers", methods=["POST"])
# @secure_route
# def post_item():
#     item_dict = request.json
#     try:
#         item = offer_schema.load(item_dict)
#         item.user = g.current_user.id
#     except ValidationError as e:
#         return {"errors": e.messages, "messages": "Too bad, something went wrong"}
#     item.save()
#     return offer_schema.jsonify(item), 200