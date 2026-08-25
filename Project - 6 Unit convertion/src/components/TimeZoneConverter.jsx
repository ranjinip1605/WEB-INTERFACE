import React, { useState, useEffect } from 'react';
import { Clock, Globe } from 'lucide-react';
import { CITIES } from '../data/citiesData';

export function TimeZoneConverter() {
  const [city1Key, setCity1Key] = useState('NYC');
  const [city2Key, setCity2Key] = useState('LON');
  const [hourSlider, setHourSlider] = useState(12); // Default 12:00 PM

  const city1 = CITIES.find((c) => c.code === city1Key) || CITIES[0];
  const city2 = CITIES.find((c) => c.code === city2Key) || CITIES[1];

  // Offset difference in hours
  const diffHours = city2.offset - city1.offset;

  // Calculate target hour
  let targetHour = (hourSlider + diffHours) % 24;
  if (targetHour < 0) targetHour += 24;

  const formatHour = (h) => {
    const wholeH = Math.floor(h);
    const mins = Math.round((h - wholeH) * 60);
    const period = wholeH >= 12 ? 'PM' : 'AM';
    const displayH = wholeH % 12 === 0 ? 12 : wholeH % 12;
    const padMin = mins < 10 ? `0${mins}` : mins;
    return `${displayH}:${padMin} ${period}`;
  };

  return (
    <div className="tool-card glass-panel animate-fade-in">
      <div className="tool-header">
        <Globe className="tool-icon text-red" />
        <div>
          <h3 className="tool-title">World Time-Zone Converter</h3>
          <p className="tool-subtitle">Compare live times and interactive schedules across world cities</p>
        </div>
      </div>

      <div className="timezone-grid">
        {/* City 1 Selector */}
        <div className="tz-city-box">
          <label className="tz-label">Source Location:</label>
          <select
            value={city1Key}
            onChange={(e) => setCity1Key(e.target.value)}
            className="tool-dropdown"
          >
            {CITIES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.name} (UTC{c.offset >= 0 ? `+${c.offset}` : c.offset})
              </option>
            ))}
          </select>
          <div className="time-display-big text-red">
            {formatHour(hourSlider)}
          </div>
        </div>

        {/* Slider control */}
        <div className="tz-slider-box">
          <label className="tz-label">Adjust Hour (00:00 - 23:00):</label>
          <input
            type="range"
            min="0"
            max="23"
            step="1"
            value={hourSlider}
            onChange={(e) => setHourSlider(Number(e.target.value))}
            className="tz-range-input"
          />
          <span className="slider-val-hint">{hourSlider}:00 local time</span>
        </div>

        {/* City 2 Selector */}
        <div className="tz-city-box">
          <label className="tz-label">Target Location:</label>
          <select
            value={city2Key}
            onChange={(e) => setCity2Key(e.target.value)}
            className="tool-dropdown"
          >
            {CITIES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.name} (UTC{c.offset >= 0 ? `+${c.offset}` : c.offset})
              </option>
            ))}
          </select>
          <div className="time-display-big text-red">
            {formatHour(targetHour)}
          </div>
        </div>
      </div>

      <div className="tz-time-diff-bar">
        <Clock size={16} className="text-red" />
        <span>
          {city2.name} is <strong>{Math.abs(diffHours)} hours {diffHours >= 0 ? 'ahead of' : 'behind'}</strong> {city1.name}.
        </span>
      </div>
    </div>
  );
}
