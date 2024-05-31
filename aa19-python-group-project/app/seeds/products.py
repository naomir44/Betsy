from app.models import db, Product, environment, SCHEMA
from sqlalchemy.sql import text

def seed_products():
    product1 = Product(
        name='Handmade Wooden Bowl',
        description='A beautiful handmade wooden bowl crafted from oak.',
        price=2500,
        user_id=1,
        image_id=1
    )
    product2 = Product(
        name='Custom Leather Wallet',
        description='A personalized leather wallet with initials embossed.',
        price=1500,
        user_id=2,
        image_id=2
    )
    product3 = Product(
        name='Ceramic Vase',
        description='A hand-painted ceramic vase with floral designs.',
        price=3000,
        user_id=1,
        image_id=3
    )
    product4 = Product(
        name='Knitted Scarf',
        description='A cozy knitted scarf made from wool.',
        price=1200,
        user_id=3,
        image_id=4
    )
    product5 = Product(
        name='Soy Wax Candle',
        description='A fragrant soy wax candle with lavender scent.',
        price=800,
        user_id=2,
        image_id=5
    )

    db.session.add(product1)
    db.session.add(product2)
    db.session.add(product3)
    db.session.add(product4)
    db.session.add(product5)

    db.session.commit()

def undo_products():
  if environment == "production":
    db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
  else:
    db.session.execute(text("DELETE FROM products"))

    db.session.commit()
