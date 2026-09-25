import React from 'react';
import { getWindDirection, formatLocalTime, msToMph } from '../services/weatherService';

export default function MetricsGrid({ weatherData, unit }) {
  if (!weatherData) return null;

  const { main = {}, wind = {}, sys = {}, clouds = {}, visibility = 10000, coord = {}, timezone = 0 } = weatherData;

  // Humidity label
  const humidity = main.humidity ?? 0;
  const humidityDesc = humidity < 30 ? 'Low / Dry Air' : humidity <= 60 ? 'Comfortable Range' : 'High Moisture';

  // Wind speed
  const windSpeedStr = unit === 'imperial' ? `${msToMph(wind.speed ?? 0)} mph` : `${(wind.speed ?? 0).toFixed(1)} m/s`;
  const windDeg = wind.deg ?? 0;

  // Visibility
  const visStr = unit === 'imperial' ? `${(visibility / 1609.34).toFixed(1)} mi` : `${(visibility / 1000).toFixed(1)} km`;

  return (
    <section className="metrics-grid">
      {/* Humidity */}
      <div className="card metric-card">
        <div className="metric-header">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
          </svg>
          <span>Humidity</span>
        </div>
        <div className="metric-value">{humidity}%</div>
        <div className="metric-footer">{humidityDesc}</div>
      </div>

      {/* Wind */}
      <div className="card metric-card">
        <div className="metric-header">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"/>
          </svg>
          <span>Wind</span>
        </div>
        <div className="metric-value-row">
          <span className="metric-value">{windSpeedStr}</span>
          <svg className="wind-arrow" style={{ transform: `rotate(${windDeg}deg)` }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="19" x2="12" y2="5"/>
            <polyline points="5 12 12 5 19 12"/>
          </svg>
        </div>
        <div className="metric-footer">Heading: {getWindDirection(windDeg)} ({windDeg}°)</div>
      </div>

      {/* Pressure */}
      <div className="card metric-card">
        <div className="metric-header">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 6v6l4 2"/>
          </svg>
          <span>Pressure</span>
        </div>
        <div className="metric-value">{main.pressure ?? '--'} hPa</div>
        <div className="metric-footer">{main.pressure > 1013 ? 'High Pressure' : 'Low Pressure'}</div>
      </div>

      {/* Visibility */}
      <div className="card metric-card">
        <div className="metric-header">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
            <circle cx="12" cy="12" r="3"/>
          </svg>
          <span>Visibility</span>
        </div>
        <div className="metric-value">{visStr}</div>
        <div className="metric-footer">{visibility >= 10000 ? 'Excellent' : visibility >= 5000 ? 'Moderate' : 'Poor Visibility'}</div>
      </div>

      {/* Sunrise */}
      <div className="card metric-card">
        <div className="metric-header">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2v6M4.93 10.93l1.41 1.41M2 17h20M17.66 12.34l1.41-1.41"/>
            <path d="M17 17a5 5 0 0 0-10 0"/>
          </svg>
          <span>Sunrise</span>
        </div>
        <div className="metric-value">{formatLocalTime(sys.sunrise, timezone)}</div>
        <div className="metric-footer">Local time</div>
      </div>

      {/* Sunset */}
      <div className="card metric-card">
        <div className="metric-header">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 10V4M4.93 10.93l1.41-1.41M2 17h20M17.66 9.52l1.41 1.41"/>
            <path d="M17 17a5 5 0 0 0-10 0"/>
          </svg>
          <span>Sunset</span>
        </div>
        <div className="metric-value">{formatLocalTime(sys.sunset, timezone)}</div>
        <div className="metric-footer">Local time</div>
      </div>

      {/* Cloudiness */}
      <div className="card metric-card">
        <div className="metric-header">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>
          </svg>
          <span>Cloudiness</span>
        </div>
        <div className="metric-value">{clouds.all ?? 0}%</div>
        <div className="metric-footer">{clouds.all > 70 ? 'Heavy Coverage' : clouds.all > 30 ? 'Partly Cloudy' : 'Clear Sky'}</div>
      </div>

      {/* Coordinates */}
      <div className="card metric-card">
        <div className="metric-header">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
          <span>Location</span>
        </div>
        <div className="metric-value small-text">
          {coord.lat ? coord.lat.toFixed(2) : '--'}°, {coord.lon ? coord.lon.toFixed(2) : '--'}°
        </div>
        <div className="metric-footer">Coordinates</div>
      </div>
    </section>
  );
}
