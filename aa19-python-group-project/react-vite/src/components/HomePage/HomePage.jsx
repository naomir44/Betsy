import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCategories } from '../../redux/categories';
import './HomePage.css';

const HomePage = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => Object.values(state.categories));

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div className="homepage">
      <h1>Categories</h1>
      <div className="categories">
        {categories.map(category => (
          <Link to={`/category/${category.id}`} key={category.id} className="category-card">
            <h2>{category.name}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
