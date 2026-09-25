/**
 * CROP CULTIVATION ADVISOR SERVICE
 * Agronomic dataset and suitability scoring algorithms matching live weather conditions.
 */

export const CROP_DATABASE = [
  {
    id: 'rice',
    name: 'Rice (Paddy)',
    category: 'Grains',
    icon: '🌾',
    description: 'Thrives in warm, highly humid conditions with abundant water.',
    temp: { min: 20, max: 38, optMin: 24, optMax: 32 },
    humidity: { min: 60, max: 100, optMin: 70, optMax: 90 },
    waterReq: 'High',
    sunReq: 'Full Sun',
    soilType: 'Clay / Heavy Loam',
    growingSeason: 'Monsoon / Kharif',
    tips: 'Maintain puddle field level during early growth. Avoid drought stress during flowering.'
  },
  {
    id: 'wheat',
    name: 'Wheat',
    category: 'Grains',
    icon: '🌾',
    description: 'Prefers cool to moderate weather with moderate humidity.',
    temp: { min: 10, max: 28, optMin: 15, optMax: 22 },
    humidity: { min: 40, max: 70, optMin: 50, optMax: 65 },
    waterReq: 'Moderate',
    sunReq: 'Full Sun',
    soilType: 'Well-drained Loam',
    growingSeason: 'Winter / Rabi',
    tips: 'Requires cool weather for tillering and warm sunny weather during grain filling.'
  },
  {
    id: 'corn',
    name: 'Maize (Corn)',
    category: 'Grains',
    icon: '🌽',
    description: 'Warm-season crop requiring sunny days and well-timed rainfall.',
    temp: { min: 16, max: 35, optMin: 21, optMax: 30 },
    humidity: { min: 45, max: 80, optMin: 55, optMax: 75 },
    waterReq: 'Moderate-High',
    sunReq: 'Full Sun',
    soilType: 'Deep Silt / Sandy Loam',
    growingSeason: 'Spring / Summer',
    tips: 'Ensure consistent moisture during tasseling and silking stages.'
  },
  {
    id: 'tomatoes',
    name: 'Tomatoes',
    category: 'Vegetables',
    icon: '🍅',
    description: 'Warm season crop sensitive to frost and waterlogging.',
    temp: { min: 15, max: 32, optMin: 20, optMax: 27 },
    humidity: { min: 40, max: 75, optMin: 50, optMax: 65 },
    waterReq: 'Moderate',
    sunReq: 'Full Sun (6-8h)',
    soilType: 'Rich Loam, pH 6.0-6.8',
    growingSeason: 'Spring / Summer',
    tips: 'High humidity (>80%) combined with high temp increases early/late blight risk.'
  },
  {
    id: 'cotton',
    name: 'Cotton',
    category: 'Cash Crops',
    icon: '☁️',
    description: 'Requires abundant sunshine and warm temperatures for boll opening.',
    temp: { min: 18, max: 38, optMin: 24, optMax: 32 },
    humidity: { min: 35, max: 70, optMin: 45, optMax: 60 },
    waterReq: 'Moderate',
    sunReq: 'Intense Sun',
    soilType: 'Deep Black / Alluvial Soil',
    growingSeason: 'Summer / Kharif',
    tips: 'Requires a minimum 180-200 frost-free days. Avoid heavy rain during boll harvesting.'
  },
  {
    id: 'sugarcane',
    name: 'Sugarcane',
    category: 'Cash Crops',
    icon: '🎋',
    description: 'Tropical perennial requiring warm, humid climate and high water supply.',
    temp: { min: 20, max: 40, optMin: 26, optMax: 35 },
    humidity: { min: 55, max: 90, optMin: 65, optMax: 85 },
    waterReq: 'Very High',
    sunReq: 'Full Sun',
    soilType: 'Deep Alluvial or Heavy Loam',
    growingSeason: 'Year-round / Perennial',
    tips: 'Requires hot humid period for vegetative growth and cool dry period for ripening.'
  },
  {
    id: 'potatoes',
    name: 'Potatoes',
    category: 'Vegetables',
    icon: '🥔',
    description: 'Cool weather tuber crop vulnerable to high temperatures.',
    temp: { min: 10, max: 26, optMin: 15, optMax: 20 },
    humidity: { min: 50, max: 85, optMin: 60, optMax: 75 },
    waterReq: 'Moderate',
    sunReq: 'Full Sun',
    soilType: 'Loose, Well-aerated Sandy Loam',
    growingSeason: 'Spring / Autumn',
    tips: 'Night temperatures above 20°C severely suppress tuber formation.'
  },
  {
    id: 'citrus',
    name: 'Citrus (Oranges/Lemons)',
    category: 'Fruits',
    icon: '🍊',
    description: 'Subtropical fruit tree sensitive to severe frost.',
    temp: { min: 13, max: 38, optMin: 22, optMax: 30 },
    humidity: { min: 40, max: 75, optMin: 50, optMax: 70 },
    waterReq: 'Moderate',
    sunReq: 'Full Sun',
    soilType: 'Well-drained Loam',
    growingSeason: 'Perennial',
    tips: 'Frost protection needed below 0°C. Good air circulation prevents fungal rot.'
  },
  {
    id: 'soybeans',
    name: 'Soybeans',
    category: 'Grains',
    icon: '🫛',
    description: 'Legume crop thriving in warm temperatures with balanced rainfall.',
    temp: { min: 18, max: 35, optMin: 22, optMax: 29 },
    humidity: { min: 45, max: 80, optMin: 55, optMax: 70 },
    waterReq: 'Moderate',
    sunReq: 'Full Sun',
    soilType: 'Fertile Loam',
    growingSeason: 'Summer',
    tips: 'Nitrogen-fixing crop. Adequate moisture essential during pod filling.'
  },
  {
    id: 'coffee',
    name: 'Coffee (Arabica)',
    category: 'Cash Crops',
    icon: '☕',
    description: 'Subtropical highland crop preferring mild temps & moderate humidity.',
    temp: { min: 15, max: 28, optMin: 18, optMax: 24 },
    humidity: { min: 60, max: 85, optMin: 65, optMax: 80 },
    waterReq: 'Moderate-High',
    sunReq: 'Filtered Light / Partial Shade',
    soilType: 'Deep Volcanic Loam',
    growingSeason: 'Perennial',
    tips: 'Sensitive to temperatures above 30°C which damage leaves and cause fruit drop.'
  },
  {
    id: 'leafy_greens',
    name: 'Spinach & Leafy Greens',
    category: 'Vegetables',
    icon: '🥬',
    description: 'Fast-growing cool-season crop susceptible to quick bolting in heat.',
    temp: { min: 7, max: 24, optMin: 13, optMax: 18 },
    humidity: { min: 45, max: 80, optMin: 55, optMax: 70 },
    waterReq: 'Moderate',
    sunReq: 'Partial to Full Sun',
    soilType: 'Organic Moisture-retentive Loam',
    growingSeason: 'Spring / Autumn',
    tips: 'Provide afternoon shade if ambient temperatures exceed 24°C.'
  },
  {
    id: 'millets',
    name: 'Millets (Sorghum/Pearl)',
    category: 'Grains',
    icon: '🌾',
    description: 'Resilient drought-tolerant grain capable of thriving in high temperatures.',
    temp: { min: 18, max: 42, optMin: 26, optMax: 35 },
    humidity: { min: 25, max: 65, optMin: 35, optMax: 55 },
    waterReq: 'Low',
    sunReq: 'Full Sun',
    soilType: 'Adaptable / Poor Sandy Soils',
    growingSeason: 'Dry Season / Kharif',
    tips: 'Highly efficient water use. Ideal climate resilient crop for arid regions.'
  }
];

