import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaCheckCircle } from 'react-icons/fa';
import { toast } from 'react-toastify';
import "../style/Order.css";

const Orders = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [orderDetails, setOrderDetails] = useState(location.state || null);
  const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => {
    if (!orderDetails) {
      navigate('/');
    }
  }, [orderDetails, navigate]);

  const handlePlaceOrder = () => {
    toast.success('Order placed successfully!');
    setOrderPlaced(true);
    
    setTimeout(() => {
      navigate('/dashboard');
    }, 2000);
  };

  if (!orderDetails) {
    return <div className="loading">Loading order details...</div>;
  }

  const { product, quantity } = orderDetails;
  const totalPrice = product.price * quantity;

  return (
    <div className="order-page">
      <h1>Place Your Order</h1>
      
      {orderPlaced ? (
        <div className="order-success">
          <FaCheckCircle className="success-icon" />
          <h2>Order Successful!</h2>
          <p>Your order has been placed successfully.</p>
          <p>You will be redirected to the dashboard...</p>
        </div>
      ) : (
        <>
          <div className="order-summary">
            <h2>Order Summary</h2>
            <div className="order-item">
              <img src={product.img} alt={product.title} />
              <div className="item-details">
                <h3>{product.title}</h3>
                <p>Quantity: {quantity}</p>
                <p>Price per item: ${product.price}</p>
              </div>
              <div className="item-total">
                <p>${totalPrice.toFixed(2)}</p>
              </div>
            </div>
          </div>
          
          <div className="customer-info">
            <h2>Customer Information</h2>
            <div className="info-card">
              <p><strong>Email:</strong> {currentUser?.email}</p>
              <p><strong>Order Date:</strong> {new Date().toLocaleDateString()}</p>
              <p><strong>Order ID:</strong> ORD-{id}-{Date.now()}</p>
            </div>
          </div>
          
          <div className="order-total">
            <h3>Total Amount: ${totalPrice.toFixed(2)}</h3>
            <button onClick={handlePlaceOrder} className="place-order-btn">
              Confirm Order
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Orders;