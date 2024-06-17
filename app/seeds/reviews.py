from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text

def seed_reviews():
    # Art
    review1 = Review(
        content='Absolutely love this abstract painting! It adds so much color to my living room.',
        rating=5,
        user_id=2,
        product_id=1
    )
    review2 = Review(
        content='The modern sculpture is stunning and well-crafted. Highly recommend!',
        rating=5,
        user_id=3,
        product_id=2
    )
    review3 = Review(
        content='The landscape photography is beautiful, but the frame was slightly damaged.',
        rating=4,
        user_id=1,
        product_id=3
    )

    # Jewelry
    review4 = Review(
        content='The silver pendant necklace is elegant and exactly as pictured. Love it!',
        rating=5,
        user_id=2,
        product_id=4
    )
    review5 = Review(
        content='The gold hoop earrings are beautiful but a bit smaller than expected.',
        rating=4,
        user_id=3,
        product_id=5
    )
    review6 = Review(
        content='The beaded bracelet is colorful and well-made. Great value for the price.',
        rating=5,
        user_id=1,
        product_id=6
    )

    # Home & Living
    review7 = Review(
        content='Absolutely love this wooden bowl! The craftsmanship is superb.',
        rating=5,
        user_id=2,
        product_id=7
    )
    review8 = Review(
        content='The soy wax candle smells wonderful and burns evenly. Will definitely buy again!',
        rating=5,
        user_id=3,
        product_id=8
    )
    review9 = Review(
        content='The ceramic vase is beautiful and exactly as described. Very happy with my purchase.',
        rating=5,
        user_id=1,
        product_id=9
    )

    # Toys
    review10 = Review(
        content='My child loves the stuffed animal bear. It’s very soft and cuddly.',
        rating=5,
        user_id=2,
        product_id=10
    )
    review11 = Review(
        content='The wooden puzzle is great for my toddler. Keeps them entertained for hours.',
        rating=5,
        user_id=3,
        product_id=11
    )
    review12 = Review(
        content='The toy train set is a classic. My kids have a lot of fun with it.',
        rating=5,
        user_id=1,
        product_id=12
    )

    # Vintage
    review13 = Review(
        content='The vintage vinyl record is in great condition. Brings back a lot of memories.',
        rating=5,
        user_id=2,
        product_id=13
    )
    review14 = Review(
        content='The antique pocket watch is a beautiful piece, but it needed some cleaning.',
        rating=4,
        user_id=3,
        product_id=14
    )
    review15 = Review(
        content='The retro camera is in good working condition. Very happy with my purchase.',
        rating=5,
        user_id=1,
        product_id=15
    )

    # Clothing
    review16 = Review(
        content='The knitted scarf is warm and cozy, but the color was slightly different than the picture.',
        rating=4,
        user_id=2,
        product_id=16
    )
    review17 = Review(
        content='The denim jacket fits perfectly and has a great vintage look. Love it!',
        rating=5,
        user_id=3,
        product_id=17
    )
    review18 = Review(
        content='The summer dress is light and breezy, perfect for warm weather.',
        rating=5,
        user_id=1,
        product_id=18
    )

    db.session.add(review1)
    db.session.add(review2)
    db.session.add(review3)
    db.session.add(review4)
    db.session.add(review5)
    db.session.add(review6)
    db.session.add(review7)
    db.session.add(review8)
    db.session.add(review9)
    db.session.add(review10)
    db.session.add(review11)
    db.session.add(review12)
    db.session.add(review13)
    db.session.add(review14)
    db.session.add(review15)
    db.session.add(review16)
    db.session.add(review17)
    db.session.add(review18)

    db.session.commit()

def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
