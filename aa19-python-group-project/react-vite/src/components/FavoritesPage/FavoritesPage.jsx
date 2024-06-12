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
    <div className='container'>
      <h1>Your Favorite Products</h1>
      <ul>
        {favorites.map(product => (
          <li key={product.id}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <button onClick={() => handleRemoveFavorite(product.id)}>Remove from Favorites</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoritesPage;
