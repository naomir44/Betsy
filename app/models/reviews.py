from .db import db, environment, SCHEMA, add_prefix_for_prod
# from .user import User
# from .products import Product
from datetime import datetime

class Review(db.Model):
  __tablename__ = 'reviews'

  if environment == "production":
      __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  content = db.Column(db.String, nullable=False)
  rating = db.Column(db.Integer, nullable=False)
  created_at = db.Column(db.DateTime, default=datetime.now)
  updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)
  user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'), ondelete='CASCADE'), nullable=False)
  product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('products.id'), ondelete='CASCADE'), nullable=False)

  users = db.relationship('User', back_populates='reviews')
  products = db.relationship('Product', back_populates='reviews')

  def to_dict(self):
        return {
            'id': self.id,
            'content': self.content,
            'rating': self.rating,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'user_id': self.user_id,
            'product_id': self.product_id
        }
