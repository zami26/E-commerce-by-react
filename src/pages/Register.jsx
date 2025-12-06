import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup, signInWithGoogle, signInWithGithub } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    if (password.length < 6) {
      toast.error('Password should be at least 6 characters');
      return;
    }
    
    setLoading(true);
    
    try {
      await signup(email, password, username);
      toast.success('Registration successful!');
      navigate('/dashboard');
    } catch (error) {
      let errorMessage = 'Failed to register';
      
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'Email is already registered';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address';
          break;
        case 'auth/weak-password':
          errorMessage = 'Password is too weak';
          break;
        case 'auth/operation-not-allowed':
          errorMessage = 'Email/password accounts are not enabled';
          break;
        default:
          errorMessage = error.message;
      }
      
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      await signInWithGoogle();
      toast.success('Signed up with Google successfully!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Google sign up failed: ' + error.message);
    }
  };

  const handleGithubSignUp = async () => {
    try {
      await signInWithGithub();
      toast.success('Signed up with GitHub successfully!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('GitHub sign up failed: ' + error.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Create Account</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username (Optional)</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
            />
            <small>If left blank, we'll use part of your email</small>
          </div>
          
          <div className="form-group">
            <label>Email *</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>
          
          <div className="form-group">
            <label>Password *</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="At least 6 characters"
              minLength="6"
            />
          </div>
          
          <div className="form-group">
            <label>Confirm Password *</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Confirm your password"
              minLength="6"
            />
          </div>
          
          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? 'Creating Account...' : 'Register'}
          </button>
        </form>
        
        <div className="auth-divider">
          <span>Or</span>
        </div>
        
        <div className="social-login">
          <button 
            className="social-btn google"
            onClick={handleGoogleSignUp}
          >
           <FcGoogle /> Sign up with Google
          </button>
          
          <button 
            className="social-btn github"
            onClick={handleGithubSignUp}
          >
            <FaGithub /> Sign up with GitHub
          </button>
        </div>
        
        <p className="switch-auth">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
        
        <p className="terms-note">
          By registering, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default Register;