import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCategories } from '../../redux/categories';
import './HomePage.css';

const HomePage = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => Object.values(state.categories));
  const user = useSelector((state)=> state.session.user)

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div className="homepage">
     {user && <div className='greeting'><h1>Welcome back, {user.username}!</h1></div>}
      <h1 className='homepage-message'>Shop our selections</h1>
      <h2 className='homepage-message-2'>Curated collections hand-picked by Betsy editors</h2>
      <div className="categories">
        {categories.map(category => (
          <Link to={`/category/${category.id}`} key={category.id} className="category-card">
            <img src={category.imageUrl} alt={category.name}></img>
            <h2>{category.name}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
