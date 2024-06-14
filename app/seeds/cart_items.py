from app.models import db, CartItem, environment, SCHEMA
from sqlalchemy.sql import text

def seed_cart_items():
    cart_item1 = CartItem(
        user_id=1,
        product_id=2,
        quantity=2
    )
    cart_item2 = CartItem(
        user_id=2,
        product_id=3,
        quantity=1
    )
    cart_item3 = CartItem(
        user_id=3,
        product_id=1,
        quantity=4
    )
    cart_item4 = CartItem(
        user_id=1,
        product_id=5,
        quantity=3
    )
    cart_item5 = CartItem(
        user_id=2,
        product_id=4,
        quantity=2
    )

    db.session.add(cart_item1)
    db.session.add(cart_item2)
    db.session.add(cart_item3)
    db.session.add(cart_item4)
    db.session.add(cart_item5)

    db.session.commit()

def undo_cart_items():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.cart_items RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM cart_items"))

    db.session.commit()
