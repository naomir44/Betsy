from .db import db, environment, SCHEMA
# from .cart_items import CartItem
# from .user import User
# from .reviews import Review
# from .favorites import Favorite


class Product(db.Model):
    __tablename__ = 'products'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)
    price = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    image_id = db.Column(db.Integer, db.ForeignKey('images.id', ondelete='CASCADE'), nullable =False)

    users = db.relationship('User', back_populates='products')
    # images = db.relationship('Image', back_populates='products', foreign_keys='Image.product_id', cascade='all, delete-orphan')
    images = db.relationship('Image', back_populates='products', cascade='all, delete-orphan')
    reviews = db.relationship('Review', back_populates='products', cascade='all, delete-orphan')
    cart_items = db.relationship('CartItem', back_populates='products', cascade='all, delete-orphan')
    favorites = db.relationship('Favorite', back_populates='products', cascade='all, delete-orphan')

    def to_dict(self):
        return{
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'price': self.price,
            'user_id': self.user_id,
            'images': [image.to_dict() for image in self.images],
            'image_id': self.image_id
        }
