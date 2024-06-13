import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReviews, removeReview } from '../../redux/reviews';
import { useParams } from 'react-router-dom';
import OpenModalButton from '../OpenModalButton';
import ReviewForm from '../ReviewForm';
import './ProductReviews.css';

const ProductReviews = () => {
  let { productId } = useParams();
  productId = +productId;
  const dispatch = useDispatch();
  const reviews = useSelector(state => Object.values(state.reviews).filter(review => review.product_id === +productId));
  const user = useSelector(state => state.session.user);

  useEffect(() => {
    if (productId) {
      dispatch(fetchReviews(productId));
    }
  }, [dispatch, productId]);

  const handleDelete = async (reviewId) => {
    await dispatch(removeReview(reviewId));
  };

  return (
    <div className="product-reviews-deets-page">
      <h2>Reviews</h2>
      {reviews.length ? (
        reviews.map(review => (
          <div key={review.id} className="review-card">
            <p>{review.content}</p>
            <p>Rating: {review.rating}</p>
            {user && user.id === review.user_id && (
              <div className="review-buttons">
                <OpenModalButton
                  modalComponent={<ReviewForm review={review} productId={review.product_id} />}
                  buttonText="Update"
                />
                <button className='delete-review' onClick={() => handleDelete(review.id)}>Delete</button>
              </div>
            )}
          </div>
        ))
      ) : (
        <p>No reviews yet. Be the first to review!</p>
      )}
    </div>
  );
};

export default ProductReviews;
