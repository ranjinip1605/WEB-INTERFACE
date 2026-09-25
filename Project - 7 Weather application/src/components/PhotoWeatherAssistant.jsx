import React, { useState, useEffect, useMemo } from 'react';
import {
  calculateSolarPhotoWindows,
  getNextPhotoWindow,
  predictSunsetQuality,
  getLightQualityScore
} from '../services/photoService';
import { formatLocalTime } from '../services/weatherService';

export default function PhotoWeatherAssistant({ weatherData }) {
  const [nowSec, setNowSec] = useState(() => Math.floor(Date.now() / 1000));

  // Ticking countdown timer effect (updates every second)
  useEffect(() => {
    const timer = setInterval(() => {
      setNowSec(Math.floor(Date.now() / 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const windows = useMemo(() => calculateSolarPhotoWindows(weatherData), [weatherData]);
  const activeNextWindow = useMemo(() => getNextPhotoWindow(weatherData), [weatherData, nowSec]);
  const sunsetQuality = useMemo(() => predictSunsetQuality(weatherData), [weatherData]);
  const lightScoreData = useMemo(() => getLightQualityScore(weatherData), [weatherData, nowSec]);

  if (!weatherData || !weatherData.sys) {
    return (
      <div className="card photo-assistant-container">
        <h3 className="section-title">📸 Photography Weather Assistant</h3>
        <p className="placeholder-text">Please search or locate a city to compute photography lighting metrics.</p>
      </div>
    );
  }

  const tz = weatherData.timezone || 0;
  const cityName = weatherData.name;

  // Format countdown string HH:MM:SS
  const formatCountdown = (totalSec) => {
    if (totalSec <= 0) return '00:00:00';
    const hrs = Math.floor(totalSec / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="photo-assistant-container">
      {/* Header Banner */}
      <div className="card photo-header-card">
        <div className="photo-header-top">
          <div>
            <span className="badge-pill amber">Photographer Toolkit</span>
            <h2 className="photo-title">Photography Weather Assistant &bull; {cityName}</h2>
            <p className="photo-sub">Solar elevation timings, live Golden/Blue Hour countdown & sky vibrancy analysis.</p>
          </div>
          <div className="sun-times-pill">
            <span>🌅 Sunrise: <strong>{formatLocalTime(windows.sunrise, tz)}</strong></span>
            <span>🌇 Sunset: <strong>{formatLocalTime(windows.sunset, tz)}</strong></span>
          </div>
        </div>
      </div>

      {/* Hero Live Countdown Timer Card */}
      <div className="card countdown-hero-card" style={{ borderColor: activeNextWindow.color }}>
        <div className="countdown-content">
          <div className="countdown-badge-row">
            <span className="countdown-icon">{activeNextWindow.icon}</span>
            <span className="countdown-status-tag" style={{ backgroundColor: activeNextWindow.color }}>
              {activeNextWindow.label}
            </span>
          </div>

          <div className="timer-display">
            <span className="timer-digits">{formatCountdown(activeNextWindow.remainingSec)}</span>
            <span className="timer-sublabel">Hours : Minutes : Seconds</span>
          </div>

          <p className="countdown-tip">
            {activeNextWindow.isActive
              ? `Currently shooting in ${activeNextWindow.type}! Optimal natural lighting active.`
              : `Next optimal shooting window is ${activeNextWindow.type}. Get your camera gear ready.`}
          </p>
        </div>

        {/* Circular / Progress Ring Display */}
        <div className="progress-ring-wrapper">
          <div className="ring-inner">
            <span className="ring-percent">{activeNextWindow.progress}%</span>
            <span className="ring-sub">{activeNextWindow.isActive ? 'Active' : 'Upcoming'}</span>
          </div>
        </div>
      </div>

      {/* Solar Windows Schedule Grid */}
      <div className="card solar-windows-card">
        <h3 className="section-title">🌅 Today's Golden & Blue Hour Schedule</h3>
        <div className="windows-grid">
          {/* Morning Blue Hour */}
          <div className="window-box blue-hour">
            <div className="box-header">
              <span className="box-icon">🌌</span>
              <span className="box-title">Morning Blue Hour</span>
            </div>
            <div className="box-time">
              {formatLocalTime(windows.morningBlue.start, tz)} - {formatLocalTime(windows.morningBlue.end, tz)}
            </div>
            <p className="box-desc">Deep twilight blue sky; low ambient contrast for serene long exposures.</p>
          </div>

          {/* Morning Golden Hour */}
          <div className="window-box golden-hour">
            <div className="box-header">
              <span className="box-icon">🌅</span>
              <span className="box-title">Morning Golden Hour</span>
            </div>
            <div className="box-time">
              {formatLocalTime(windows.morningGolden.start, tz)} - {formatLocalTime(windows.morningGolden.end, tz)}
            </div>
            <p className="box-desc">Warm 3000K sunlight with soft long directional shadows.</p>
          </div>

          {/* Evening Golden Hour */}
          <div className="window-box golden-hour evening">
            <div className="box-header">
              <span className="box-icon">🌇</span>
              <span className="box-title">Evening Golden Hour</span>
            </div>
            <div className="box-time">
              {formatLocalTime(windows.eveningGolden.start, tz)} - {formatLocalTime(windows.eveningGolden.end, tz)}
            </div>
            <p className="box-desc">Rich amber sunset light ideal for portraits and landscape color depth.</p>
          </div>

          {/* Evening Blue Hour */}
          <div className="window-box blue-hour evening">
            <div className="box-header">
              <span className="box-icon">🏙️</span>
              <span className="box-title">Evening Blue Hour</span>
            </div>
            <div className="box-time">
              {formatLocalTime(windows.eveningBlue.start, tz)} - {formatLocalTime(windows.eveningBlue.end, tz)}
            </div>
            <p className="box-desc">Balanced sky illumination vs warm artificial city lights for cityscapes.</p>
          </div>
        </div>
      </div>

      {/* Sunset Quality & Light Score Two-Column Grid */}
      <div className="photo-two-col">
        {/* Sunset Quality Forecast */}
        <div className="card sunset-forecast-card">
          <div className="card-top-row">
            <h3 className="section-title">🌆 Sunset Sky Vibrancy Forecast</h3>
            <span className="vibrancy-badge" style={{ backgroundColor: sunsetQuality.color }}>
              {sunsetQuality.quality}
            </span>
          </div>

          <div className="vibrancy-score-display">
            <span className="vibrancy-number">{sunsetQuality.score}</span>
            <span className="vibrancy-max">/100 Sky Score</span>
          </div>

          <div className="vibrancy-track">
            <div
              className="vibrancy-fill"
              style={{ width: `${sunsetQuality.score}%`, backgroundColor: sunsetQuality.color }}
            />
          </div>

          <p className="vibrancy-narrative">{sunsetQuality.description}</p>

          <div className="cloud-breakdown-row">
            <div className="cloud-stat">
              <span>Total Cloud Cover</span>
              <strong>{sunsetQuality.cloudCover}%</strong>
            </div>
            <div className="cloud-stat">
              <span>Visibility</span>
              <strong>{sunsetQuality.visibilityKm} km</strong>
            </div>
          </div>
        </div>

        {/* Light Quality Score & Camera Settings */}
        <div className="card light-quality-card">
          <div className="card-top-row">
            <h3 className="section-title">💡 Light Quality Score</h3>
            <span className="light-score-pill">{lightScoreData.score}/100</span>
          </div>

          <div className="light-type-badge">
            Current Light Condition: <strong>{lightScoreData.lightType}</strong>
          </div>

          {/* Camera Settings Recommendation Box */}
          <div className="camera-settings-box">
            <h4 className="settings-box-title">📷 Recommended Camera Settings</h4>
            <div className="settings-grid">
              <div className="setting-item">
                <span className="setting-label">ISO</span>
                <span className="setting-val">{lightScoreData.cameraSettings.iso}</span>
              </div>
              <div className="setting-item">
                <span className="setting-label">Aperture</span>
                <span className="setting-val">{lightScoreData.cameraSettings.aperture}</span>
              </div>
              <div className="setting-item">
                <span className="setting-label">White Balance</span>
                <span className="setting-val">{lightScoreData.cameraSettings.wb}</span>
              </div>
              <div className="setting-item">
                <span className="setting-label">Filters</span>
                <span className="setting-val">{lightScoreData.cameraSettings.filters}</span>
              </div>
            </div>
            <div className="tripod-note">
              <strong>Tripod Requirement:</strong> {lightScoreData.cameraSettings.tripod}
            </div>
          </div>

          {/* Shooting Style Advice */}
          <div className="style-advice-section">
            <h4 className="advice-title">🎨 Shooting Style Advice</h4>
            <ul className="advice-list">
              {lightScoreData.styleAdvice.map((adv, i) => (
                <li key={i}>{adv}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
