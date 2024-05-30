from .db import db, environment, SCHEMA


class Product(db.Model):
    __tablename__ = 'products'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    desription = db.Column(db.String, nullable=False)
    price = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), nullable=False)

    user = db.relationship('User', back_populates='products')
    review = db.relationship('Review', back_populates='products', cascade='all, delete-orphan')
    cart_item = db.relationship('CartItem', back_populates='products', cascade='all, delete-orphan')
    favorite = db.relationship('Favorite', back_populates='products', cascade='all, delete-orphan')
