import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { FaCheck, FaUser, FaMapMarkerAlt, FaCreditCard, FaLock } from 'react-icons/fa';
import "../style/order-summary.css";

const OrderSummary = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  const [shippingAddress, setShippingAddress] = useState({
    fullName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: ''
  });
  
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = getCartTotal();
  const shippingFee = 5.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shippingFee + tax;

  const handleSubmitOrder = async () => {
    setIsProcessing(true);
    
    // Here you would typically send order to backend
    // For now, simulate API call
    setTimeout(() => {
      alert('Order placed successfully!');
      clearCart();
      navigate('/dashboard');
    }, 1500);
  };

  if (cartItems.length === 0) {
    return (
      <div className="empty-order">
        <h2>No items in cart</h2>
        <p>Add items to your cart before proceeding to order.</p>
        <button onClick={() => navigate('/cart')} className="btn-back">
          Return to Cart
        </button>
      </div>
    );
  }

  return (
    <div className="order-summary-page">
      <div className="container">
        <h1 className="page-title">Order Summary</h1>
        
        <div className="order-layout">
          {/* Left Column - Order Details */}
          <div className="order-details">
            <section className="order-section">
              <h2>
                <FaUser className="section-icon" />
                Customer Information
              </h2>
              <div className="customer-info">
                <p><strong>Name:</strong> {currentUser?.displayName || 'User'}</p>
                <p><strong>Email:</strong> {currentUser?.email}</p>
              </div>
            </section>

            <section className="order-section">
              <h2>
                <FaMapMarkerAlt className="section-icon" />
                Shipping Address
              </h2>
              <div className="shipping-form">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={shippingAddress.fullName}
                  onChange={(e) => setShippingAddress({...shippingAddress, fullName: e.target.value})}
                />
                <input
                  type="text"
                  placeholder="Address"
                  value={shippingAddress.address}
                  onChange={(e) => setShippingAddress({...shippingAddress, address: e.target.value})}
                />
                <div className="form-row">
                  <input
                    type="text"
                    placeholder="City"
                    value={shippingAddress.city}
                    onChange={(e) => setShippingAddress({...shippingAddress, city: e.target.value})}
                  />
                  <input
                    type="text"
                    placeholder="State"
                    value={shippingAddress.state}
                    onChange={(e) => setShippingAddress({...shippingAddress, state: e.target.value})}
                  />
                  <input
                    type="text"
                    placeholder="ZIP Code"
                    value={shippingAddress.zipCode}
                    onChange={(e) => setShippingAddress({...shippingAddress, zipCode: e.target.value})}
                  />
                </div>
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={shippingAddress.phone}
                  onChange={(e) => setShippingAddress({...shippingAddress, phone: e.target.value})}
                />
              </div>
            </section>

            <section className="order-section">
              <h2>
                <FaCreditCard className="section-icon" />
                Payment Method
              </h2>
              <div className="payment-methods">
                <label className={paymentMethod === 'credit-card' ? 'selected' : ''}>
                  <input
                    type="radio"
                    name="payment"
                    value="credit-card"
                    checked={paymentMethod === 'credit-card'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  Credit Card
                </label>
                <label className={paymentMethod === 'paypal' ? 'selected' : ''}>
                  <input
                    type="radio"
                    name="payment"
                    value="paypal"
                    checked={paymentMethod === 'paypal'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  PayPal
                </label>
                <label className={paymentMethod === 'cash' ? 'selected' : ''}>
                  <input
                    type="radio"
                    name="payment"
                    value="cash"
                    checked={paymentMethod === 'cash'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  Cash on Delivery
                </label>
              </div>
            </section>
          </div>

          {/* Right Column - Order Summary */}
          <div className="order-summary-sidebar">
            <h2>Order Items</h2>
            <div className="order-items-list">
              {cartItems.map(item => (
                <div key={item.id} className="order-item">
                  <img src={item.img} alt={item.name} />
                  <div className="order-item-info">
                    <h4>{item.name}</h4>
                    <p>Qty: {item.quantity}</p>
                  </div>
                  <div className="order-item-price">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div className="price-breakdown">
              <div className="price-row">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="price-row">
                <span>Shipping</span>
                <span>${shippingFee.toFixed(2)}</span>
              </div>
              <div className="price-row">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="price-row total">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <button 
              onClick={handleSubmitOrder} 
              className="place-order-btn"
              disabled={isProcessing}
            >
              {isProcessing ? (
                'Processing...'
              ) : (
                <>
                  <FaLock /> Place Order
                </>
              )}
            </button>

            <div className="secure-checkout">
              <FaCheck />
              <span>Secure Checkout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;