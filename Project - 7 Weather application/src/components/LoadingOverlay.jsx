import React from 'react';

export default function LoadingOverlay({ isLoading, message = 'Fetching weather data...' }) {
  if (!isLoading) return null;

  return (
    <div className="loading-overlay">
      <div className="spinner-wrapper">
        <div className="spinner"></div>
        <p className="loading-text">{message}</p>
      </div>
    </div>
  );
}
