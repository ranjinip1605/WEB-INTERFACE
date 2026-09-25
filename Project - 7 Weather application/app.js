/**
 * ATMOSPHERE WEATHER APP - CORE APPLICATION LOGIC
 * Features: OpenWeatherMap API Integration, Geolocation, Unit Conversion,
 * 5-Day & 24-Hour Forecast Processing, Dynamic Themes, Mock Fallback Mode.
 */

// ==========================================================================
// 1. STATE & CONFIGURATION
// ==========================================================================
const CONFIG = {
    // Standard OpenWeatherMap Base URLs
    WEATHER_URL: 'https://api.openweathermap.org/data/2.5/weather',
    FORECAST_URL: 'https://api.openweathermap.org/data/2.5/forecast',
    DEFAULT_CITY: 'London',
    ICON_BASE_URL: 'https://openweathermap.org/img/wn/',
    STORAGE_KEYS: {
        API_KEY: 'ATMOSPHERE_OWM_API_KEY',
        UNIT: 'ATMOSPHERE_UNIT_PREF',
        RECENT: 'ATMOSPHERE_RECENT_SEARCHES'
    }
};

const state = {
    apiKey: localStorage.getItem(CONFIG.STORAGE_KEYS.API_KEY) || '',
    unit: localStorage.getItem(CONFIG.STORAGE_KEYS.UNIT) || 'metric', // 'metric' (°C) or 'imperial' (°F)
    currentCity: '',
    currentWeatherData: null,
    forecastData: null,
    recentSearches: JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEYS.RECENT)) || ['London', 'Tokyo', 'New York', 'Paris', 'Sydney']
};

// ==========================================================================
// 2. DOM ELEMENTS
// ==========================================================================
const DOM = {
    // Header & Controls
    btnGeo: document.getElementById('btnGeo'),
    btnApiKey: document.getElementById('btnApiKey'),
    unitC: document.getElementById('unitC'),
    unitF: document.getElementById('unitF'),
    displayUnit: document.getElementById('displayUnit'),

    // Search Form
    searchForm: document.getElementById('searchForm'),
    cityInput: document.getElementById('cityInput'),
    searchBtn: document.getElementById('searchBtn'),
    clearSearch: document.getElementById('clearSearch'),
    chipsContainer: document.getElementById('chipsContainer'),

    // Toast Banner
    toastBanner: document.getElementById('toastBanner'),
    toastMsg: document.getElementById('toastMsg'),
    toastClose: document.getElementById('toastClose'),

    // Hero Card Elements
    cityName: document.getElementById('cityName'),
    cityTime: document.getElementById('cityTime'),
    weatherBadge: document.getElementById('weatherBadge'),
    weatherMain: document.getElementById('weatherMain'),
    currentTemp: document.getElementById('currentTemp'),
    weatherIcon: document.getElementById('weatherIcon'),
    weatherDesc: document.getElementById('weatherDesc'),
    tempMax: document.getElementById('tempMax'),
    tempMin: document.getElementById('tempMin'),
    feelsLike: document.getElementById('feelsLike'),

    // Metric Cards
    valHumidity: document.getElementById('valHumidity'),
    descHumidity: document.getElementById('descHumidity'),
    valWind: document.getElementById('valWind'),
    windArrow: document.getElementById('windArrow'),
    descWind: document.getElementById('descWind'),
    valPressure: document.getElementById('valPressure'),
    descPressure: document.getElementById('descPressure'),
    valVisibility: document.getElementById('valVisibility'),
    descVisibility: document.getElementById('descVisibility'),
    valSunrise: document.getElementById('valSunrise'),
    valSunset: document.getElementById('valSunset'),
    valClouds: document.getElementById('valClouds'),
    descClouds: document.getElementById('descClouds'),
    valCoords: document.getElementById('valCoords'),

    // Forecast Containers
    hourlyContainer: document.getElementById('hourlyContainer'),
    dailyContainer: document.getElementById('dailyContainer'),

    // Overlays & Modals
    loadingOverlay: document.getElementById('loadingOverlay'),
    loadingText: document.getElementById('loadingText'),
    apiModal: document.getElementById('apiModal'),
    apiKeyInput: document.getElementById('apiKeyInput'),
    btnSaveApiKey: document.getElementById('btnSaveApiKey'),
    btnClearApiKey: document.getElementById('btnClearApiKey'),
    closeApiModal: document.getElementById('closeApiModal')
};