/**
 * Calculates suitability score (0-100%) for a given crop based on live weather data
 */
export function calculateCropSuitability(crop, weatherData) {
  if (!weatherData || !weatherData.main) {
    return { score: 50, status: 'Unknown', color: '#94a3b8', factors: [] };
  }

  const temp = weatherData.main.temp;
  const humidity = weatherData.main.humidity;
  const windSpeed = (weatherData.wind && weatherData.wind.speed) ? weatherData.wind.speed : 0;

  let tempScore = 100;
  let humScore = 100;
  const factors = [];

  // Temperature evaluation
  if (temp < crop.temp.min) {
    const diff = crop.temp.min - temp;
    tempScore = Math.max(0, 100 - diff * 12);
    factors.push({ type: 'warning', text: `Too cold for ${crop.name} (${temp}°C vs min ${crop.temp.min}°C)` });
  } else if (temp > crop.temp.max) {
    const diff = temp - crop.temp.max;
    tempScore = Math.max(0, 100 - diff * 12);
    factors.push({ type: 'warning', text: `Heat stress risk (${temp}°C exceeds max ${crop.temp.max}°C)` });
  } else if (temp >= crop.temp.optMin && temp <= crop.temp.optMax) {
    factors.push({ type: 'optimal', text: `Temperature (${temp}°C) is in optimal range (${crop.temp.optMin}-${crop.temp.optMax}°C)` });
  } else {
    tempScore = 80;
    factors.push({ type: 'acceptable', text: `Temperature (${temp}°C) is acceptable but outside optimal peak` });
  }

  // Humidity evaluation
  if (humidity < crop.humidity.min) {
    const diff = crop.humidity.min - humidity;
    humScore = Math.max(0, 100 - diff * 2);
    factors.push({ type: 'warning', text: `Low humidity (${humidity}%) may cause moisture stress` });
  } else if (humidity > crop.humidity.max) {
    const diff = humidity - crop.humidity.max;
    humScore = Math.max(0, 100 - diff * 2);
    factors.push({ type: 'warning', text: `Excessive humidity (${humidity}%) increases fungal risk` });
  } else if (humidity >= crop.humidity.optMin && humidity <= crop.humidity.optMax) {
    factors.push({ type: 'optimal', text: `Humidity (${humidity}%) is ideal` });
  }

  // Weather Condition & Frost checks
  let conditionModifier = 0;
  if (temp <= 2 && crop.temp.min > 5) {
    conditionModifier -= 30;
    factors.push({ type: 'danger', text: 'Frost danger! Severe threat to tender foliage' });
  }

  if (windSpeed > 10) {
    conditionModifier -= 10;
    factors.push({ type: 'warning', text: `High winds (${(windSpeed * 3.6).toFixed(0)} km/h) could cause lodging` });
  }

  // Final score weighted
  const rawScore = Math.round((tempScore * 0.6 + humScore * 0.4) + conditionModifier);
  const score = Math.max(5, Math.min(100, rawScore));

  let status = 'Optimal';
  let badgeColor = '#22c55e'; // Green

  if (score >= 85) {
    status = 'Optimal';
    badgeColor = '#22c55e';
  } else if (score >= 70) {
    status = 'Favorable';
    badgeColor = '#3b82f6';
  } else if (score >= 50) {
    status = 'Moderate';
    badgeColor = '#eab308';
  } else {
    status = 'Unsuitable';
    badgeColor = '#ef4444';
  }

  return {
    score,
    status,
    badgeColor,
    factors
  };
}

