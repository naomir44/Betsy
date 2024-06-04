from flask import Blueprint, request, jsonify
from app.models import Favorite, db

favorites_bp = Blueprint('favorites', __name__)

@favorites_bp.route('/')
def get_favorites():
    favorites = Favorite.query.all()
    return jsonify([fav.to_dict() for fav in favorites])
