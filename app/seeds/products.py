from app.models import db, Product, environment, SCHEMA
from sqlalchemy.sql import text

def seed_products():
    # Art
    product1 = Product(
        name='Abstract Painting',
        description='A colorful abstract painting on canvas.',
        price=4500,
        user_id=1,
        category_id=1
    )
    product2 = Product(
        name='Modern Sculpture',
        description='A contemporary metal sculpture for home decor.',
        price=8500,
        user_id=2,
        category_id=1
    )
    product3 = Product(
        name='Landscape Photography',
        description="A framed landscape photograph capturing nature’s beauty.",
        price=3500,
        user_id=3,
        category_id=1
    )

    # Jewelry
    product4 = Product(
        name='Silver Pendant Necklace',
        description='A delicate silver pendant necklace with a gemstone.',
        price=2000,
        user_id=1,
        category_id=3
    )
    product5 = Product(
        name='Gold Hoop Earrings',
        description='Elegant gold hoop earrings with a polished finish.',
        price=3000,
        user_id=2,
        category_id=3
    )
    product6 = Product(
        name='Beaded Bracelet',
        description='A handmade beaded bracelet with colorful beads.',
        price=1200,
        user_id=3,
        category_id=3
    )

    # Home & Living
    product7 = Product(
        name='Handmade Wooden Bowl',
        description='A beautiful handmade wooden bowl crafted from oak.',
        price=2500,
        user_id=1,
        category_id=4
    )
    product8 = Product(
        name='Soy Wax Candle',
        description='A fragrant soy wax candle with lavender scent.',
        price=800,
        user_id=2,
        category_id=4
    )
    product9 = Product(
        name='Ceramic Vase',
        description='A hand-painted ceramic vase with floral designs.',
        price=3000,
        user_id=1,
        category_id=4
    )

    # Toys
    product10 = Product(
        name='Stuffed Animal Bear',
        description='A soft and cuddly stuffed animal bear for kids.',
        price=1500,
        user_id=3,
        category_id=5
    )
    product11 = Product(
        name='Wooden Puzzle',
        description='An educational wooden puzzle for toddlers.',
        price=1200,
        user_id=2,
        category_id=5
    )
    product12 = Product(
        name='Toy Train Set',
        description='A classic wooden toy train set with tracks.',
        price=3000,
        user_id=3,
        category_id=5
    )

    # Vintage
    product13 = Product(
        name='Vintage Vinyl Record',
        description='A vintage vinyl record from the 1970s.',
        price=2000,
        user_id=1,
        category_id=6
    )
    product14 = Product(
        name='Antique Pocket Watch',
        description='An antique pocket watch with intricate engravings.',
        price=8500,
        user_id=2,
        category_id=6
    )
    product15 = Product(
        name='Retro Camera',
        description='A retro film camera in working condition.',
        price=5500,
        user_id=3,
        category_id=6
    )

    # Clothing
    product16 = Product(
        name='Knitted Scarf',
        description='A cozy knitted scarf made from wool.',
        price=1200,
        user_id=3,
        category_id=2
    )
    product17 = Product(
        name='Denim Jacket',
        description='A stylish denim jacket with a vintage look.',
        price=3500,
        user_id=1,
        category_id=2
    )
    product18 = Product(
        name='Summer Dress',
        description='A light and breezy summer dress with floral patterns.',
        price=2500,
        user_id=2,
        category_id=2
    )

    db.session.add(product1)
    db.session.add(product2)
    db.session.add(product3)
    db.session.add(product4)
    db.session.add(product5)
    db.session.add(product6)
    db.session.add(product7)
    db.session.add(product8)
    db.session.add(product9)
    db.session.add(product10)
    db.session.add(product11)
    db.session.add(product12)
    db.session.add(product13)
    db.session.add(product14)
    db.session.add(product15)
    db.session.add(product16)
    db.session.add(product17)
    db.session.add(product18)

    db.session.commit()

def undo_products():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM products"))

    db.session.commit()
