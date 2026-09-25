import React from 'react';

export default function NavTabs({ activeTab, onTabChange }) {
  const tabs = [
    { id: 'overview', label: 'Overview', icon: '☀️' },
    { id: 'crops', label: 'Crop Cultivation', icon: '🌾' },
    { id: 'travel', label: 'Travel Weather Diff', icon: '🧳' },
    { id: 'photo', label: 'Photography Assistant', icon: '📸' }
  ];

  return (
    <nav className="nav-tabs-container" aria-label="Weather Dashboard Views">
      <div className="nav-tabs-list">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              className={`nav-tab-btn ${isActive ? 'active' : ''}`}
              onClick={() => onTabChange(tab.id)}
              type="button"
            >
              <span className="tab-icon">{tab.icon}</span>
              <span className="tab-label">{tab.label}</span>
              {isActive && <span className="active-indicator" />}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
