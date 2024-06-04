from flask import Blueprint, request, jsonify
from app.models import Review, db

reviews_bp = Blueprint('reviews', __name__)

@reviews_bp.route('/products/<int:product_id>/reviews')
def get_reviews(product_id):
    reviews = Review.query.filter_by(product_id=product_id).all()
    return jsonify([review.to_dict() for review in reviews])

@reviews_bp.route('/products/<int:product_id>/reviews', methods=['POST'])
def create_review(product_id):
    data = request.get_json()
    new_review = Review(product_id=product_id, **data)
    db.session.add(new_review)
    db.session.commit()
    return jsonify(new_review.to_dict()), 201

@reviews_bp.route('/<int:review_id>', methods=['PUT'])
def update_review(review_id):
    data = request.get_json()
    review = Review.query.get_or_404(review_id)
    for key, value in data.items():
        setattr(review, key, value)
    db.session.commit()
    return jsonify(review.to_dict())

@reviews_bp.route('/<int:review_id>', methods=['DELETE'])
def delete_review(review_id):
    review = Review.query.get_or_404(review_id)
    db.session.delete(review)
    db.session.commit()
    return '', 204
