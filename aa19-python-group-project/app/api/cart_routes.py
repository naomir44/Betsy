from flask import Blueprint, request, jsonify
from app.models import CartItem, db

cart_bp = Blueprint('cart', __name__)

@cart_bp.route('/')
def get_cart_items():
    cart_items = CartItem.query.all()
    return jsonify([item.to_dict() for item in cart_items])
