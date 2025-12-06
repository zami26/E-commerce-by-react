import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaSearch } from 'react-icons/fa';

const NotFound = () => {
  return (
    <div className="not-found">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>The page you are looking for doesn't exist or has been moved.</p>
      <div className="not-found-actions">
        <Link to="/" className="home-link">
          <FaHome /> Go Home
        </Link>
        <Link to="/" className="browse-link">
          <FaSearch /> Browse Products
        </Link>
      </div>
    </div>
  );
};

export default NotFound;