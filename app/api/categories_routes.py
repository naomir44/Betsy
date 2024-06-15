from flask import Blueprint, request, jsonify, abort, current_app
from app.models import db, Category

categories_bp = Blueprint('categories', __name__)

@categories_bp.route('/')
def get_categories():
    categories = Category.query.all()
    return jsonify([category.to_dict() for category in categories])

@categories_bp.route('/<int:id>/')
def get_category(id):
    category = Category.query.get_or_404(id)
    return jsonify(category.to_dict())