/**
 * Returns overall agricultural advisories based on weather data
 */
export function getAgriculturalAdvisories(weatherData) {
  if (!weatherData || !weatherData.main) return [];

  const temp = weatherData.main.temp;
  const humidity = weatherData.main.humidity;
  const windSpeed = (weatherData.wind && weatherData.wind.speed) ? weatherData.wind.speed : 0;
  const mainCond = (weatherData.weather && weatherData.weather[0] && weatherData.weather[0].main) ? weatherData.weather[0].main.toLowerCase() : '';

  const advisories = [];

  // Irrigation advisory
  if (temp > 30 && humidity < 40) {
    advisories.push({
      title: 'High Irrigation Advisory',
      type: 'warning',
      icon: '💧',
      text: 'High temperatures combined with low humidity drive rapid evapotranspiration. Deep morning/evening watering recommended.'
    });
  } else if (mainCond.includes('rain')) {
    advisories.push({
      title: 'Rainfall Event Active',
      type: 'info',
      icon: '🌧️',
      text: 'Postpone scheduled artificial irrigation to prevent soil waterlogging and nutrient leaching.'
    });
  } else {
    advisories.push({
      title: 'Standard Irrigation',
      type: 'success',
      icon: '🌱',
      text: 'Soil moisture transpiration rates are moderate. Standard moisture retention cycle applies.'
    });
  }

  // Pest / Fungal risk advisory
  if (temp >= 22 && temp <= 32 && humidity >= 75) {
    advisories.push({
      title: 'Elevated Fungal & Pest Risk',
      type: 'danger',
      icon: '🐛',
      text: 'Warm & humid conditions (>75% humidity) favor aphid, mildew, and leaf blight spread. Monitor crop canopy closely.'
    });
  } else {
    advisories.push({
      title: 'Low Pathogen Risk',
      type: 'success',
      icon: '🛡️',
      text: 'Current microclimate inhibits rapid fungal spore germination.'
    });
  }

  // Spraying / Fieldwork condition
  if (windSpeed > 7) {
    advisories.push({
      title: 'Foliar Spray Warning',
      type: 'warning',
      icon: '💨',
      text: `Wind speeds exceed 25 km/h (${(windSpeed * 3.6).toFixed(0)} km/h). Avoid chemical/fertilizer spraying due to spray drift.`
    });
  } else {
    advisories.push({
      title: 'Ideal Field Spray Window',
      type: 'success',
      icon: '🚜',
      text: 'Calm wind conditions favor precise foliar liquid fertilization and crop protection treatments.'
    });
  }

  return advisories;
}
