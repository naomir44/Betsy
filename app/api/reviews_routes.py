from flask import Blueprint, request, jsonify, abort
from app.models import Review, User, Product, db
from flask_login import login_required, current_user

reviews_bp = Blueprint('reviews', __name__)

@reviews_bp.route('/products/<int:product_id>/')
def get_reviews(product_id):
    reviews = Review.query.filter_by(product_id=product_id).all()
    return jsonify([review.to_dict() for review in reviews])

@reviews_bp.route('/products/<int:product_id>', methods=['POST'])
@login_required
def add_review(product_id):
    data = request.get_json()
    if not data or 'content' not in data or 'rating' not in data:
        abort(400, description="Invalid data")

    product = Product.query.get_or_404(product_id)
    new_review = Review(
        user_id=current_user.id,
        product_id=product.id,
        content=data['content'],
        rating=data['rating'],
        # created_at=data['created_at']
    )
    db.session.add(new_review)
    db.session.commit()
    return jsonify(new_review.to_dict()), 201

@reviews_bp.route('/<int:review_id>/', methods=['PUT'])
@login_required
def update_review(review_id):
    data = request.get_json()
    review = Review.query.get_or_404(review_id)

    if review.user_id != current_user.id:
        abort(403, description="Permission denied")

    if not data or 'content' not in data or 'rating' not in data:
        abort(400, description="Invalid data")

    review.content = data['content']
    review.rating = data['rating']
    db.session.commit()
    return jsonify(review.to_dict())

@reviews_bp.route('/<int:review_id>/', methods=['DELETE'])
@login_required
def delete_review(review_id):
    review = Review.query.get_or_404(review_id)

    if review.user_id != current_user.id:
        abort(403, description="Permission denied")

    db.session.delete(review)
    db.session.commit()
    return jsonify({"message": "Review deleted successfully"}), 200
