from .db import db, environment, SCHEMA
# from .user import User
# from .products import Product

class Favorite(db.Model):
 __tablename__ = 'favorites'

if environment == "production":
      __table_args__ = {'schema': SCHEMA}

id = db.Column(db.Integer, primary_key=True)
user_id = db.Column(db.Integer, db.ForeignKey('users.id', onDelete='CASCADE'), nullable=False)
product_id = db.Column(db.Integer, db.ForeignKey('products.id', onDelete='CASCADE'), nullable=False)

user = db.relationship('User', back_populates='favorites')
product = db.relationship('Product', back_populates='favorites')
