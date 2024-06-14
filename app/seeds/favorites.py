from app.models import db, Favorite, environment, SCHEMA
from sqlalchemy.sql import text

def seed_favorites():
    favorite1 = Favorite(
        user_id=1,
        product_id=2
    )
    favorite2 = Favorite(
        user_id=2,
        product_id=3
    )
    favorite3 = Favorite(
        user_id=3,
        product_id=1
    )
    favorite4 = Favorite(
        user_id=1,
        product_id=4
    )
    favorite5 = Favorite(
        user_id=2,
        product_id=5
    )

    db.session.add(favorite1)
    db.session.add(favorite2)
    db.session.add(favorite3)
    db.session.add(favorite4)
    db.session.add(favorite5)

    db.session.commit()

def undo_favorites():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.favorites RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM favorites"))

    db.session.commit()
