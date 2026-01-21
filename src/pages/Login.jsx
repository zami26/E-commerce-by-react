import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { googleProvider, githubProvider } from '../Firebase/firebase.config';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { FaUserShield } from 'react-icons/fa'; // Import admin icon
import { toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, googleLogin, githubLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await login(email, password);
      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Failed to login: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await googleLogin(googleProvider);
      toast.success('Google login successful!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Google login failed: ' + error.message);
    }
  };

  const handleGithubLogin = async () => {
    try {
      await githubLogin(githubProvider);
      toast.success('GitHub login successful!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('GitHub login failed: ' + error.message);
    }
  };

  const handleAdminLogin = () => {
    // You can implement admin-specific authentication here
    // For now, we'll just navigate to admin page
    // In production, you should check admin credentials
    navigate('/admin/login');
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login to Your Account</h2>
        
        <div className="social-logins">
          <button onClick={handleGoogleLogin} className="social-btn google">
            <FcGoogle /> Continue with Google
          </button>
          <button onClick={handleGithubLogin} className="social-btn github">
            <FaGithub /> Continue with GitHub
          </button>
        </div>
        
        <div className="divider">
          <span>OR</span>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>
          
          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        
        {/* Admin Login Button */}
        <div className="admin-login-section">
          <button 
            onClick={handleAdminLogin} 
            className="admin-btn"
          >
            <FaUserShield /> Login as Admin
          </button>
          <p className="admin-note">
            Admin access required for product management
          </p>
        </div>
        
        <p className="switch-auth">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;