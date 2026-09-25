import React from 'react';
import { formatDateShort, formatDayName, formatTemp, CONFIG } from '../services/weatherService';

export default function DailyForecast({ forecastData, unit }) {
  if (!forecastData || !forecastData.list) return null;

  const timezone = forecastData.city ? forecastData.city.timezone : 0;
  const dailyMap = {};

  // Group 3-hour entries by date
  forecastData.list.forEach(item => {
    const dateStr = formatDateShort(item.dt, timezone);
    if (!dailyMap[dateStr]) {
      dailyMap[dateStr] = {
        dt: item.dt,
        tempsMin: [],
        tempsMax: [],
        icons: [],
        descriptions: []
      };
    }
    dailyMap[dateStr].tempsMin.push(item.main.temp_min);
    dailyMap[dateStr].tempsMax.push(item.main.temp_max);
    if (item.weather && item.weather[0]) {
      dailyMap[dateStr].icons.push(item.weather[0].icon);
      dailyMap[dateStr].descriptions.push(item.weather[0].description);
    }
  });

  const days = Object.keys(dailyMap).slice(0, 5);

  return (
    <section className="forecast-section" id="dailyForecastSection">
      <h2 className="section-title">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
          <line x1="16" y1="2" x2="16" y2="6"/>
          <line x1="8" y1="2" x2="8" y2="6"/>
          <line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
        5-Day Weather Forecast
      </h2>
      <div className="daily-grid">
        {days.map(dayKey => {
          const dayData = dailyMap[dayKey];
          const minTemp = Math.min(...dayData.tempsMin);
          const maxTemp = Math.max(...dayData.tempsMax);
          const midIndex = Math.floor(dayData.icons.length / 2);
          const iconCode = dayData.icons[midIndex] || '01d';
          const desc = dayData.descriptions[midIndex] || 'Clear';
          const dayName = formatDayName(dayData.dt, timezone);

          return (
            <div key={dayKey} className="daily-card">
              <div>
                <div className="daily-day">{dayName}</div>
                <div className="daily-date">{dayKey}</div>
              </div>
              <div className="daily-visual">
                <img src={`${CONFIG.ICON_BASE_URL}${iconCode}@2x.png`} alt={desc} className="daily-img" />
                <span className="daily-desc">{desc}</span>
              </div>
              <div className="daily-temp-range">
                <span className="temp-high">{formatTemp(maxTemp, unit)}</span>
                <span className="temp-low">{formatTemp(minTemp, unit)}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
