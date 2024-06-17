from app.models import db, Image, environment, SCHEMA
from sqlalchemy.sql import text

def seed_images():
    image1 = Image(
        url='https://samsclub13.s3.us-west-2.amazonaws.com/wooden-bowl.jpeg',
        product_id=7
    )
    image2 = Image(
        url='https://pyschguacbucket.s3.us-west-1.amazonaws.com/metal-sculpture.jpeg',
        product_id=2
    )
    image3 = Image(
        url='https://samsclub13.s3.us-west-2.amazonaws.com/ceramic-vase.jpeg',
        product_id=9
    )
    image4 = Image(
        url='https://samsclub13.s3.us-west-2.amazonaws.com/knitted-scarf.jpeg',
        product_id=16
    )
    image5 = Image(
        url='https://samsclub13.s3.us-west-2.amazonaws.com/candle.jpeg',
        product_id=8
    )
    image6 = Image(
        url='https://pyschguacbucket.s3.us-west-1.amazonaws.com/abstract-painting+.jpeg',
        product_id=1
    )
    image7 = Image(
        url='https://pyschguacbucket.s3.us-west-1.amazonaws.com/nature-photo.jpeg',
        product_id=3
    )
    image8 = Image(
        url='https://pyschguacbucket.s3.us-west-1.amazonaws.com/silver-pendant-necklace.jpeg',
        product_id=4
    )
    image9 = Image(
        url='https://pyschguacbucket.s3.us-west-1.amazonaws.com/gold-hoops.jpeg',
        product_id=5
    )
    image10 = Image(
        url='https://pyschguacbucket.s3.us-west-1.amazonaws.com/beaded-bracelet.jpeg',
        product_id=6
    )
    image11 = Image(
        url='https://pyschguacbucket.s3.us-west-1.amazonaws.com/stuffed-bear.jpeg',
        product_id=10
    )
    image12 = Image(
        url='https://pyschguacbucket.s3.us-west-1.amazonaws.com/wooden-puzzle.jpeg',
        product_id=11
    )
    image13 = Image(
        url='https://pyschguacbucket.s3.us-west-1.amazonaws.com/wooden-train-set.jpeg',
        product_id=12
    )
    image14 = Image(
        url='https://pyschguacbucket.s3.us-west-1.amazonaws.com/vintage-vinyls.jpeg',
        product_id=13
    )
    image15 = Image(
        url='https://pyschguacbucket.s3.us-west-1.amazonaws.com/vintage-pocketwatch.jpeg',
        product_id=14
    )
    image16 = Image(
        url='https://pyschguacbucket.s3.us-west-1.amazonaws.com/vintage-camera.jpeg',
        product_id=15
    )
    image17 = Image(
        url='https://pyschguacbucket.s3.us-west-1.amazonaws.com/jean-jacket.jpeg',
        product_id=17
    )
    image18 = Image(
        url='https://pyschguacbucket.s3.us-west-1.amazonaws.com/floral+dress.jpeg',
        product_id=18
    )




    db.session.add(image1)
    db.session.add(image2)
    db.session.add(image3)
    db.session.add(image4)
    db.session.add(image5)
    db.session.add(image6)
    db.session.add(image7)
    db.session.add(image8)
    db.session.add(image9)
    db.session.add(image10)
    db.session.add(image11)
    db.session.add(image12)
    db.session.add(image13)
    db.session.add(image14)
    db.session.add(image15)
    db.session.add(image16)
    db.session.add(image17)
    db.session.add(image18)


    db.session.commit()

def undo_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM images"))

    db.session.commit()
