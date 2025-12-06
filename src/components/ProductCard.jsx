import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import "../style/product-card.css";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.title} />
      </div>
      
      <div className="product-info">
        <h3>{product.title}</h3>
        <p className="product-description">{product.description}</p>
        
        <div className="product-meta">
          <div className="rating">
            <FaStar className="star" />
            <span>{product.rating?.rate || 4.5}</span>
          </div>
          <span className="category">{product.category}</span>
        </div>
        
        <div className="product-price">
          <span className="price">${product.price}</span>
          <button onClick={handleViewDetails} className="details-btn">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;