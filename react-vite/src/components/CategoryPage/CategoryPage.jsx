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
      <h1 className='category-name'>{category.name}</h1>
      <div className="cat-products">
        {category.products.map(product => (
          <Link to={`/products/${product.id}`} key={product.id} className="cat-product-card">
            {product.images.map(image => <img key={image.url} src={image.url}></img>)}
            <h2 className='cat-product-name'>{product.name}</h2>
            <p className='cat-product-description'>{product.description}</p>
            <p className="cat-product-price">${product.price.toFixed(2)}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
