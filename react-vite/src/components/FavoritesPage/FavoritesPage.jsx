import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { fetchFavorites, fetchRemoveFavorite } from '../../redux/favorites';
import './FavoritesPage.css';
import { fetchAddCartItem } from '../../redux/cart-items';

const FavoritesPage = () => {
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorites.items);
  const user = useSelector(state => state.session.user)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchFavorites()).then(() => setLoading(false));
  }, [dispatch]);

  const handleRemoveFavorite = (productId) => {
    dispatch(fetchRemoveFavorite(productId));
  };

  const handleAddToCart = async (productId) => {
      const payload = {
        user_id: user.id,
        product_id: productId,
        quantity: 1
      }
      const addedItem = await dispatch(fetchAddCartItem(payload))
      if (addedItem) {
        alert("Item added to your cart! Go to your cart to checkout!")
      }
  }
  if (loading) {
    return <div>Loading...</div>;
  }
  if (!user) {
    return <h1>Sign in to add your favorite products!</h1>
  }

  return (
    <div className='fav-container'>
      <h1 className='fav-items-title'>Your Favorite Items</h1>
      <span className='fav-items-quantity'>{favorites.length} item{favorites.length !== 1 ? 's' : ''}</span>
      <ul className='fav-list'>
        {favorites.map(product => (
          <li key={product.id} className='fav-item'>
            <div className='fav-header'>
            <Link to={`/products/${product.id}`}>
                <img className='fav-image' src={product.images[0].url} alt={product.name}></img>
              </Link>
            </div>
            <div className='fav-body'>
              <h2 className='fav-name'>{product.name}</h2>
              <p className='fav-description'>{product.description}</p>
              <p className='fav-price'>${product.price}</p>
              <div className='fav-actions'>
                <button className='fav-add-to-cart' onClick={() => handleAddToCart(product.id)}>Add to cart</button>
                <button className='fav-remove' onClick={() => handleRemoveFavorite(product.id)}>Remove</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoritesPage;
