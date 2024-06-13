from flask_wtf import FlaskForm
from wtforms import TextAreaField, IntegerField, SubmitField
from wtforms.validators import DataRequired, ValidationError
from app.models import Review

class ReviewForm(FlaskForm):
  content = TextAreaField('Content', validators=[DataRequired()])
  rating = IntegerField('Rating', validators=[DataRequired()])
  submit = SubmitField('Submit')
