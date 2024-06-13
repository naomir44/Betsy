from .db import db, environment, SCHEMA
# from .user import User
# from .products import Product

class Favorite(db.Model):
      __tablename__ = 'favorites'

      if environment == "production":
            __table_args__ = {'schema': SCHEMA}

      id = db.Column(db.Integer, primary_key=True)
      user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
      product_id = db.Column(db.Integer, db.ForeignKey('products.id', ondelete='CASCADE'), nullable=False)

      users = db.relationship('User', back_populates='favorites')
      products = db.relationship('Product', back_populates='favorites')

      def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'product_id': self.product_id
        }
