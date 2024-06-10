from app.models import db, Category, environment, SCHEMA
from sqlalchemy.sql import text


def seed_categories():
    cat1 = Category(
        name='Art',
        imageUrl='https://samsclub13.s3.us-west-2.amazonaws.com/art-pic.jpeg'
    )
    cat2 = Category(
        name='Clothing',
        imageUrl='https://samsclub13.s3.us-west-2.amazonaws.com/clothing.jpeg'
    )
    cat3 = Category(
        name='Jewelry',
        imageUrl='https://samsclub13.s3.us-west-2.amazonaws.com/jewelry.jpeg'
    )
    cat4 = Category(
        name='Home & Living',
        imageUrl='https://samsclub13.s3.us-west-2.amazonaws.com/home-living.jpeg'
    )
    cat5 = Category(
        name='Toys',
        imageUrl='https://samsclub13.s3.us-west-2.amazonaws.com/toys.jpeg'
    )
    cat6 = Category(
        name='Vintage',
        imageUrl='https://samsclub13.s3.us-west-2.amazonaws.com/vintage.jpeg'
    )
    db.session.add(cat1)
    db.session.add(cat2)
    db.session.add(cat3)
    db.session.add(cat4)
    db.session.add(cat5)
    db.session.add(cat6)
    db.session.commit()

def undo_categories():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.categories RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM categories"))

    db.session.commit()
