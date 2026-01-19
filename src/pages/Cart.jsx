import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FaTrash, FaPlus, FaMinus, FaArrowLeft, FaShoppingBag } from 'react-icons/fa';
import "../style/cart.css";

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal } = useCart();
  const navigate = useNavigate();

  const handleProceedToOrder = () => {
    navigate('/order-summary');
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Your cart is empty</h2>
        <p>Add some products to your cart to see them here.</p>
        <Link to="/" className="back-to-shop-btn">
          <FaArrowLeft /> Continue Shopping
        </Link>
      </div>
    );
  }

  const total = getCartTotal();

  return (
    <div className="cart-page">
      <div className="container">
        <h1 className="cart-title">Your Shopping Cart</h1>
        
        <div className="cart-layout">
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.img} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p className="cart-item-seller">By {item.seller}</p>
                  <p className="cart-item-price">${item.price}</p>
                </div>
                <div className="cart-item-quantity">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                    <FaMinus />
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                    <FaPlus />
                  </button>
                </div>
                <div className="cart-item-total">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="remove-item-btn"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>
          
          <div className="cart-summary">
            <h2>Order Summary</h2>
            <div className="summary-details">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>$5.99</span>
              </div>
              <div className="summary-row">
                <span>Tax</span>
                <span>${(total * 0.08).toFixed(2)}</span>
              </div>
              <div className="summary-row total">
                <span>Total</span>
                <span>${(total + 5.99 + (total * 0.08)).toFixed(2)}</span>
              </div>
            </div>
            
            <button onClick={handleProceedToOrder} className="proceed-btn">
              <FaShoppingBag /> Proceed to Order Summary
            </button>
            
            <Link to="/" className="continue-shopping">
              <FaArrowLeft /> Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;