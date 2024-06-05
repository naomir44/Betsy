from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField, TextAreaField, FileField
from wtforms.validators import DataRequired
from flask_wtf.file import FileAllowed, FileRequired
from app.models import Product

class ProductForm(FlaskForm):
  name = StringField('Name', validators=[DataRequired()])
  description = TextAreaField('Description', validators=[DataRequired()])
  price = IntegerField('Price', validators=[DataRequired()])
  product_image = FileField('Image', validators=[FileRequired(), FileAllowed(['jpg', 'png'])])
  submit = SubmitField('Submit')
