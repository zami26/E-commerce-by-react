import React from 'react';
import { FaSpinner } from 'react-icons/fa';
import "../style/spiner.css";

const LoadingSpinner = ({ message = 'Loading...' }) => {
  return (
    <div className="loading-spinner">
      <FaSpinner className="spinner-icon" />
      <p>{message}</p>
    </div>
  );
};

export default LoadingSpinner;