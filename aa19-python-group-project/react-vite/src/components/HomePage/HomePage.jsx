import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="homepage">

      <div className="hero-section">
        <h1>Welcome to Betsy</h1>
        <p>Your one-stop shop for unique and creative goods.</p>
        <input type="text" placeholder="Search for items" className="search-bar" />
      </div>

      {/* Featured Products Section */}
      <div className="featured-products">
        <h2>Featured Products</h2>
        <div className="product-list">
          {/* Map through featured products data to display them */}
          {[1, 2, 3, 4].map((product) => (
            <div key={product} className="product-card">
              <Link to={`/product/${product}`}>
                <img src={`product-image-${product}.jpg`} alt={`Product ${product}`} />
                <h3>Product {product}</h3>
                <p>$20.00</p>
              </Link>
            </div>
          ))}
        </div>
      </div>


      <div className="categories">
        <h2>Shop by Category</h2>
        <div className="category-list">

          {['Clothing', 'Jewelry', 'Home & Living', 'Art & Collectibles'].map((category) => (
            <div key={category} className="category-card">
              <Link to={`/category/${category.toLowerCase()}`}>
                <img src={`${category.toLowerCase()}.jpg`} alt={category} />
                <h3>{category}</h3>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
