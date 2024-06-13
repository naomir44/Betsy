from app.models import db, Image, environment, SCHEMA
from sqlalchemy.sql import text

def seed_images():
    image1 = Image(
        url='https://samsclub13.s3.us-west-2.amazonaws.com/wooden-bowl.jpeg',
        product_id=1
    )
    image2 = Image(
        url='https://samsclub13.s3.us-west-2.amazonaws.com/leather-wallet.jpeg',
        product_id=2
    )
    image3 = Image(
        url='https://samsclub13.s3.us-west-2.amazonaws.com/ceramic-vase.jpeg',
        product_id=3
    )
    image4 = Image(
        url='https://samsclub13.s3.us-west-2.amazonaws.com/knitted-scarf.jpeg',
        product_id=4
    )
    image5 = Image(
        url='https://samsclub13.s3.us-west-2.amazonaws.com/candle.jpeg',
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
