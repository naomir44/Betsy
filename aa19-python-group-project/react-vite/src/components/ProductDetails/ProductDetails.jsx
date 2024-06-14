import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProductDetails } from '../../redux/products';
import ProductReviews from '../ProductReviews/ProductReviews';
import './ProductDetails.css';
import OpenModalButton from '../OpenModalButton';
import ReviewForm from '../ReviewForm';

const ProductDetails = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const product = useSelector(state => state.products[productId]);
<<<<<<< HEAD
=======

>>>>>>> dcebc3910ba4c553ec6d2d5526ef5f8b12d68203
  useEffect(() => {
    if (productId) {
      dispatch(fetchProductDetails(productId));
    }
  }, [dispatch, productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-detail-page">
      <div className="product-detail-image-section">
        {product.images.map(image => (
          <img key={image.url} src={image.url} alt={product.name} className="product-detail-image" />
        ))}
      </div>
      <div className="product-detail-info-section">
        <h1 className="product-detail-title">{product.name}</h1>
        <p className="product-detail-price">${product.price}</p>
        <p className="product-detail-description">{product.description}</p>
        <div className="product-detail-buttons">
          <button className="product-detail-button buy-now-button">Buy it now</button>
          <button className="product-detail-button add-to-cart-button">Add to cart</button>
          <button className="product-detail-button add-to-favorites-button">Add to Favorites</button>
        </div>
        <div className="product-detail-random">
          <p>Arrives soon! Get it by <strong>Jun 18-22</strong> if you order today</p>
          <p>Returns & exchanges accepted</p>
        </div>
        <OpenModalButton
          modalComponent={<ReviewForm productId={productId} />}
          buttonText="Leave a Review"
          className="product-detail-button review-button"
        />
        <ProductReviews />
      </div>
    </div>
  );
};

export default ProductDetails;
