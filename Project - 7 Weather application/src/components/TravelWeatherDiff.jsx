import React, { useState, useEffect } from 'react';
import { fetchRealTimeWeatherByCity, formatTemp } from '../services/weatherService';

export default function TravelWeatherDiff({ originWeather, unit }) {
  const [destCityInput, setDestCityInput] = useState('Paris');
  const [destWeather, setDestWeather] = useState(null);
  const [loadingDest, setLoadingDest] = useState(false);
  const [errorDest, setErrorDest] = useState(null);

  // Popular quick destination presets
  const popularDestinations = ['Paris', 'London', 'Tokyo', 'New York', 'Dubai', 'Sydney', 'Cairo', 'Bali', 'Swiss Alps', 'Reykjavik'];

  // Fetch destination weather
  const handleFetchDestination = async (cityToFetch) => {
    const target = cityToFetch || destCityInput;
    if (!target) return;
    setLoadingDest(true);
    setErrorDest(null);

    try {
      const res = await fetchRealTimeWeatherByCity(target);
      setDestWeather(res.current);
    } catch (err) {
      setErrorDest(err.message || `Could not load weather for ${target}`);
    } finally {
      setLoadingDest(false);
    }
  };

  useEffect(() => {
    handleFetchDestination('Paris');
  }, []);

  if (!originWeather || !originWeather.main) {
    return (
      <div className="card travel-diff-container">
        <h3 className="section-title">🧳 Weather Diff for Travelers</h3>
        <p className="placeholder-text">Please select or locate your origin city first.</p>
      </div>
    );
  }

  const originName = originWeather.name;
  const destName = destWeather ? destWeather.name : destCityInput;

  // Temperature diff calculation
  const originTemp = originWeather.main.temp;
  const destTemp = destWeather?.main?.temp ?? 0;
  const tempDiffC = Math.round(destTemp - originTemp);

  // Humidity & Rain chance
  const originHum = originWeather.main.humidity;
  const destHum = destWeather?.main?.humidity ?? 0;
  const humDiff = destHum - originHum;

  // Wind speed (km/h)
  const originWind = Math.round((originWeather.wind?.speed || 0) * 3.6);
  const destWind = Math.round(((destWeather?.wind?.speed || 0)) * 3.6);

  // Cloud cover
  const originClouds = originWeather.clouds?.all || 0;
  const destClouds = destWeather?.clouds?.all || 0;

  // Travel Comfort Rating Calculation (0 - 100)
  const calculateComfortScore = (weather) => {
    if (!weather || !weather.main) return 70;
    const t = weather.main.temp;
    const h = weather.main.humidity;
    const w = (weather.wind?.speed || 0) * 3.6;
    const cond = (weather.weather && weather.weather[0]?.main) ? weather.weather[0].main.toLowerCase() : '';

    let score = 100;
    if (t < 10 || t > 32) score -= 20;
    if (t < 0 || t > 38) score -= 25;
    if (h > 80 || h < 25) score -= 15;
    if (w > 25) score -= 15;
    if (cond.includes('rain') || cond.includes('thunder')) score -= 25;
    if (cond.includes('snow')) score -= 15;
    return Math.max(10, Math.min(100, score));
  };

  const originComfort = calculateComfortScore(originWeather);
  const destComfort = destWeather ? calculateComfortScore(destWeather) : 70;

  // Clothing & Gear Packing Advisory
  const getPackingAdvice = () => {
    if (!destWeather || !destWeather.main) return [];
    const tips = [];
    const dt = destWeather.main.temp;
    const cond = (destWeather.weather && destWeather.weather[0]?.main) ? destWeather.weather[0].main.toLowerCase() : '';
    const humidity = destWeather.main.humidity;

    if (tempDiffC <= -8) {
      tips.push({ icon: '🧥', text: `Destination is significantly colder (${tempDiffC}°C difference). Pack thermal layers, heavy coat, and gloves.` });
    } else if (tempDiffC >= 8) {
      tips.push({ icon: '👕', text: `Destination is significantly warmer (+${tempDiffC}°C difference). Pack lightweight breathable linens and shorts.` });
    } else {
      tips.push({ icon: '🧥', text: 'Temperatures are comparable to your origin. Standard layered clothing recommended.' });
    }

    if (cond.includes('rain') || cond.includes('drizzle') || destClouds > 70) {
      tips.push({ icon: '☔', text: 'High precipitation or rain forecast. Bring compact umbrella & waterproof outerwear.' });
    }

    if (dt > 25 && humidity < 50) {
      tips.push({ icon: '🕶️', text: 'Sunny / warm destination. Pack SPF 50+ sunscreen, polarising sunglasses, and hat.' });
    }

    if (destWind > 20) {
      tips.push({ icon: '💨', text: 'Windy conditions expected at destination. Carry windbreaker outer shell.' });
    }

    return tips;
  };

  const packingAdvice = getPackingAdvice();

  return (
    <div className="travel-diff-container">
      {/* Search & Destination Picker Card */}
      <div className="card travel-controls-card">
        <div className="travel-header-row">
          <div>
            <span className="badge-pill blue">Traveler Weather Comparator</span>
            <h2 className="travel-title">Weather Diff: {originName} ➔ {destName}</h2>
            <p className="travel-sub">Compare live conditions, delta metrics, packing advice & travel comfort.</p>
          </div>
        </div>

        {/* Input & Quick Chips */}
        <div className="travel-search-form">
          <div className="dest-input-group">
            <span className="dest-icon">✈️</span>
            <input
              type="text"
              placeholder="Enter travel destination city..."
              value={destCityInput}
              onChange={(e) => setDestCityInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleFetchDestination()}
            />
            <button className="search-btn-sm" onClick={() => handleFetchDestination()} disabled={loadingDest}>
              {loadingDest ? 'Loading...' : 'Compare'}
            </button>
          </div>

          <div className="dest-quick-chips">
            <span className="chips-label">Popular Destinations:</span>
            {popularDestinations.map(city => (
              <button
                key={city}
                className={`chip-sm ${destName.toLowerCase() === city.toLowerCase() ? 'active' : ''}`}
                onClick={() => {
                  setDestCityInput(city);
                  handleFetchDestination(city);
                }}
              >
                {city}
              </button>
            ))}
          </div>
        </div>

        {errorDest && <div className="error-banner">⚠️ {errorDest}</div>}
      </div>

      {/* Side-by-Side Comparison Display */}
      {destWeather && (
        <div className="travel-comparison-wrapper">
          {/* Main Temp Delta Highlight Banner */}
          <div className="card delta-highlight-card">
            <div className="delta-stat-main">
              <span className="delta-badge">
                {tempDiffC > 0 ? `+${tempDiffC}°C Warmer` : tempDiffC < 0 ? `${tempDiffC}°C Colder` : 'Same Temperature'}
              </span>
              <h3 className="delta-headline">
                {destName} is {Math.abs(tempDiffC)}°C {tempDiffC >= 0 ? 'warmer' : 'cooler'} than {originName}
              </h3>
            </div>
            <div className="comfort-ratings-row">
              <div className="comfort-box">
                <span className="comfort-label">Origin Comfort Index</span>
                <span className="comfort-value">{originComfort}/100</span>
              </div>
              <div className="comfort-arrow">➔</div>
              <div className="comfort-box highlight">
                <span className="comfort-label">Destination Comfort Index</span>
                <span className="comfort-value">{destComfort}/100</span>
              </div>
            </div>
          </div>

          {/* Side by Side Weather Cards */}
          <div className="side-by-side-grid">
            {/* Origin Card */}
            <div className="card location-diff-card origin-card">
              <div className="loc-card-header">
                <span className="loc-tag">Origin</span>
                <h3 className="loc-name">{originWeather.name}</h3>
                <span className="loc-flag">{originWeather.sys?.flag || '🏠'}</span>
              </div>
              <div className="loc-temp-display">
                <span className="loc-temp-num">{formatTemp(originTemp, unit)}</span>
                <span className="loc-cond-desc">{(originWeather.weather && originWeather.weather[0]?.description) || 'Clear'}</span>
              </div>

              <div className="loc-metrics-list">
                <div className="metric-row">
                  <span>Humidity</span>
                  <strong>{originHum}%</strong>
                </div>
                <div className="metric-row">
                  <span>Wind Speed</span>
                  <strong>{originWind} km/h</strong>
                </div>
                <div className="metric-row">
                  <span>Cloud Cover</span>
                  <strong>{originClouds}%</strong>
                </div>
                <div className="metric-row">
                  <span>Pressure</span>
                  <strong>{originWeather.main.pressure} hPa</strong>
                </div>
              </div>
            </div>

            {/* Delta Visual Bar Column */}
            <div className="card delta-bars-card">
              <h4 className="delta-card-title">Comparative Metrics Breakdown</h4>

              <div className="diff-bar-item">
                <div className="diff-label-row">
                  <span>Temperature ({originName} vs {destName})</span>
                  <span className={tempDiffC > 0 ? 'text-warm' : 'text-cool'}>
                    {tempDiffC > 0 ? `+${tempDiffC}°C` : `${tempDiffC}°C`}
                  </span>
                </div>
                <div className="diff-bar-track">
                  <div
                    className="diff-bar-fill temp-fill"
                    style={{
                      width: `${Math.min(100, Math.max(10, (destTemp + 20) * 2))}%`
                    }}
                  />
                </div>
              </div>

              <div className="diff-bar-item">
                <div className="diff-label-row">
                  <span>Humidity Delta</span>
                  <span>{humDiff > 0 ? `+${humDiff}% More Humid` : `${humDiff}% Drier`}</span>
                </div>
                <div className="diff-bar-track">
                  <div
                    className="diff-bar-fill hum-fill"
                    style={{ width: `${destHum}%` }}
                  />
                </div>
              </div>

              <div className="diff-bar-item">
                <div className="diff-label-row">
                  <span>Wind Speed Difference</span>
                  <span>{destWind - originWind > 0 ? `+${destWind - originWind} km/h` : `${destWind - originWind} km/h`}</span>
                </div>
                <div className="diff-bar-track">
                  <div
                    className="diff-bar-fill wind-fill"
                    style={{ width: `${Math.min(100, destWind * 2.5)}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Destination Card */}
            <div className="card location-diff-card dest-card">
              <div className="loc-card-header">
                <span className="loc-tag dest">Destination</span>
                <h3 className="loc-name">{destWeather.name}</h3>
                <span className="loc-flag">{destWeather.sys?.flag || '✈️'}</span>
              </div>
              <div className="loc-temp-display">
                <span className="loc-temp-num">{formatTemp(destTemp, unit)}</span>
                <span className="loc-cond-desc">{(destWeather.weather && destWeather.weather[0]?.description) || 'Clear'}</span>
              </div>

              <div className="loc-metrics-list">
                <div className="metric-row">
                  <span>Humidity</span>
                  <strong>{destHum}%</strong>
                </div>
                <div className="metric-row">
                  <span>Wind Speed</span>
                  <strong>{destWind} km/h</strong>
                </div>
                <div className="metric-row">
                  <span>Cloud Cover</span>
                  <strong>{destClouds}%</strong>
                </div>
                <div className="metric-row">
                  <span>Pressure</span>
                  <strong>{destWeather.main.pressure} hPa</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Packing & Gear Advisory Section */}
          <div className="card packing-advisory-card">
            <h3 className="section-title">🎒 Smart Travel Packing Checklist</h3>
            <div className="packing-tips-grid">
              {packingAdvice.map((item, i) => (
                <div key={i} className="packing-tip-item">
                  <span className="tip-icon">{item.icon}</span>
                  <p className="tip-text">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
