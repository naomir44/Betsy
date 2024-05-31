from .db import db, environment, SCHEMA
# from .user import User
# from .products import Product

class Review(db.Model):
  __tablename__ = 'reviews'

  if environment == "production":
      __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  content = db.Column(db.String, nullable=False)
  rating = db.Column(db.Integer ,nullable=False)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
  product_id = db.Column(db.Integer, db.ForeignKey('products.id' ondelete='CASCADE'), nullable=False)

  user = db.relationship('User', back_populates='reviews')
  product = db.relationship('Product', back_populates='reviews')
