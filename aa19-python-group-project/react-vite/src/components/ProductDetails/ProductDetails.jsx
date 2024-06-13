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
  console.log(product)
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
      <h1 className="product-deets-name">{product.name}</h1>
      {product.images.map(image => (
        <img key={image.url} src={image.url} alt={product.name} className="product-image" />
      ))}
      <p className="product-deets-description">{product.description}</p>
      <p className="product-deets-price">Price: ${product.price}</p>
      <OpenModalButton
        modalComponent={<ReviewForm productId={productId} />}
        buttonText="Leave a Review"
      />
      <ProductReviews />
    </div>
  );
};

export default ProductDetails;
