import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { fetchCategoryDetails } from '../../redux/categories';
import './CategoryPage.css';

const CategoryPage = () => {
  let { categoryId } = useParams();
  categoryId = +categoryId
  const dispatch = useDispatch();
  const category = useSelector(state => state.categories[categoryId]);

  useEffect(() => {
    if (categoryId) {
      dispatch(fetchCategoryDetails(categoryId));
    }
  }, [dispatch, categoryId]);

  if (!category) {
    return <div>Loading...</div>;
  }

  return (
    <div className="category-page">
      <h1>{category.name}</h1>
      <div className="products">
        {category.products.map(product => (
          <Link to={`/product/${product.id}`} key={product.id} className="product-card">
            <h2>{product.name}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
