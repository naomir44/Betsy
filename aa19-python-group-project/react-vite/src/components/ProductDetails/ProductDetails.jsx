import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProductDetails } from '../../redux/products';
import ProductReviews from '../ProductReviews/ProductReviews';
import './ProductDetails.css';

const ProductDetails = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const product = useSelector(state => state.products[productId]);

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
      <h1>{product.name}</h1>
      <img src={product.imageUrl} alt={product.name} className="product-image" />
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <ProductReviews />
    </div>
  );
};

export default ProductDetails;
