from flask.cli import AppGroup
from .users import seed_users, undo_users
from .cart_items import seed_cart_items, undo_cart_items
from .favorites import seed_favorites, undo_favorites
from .images import seed_images, undo_images
from .products import seed_products, undo_products
from .reviews import seed_reviews, undo_reviews
from .categories import seed_categories, undo_categories

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')

# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_users()
        undo_cart_items()
        undo_favorites()
        undo_images()
        undo_products()
        undo_reviews()
        undo_categories()
    seed_categories()
    seed_users()
    seed_products()
    seed_images()
    seed_reviews()
    seed_cart_items()
    seed_favorites()
    # Add other seed functions here

# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    # Undo in the reverse order
    undo_favorites()
    undo_cart_items()
    undo_reviews()
    undo_images()
    undo_products()
    undo_users()
    undo_categories()
    # Add other undo functions here
