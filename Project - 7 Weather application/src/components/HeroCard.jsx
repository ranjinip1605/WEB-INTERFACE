import React from 'react';
import { displayTempNum, formatTemp, CONFIG } from '../services/weatherService';

function getGreeting(utcSeconds, timezoneOffset) {
  if (!utcSeconds) return 'Good day';
  const cityDate = new Date((utcSeconds + timezoneOffset) * 1000);
  const hour = cityDate.getUTCHours();
  if (hour >= 5 && hour < 12) return 'Good morning';
  if (hour >= 12 && hour < 17) return 'Good afternoon';
  if (hour >= 17 && hour < 22) return 'Good evening';
  return 'Good night';
}

function getFullDateString(utcSeconds, timezoneOffset) {
  if (!utcSeconds) return '';
  const cityDate = new Date((utcSeconds + timezoneOffset) * 1000);
  return cityDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC'
  });
}

function getTimeString(utcSeconds, timezoneOffset) {
  if (!utcSeconds) return '';
  const cityDate = new Date((utcSeconds + timezoneOffset) * 1000);
  return cityDate.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: 'UTC'
  });
}

function getSmartInsight(weatherObj, tempC) {
  const main = (weatherObj.main || '').toLowerCase();
  if (tempC >= 30) return 'Expect hot weather ahead starting Tomorrow';
  if (tempC <= 10) return 'Chilly temperatures ahead, bundle up!';
  if (main.includes('rain')) return 'Rain showers expected, keep an umbrella handy';
  if (main.includes('cloud')) return 'Partly cloudy & pleasant conditions expected';
  return 'Clear, sunny weather expected over the next 5 days';
}

export default function HeroCard({ weatherData, unit }) {
  if (!weatherData) return null;

  const { name, sys = {}, main = {}, weather = [], dt, timezone = 0 } = weatherData;
  const weatherObj = weather[0] || {};
  const flagEmoji = sys.flag ? ` ${sys.flag}` : '';

  const greeting = getGreeting(dt, timezone);
  const fullDate = getFullDateString(dt, timezone);
  const timeStr = getTimeString(dt, timezone);
  const insight = getSmartInsight(weatherObj, main.temp ?? 20);

  const handleScrollToForecast = () => {
    const dailySec = document.getElementById('dailyForecastSection');
    if (dailySec) {
      dailySec.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="hero-section-wrapper">
      {/* Dynamic Time Greeting & Full Date Time Header */}
      <div className="greeting-header-container">
        <h2 className="greeting-title">{greeting}</h2>
        <p className="full-date-time-bar">
          📅 <strong>{fullDate}</strong> &bull; ⏰ <strong>{timeStr}</strong> <span className="local-tag">(Local Time)</span>
        </p>
      </div>

      {/* Styled Modern Weather Widget Card */}
      <div className="card widget-hero-card">
        {/* Widget Top Bar */}
        <div className="widget-top-bar">
          <div className="location-picker">
            <svg className="home-icon" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
            </svg>
            <span className="widget-city-name">{name}, {sys.country}{flagEmoji}</span>
            <svg className="dropdown-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </div>
          <div className="widget-more-menu" title="Options">
            &bull;&bull;&bull;
          </div>
        </div>

        {/* Widget Main Body */}
        <div className="widget-main-body">
          {/* Left: Weather Icon & Temperature */}
          <div className="widget-temp-group">
            <img
              src={`${CONFIG.ICON_BASE_URL}${weatherObj.icon || '01d'}@4x.png`}
              alt={weatherObj.description || 'Weather condition'}
              className="widget-weather-img"
            />
            <div className="widget-temp-val">
              <span className="widget-temp-number">{displayTempNum(main.temp, unit)}</span>
              <span className="widget-temp-unit">{unit === 'imperial' ? '°F' : '°C'}</span>
            </div>
          </div>

          {/* Right: Smart Forecast Insight Banner */}
          <div className="widget-insight-box">
            <span className="insight-icon">🌡️</span>
            <div className="insight-content">
              <p className="insight-text">{insight} &rsaquo;</p>
            </div>
          </div>
        </div>

        {/* Hero Footer Stats */}
        <div className="widget-footer-stats">
          <div className="stat-pill">
            <span>High: <strong>{formatTemp(main.temp_max, unit)}</strong></span>
            <span className="divider">•</span>
            <span>Low: <strong>{formatTemp(main.temp_min, unit)}</strong></span>
          </div>
          <div className="stat-pill">
            <span>Feels like: <strong>{formatTemp(main.feels_like, unit)}</strong></span>
          </div>
        </div>

        {/* Bottom Pill Action Button */}
        <div className="widget-action-row">
          <button className="see-forecast-btn" onClick={handleScrollToForecast}>
            See full forecast
          </button>
        </div>
      </div>
    </div>
  );
}
