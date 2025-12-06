import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { googleProvider, githubProvider } from '../firebase/firebase.config';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
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
        
        <p className="switch-auth">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;