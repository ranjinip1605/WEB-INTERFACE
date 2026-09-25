import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import HeroCard from './components/HeroCard';
import RotatingGlobe from './components/RotatingGlobe';
import MetricsGrid from './components/MetricsGrid';
import HourlyForecast from './components/HourlyForecast';
import DailyForecast from './components/DailyForecast';
import CityMap from './components/CityMap';
import ToastBanner from './components/ToastBanner';
import LoadingOverlay from './components/LoadingOverlay';

// Advanced Features Components
import NavTabs from './components/NavTabs';
import CropAdvisor from './components/CropAdvisor';
import TravelWeatherDiff from './components/TravelWeatherDiff';
import PhotoWeatherAssistant from './components/PhotoWeatherAssistant';

import {
  CONFIG,
  fetchRealTimeWeatherByCity,
  fetchRealTimeWeatherByCoords
} from './services/weatherService';

export default function App() {
  const [unit, setUnit] = useState(() => localStorage.getItem(CONFIG.STORAGE_KEYS.UNIT) || 'metric');
  const [colorMode, setColorMode] = useState(() => localStorage.getItem(CONFIG.STORAGE_KEYS.COLOR_MODE) || 'dark');
  const [activeTab, setActiveTab] = useState('overview');
  const [recentSearches, setRecentSearches] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEYS.RECENT)) || ['Tokyo', 'Paris', 'New York', 'London', 'Sydney', 'Cairo', 'Mumbai', 'Dubai', 'Rio de Janeiro', 'Singapore'];
    } catch {
      return ['Tokyo', 'Paris', 'New York', 'London', 'Sydney', 'Cairo', 'Mumbai', 'Dubai', 'Rio de Janeiro', 'Singapore'];
    }
  });

  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState('Fetching live weather...');
  const [toast, setToast] = useState(null);

  // Helper to add recent search
  const addRecentSearch = useCallback((city) => {
    if (!city) return;
    setRecentSearches(prev => {
      const filtered = prev.filter(c => c.toLowerCase() !== city.trim().toLowerCase());
      const updated = [city.trim(), ...filtered].slice(0, 8);
      localStorage.setItem(CONFIG.STORAGE_KEYS.RECENT, JSON.stringify(updated));
      return updated;
    });
  }, []);

  // Fetch real-time live weather logic
  const handleLoadCity = useCallback(async (cityName) => {
    if (!cityName) return;
    setToast(null);
    setLoading(true);
    setLoadingMsg(`Locating & fetching real-time weather for ${cityName}...`);

    try {
      const result = await fetchRealTimeWeatherByCity(cityName);
      setWeatherData(result.current);
      setForecastData(result.forecast);
      addRecentSearch(result.current.name);
    } catch (err) {
      setToast({ message: err.message || 'Error fetching real-time weather.', type: 'error' });
    } finally {
      setLoading(false);
    }
  }, [addRecentSearch]);

  // Real-time Geolocation handler
  const handleLocateMe = useCallback(() => {
    setLoading(true);
    setLoadingMsg('Accessing live coordinates...');
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          try {
            const result = await fetchRealTimeWeatherByCoords(pos.coords.latitude, pos.coords.longitude);
            setWeatherData(result.current);
            setForecastData(result.forecast);
            addRecentSearch('Your Location');
          } catch (err) {
            setToast({ message: err.message || 'Location weather error.', type: 'error' });
            handleLoadCity(CONFIG.DEFAULT_CITY);
          } finally {
            setLoading(false);
          }
        },
        () => {
          setLoading(false);
          setToast({ message: 'Geolocation disabled or unavailable. Displaying default city.', type: 'info' });
          handleLoadCity(CONFIG.DEFAULT_CITY);
        },
        { timeout: 8000 }
      );
    } else {
      handleLoadCity(CONFIG.DEFAULT_CITY);
    }
  }, [handleLoadCity, addRecentSearch]);

  // Unit toggle handler (°C / °F)
  const handleToggleUnit = (newUnit) => {
    setUnit(newUnit);
    localStorage.setItem(CONFIG.STORAGE_KEYS.UNIT, newUnit);
  };

  // Color mode toggle handler (Dark vs Light)
  const handleToggleColorMode = () => {
    const nextMode = colorMode === 'dark' ? 'light' : 'dark';
    setColorMode(nextMode);
    localStorage.setItem(CONFIG.STORAGE_KEYS.COLOR_MODE, nextMode);
  };

  // Initial load
  useEffect(() => {
    handleLoadCity(CONFIG.DEFAULT_CITY);
  }, [handleLoadCity]);

  // Color Mode Attribute effect
  useEffect(() => {
    document.body.setAttribute('data-color-mode', colorMode);
  }, [colorMode]);

  // Dynamic Weather Condition Theme Effect
  useEffect(() => {
    if (!weatherData) return;
    const weatherObj = (weatherData.weather && weatherData.weather[0]) || {};
    const main = (weatherObj.main || '').toLowerCase();
    const icon = weatherObj.icon || '01d';
    const isNight = icon.endsWith('n');

    let theme = 'clear-day';
    if (main.includes('clear')) {
      theme = isNight ? 'clear-night' : 'clear-day';
    } else if (main.includes('cloud')) {
      theme = 'clouds';
    } else if (main.includes('rain') || main.includes('drizzle')) {
      theme = 'rain';
    } else if (main.includes('thunderstorm')) {
      theme = 'thunderstorm';
    } else if (main.includes('snow')) {
      theme = 'snow';
    } else if (main.includes('mist') || main.includes('fog') || main.includes('haze')) {
      theme = 'mist';
    }

    document.body.setAttribute('data-weather-theme', theme);
  }, [weatherData]);

  const coord = weatherData ? weatherData.coord : null;

  return (
    <div className="app-container">
      <div className="bg-overlay" />

      <Header
        unit={unit}
        onToggleUnit={handleToggleUnit}
        colorMode={colorMode}
        onToggleColorMode={handleToggleColorMode}
        onLocate={handleLocateMe}
      />

      <SearchBar
        onSearch={handleLoadCity}
        recentSearches={recentSearches}
        onSelectRecent={handleLoadCity}
      />

      {/* Primary Navigation Tabs */}
      <NavTabs activeTab={activeTab} onTabChange={setActiveTab} />

      <ToastBanner toast={toast} onClose={() => setToast(null)} />

      <main className="weather-content">
        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <>
            {/* Split Top Layout: Hero Card on Left & 3D Rotating Globe on Right */}
            <div className="hero-globe-grid">
              <HeroCard weatherData={weatherData} unit={unit} />
              {coord && (
                <RotatingGlobe
                  lat={coord.lat}
                  lon={coord.lon}
                  cityName={weatherData ? weatherData.name : ''}
                />
              )}
            </div>

            <MetricsGrid weatherData={weatherData} unit={unit} />

            {coord && (
              <CityMap
                cityName={weatherData ? weatherData.name : ''}
                lat={coord.lat}
                lon={coord.lon}
              />
            )}

            <HourlyForecast forecastData={forecastData} unit={unit} />
            <DailyForecast forecastData={forecastData} unit={unit} />
          </>
        )}

        {/* TAB 2: CROP CULTIVATION PREDICTOR */}
        {activeTab === 'crops' && (
          <CropAdvisor weatherData={weatherData} unit={unit} />
        )}

        {/* TAB 3: TRAVEL WEATHER DIFF */}
        {activeTab === 'travel' && (
          <TravelWeatherDiff originWeather={weatherData} unit={unit} />
        )}

        {/* TAB 4: PHOTOGRAPHY WEATHER ASSISTANT */}
        {activeTab === 'photo' && (
          <PhotoWeatherAssistant weatherData={weatherData} />
        )}
      </main>

      <LoadingOverlay isLoading={loading} message={loadingMsg} />

      <footer className="app-footer">
        <p>Atmosphere Real-Time Weather &bull; Interactive 3D Globe, Crop Advisor, Travel Weather Diff &amp; Photography Assistant</p>
      </footer>
    </div>
  );
}
