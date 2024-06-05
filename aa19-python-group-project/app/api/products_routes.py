from flask import Blueprint, request, jsonify, abort, current_app
from werkzeug.utils import secure_filename
from app.models import Product, Image, db
from flask_login import current_user, login_required
import os

products_bp = Blueprint('products', __name__)

def save_file(file):
    filename = secure_filename(file.filename)
    file_path = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
    file.save(file_path)
    return file_path

@products_bp.route('/')
def get_products():
    products = Product.query.all()
    return jsonify([product.to_dict() for product in products])

@products_bp.route('/<int:id>')
def get_product(id):
    product = Product.query.get_or_404(id)
    return jsonify(product.to_dict())

# @products_bp.route('/new', methods=["POST"])
# @login_required
# def create_product():
#     data = request.form
#     file = request.files.get('image')

#     if not data or not file:
#         abort(400, description='Invalid Data or No Image Uploaded')

#     file_path = save_file(file)

#     new_product = Product(
#         name=data.get('name'),
#         description=data.get('description'),
#         price=data.get('price'),
#         user_id=current_user.id,
#         image_url=file_path
#     )

#     db.session.add(new_product)
#     db.session.commit()
#     return jsonify(new_product.to_dict()), 201

@products_bp.route('/new', methods=["POST"])
@login_required
def create_product():
    data = request.form
    file = request.files.get('image')

    if not data or not file:
        abort(400, description='Invalid Data or No Image Uploaded')

    file_path = save_file(file)

    new_product = Product(
        name=data.get('name'),
        description=data.get('description'),
        price=data.get('price'),
        user_id=current_user.id
    )

    db.session.add(new_product)
    db.session.commit()

    new_image = Image(
        url=file_path,
        product_id=new_product.id
    )

    db.session.add(new_image)
    db.session.commit()

    return jsonify(new_product.to_dict()), 201

@products_bp.route('/<int:id>/edit', methods=['PUT'])
@login_required
def update_product(id):
    data = request.form
    file = request.files.get('image')
    product = Product.query.get_or_404(id)

    if product.user_id != current_user.id:
        abort(403, description="Not authorized to update this product")

    if not data:
        abort(400, description="Invalid data")

    product.name = data.get('name', product.name)
    product.description = data.get('description', product.description)
    product.price = data.get('price', product.price)

    if file:
        file_path = save_file(file)
        new_image = Image(
            url=file_path,
            product_id=product.id
        )
        db.session.add(new_image)

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


# @products_bp.route('/<int:id>/edit', methods=['PUT'])
# @login_required
# def update_product(id):
#     data = request.form
#     file = request.files.get('image')
#     product = Product.query.get_or_404(id)

#     if product.user_id != current_user.id:
#         abort(403, description="Not authorized to update this product")

#     if not data:
#         abort(400, description="Invalid data")

#     product.name = data.get('name', product.name)
#     product.description = data.get('description', product.description)
#     product.price = data.get('price', product.price)

#     if file:
#         file_path = save_file(file)
#         product.image_url = file_path

#     db.session.commit()
#     return jsonify(product.to_dict())

# @products_bp.route('/<int:id>/delete', methods=['DELETE'])
# @login_required
# def delete_product(id):
#     product = Product.query.get_or_404(id)

#     if product.user_id != current_user.id:
#         abort(403, description="Not authorized to delete this product")

#     db.session.delete(product)
#     db.session.commit()
#     return jsonify({"message": "Product deleted successfully"}), 200
