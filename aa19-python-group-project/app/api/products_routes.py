from flask import Blueprint, request, jsonify
from app.models import Product, db

products_bp = Blueprint('products', __name__)

@products_bp.route('/')
def get_products():
    products = Product.query.all()
    return jsonify([product.to_dict() for product in products])