// ==========================================================================
// 3. UTILITY HELPER FUNCTIONS
// ==========================================================================

/** Convert Celsius to Fahrenheit */
function celsiusToFahrenheit(c) {
    return Math.round((c * 9 / 5) + 32);
}

/** Convert meters/sec to miles per hour */
function msToMph(ms) {
    return (ms * 2.23694).toFixed(1);
}

/** Format temperature based on currently active unit */
function formatTemp(tempInCelsius) {
    if (tempInCelsius === null || tempInCelsius === undefined || isNaN(tempInCelsius)) return '--';
    const roundedC = Math.round(tempInCelsius);
    if (state.unit === 'imperial') {
        return `${celsiusToFahrenheit(roundedC)}°`;
    }
    return `${roundedC}°`;
}

/** Convert wind direction degrees to cardinal compass heading */
function getWindDirection(deg) {
    if (deg === undefined || deg === null) return 'N/A';
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const index = Math.round((deg % 360) / 22.5);
    return directions[index % 16];
}

/** Format time taking UTC timestamp and city timezone offset in seconds into account */
function formatLocalTime(utcSeconds, timezoneOffsetSeconds, formatOptions = {}) {
    if (!utcSeconds) return '--:--';
    // Offset local date by city timezone offset
    const date = new Date((utcSeconds + timezoneOffsetSeconds) * 1000);
    const defaultOptions = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        timeZone: 'UTC' // Forces rendering using the calculated UTC shifted time
    };
    return date.toLocaleTimeString('en-US', { ...defaultOptions, ...formatOptions });
}

/** Format date string for daily forecast */
function formatDayName(utcSeconds, timezoneOffsetSeconds) {
    const date = new Date((utcSeconds + timezoneOffsetSeconds) * 1000);
    return date.toLocaleDateString('en-US', { weekday: 'short', timeZone: 'UTC' });
}

function formatDateShort(utcSeconds, timezoneOffsetSeconds) {
    const date = new Date((utcSeconds + timezoneOffsetSeconds) * 1000);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' });
}

// ==========================================================================
// 4. API FETCHING & DATA PROCESSING
// ==========================================================================

/** Show/Hide Loading Overlay */
function setLoading(isLoading, message = 'Fetching weather data...') {
    if (isLoading) {
        DOM.loadingText.textContent = message;
        DOM.loadingOverlay.classList.add('active');
    } else {
        DOM.loadingOverlay.classList.remove('active');
    }
}

/** Display Toast Notification */
function showToast(message, type = 'error') {
    DOM.toastMsg.textContent = message;
    DOM.toastBanner.classList.remove('hidden');
    if (type === 'error') {
        DOM.toastBanner.style.background = 'rgba(239, 68, 68, 0.25)';
        DOM.toastBanner.style.borderColor = 'rgba(239, 68, 68, 0.4)';
    } else {
        DOM.toastBanner.style.background = 'rgba(56, 189, 248, 0.25)';
        DOM.toastBanner.style.borderColor = 'rgba(56, 189, 248, 0.4)';
    }
}

function hideToast() {
    DOM.toastBanner.classList.add('hidden');
}

