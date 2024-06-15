from flask import Blueprint, request, jsonify, abort
from app.models import Favorite, Product, User, db
from flask_login import login_required, current_user

favorites_bp = Blueprint('favorites', __name__)

@favorites_bp.route('/')
@login_required
def get_favorites():
    user_id = current_user.id
    favorites = Favorite.query.filter_by(user_id=user_id).all()
    products = [favorite.products.to_dict() for favorite in favorites]
    return jsonify(products)

@favorites_bp.route('/new/<int:id>/', methods=['POST'])
@login_required
def add_favorite(product_id):
    user_id = current_user.id
    product = Product.query.get_or_404(product_id)

    existing_favorite = Favorite.query.filter_by(user_id=user_id, product_id=product_id).first()
    if existing_favorite:
        abort(400, description="Product is already in favorites")

    new_favorite = Favorite(user_id=user_id, product_id=product_id)
    db.session.add(new_favorite)
    db.session.commit()
    return jsonify({'message': 'Product added to favorites'}), 201

@favorites_bp.route('/<int:product_id>/', methods=['DELETE'])
@login_required
def remove_favorite(product_id):
    user_id = current_user.id
    favorite = Favorite.query.filter_by(user_id=user_id, product_id=product_id).first()
    if not favorite:
        abort(404, description="Favorite not found")

    db.session.delete(favorite)
    db.session.commit()
    return jsonify({"message": "Product removed from favorites"}), 200
