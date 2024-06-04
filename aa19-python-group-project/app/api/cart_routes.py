from flask import Blueprint, request, jsonify
from app.models import CartItem, db

cart_bp = Blueprint('cart', __name__)

@cart_bp.route('/')
def get_cart_items():
    cart_items = CartItem.query.all()
    return jsonify([item.to_dict() for item in cart_items])

@cart_bp.route('/', methods=['POST'])
def add_to_cart():
    data = request.get_json()
    new_item = CartItem(**data)
    db.session.add(new_item)
    db.session.commit()
    return jsonify(new_item.to_dict()), 201

@cart_bp.route('/<int:item_id>', methods=['DELETE'])
def remove_from_cart(item_id):
    item = CartItem.query.get_or_404(item_id)
    db.session.delete(item)
    db.session.commit()
    return '', 204

@cart_bp.route('/checkout', methods=['POST'])
def checkout():
    # Logic for completing the purchase
    return 'Transaction complete', 200
