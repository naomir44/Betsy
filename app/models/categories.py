from .db import db, environment, SCHEMA

class Category(db.Model):
    __tablename__ = 'categories'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    imageUrl = db.Column(db.String, nullable=False)

    products = db.relationship('Product', back_populates='category')

    def to_dict(self):
        return{
            'id': self.id,
            'name': self.name,
            'imageUrl': self.imageUrl,
            'products': [product.to_dict() for product in self.products]
        }