/** Load Weather Data by City Name */
async function loadWeatherByCity(cityName) {
    if (!cityName.trim()) return;
    hideToast();
    setLoading(true, `Locating ${cityName}...`);

    try {
        if (!state.apiKey) {
            // Use Mock Data Mode if no API key is provided
            console.info('No API key provided. Using realistic Mock Data Mode.');
            await simulateNetworkDelay();
            const mockData = getMockWeatherData(cityName);
            state.currentWeatherData = mockData.current;
            state.forecastData = mockData.forecast;
            updateUI();
            addRecentSearch(mockData.current.name);
            setLoading(false);
            return;
        }

        // Fetch Live Weather & Forecast concurrently from OpenWeatherMap API
        const [weatherRes, forecastRes] = await Promise.all([
            fetch(`${CONFIG.WEATHER_URL}?q=${encodeURIComponent(cityName)}&appid=${state.apiKey}&units=metric`),
            fetch(`${CONFIG.FORECAST_URL}?q=${encodeURIComponent(cityName)}&appid=${state.apiKey}&units=metric`)
        ]);

        if (!weatherRes.ok || !forecastRes.ok) {
            if (weatherRes.status === 401 || forecastRes.status === 401) {
                showToast('Invalid API Key. Falling back to Demo Mode. Click "API Key" to update.', 'warning');
                const mockData = getMockWeatherData(cityName);
                state.currentWeatherData = mockData.current;
                state.forecastData = mockData.forecast;
                updateUI();
                setLoading(false);
                return;
            }
            if (weatherRes.status === 404) {
                throw new Error(`City "${cityName}" not found. Please check spelling.`);
            }
            throw new Error(`Failed to fetch weather (Status: ${weatherRes.status})`);
        }

        state.currentWeatherData = await weatherRes.json();
        state.forecastData = await forecastRes.json();

        updateUI();
        addRecentSearch(state.currentWeatherData.name);
    } catch (err) {
        showToast(err.message || 'An error occurred while fetching weather data.');
        console.error('Weather load error:', err);
    } finally {
        setLoading(false);
    }
}

/** Load Weather Data by Geolocation Coordinates */
async function loadWeatherByCoords(lat, lon) {
    hideToast();
    setLoading(true, 'Fetching local weather...');

    try {
        if (!state.apiKey) {
            await simulateNetworkDelay();
            const mockData = getMockWeatherData('London'); // Default fallback city for mock location
            state.currentWeatherData = mockData.current;
            state.forecastData = mockData.forecast;
            updateUI();
            setLoading(false);
            return;
        }

        const [weatherRes, forecastRes] = await Promise.all([
            fetch(`${CONFIG.WEATHER_URL}?lat=${lat}&lon=${lon}&appid=${state.apiKey}&units=metric`),
            fetch(`${CONFIG.FORECAST_URL}?lat=${lat}&lon=${lon}&appid=${state.apiKey}&units=metric`)
        ]);

        if (!weatherRes.ok || !forecastRes.ok) {
            if (weatherRes.status === 401) {
                showToast('Invalid API Key. Using Demo Mode.', 'warning');
                const mockData = getMockWeatherData('London');
                state.currentWeatherData = mockData.current;
                state.forecastData = mockData.forecast;
                updateUI();
                setLoading(false);
                return;
            }
            throw new Error('Could not fetch weather for your location.');
        }

        state.currentWeatherData = await weatherRes.json();
        state.forecastData = await forecastRes.json();

        updateUI();
        addRecentSearch(state.currentWeatherData.name);
    } catch (err) {
        showToast(err.message || 'Error obtaining geolocation weather.');
        console.error('Geolocation weather error:', err);
    } finally {
        setLoading(false);
    }
}

function simulateNetworkDelay(ms = 400) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// ==========================================================================
// 5. UI RENDERING & THEME SYSTEM
// ==========================================================================

/** Update all UI sections using current state */
function updateUI() {
    if (!state.currentWeatherData) return;

    renderHeroCard();
    renderMetricsGrid();
    renderHourlyForecast();
    renderDailyForecast();
    updateTheme();
}

