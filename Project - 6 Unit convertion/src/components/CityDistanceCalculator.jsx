import React, { useState } from 'react';
import { MapPin, Navigation, Plane, Car } from 'lucide-react';
import { CITIES, calculateCityDistance } from '../data/citiesData';

export function CityDistanceCalculator() {
  const [city1Code, setCity1Code] = useState('NYC');
  const [city2Code, setCity2Code] = useState('LON');

  const city1 = CITIES.find((c) => c.code === city1Code) || CITIES[0];
  const city2 = CITIES.find((c) => c.code === city2Code) || CITIES[1];

  const distanceStats = calculateCityDistance(city1.lat, city1.lon, city2.lat, city2.lon);

  return (
    <div className="tool-card glass-panel animate-fade-in">
      <div className="tool-header">
        <Navigation className="tool-icon text-red" />
        <div>
          <h3 className="tool-title">Distance Between Places</h3>
          <p className="tool-subtitle">Geographic Haversine distance & estimated travel times</p>
        </div>
      </div>

      <div className="grid-2-col">
        <div className="form-group">
          <label>Origin City:</label>
          <select
            value={city1Code}
            onChange={(e) => setCity1Code(e.target.value)}
            className="tool-dropdown"
          >
            {CITIES.map((c) => (
              <option key={c.code} value={c.code}>{c.name}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Destination City:</label>
          <select
            value={city2Code}
            onChange={(e) => setCity2Code(e.target.value)}
            className="tool-dropdown"
          >
            {CITIES.map((c) => (
              <option key={c.code} value={c.code}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="distance-stats-grid">
        <div className="stat-card highlight">
          <MapPin className="stat-icon text-red" />
          <div className="stat-content">
            <span className="stat-label">Kilometers:</span>
            <span className="stat-value text-red">{Math.round(distanceStats.km).toLocaleString()} km</span>
          </div>
        </div>

        <div className="stat-card">
          <span className="stat-label">Miles:</span>
          <span className="stat-value">{Math.round(distanceStats.miles).toLocaleString()} mi</span>
        </div>

        <div className="stat-card">
          <span className="stat-label">Nautical Miles:</span>
          <span className="stat-value">{Math.round(distanceStats.nauticalMiles).toLocaleString()} nmi</span>
        </div>

        <div className="stat-card">
          <Plane className="stat-icon" />
          <div className="stat-content">
            <span className="stat-label">Flight Time:</span>
            <span className="stat-value">~{distanceStats.flightHours} hrs</span>
          </div>
        </div>

        <div className="stat-card">
          <Car className="stat-icon" />
          <div className="stat-content">
            <span className="stat-label">Driving Time:</span>
            <span className="stat-value">~{distanceStats.drivingHours} hrs</span>
          </div>
        </div>
      </div>
    </div>
  );
}
