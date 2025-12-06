import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import productsData from '../data/products.json';
import "../style/home.css";
import BannerCarousel from '../components/BannerCarousel';
import HealthSection from './HealthSection';

const Home = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Extract unique categories from products data
    const uniqueCategories = [...new Set(productsData.map(product => product.category))];

    // Count products in each category
    const categoriesWithCount = uniqueCategories.map(category => {
      const categoryProducts = productsData.filter(product => product.category === category);
      return {
        name: category,
        count: categoryProducts.length,
        // Get a sample product image for the category
        image: categoryProducts[0]?.img || '',
        // Get 3 sample products for preview
        sampleProducts: categoryProducts.slice(0, 3)
      };
    });

    setCategories(categoriesWithCount);
  }, []);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <div className="hero-section">
        <BannerCarousel />
      </div>

      {/* Categories Section */}
      <div className="container categories-section">
        <div className="section-header">
          <h2>Shop by Category</h2>
          <p>Browse our extensive collection of Adidas products</p>
        </div>

        <div className="categories-grid">
          {categories.map((category, index) => (
            <div key={index} className="category-card">
              <Link to={`/category/${category.name.toLowerCase().replace(/'/g, '').replace(/\s+/g, '-')}`}>
                <div className="category-image">
                  <img src={category.image} alt={category.name} />
                  <div className="category-overlay">
                    <h3>{category.name}</h3>
                    <p>{category.count} products</p>
                  </div>
                </div>

                <div className="category-products-preview">
                  {category.sampleProducts.map((product, idx) => (
                    <div key={idx} className="preview-product">
                      <img src={product.img} alt={product.name} />
                      <div className="preview-info">
                        <p className="preview-name">{product.name.substring(0, 20)}...</p>
                        <p className="preview-price">${product.price}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <button className="view-category-btn">
                  View All {category.count} Products →
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="home-page">
        <div className="">
          <HealthSection/>
        </div>
      </div>

      {/* Featured Products Section */}
      <div className="featured-section">
        <div className="container categories-section">
          <div className="section-header">
            <h2>Featured Products</h2>
            <p>Top picks from our collection</p>
          </div>

          <div className="featured-products">
            {productsData.slice(0, 6).map(product => (
              <div key={product.id} className="featured-product-card">
                <img src={product.img} alt={product.name} />
                <div className="featured-product-info">
                  <h4>{product.name.substring(0, 25)}...</h4>
                  <div className="featured-product-meta">
                    <span className="price">${product.price}</span>
                    <span className="rating">⭐ {product.ratings}</span>
                  </div>
                  <Link to={`/product/${product.id}`} className="view-product-btn">
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <h3>{productsData.length}</h3>
              <p>Total Products</p>
            </div>
            <div className="stat-item">
              <h3>{categories.length}</h3>
              <p>Categories</p>
            </div>
            <div className="stat-item">
              <h3>{new Set(productsData.map(p => p.seller)).size}</h3>
              <p>Brands</p>
            </div>
            <div className="stat-item">
              <h3>{productsData.reduce((sum, product) => sum + product.stock, 0)}</h3>
              <p>Items in Stock</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;