/** 1. Render Main Hero Weather Card */
function renderHeroCard() {
    const data = state.currentWeatherData;
    const sys = data.sys || {};
    const main = data.main || {};
    const weather = (data.weather && data.weather[0]) || {};

    DOM.cityName.textContent = `${data.name}, ${sys.country || ''}`;
    state.currentCity = data.name;

    // Local time in city
    const localTimeStr = formatLocalTime(data.dt, data.timezone, {
        weekday: 'long',
        hour: '2-digit',
        minute: '2-digit'
    });
    DOM.cityTime.textContent = `Local Time: ${localTimeStr}`;

    DOM.weatherMain.textContent = weather.main || 'Clear';
    DOM.currentTemp.textContent = Math.round(main.temp ?? 0);
    DOM.displayUnit.textContent = state.unit === 'imperial' ? '°F' : '°C';

    DOM.weatherIcon.src = `${CONFIG.ICON_BASE_URL}${weather.icon || '01d'}@4x.png`;
    DOM.weatherIcon.alt = weather.description || 'Weather condition';
    DOM.weatherDesc.textContent = weather.description || '--';

    DOM.tempMax.textContent = formatTemp(main.temp_max);
    DOM.tempMin.textContent = formatTemp(main.temp_min);
    DOM.feelsLike.textContent = formatTemp(main.feels_like);
}

/** 2. Render Detailed Metrics Grid (8 Cards) */
function renderMetricsGrid() {
    const data = state.currentWeatherData;
    const main = data.main || {};
    const wind = data.wind || {};
    const sys = data.sys || {};
    const clouds = data.clouds || {};

    // Humidity
    const humidity = main.humidity ?? '--';
    DOM.valHumidity.textContent = `${humidity}%`;
    if (humidity < 30) DOM.descHumidity.textContent = 'Low / Dry Air';
    else if (humidity <= 60) DOM.descHumidity.textContent = 'Comfortable Range';
    else DOM.descHumidity.textContent = 'High Moisture';

    // Wind Speed & Direction
    const speed = wind.speed ?? 0;
    if (state.unit === 'imperial') {
        DOM.valWind.textContent = `${msToMph(speed)} mph`;
    } else {
        DOM.valWind.textContent = `${speed.toFixed(1)} m/s`;
    }
    const deg = wind.deg ?? 0;
    DOM.windArrow.style.transform = `rotate(${deg}deg)`;
    DOM.descWind.textContent = `Heading: ${getWindDirection(deg)} (${deg}°)`;

    // Atmospheric Pressure
    DOM.valPressure.textContent = `${main.pressure ?? '--'} hPa`;
    DOM.descPressure.textContent = main.pressure > 1013 ? 'High Pressure' : 'Low Pressure';

    // Visibility (convert meters to km or miles)
    const visMeters = data.visibility ?? 10000;
    if (state.unit === 'imperial') {
        const visMiles = (visMeters / 1609.34).toFixed(1);
        DOM.valVisibility.textContent = `${visMiles} mi`;
    } else {
        const visKm = (visMeters / 1000).toFixed(1);
        DOM.valVisibility.textContent = `${visKm} km`;
    }
    DOM.descVisibility.textContent = visMeters >= 10000 ? 'Excellent' : visMeters >= 5000 ? 'Moderate' : 'Poor Visibility';

    // Sunrise & Sunset
    DOM.valSunrise.textContent = formatLocalTime(sys.sunrise, data.timezone);
    DOM.valSunset.textContent = formatLocalTime(sys.sunset, data.timezone);

    // Cloudiness
    DOM.valClouds.textContent = `${clouds.all ?? 0}%`;
    DOM.descClouds.textContent = clouds.all > 70 ? 'Heavy Coverage' : clouds.all > 30 ? 'Partly Cloudy' : 'Clear Sky';

    // Coordinates
    const coord = data.coord || {};
    DOM.valCoords.textContent = `${coord.lat ? coord.lat.toFixed(2) : '--'}°, ${coord.lon ? coord.lon.toFixed(2) : '--'}°`;
}

