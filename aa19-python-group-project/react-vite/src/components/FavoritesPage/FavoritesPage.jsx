import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFavorites, fetchRemoveFavorite } from '../../redux/favorites';
import './FavoritesPage.css'

const FavoritesPage = () => {
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorites.items);
  const [loading, setLoading] = useState(true);
console.log(favorites)
  useEffect(() => {
    dispatch(fetchFavorites()).then(() => setLoading(false));
  }, [dispatch]);

  const handleRemoveFavorite = (productId) => {
    dispatch(fetchRemoveFavorite(productId));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='fav-container'>
      <h1 className='fav-title'>Your Favorite Products</h1>
      <ul className='fav-list'>
        {favorites.map(product => (
          <li className='fav-item' key={product.id}>
            <img className='fav-image' src={product.images[0].url} alt={product.name} />
            <h2 className='fav-name'>{product.name}</h2>
            <p className='fav-description'>{product.description}</p>
            <button className='remove-fav-button' onClick={() => handleRemoveFavorite(product.id)}>
              Remove from Favorites
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoritesPage;
