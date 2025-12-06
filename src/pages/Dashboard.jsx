import React from 'react';
import { useAuth } from '../context/AuthContext';
import { FaUser, FaShoppingCart, FaHistory, FaCog } from 'react-icons/fa';
import "../style/dashboard.css";

const Dashboard = () => {
  const { currentUser } = useAuth();

  return (
    <div className="dashboard">
      <div className="welcome-section">
        <h1>Welcome to Your Dashboard</h1>
        <p className="user-email">{currentUser?.email}</p>
      </div>
      
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <FaUser className="card-icon" />
          <h3>Profile</h3>
          <p>View and edit your profile information</p>
        </div>
        
        <div className="dashboard-card">
          <FaShoppingCart className="card-icon" />
          <h3>Orders</h3>
          <p>Track and manage your orders</p>
        </div>
        
        <div className="dashboard-card">
          <FaHistory className="card-icon" />
          <h3>Order History</h3>
          <p>View your past purchases</p>
        </div>
        
        <div className="dashboard-card">
          <FaCog className="card-icon" />
          <h3>Settings</h3>
          <p>Account and notification settings</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;