/** 3. Render Hourly 24-Hour Forecast Slider */
function renderHourlyForecast() {
    DOM.hourlyContainer.innerHTML = '';
    if (!state.forecastData || !state.forecastData.list) return;

    const list = state.forecastData.list.slice(0, 8); // Next 8 3-hour blocks (24 hours)
    const timezone = state.forecastData.city ? state.forecastData.city.timezone : 0;

    list.forEach(item => {
        const card = document.createElement('div');
        card.className = 'hourly-card';

        const timeStr = formatLocalTime(item.dt, timezone, { hour: '2-digit', minute: '2-digit' });
        const iconCode = item.weather && item.weather[0] ? item.weather[0].icon : '01d';
        const tempFormatted = formatTemp(item.main.temp);
        const popPercent = Math.round((item.pop || 0) * 100);

        card.innerHTML = `
            <span class="hourly-time">${timeStr}</span>
            <img src="${CONFIG.ICON_BASE_URL}${iconCode}.png" alt="weather" class="hourly-img">
            <span class="hourly-temp">${tempFormatted}</span>
            ${popPercent > 0 ? `<span class="hourly-pop">💧 ${popPercent}%</span>` : ''}
        `;
        DOM.hourlyContainer.appendChild(card);
    });
}

/** 4. Render 5-Day Forecast Cards */
function renderDailyForecast() {
    DOM.dailyContainer.innerHTML = '';
    if (!state.forecastData || !state.forecastData.list) return;

    const timezone = state.forecastData.city ? state.forecastData.city.timezone : 0;
    const dailyMap = {};

    // Group 3-hour forecast readings by local date
    state.forecastData.list.forEach(item => {
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

    const days = Object.keys(dailyMap).slice(0, 5); // Take first 5 distinct days

    days.forEach(dayKey => {
        const dayData = dailyMap[dayKey];
        const minTemp = Math.min(...dayData.tempsMin);
        const maxTemp = Math.max(...dayData.tempsMax);
        // Pick representative icon (preferably mid-day)
        const midIndex = Math.floor(dayData.icons.length / 2);
        const iconCode = dayData.icons[midIndex] || '01d';
        const desc = dayData.descriptions[midIndex] || 'Clear';

        const dayName = formatDayName(dayData.dt, timezone);

        const card = document.createElement('div');
        card.className = 'daily-card';
        card.innerHTML = `
            <div>
                <div class="daily-day">${dayName}</div>
                <div class="daily-date">${dayKey}</div>
            </div>
            <div class="daily-visual">
                <img src="${CONFIG.ICON_BASE_URL}${iconCode}@2x.png" alt="${desc}" class="daily-img">
                <span class="daily-desc">${desc}</span>
            </div>
            <div class="daily-temp-range">
                <span class="temp-high">${formatTemp(maxTemp)}</span>
                <span class="temp-low">${formatTemp(minTemp)}</span>
            </div>
        `;
        DOM.dailyContainer.appendChild(card);
    });
}

/** 5. Dynamic Theme Engine */
function updateTheme() {
    if (!state.currentWeatherData) return;
    const weather = (state.currentWeatherData.weather && state.currentWeatherData.weather[0]) || {};
    const main = (weather.main || '').toLowerCase();
    const icon = weather.icon || '01d';
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
}

// ==========================================================================
// 6. SEARCH HISTORY MANAGEMENT
// ==========================================================================

function addRecentSearch(cityName) {
    if (!cityName) return;
    const formatted = cityName.trim();
    state.recentSearches = state.recentSearches.filter(c => c.toLowerCase() !== formatted.toLowerCase());
    state.recentSearches.unshift(formatted);
    if (state.recentSearches.length > 6) state.recentSearches.pop();

    localStorage.setItem(CONFIG.STORAGE_KEYS.RECENT, JSON.stringify(state.recentSearches));
    renderRecentSearches();
}

function renderRecentSearches() {
    DOM.chipsContainer.innerHTML = '';
    state.recentSearches.forEach(city => {
        const chip = document.createElement('button');
        chip.className = 'chip';
        chip.textContent = city;
        chip.addEventListener('click', () => {
            DOM.cityInput.value = city;
            loadWeatherByCity(city);
        });
        DOM.chipsContainer.appendChild(chip);
    });
}

// ==========================================================================
// 7. EVENT LISTENERS
// ==========================================================================

function setupEventListeners() {
    // Search Form Submit
    DOM.searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const city = DOM.cityInput.value.trim();
        if (city) {
            loadWeatherByCity(city);
        }
    });

    // Clear Search Input
    DOM.cityInput.addEventListener('input', () => {
        if (DOM.cityInput.value) {
            DOM.clearSearch.classList.remove('hidden');
        } else {
            DOM.clearSearch.classList.add('hidden');
        }
    });

    DOM.clearSearch.addEventListener('click', () => {
        DOM.cityInput.value = '';
        DOM.clearSearch.classList.add('hidden');
        DOM.cityInput.focus();
    });

    // Geolocation Button
    DOM.btnGeo.addEventListener('click', () => {
        if (!navigator.geolocation) {
            showToast('Geolocation is not supported by your browser.');
            return;
        }
        setLoading(true, 'Accessing location...');
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                loadWeatherByCoords(pos.coords.latitude, pos.coords.longitude);
            },
            (err) => {
                setLoading(false);
                showToast('Unable to retrieve location. Using default city.');
                console.warn('Geo error:', err);
                if (!state.currentWeatherData) {
                    loadWeatherByCity(CONFIG.DEFAULT_CITY);
                }
            },
            { timeout: 8000 }
        );
    });

    // Unit Toggle Buttons (°C vs °F)
    DOM.unitC.addEventListener('click', () => {
        if (state.unit !== 'metric') {
            state.unit = 'metric';
            DOM.unitC.classList.add('active');
            DOM.unitF.classList.remove('active');
            localStorage.setItem(CONFIG.STORAGE_KEYS.UNIT, 'metric');
            updateUI();
        }
    });

    DOM.unitF.addEventListener('click', () => {
        if (state.unit !== 'imperial') {
            state.unit = 'imperial';
            DOM.unitF.classList.add('active');
            DOM.unitC.classList.remove('active');
            localStorage.setItem(CONFIG.STORAGE_KEYS.UNIT, 'imperial');
            updateUI();
        }
    });

    // API Key Modal Handlers
    DOM.btnApiKey.addEventListener('click', () => {
        DOM.apiKeyInput.value = state.apiKey;
        DOM.apiModal.classList.remove('hidden');
    });

    DOM.closeApiModal.addEventListener('click', () => {
        DOM.apiModal.classList.add('hidden');
    });

    DOM.btnSaveApiKey.addEventListener('click', () => {
        const key = DOM.apiKeyInput.value.trim();
        state.apiKey = key;
        localStorage.setItem(CONFIG.STORAGE_KEYS.API_KEY, key);
        DOM.apiModal.classList.add('hidden');
        showToast(key ? 'API Key saved! Loading weather...' : 'API Key cleared. Using Demo Mode.', 'info');
        loadWeatherByCity(state.currentCity || CONFIG.DEFAULT_CITY);
    });

    DOM.btnClearApiKey.addEventListener('click', () => {
        state.apiKey = '';
        localStorage.removeItem(CONFIG.STORAGE_KEYS.API_KEY);
        DOM.apiKeyInput.value = '';
        DOM.apiModal.classList.add('hidden');
        showToast('Switched to Demo Mode.', 'info');
        loadWeatherByCity(state.currentCity || CONFIG.DEFAULT_CITY);
    });

    // Toast Close
    DOM.toastClose.addEventListener('click', hideToast);
}

