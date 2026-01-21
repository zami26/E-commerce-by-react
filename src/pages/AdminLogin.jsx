import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaUserShield, FaArrowLeft } from 'react-icons/fa';

const AdminLogin = () => {
  const [adminCredentials, setAdminCredentials] = useState({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // For demo purposes - In production, use proper authentication
  const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'admin123'
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simple admin authentication
    if (adminCredentials.username === ADMIN_CREDENTIALS.username && 
        adminCredentials.password === ADMIN_CREDENTIALS.password) {
      toast.success('Admin login successful!');
      // Store admin session
      localStorage.setItem('isAdmin', 'true');
      navigate('/admin/dashboard');
    } else {
      toast.error('Invalid admin credentials');
    }
    
    setLoading(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <button 
          onClick={() => navigate('/login')}
          className="back-btn"
        >
          <FaArrowLeft /> Back to User Login
        </button>
        
        <div className="admin-header">
          <FaUserShield className="admin-icon" />
          <h2>Admin Login</h2>
          <p className="admin-subtitle">Restricted Access</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Admin Username</label>
            <input
              type="text"
              value={adminCredentials.username}
              onChange={(e) => setAdminCredentials({
                ...adminCredentials,
                username: e.target.value
              })}
              required
              placeholder="Enter admin username"
            />
          </div>
          
          <div className="form-group">
            <label>Admin Password</label>
            <input
              type="password"
              value={adminCredentials.password}
              onChange={(e) => setAdminCredentials({
                ...adminCredentials,
                password: e.target.value
              })}
              required
              placeholder="Enter admin password"
            />
          </div>
          
          <button type="submit" disabled={loading} className="submit-btn admin-submit">
            {loading ? 'Authenticating...' : 'Login as Admin'}
          </button>
        </form>
        
        <div className="admin-demo-credentials">
          <p><strong>Demo Credentials:</strong></p>
          <p>Username: admin</p>
          <p>Password: admin123</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;