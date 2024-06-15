from flask import Blueprint, request, jsonify, abort, current_app
from werkzeug.utils import secure_filename
from app.models import Product, Image, db, Category
from flask_login import current_user, login_required
import os
from app.forms import ProductForm

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
@login_required
def create_product():
    data = request.get_json()

    if not data:
        abort(400, description="Invalid data")

    new_product = Product(
        name=data.get('name'),
        description=data.get('description'),
        price=data.get('price'),
        user_id=current_user.id,
        category_id=data.get('category_id')
        )
    db.session.add(new_product)
    db.session.commit()

    return jsonify(new_product.to_dict()), 201

@products_bp.route('/new/image', methods=["POST"])
@login_required
def create_image():
    data = request.get_json()

    new_image = Image(
        url=data.get('url'),
        product_id=data.get('product_id')
    )
    db.session.add(new_image)
    db.session.commit()
    return jsonify(new_image.to_dict()), 201


@products_bp.route('/<int:id>/edit', methods=['PUT'])
@login_required
def update_product(id):
    data = request.json
    product = Product.query.get_or_404(id)

    if product.user_id != current_user.id:
        abort(403, description="Not authorized to update this product")

    if not data:
        abort(400, description="Invalid data")

    product.name = data.get('name', product.name)
    product.description = data.get('description', product.description)
    product.price = data.get('price', product.price)
    product.category_id = data.get('category_id', product.category_id)

    db.session.commit()
    return jsonify(product.to_dict())

@products_bp.route('/<int:id>/delete', methods=['DELETE'])
@login_required
def delete_product(id):
    product = Product.query.get_or_404(id)

    if product.user_id != current_user.id:
        abort(403, description="Not authorized to delete this product")

    db.session.delete(product)
    db.session.commit()
    return jsonify({"message": "Product deleted successfully"}), 200