// ==========================================================================
// 8. REALISTIC MOCK DATA PROVIDER FOR DEMO / KEYLESS MODE
// ==========================================================================

function getMockWeatherData(cityName = 'London') {
    const norm = cityName.trim().toLowerCase();

    const mockCities = {
        tokyo: { name: 'Tokyo', country: 'JP', temp: 24, feels: 25, weather: 'Clear', desc: 'clear sky', icon: '01d', humidity: 55, wind: 3.6, deg: 140, pressure: 1014, vis: 10000, lat: 35.6762, lon: 139.6503, tz: 32400 },
        'new york': { name: 'New York', country: 'US', temp: 19, feels: 18, weather: 'Clouds', desc: 'scattered clouds', icon: '03d', humidity: 62, wind: 4.5, deg: 210, pressure: 1012, vis: 10000, lat: 40.7128, lon: -74.0060, tz: -14400 },
        paris: { name: 'Paris', country: 'FR', temp: 21, feels: 21, weather: 'Rain', desc: 'light rain', icon: '10d', humidity: 78, wind: 5.1, deg: 260, pressure: 1008, vis: 9000, lat: 48.8566, lon: 2.3522, tz: 7200 },
        sydney: { name: 'Sydney', country: 'AU', temp: 16, feels: 15, weather: 'Clear', desc: 'clear sky', icon: '01n', humidity: 70, wind: 2.8, deg: 45, pressure: 1020, vis: 10000, lat: -33.8688, lon: 151.2093, tz: 36000 },
        london: { name: 'London', country: 'GB', temp: 18, feels: 17, weather: 'Clouds', desc: 'broken clouds', icon: '04d', humidity: 68, wind: 4.1, deg: 190, pressure: 1015, vis: 10000, lat: 51.5074, lon: -0.1278, tz: 3600 }
    };

    const base = mockCities[norm] || {
        name: cityName.charAt(0).toUpperCase() + cityName.slice(1),
        country: 'INT',
        temp: 22,
        feels: 22,
        weather: 'Clear',
        desc: 'clear sky',
        icon: '01d',
        humidity: 50,
        wind: 3.5,
        deg: 180,
        pressure: 1013,
        vis: 10000,
        lat: 51.5,
        lon: 0.1,
        tz: 3600
    };

    const nowSeconds = Math.floor(Date.now() / 1000);

    const current = {
        name: base.name,
        sys: { country: base.country, sunrise: nowSeconds - 21600, sunset: nowSeconds + 21600 },
        dt: nowSeconds,
        timezone: base.tz,
        weather: [{ main: base.weather, description: base.desc, icon: base.icon }],
        main: {
            temp: base.temp,
            feels_like: base.feels,
            temp_min: base.temp - 4,
            temp_max: base.temp + 5,
            pressure: base.pressure,
            humidity: base.humidity
        },
        wind: { speed: base.wind, deg: base.deg },
        visibility: base.vis,
        clouds: { all: base.weather === 'Clouds' ? 60 : base.weather === 'Rain' ? 90 : 15 },
        coord: { lat: base.lat, lon: base.lon }
    };

    // Generate 5 days of 3-hour forecast blocks
    const forecastList = [];
    for (let i = 0; i < 40; i++) {
        const itemDt = nowSeconds + (i * 10800);
        const tempVariation = Math.sin(i / 2) * 5;
        forecastList.push({
            dt: itemDt,
            main: {
                temp: +(base.temp + tempVariation).toFixed(1),
                temp_min: +(base.temp + tempVariation - 3).toFixed(1),
                temp_max: +(base.temp + tempVariation + 3).toFixed(1),
                pressure: base.pressure,
                humidity: base.humidity
            },
            weather: [{ main: base.weather, description: base.desc, icon: base.icon }],
            pop: base.weather === 'Rain' ? 0.7 : 0.1
        });
    }

    return {
        current,
        forecast: {
            city: { name: base.name, country: base.country, timezone: base.tz },
            list: forecastList
        }
    };
}

// ==========================================================================
// 9. APPLICATION INITIALIZATION
// ==========================================================================

function initApp() {
    setupEventListeners();

    // Set initial unit button state
    if (state.unit === 'imperial') {
        DOM.unitF.classList.add('active');
        DOM.unitC.classList.remove('active');
    }

    renderRecentSearches();

    // Try auto-detect location on load, or fallback to default city
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                loadWeatherByCoords(pos.coords.latitude, pos.coords.longitude);
            },
            () => {
                loadWeatherByCity(CONFIG.DEFAULT_CITY);
            },
            { timeout: 4000 }
        );
    } else {
        loadWeatherByCity(CONFIG.DEFAULT_CITY);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initApp);
