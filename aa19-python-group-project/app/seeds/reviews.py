from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text

def seed_reviews():
    review1 = Review(
        content='Absolutely love this wooden bowl! The craftsmanship is superb.',
        rating=5,
        user_id=2,
        product_id=1
    )
    review2 = Review(
        content='The leather wallet is of great quality, but the delivery took longer than expected.',
        rating=4,
        user_id=3,
        product_id=2
    )
    review3 = Review(
        content='The ceramic vase is beautiful and exactly as described. Very happy with my purchase.',
        rating=5,
        user_id=1,
        product_id=3
    )
    review4 = Review(
        content='The knitted scarf is warm and cozy, but the color was slightly different than the picture.',
        rating=4,
        user_id=2,
        product_id=4
    )
    review5 = Review(
        content='The soy wax candle smells wonderful and burns evenly. Will definitely buy again!',
        rating=5,
        user_id=3,
        product_id=5
    )

    db.session.add(review1)
    db.session.add(review2)
    db.session.add(review3)
    db.session.add(review4)
    db.session.add(review5)

    db.session.commit()

def undo_reviews():
  if environment == "production":
    db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
  else:
    db.session.execute(text("DELETE FROM reviews"))

  db.session.commit()
