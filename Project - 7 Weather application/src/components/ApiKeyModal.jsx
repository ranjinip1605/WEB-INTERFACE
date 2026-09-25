import React, { useState, useEffect } from 'react';

export default function ApiKeyModal({ isOpen, apiKey, onClose, onSave, onClear }) {
  const [inputValue, setInputValue] = useState(apiKey || '');

  useEffect(() => {
    setInputValue(apiKey || '');
  }, [apiKey, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-card">
        <div className="modal-header">
          <h3>OpenWeatherMap API Key Setup</h3>
          <button className="modal-close" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          <p>Enter your free OpenWeatherMap API key to fetch live weather data for any city worldwide.</p>
          <div className="key-guide">
            <span>Don't have a key?</span>
            <a href="https://home.openweathermap.org/users/sign_up" target="_blank" rel="noopener noreferrer">
              Get Free Key at openweathermap.org &rarr;
            </a>
          </div>
          <div className="input-group">
            <label htmlFor="apiKeyInput">Your API Key:</label>
            <input
              type="text"
              id="apiKeyInput"
              placeholder="Paste your 32-character API key here..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              autoComplete="off"
            />
          </div>
          <div className="mode-info">
            <p><strong>Note:</strong> If left empty, the application automatically uses <em>Demo Mode</em> with simulated real-time data for popular cities so you can explore all features!</p>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClear}>Use Demo Mode</button>
          <button className="btn btn-primary" onClick={() => onSave(inputValue)}>Save API Key</button>
        </div>
      </div>
    </div>
  );
}
