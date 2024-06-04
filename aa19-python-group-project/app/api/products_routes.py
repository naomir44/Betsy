from flask import Blueprint, request, jsonify, abort
from app.models import Product, db

products_bp = Blueprint('products', __name__)

@products_bp.route('/')
def get_products():
    products = Product.query.all()
    return jsonify([product.to_dict() for product in products])

@products_bp.route('/<int:id>')
def get_product(id):
    product = Product.query.get_or_404(id)
    return jsonify(product.to_dict())

@products_bp.route('/new', methods=["POST"])
def create_product():
    data = request.get_json()
    if not data:
        abort(400, description='Invalid Data')
    new_product = Product(
        name=data.get('name'),
        description=data.get('description'),
        price=data.get('price')
    )
    db.session.add(new_product)
    db.session.commit()
    return jsonify(new_product.to_dict()), 201

@products_bp.route('/<int:id>/edit', methods=['PUT'])
def update_product(id):
    data = request.get_json()
    product = Product.query.get_or_404(id)
    if not data:
        abort(400, description="Invalid data")
    product.name = data.get('name', product.name)
    product.description = data.get('description', product.description)
    product.price = data.get('price', product.price)
    db.session.commit()
    return jsonify(product.to_dict())

@products_bp.route('/<int:id>/delete', methods=['DELETE'])
def delete_product(id):
    product = Product.query.get_or_404(id)
    db.session.delete(product)
    db.session.commit()
    return jsonify({"message": "Product deleted successfully"}), 200
