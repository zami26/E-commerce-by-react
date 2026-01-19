import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import productsData from '../data/products.json';  // Import your data
import { FaStar, FaArrowLeft, FaShoppingCart, FaTruck } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import "../style/product-details.css";
import { useCart } from "../context/CartContext";


const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    // Find product by ID in your local data
    const foundProduct = productsData.find(p => p.id === id);
    setProduct(foundProduct);

    if (foundProduct) {
      // Find related products from same category
      const related = productsData
        .filter(p => p.category === foundProduct.category && p.id !== id)
        .slice(0, 4);
      setRelatedProducts(related);
    }

    setLoading(false);
  }, [id]);

  const handleOrder = () => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    navigate(`/order/${id}`, { state: { product, quantity } });
  };

  if (loading) return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p>Loading product details...</p>
    </div>
  );

  if (!product) return (
    <div className="error-container">
      <h2>Product not found</h2>
      <p>The product you're looking for doesn't exist.</p>
      <button onClick={() => navigate('/')} className="back-home-btn">
        Back to Home
      </button>
    </div>
  );

  const totalPrice = product.price * quantity;

  return (
    <div className="product-details-page">
      <div className="container">
        <button onClick={() => navigate(-1)} className="back-btn">
          <FaArrowLeft /> Back
        </button>

        <div className="product-details-grid">
          {/* Product Images */}
          <div className="product-images">
            <div className="main-image">
              <img src={product.img} alt={product.name} />
            </div>
          </div>

          {/* Product Info */}
          <div className="product-info">
            <div className="product-header">
              <span className="product-category">{product.category}</span>
              <h1>{product.name}</h1>
              <p className="product-seller">By {product.seller}</p>
            </div>

            <div className="product-rating-section">
              <div className="rating">
                <span className="stars">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={i < Math.floor(product.ratings) ? 'star-filled' : 'star-empty'}
                    />
                  ))}
                </span>
                <span className="rating-value">{product.ratings} / 5</span>
                <span className="rating-count">({product.ratingsCount} reviews)</span>
              </div>
            </div>

            <div className="product-price-section">
              <div className="price-display">
                <span className="current-price">${product.price}</span>
                {product.stock < 10 && (
                  <span className="low-stock-warning">Only {product.stock} left in stock!</span>
                )}
              </div>

              <div className="shipping-info">
                <FaTruck />
                <span>Shipping: ${product.shipping}</span>
                {product.shipping === 1 && (
                  <span className="free-shipping-badge">Free shipping on orders over $50</span>
                )}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="quantity-section">
              <label>Quantity:</label>
              <div className="quantity-controls">
                <button
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  className="quantity-btn"
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  max={product.stock}
                  value={quantity}
                  onChange={(e) => {
                    const value = parseInt(e.target.value) || 1;
                    setQuantity(Math.max(1, Math.min(product.stock, value)));
                  }}
                  className="quantity-input"
                />
                <button
                  onClick={() => setQuantity(prev => Math.min(product.stock, prev + 1))}
                  className="quantity-btn"
                >
                  +
                </button>
              </div>
              <span className="stock-info">Available: {product.stock} units</span>
            </div>

            {/* Action Buttons */}
            <div className="action-buttons">
              <button onClick={handleOrder} className="order-now-btn">
                <FaShoppingCart /> Order Now - ${totalPrice.toFixed(2)}
              </button>

              <button
                onClick={() => addToCart(product)}
                className="bg-black text-white px-6 py-2 rounded"
              >
                Add to Cart
              </button>

            </div>

            {/* Product Details */}
            <div className="product-specs">
              <h3>Product Details</h3>
              <div className="specs-grid">
                <div className="spec-item">
                  <span className="spec-label">Category:</span>
                  <span className="spec-value">{product.category}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Brand:</span>
                  <span className="spec-value">{product.seller}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Rating:</span>
                  <span className="spec-value">{product.ratings} ⭐</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Reviews:</span>
                  <span className="spec-value">{product.ratingsCount}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="related-products">
            <h2>Related Products</h2>
            <div className="related-products-grid">
              {relatedProducts.map(relatedProduct => (
                <div
                  key={relatedProduct.id}
                  className="related-product-card"
                  onClick={() => navigate(`/product/${relatedProduct.id}`)}
                >
                  <img src={relatedProduct.img} alt={relatedProduct.name} />
                  <div className="related-product-info">
                    <h4>{relatedProduct.name.substring(0, 25)}...</h4>
                    <div className="related-product-price">
                      <span>${relatedProduct.price}</span>
                      <span className="rating">⭐ {relatedProduct.ratings}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;