from flask import Blueprint, request, jsonify
from app.models import Review, db

reviews_bp = Blueprint('reviews', __name__)

@reviews_bp.route('/products/<int:product_id>/reviews')
def get_reviews(product_id):
    reviews = Review.query.filter_by(product_id=product_id).all()
    return jsonify([review.to_dict() for review in reviews])
