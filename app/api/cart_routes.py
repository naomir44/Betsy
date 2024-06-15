from flask import Blueprint, request, jsonify, abort
from app.models import User, Product, CartItem, db
from flask_login import current_user, login_required

cart_items_bp = Blueprint('cart_items', __name__)

@cart_items_bp.route('/', methods=['GET'])
@login_required
def get_cart_items():
    user_id = current_user.id
    cart_items = CartItem.query.filter_by(user_id=user_id).all()
    items = [item.to_dict() for item in cart_items]
    return jsonify(items)

@cart_items_bp.route('/', methods=['POST'])
@login_required
def add_cart_item():
    data = request.get_json()
    if not data or 'product_id' not in data or 'quantity' not in data:
        abort(400, description="Invalid data")

    product = Product.query.get_or_404(data['product_id'])

    existing_item = CartItem.query.filter_by(user_id=current_user.id, product_id=data['product_id']).first()
    if existing_item:
        existing_item.quantity += data['quantity']
    else:
        new_item = CartItem(
            user_id=current_user.id,
            product_id=data['product_id'],
            quantity=data['quantity']
        )
        db.session.add(new_item)

    db.session.commit()
    return jsonify({"message": "Item added to cart"}), 201

@cart_items_bp.route('/<int:item_id>/', methods=['PUT'])
@login_required
def update_cart_item(item_id):
    data = request.get_json()
    cart_item = CartItem.query.get_or_404(item_id)

    if cart_item.user_id != current_user.id:
        abort(403, description="Permission denied")

    if not data or 'quantity' not in data:
        abort(400, description="Invalid data")

    cart_item.quantity = data['quantity']
    db.session.commit()
    return jsonify(cart_item.to_dict())

@cart_items_bp.route('/<int:item_id>/', methods=['DELETE'])
@login_required
def delete_cart_item(item_id):
    cart_item = CartItem.query.get_or_404(item_id)

    if cart_item.user_id != current_user.id:
        abort(403, description="Permission denied")

    db.session.delete(cart_item)
    db.session.commit()
    return jsonify({"message": "Item removed from cart"}), 200
