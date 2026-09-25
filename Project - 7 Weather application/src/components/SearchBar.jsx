import React, { useState } from 'react';

export default function SearchBar({ onSearch, recentSearches, onSelectRecent }) {
  const [term, setTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (term.trim()) {
      onSearch(term.trim());
    }
  };

  const handleClear = () => {
    setTerm('');
  };

  return (
    <section className="search-section">
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="search-input-wrapper">
          <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            type="text"
            placeholder="Search city name (e.g. London, Tokyo, New York)..."
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            autoComplete="off"
            aria-label="Search city name"
          />
          {term && (
            <button type="button" className="clear-btn" onClick={handleClear} aria-label="Clear search">
              &times;
            </button>
          )}
        </div>
        <button type="submit" className="search-btn">
          <span>Search</span>
        </button>
      </form>

      {recentSearches && recentSearches.length > 0 && (
        <div className="recent-searches">
          <span className="recent-label">Popular:</span>
          <div className="chips-container">
            {recentSearches.map((city, idx) => (
              <button
                key={`${city}-${idx}`}
                className="chip"
                onClick={() => {
                  setTerm(city);
                  onSelectRecent(city);
                }}
              >
                {city}
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
