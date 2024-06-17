import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProductDetails } from '../../redux/products';
import ProductReviews from '../ProductReviews/ProductReviews';
import './ProductDetails.css';
import OpenModalButton from '../OpenModalButton';
import ReviewForm from '../ReviewForm';
import { fetchAddCartItem } from '../../redux/cart-items';
import { fetchAddFavorite, fetchFavorites } from '../../redux/favorites';

const ProductDetails = () => {
  let { productId } = useParams();
  productId = +productId
  const dispatch = useDispatch();
  const product = useSelector(state => state.products[productId]);
  const user = useSelector(state => state.session.user)
  const userReviews = useSelector(state => Object.values(state.reviews).filter(review => review.user_id === user?.id))
  const checkUserReviews = userReviews.find(review => review.product_id === productId)

  useEffect(() => {
    if (productId) {
      dispatch(fetchProductDetails(productId));
    }
  }, [dispatch, productId]);

  useEffect(() => {
    if (user){
      dispatch(fetchFavorites())
    }
  }, [dispatch, user])

  const addToCart = async () => {
    if (user) {
      const payload = {
        user_id: user.id,
        product_id: productId,
        quantity: 1
      }
      const addedItem = await dispatch(fetchAddCartItem(payload))
      if (addedItem) {
        alert("Item added to your cart! Go to your cart to checkout!")
      }
    } else {
      alert("Sign in to add this item to your cart")
    }
  };

  const addToFavorites = async () => {
    if (user) {
      const addedFavorite = await dispatch(fetchAddFavorite(productId))
      if (!addedFavorite) {
        alert("Item already in your favorites!")
      }
      if (addedFavorite) {
        alert("Item added to your favorites!")
      }
    } else {
      alert("Sign in to add this item to your favorites")
    }
  };

  const buyNow = () => {
    alert("Feature Coming Soon!")
  }

  if (!product) {
    return <div>Loading...</div>;
  }

  const ownsProduct = product.user_id === user?.id

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
          <button onClick={buyNow} className="product-detail-button buy-now-button">Buy it now</button>
          <button onClick={addToCart} className="product-detail-button add-to-cart-button">Add to cart</button>
          <button onClick={addToFavorites} className="product-detail-button add-to-favorites-button">Add to Favorites</button>
        </div>
        <div className="product-detail-random">
          <p>Arrives soon! Get it by <strong>Jun 18-22</strong> if you order today</p>
          <p>Returns & exchanges accepted</p>
        </div>
        { !user ? (
          <div className='not-signed-in'>Sign in to leave a review</div>
        ) : ownsProduct ? (
          null
        ) : checkUserReviews ? (
          null
        ) : (
          <OpenModalButton
          modalComponent={<ReviewForm productId={productId} />}
          buttonText="Leave a Review"
        />
        )}
        <ProductReviews />
      </div>
    </div>
  );
};

export default ProductDetails;
