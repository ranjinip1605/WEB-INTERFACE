import React from 'react';
import { formatLocalTime, formatTemp, CONFIG } from '../services/weatherService';

export default function HourlyForecast({ forecastData, unit }) {
  if (!forecastData || !forecastData.list) return null;

  const list = forecastData.list.slice(0, 8); // Next 24 hours (8 x 3-hour blocks)
  const timezone = forecastData.city ? forecastData.city.timezone : 0;

  return (
    <section className="forecast-section">
      <h2 className="section-title">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <polyline points="12 6 12 12 16 14"/>
        </svg>
        24-Hour Hourly Forecast
      </h2>
      <div className="hourly-scroll">
        {list.map((item, idx) => {
          const timeStr = formatLocalTime(item.dt, timezone, { hour: '2-digit', minute: '2-digit' });
          const iconCode = item.weather && item.weather[0] ? item.weather[0].icon : '01d';
          const popPercent = Math.round((item.pop || 0) * 100);

          return (
            <div key={`${item.dt}-${idx}`} className="hourly-card">
              <span className="hourly-time">{timeStr}</span>
              <img src={`${CONFIG.ICON_BASE_URL}${iconCode}.png`} alt="weather" className="hourly-img" />
              <span className="hourly-temp">{formatTemp(item.main.temp, unit)}</span>
              {popPercent > 0 && <span className="hourly-pop">💧 {popPercent}%</span>}
            </div>
          );
        })}
      </div>
    </section>
  );
}
