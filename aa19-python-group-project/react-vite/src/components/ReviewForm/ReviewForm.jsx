import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createReview, editReview } from "../../redux/reviews";
import { useModal } from "../../context/Modal";

const ReviewForm = ({ productId, review = null }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [content, setContent] = useState(review ? review.content : '');
  const [rating, setRating] = useState(review ? review.rating : 0);
  const [errors, setErrors] = useState({});
  const user = useSelector(state => state.session.user);
  const { closeModal } = useModal();

  useEffect(() => {
    if (review) {
      setContent(review.content);
      setRating(review.rating);
    }
  }, [review]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {};

    if (content.length === 0) validationErrors.content = "Tell us what you thought about this product";
    if (!rating) validationErrors.rating = "What would you rate this product";

    if (Object.values(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    } else {
      const payload = {
        content: content,
        rating: rating,
        product_id: productId,
        user_id: user.id
      };

      if (review) {
        // Update existing review
        const updatedReview = await dispatch(editReview(review.id, payload));
        if (updatedReview) {
          navigate(`/products/${productId}`);
        }
      } else {
        // Create new review
        const newReview = await dispatch(createReview(productId, payload));
        if (newReview) {
          navigate(`/products/${productId}`);
        }
      }
    }
    closeModal();
  };

  return (
    <form className="create-review" onSubmit={handleSubmit}>
      <label className="input-content">
        Tell us what you thought of this product
        <input type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Leave your review"
        />
      </label>
      {errors.content && <p className="form-errors">{errors.content}</p>}
      <label className="input-rating">
        Rate this product
        <div>
          <label>
            <input type="radio" value="1" checked={rating === 1} onChange={(e) => setRating(Number(e.target.value))} />
            1
          </label>
          <label>
            <input type="radio" value="2" checked={rating === 2} onChange={(e) => setRating(Number(e.target.value))} />
            2
          </label>
          <label>
            <input type="radio" value="3" checked={rating === 3} onChange={(e) => setRating(Number(e.target.value))} />
            3
          </label>
          <label>
            <input type="radio" value="4" checked={rating === 4} onChange={(e) => setRating(Number(e.target.value))} />
            4
          </label>
          <label>
            <input type="radio" value="5" checked={rating === 5} onChange={(e) => setRating(Number(e.target.value))} />
            5
          </label>
        </div>
      </label>
      {errors.rating && <p className="form-errors">{errors.rating}</p>}

      <button type="submit">{review ? 'Update Review' : 'Submit Review'}</button>
    </form>
  );
};

export default ReviewForm;
