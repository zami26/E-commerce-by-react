import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../style/CategoryPage.css';

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [categoryInfo, setCategoryInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  setLoading(true);

  fetch(`http://localhost:5000/api/products/category/${categoryName}`)
    .then(res => res.json())
    .then(data => {
      if (data.length === 0) {
        setCategoryInfo(null);
        setCategoryProducts([]);
      } else {
        setCategoryProducts(data);

        setCategoryInfo({
          name: data[0].category,
          count: data.length,
          totalStock: data.reduce((sum, p) => sum + p.stock, 0),
          averagePrice: (
            data.reduce((sum, p) => sum + p.price, 0) / data.length
          ).toFixed(2),
          averageRating: (
            data.reduce((sum, p) => sum + p.ratings, 0) / data.length
          ).toFixed(1)
        });
      }
      setLoading(false);
    })
    .catch(err => {
      console.error(err);
      setLoading(false);
    });
}, [categoryName]);


  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading category...</p>
      </div>
    );
  }

  if (!categoryInfo) {
    return (
      <div className="error-container">
        <h2>Category not found</h2>
        <p>The category you're looking for doesn't exist.</p>
        <Link to="/" className="back-home-btn">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="category-page">
      {/* Category Header */}
      <div className="category-header">
        <div className="container">
          <h1>{categoryInfo.name}</h1>
          <p className="category-subtitle">
            Explore our collection of {categoryInfo.count} premium products
          </p>
          
          <div className="category-stats">
            <div className="stat">
              <span className="stat-value">{categoryInfo.count}</span>
              <span className="stat-label">Products</span>
            </div>
            <div className="stat">
              <span className="stat-value">{categoryInfo.totalStock}</span>
              <span className="stat-label">In Stock</span>
            </div>
            <div className="stat">
              <span className="stat-value">${categoryInfo.averagePrice}</span>
              <span className="stat-label">Avg. Price</span>
            </div>
            <div className="stat">
              <span className="stat-value">{categoryInfo.averageRating} ⭐</span>
              <span className="stat-label">Avg. Rating</span>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container">
        <div className="products-header">
          <h2>All Products</h2>
          <div className="sort-options">
            <select className="sort-select">
              <option>Sort by: Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Rating: High to Low</option>
              <option>Most Popular</option>
            </select>
          </div>
        </div>

        <div className="products-grid">
          {categoryProducts.map(product => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                <img src={product.img} alt={product.name} />
                {product.stock < 5 && (
                  <span className="low-stock-badge">Low Stock</span>
                )}
              </div>
              
              <div className="product-info">
                <h3>{product.name}</h3>
                <p className="product-seller">By {product.seller}</p>
                
                <div className="product-rating">
                  <span className="stars">
                    {'⭐'.repeat(Math.floor(product.ratings))}
                    {product.ratings % 1 >= 0.5 && '⭐'}
                  </span>
                  <span className="rating-count">({product.ratingsCount})</span>
                </div>
                
                <div className="product-meta">
                  <span className="stock">Stock: {product.stock}</span>
                  <span className="shipping">Shipping: ${product.shipping}</span>
                </div>
                
                <div className="product-price">
                  <span className="price">${product.price}</span>
                  <Link to={`/product/${product.id}`} className="view-details-btn">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;