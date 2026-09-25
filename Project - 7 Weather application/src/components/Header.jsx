import React from 'react';

export default function Header({ unit, onToggleUnit, colorMode, onToggleColorMode, onLocate }) {
  return (
    <header className="app-header">
      <div className="brand">
        <svg className="brand-logo" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M18.36 5.64l1.41-1.41"/>
          <circle cx="12" cy="12" r="5"/>
        </svg>
        <span className="brand-title">Atmosphere</span>
      </div>

      <div className="header-actions">
        {/* Dark / Light Mode Toggle Button */}
        <button
          className="icon-btn theme-toggle-btn"
          onClick={onToggleColorMode}
          title={`Switch to ${colorMode === 'dark' ? 'Light' : 'Dark'} Mode`}
          aria-label="Toggle Dark and Light Mode"
        >
          {colorMode === 'dark' ? (
            <>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="5"/>
                <line x1="12" y1="1" x2="12" y2="3"/>
                <line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="1" y1="12" x2="3" y2="12"/>
                <line x1="21" y1="12" x2="23" y2="12"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
              <span className="btn-text">Light Mode</span>
            </>
          ) : (
            <>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
              <span className="btn-text">Dark Mode</span>
            </>
          )}
        </button>

        {/* Locate Me Button */}
        <button className="icon-btn" onClick={onLocate} title="Use current location" aria-label="Use current location">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"/>
            <circle cx="12" cy="12" r="3"/>
            <path d="M12 2v3M12 19v3M2 12h3M19 12h3"/>
          </svg>
          <span className="btn-text">Locate</span>
        </button>

        {/* Unit Toggle Switcher */}
        <div className="unit-toggle-wrapper" title="Toggle °C / °F">
          <button
            className={`unit-btn ${unit === 'metric' ? 'active' : ''}`}
            onClick={() => onToggleUnit('metric')}
          >
            °C
          </button>
          <button
            className={`unit-btn ${unit === 'imperial' ? 'active' : ''}`}
            onClick={() => onToggleUnit('imperial')}
          >
            °F
          </button>
        </div>
      </div>
    </header>
  );
}
