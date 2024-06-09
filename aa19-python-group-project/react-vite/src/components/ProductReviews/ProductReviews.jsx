import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReviews } from '../../redux/reviews';
import { useParams } from 'react-router-dom';
import './ProductReviews.css';

const ProductReviews = () => {
  let { productId } = useParams();
  productId = +productId
  const dispatch = useDispatch();
  const reviews = useSelector(state => Object.values(state.reviews).filter(review => review.product_id === +productId));

  useEffect(() => {
    if (productId) {
      dispatch(fetchReviews(productId));
    }
  }, [dispatch, productId]);

  return (
    <div className="product-reviews">
      <h2>Reviews</h2>
      {reviews.length ? (
        reviews.map(review => (
          <div key={review.id} className="review-card">
            <h3>{review.title}</h3>
            <p>{review.content}</p>
            <p>Rating: {review.rating}</p>
          </div>
        ))
      ) : (
        <p>No reviews yet. Be the first to review!</p>
      )}
    </div>
  );
};

export default ProductReviews;
