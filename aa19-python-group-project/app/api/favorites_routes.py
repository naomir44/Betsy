from flask import Blueprint, request, jsonify
from app.models import Favorite, db

favorites_bp = Blueprint('favorites', __name__)

@favorites_bp.route('/')
def get_favorites():
    favorites = Favorite.query.all()
    return jsonify([fav.to_dict() for fav in favorites])

@favorites_bp.route('/', methods=['POST'])
def add_to_favorites():
    data = request.get_json()
    new_favorite = Favorite(**data)
    db.session.add(new_favorite)
    db.session.commit()
    return jsonify(new_favorite.to_dict()), 201

@favorites_bp.route('/<int:favorite_id>', methods=['DELETE'])
def remove_from_favorites(favorite_id):
    favorite = Favorite.query.get_or_404(favorite_id)
    db.session.delete(favorite)
    db.session.commit()
    return '', 204
