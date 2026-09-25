import React, { useState, useMemo } from 'react';
import { CROP_DATABASE, calculateCropSuitability, getAgriculturalAdvisories } from '../services/cropService';
import { formatTemp } from '../services/weatherService';

export default function CropAdvisor({ weatherData, unit }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCrop, setSelectedCrop] = useState(null);

  const cityName = weatherData ? weatherData.name : 'Current Location';
  const advisories = useMemo(() => getAgriculturalAdvisories(weatherData), [weatherData]);

  // Categories list
  const categories = ['All', 'Grains', 'Vegetables', 'Fruits', 'Cash Crops'];

  // Filter crops
  const filteredCrops = useMemo(() => {
    return CROP_DATABASE.filter(crop => {
      const matchCat = selectedCategory === 'All' || crop.category === selectedCategory;
      const matchSearch = crop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          crop.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  if (!weatherData || !weatherData.main) {
    return (
      <div className="card crop-advisor-container">
        <h3 className="section-title">🌾 Crop Cultivation Predictor</h3>
        <p className="placeholder-text">Please search or locate a city to view crop suitability calculations.</p>
      </div>
    );
  }

  const currentTemp = weatherData.main.temp;
  const currentHumidity = weatherData.main.humidity;

  return (
    <div className="crop-advisor-container">
      {/* Header Banner */}
      <div className="card crop-header-card">
        <div className="crop-header-main">
          <div>
            <span className="badge-pill green">Agronomic Advisor</span>
            <h2 className="crop-header-title">Crop Cultivation Predictor &bull; {cityName}</h2>
            <p className="crop-header-sub">
              Live weather matching: <strong>{formatTemp(currentTemp, unit)}</strong> &bull; Humidity: <strong>{currentHumidity}%</strong>
            </p>
          </div>
          <div className="weather-quick-pills">
            <span className="quick-pill">🌡️ Temp: {Math.round(currentTemp)}°C</span>
            <span className="quick-pill">💧 Hum: {currentHumidity}%</span>
            <span className="quick-pill">💨 Wind: {Math.round((weatherData.wind?.speed || 0) * 3.6)} km/h</span>
          </div>
        </div>

        {/* Agricultural Advisories Banner Grid */}
        <div className="advisories-grid">
          {advisories.map((adv, idx) => (
            <div key={idx} className={`advisory-card advisory-${adv.type}`}>
              <div className="advisory-icon">{adv.icon}</div>
              <div className="advisory-content">
                <h4 className="advisory-title">{adv.title}</h4>
                <p className="advisory-text">{adv.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="crop-controls-card card">
        <div className="crop-filters">
          <div className="cat-buttons">
            {categories.map(cat => (
              <button
                key={cat}
                className={`cat-btn ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="crop-search-box">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            <input
              type="text"
              placeholder="Search crops (e.g. Wheat, Tomatoes)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Crop Suitability Cards Grid */}
      <div className="crop-grid">
        {filteredCrops.map(crop => {
          const evalResult = calculateCropSuitability(crop, weatherData);
          const isSelected = selectedCrop?.id === crop.id;

          return (
            <div
              key={crop.id}
              className={`card crop-card ${isSelected ? 'selected' : ''}`}
              onClick={() => setSelectedCrop(isSelected ? null : crop)}
            >
              <div className="crop-card-header">
                <div className="crop-title-group">
                  <span className="crop-emoji">{crop.icon}</span>
                  <div>
                    <h3 className="crop-name">{crop.name}</h3>
                    <span className="crop-category-tag">{crop.category}</span>
                  </div>
                </div>
                <div className="crop-score-badge" style={{ backgroundColor: evalResult.badgeColor }}>
                  <span className="score-num">{evalResult.score}%</span>
                  <span className="score-status">{evalResult.status}</span>
                </div>
              </div>

              <p className="crop-desc">{crop.description}</p>

              {/* Score Progress Bar */}
              <div className="progress-track">
                <div
                  className="progress-fill"
                  style={{ width: `${evalResult.score}%`, backgroundColor: evalResult.badgeColor }}
                />
              </div>

              {/* Metrics Range Comparison */}
              <div className="crop-metrics-compare">
                <div className="compare-item">
                  <span className="compare-label">Ideal Temp</span>
                  <span className="compare-val">{crop.temp.optMin}°C - {crop.temp.optMax}°C</span>
                </div>
                <div className="compare-item">
                  <span className="compare-label">Ideal Humidity</span>
                  <span className="compare-val">{crop.humidity.optMin}% - {crop.humidity.optMax}%</span>
                </div>
                <div className="compare-item">
                  <span className="compare-label">Water Demand</span>
                  <span className="compare-val highlight">{crop.waterReq}</span>
                </div>
              </div>

              {/* Factors & Agronomic Tips */}
              <div className="crop-factors-list">
                {evalResult.factors.map((f, i) => (
                  <div key={i} className={`factor-item factor-${f.type}`}>
                    <span className="factor-dot" />
                    <span>{f.text}</span>
                  </div>
                ))}
              </div>

              <div className="crop-card-footer">
                <span className="season-tag">📅 {crop.growingSeason}</span>
                <button className="tips-toggle-btn">
                  {isSelected ? 'Hide Details ▲' : 'View Tips & Soil ▼'}
                </button>
              </div>

              {isSelected && (
                <div className="crop-expanded-details">
                  <div className="detail-row">
                    <strong>Soil Requirements:</strong> {crop.soilType}
                  </div>
                  <div className="detail-row">
                    <strong>Sun Requirement:</strong> {crop.sunReq}
                  </div>
                  <div className="detail-row tip-highlight">
                    <strong>Agronomic Tip:</strong> {crop.tips}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
