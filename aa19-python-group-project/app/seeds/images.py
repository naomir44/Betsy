from app.models import db, Image, environment, SCHEMA
from sqlalchemy.sql import text

def seed_images():
    image1 = Image(
        url='https://your-bucket-name.s3.amazonaws.com/images/handmade_wooden_bowl.jpg',
        product_id=1
    )
    image2 = Image(
        url='https://your-bucket-name.s3.amazonaws.com/images/custom_leather_wallet.jpg',
        product_id=2
    )
    image3 = Image(
        url='https://your-bucket-name.s3.amazonaws.com/images/ceramic_vase.jpg',
        product_id=3
    )
    image4 = Image(
        url='https://your-bucket-name.s3.amazonaws.com/images/knitted_scarf.jpg',
        product_id=4
    )
    image5 = Image(
        url='https://your-bucket-name.s3.amazonaws.com/images/soy_wax_candle.jpg',
        product_id=5
    )

    db.session.add(image1)
    db.session.add(image2)
    db.session.add(image3)
    db.session.add(image4)
    db.session.add(image5)

    db.session.commit()

def undo_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM images"))

    db.session.commit()
