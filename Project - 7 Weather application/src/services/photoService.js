/**
 * PHOTOGRAPHY WEATHER ASSISTANT SERVICE
 * Calculates Golden/Blue Hour windows, live countdowns, sunset sky vibrancy, and light quality scores.
 */

/**
 * Calculates exact Golden Hour & Blue Hour windows for morning and evening
 */
export function calculateSolarPhotoWindows(weatherData) {
  const now = Math.floor(Date.now() / 1000);

  if (!weatherData || !weatherData.sys) {
    return {
      morningBlue: { start: now - 3600, end: now - 1800 },
      morningGolden: { start: now - 1800, end: now + 900 },
      eveningGolden: { start: now + 18000, end: now + 20700 },
      eveningBlue: { start: now + 20700, end: now + 22200 },
      sunrise: now - 1200,
      sunset: now + 19800
    };
  }

  const sunrise = weatherData.sys.sunrise || (now - 14400);
  const sunset = weatherData.sys.sunset || (now + 14400);

  // Morning Windows
  // Morning Blue Hour: ~35 min before sunrise to 10 min before sunrise
  const morningBlueStart = sunrise - (35 * 60);
  const morningBlueEnd = sunrise - (10 * 60);

  // Morning Golden Hour: ~10 min before sunrise to 45 min after sunrise
  const morningGoldenStart = sunrise - (10 * 60);
  const morningGoldenEnd = sunrise + (45 * 60);

  // Evening Windows
  // Evening Golden Hour: ~45 min before sunset to 10 min after sunset
  const eveningGoldenStart = sunset - (45 * 60);
  const eveningGoldenEnd = sunset + (10 * 60);

  // Evening Blue Hour: ~10 min after sunset to 35 min after sunset
  const eveningBlueStart = sunset + (10 * 60);
  const eveningBlueEnd = sunset + (35 * 60);

  return {
    sunrise,
    sunset,
    morningBlue: { start: morningBlueStart, end: morningBlueEnd },
    morningGolden: { start: morningGoldenStart, end: morningGoldenEnd },
    eveningGolden: { start: eveningGoldenStart, end: eveningGoldenEnd },
    eveningBlue: { start: eveningBlueStart, end: eveningBlueEnd }
  };
}

/**
 * Determines the current or next upcoming photography window & computes ticking countdown
 */
export function getNextPhotoWindow(weatherData) {
  const windows = calculateSolarPhotoWindows(weatherData);
  const now = Math.floor(Date.now() / 1000);

  const eventList = [
    { type: 'Morning Blue Hour', activeLabel: 'Morning Blue Hour Active!', targetLabel: 'Morning Blue Hour in', start: windows.morningBlue.start, end: windows.morningBlue.end, icon: '🌌', color: '#60a5fa' },
    { type: 'Morning Golden Hour', activeLabel: 'Morning Golden Hour Active!', targetLabel: 'Morning Golden Hour in', start: windows.morningGolden.start, end: windows.morningGolden.end, icon: '🌅', color: '#f59e0b' },
    { type: 'Evening Golden Hour', activeLabel: 'Evening Golden Hour Active!', targetLabel: 'Evening Golden Hour in', start: windows.eveningGolden.start, end: windows.eveningGolden.end, icon: '🌇', color: '#f97316' },
    { type: 'Evening Blue Hour', activeLabel: 'Evening Blue Hour Active!', targetLabel: 'Evening Blue Hour in', start: windows.eveningBlue.start, end: windows.eveningBlue.end, icon: '🏙️', color: '#3b82f6' }
  ];

  // 1. Check if we are currently inside any active window
  for (const ev of eventList) {
    if (now >= ev.start && now <= ev.end) {
      const totalDuration = ev.end - ev.start;
      const elapsed = now - ev.start;
      const remainingSec = ev.end - now;
      const progress = Math.min(100, Math.max(0, Math.round((elapsed / totalDuration) * 100)));

      return {
        isActive: true,
        type: ev.type,
        label: ev.activeLabel,
        icon: ev.icon,
        color: ev.color,
        remainingSec,
        progress,
        targetTime: ev.end
      };
    }
  }

  // 2. Find next upcoming window in future
  let nextEvent = null;
  let minDiff = Infinity;

  for (const ev of eventList) {
    if (ev.start > now) {
      const diff = ev.start - now;
      if (diff < minDiff) {
        minDiff = diff;
        nextEvent = ev;
      }
    }
  }

  // If all windows for today have passed, loop to tomorrow's Morning Blue Hour
  if (!nextEvent) {
    const tomorrowMorningBlueStart = windows.morningBlue.start + 86400;
    nextEvent = {
      type: 'Morning Blue Hour',
      activeLabel: 'Morning Blue Hour Active!',
      targetLabel: 'Tomorrow Morning Blue Hour in',
      start: tomorrowMorningBlueStart,
      end: windows.morningBlue.end + 86400,
      icon: '🌌',
      color: '#60a5fa'
    };
    minDiff = tomorrowMorningBlueStart - now;
  }

  const remainingSec = Math.max(0, nextEvent.start - now);

  return {
    isActive: false,
    type: nextEvent.type,
    label: nextEvent.targetLabel,
    icon: nextEvent.icon,
    color: nextEvent.color,
    remainingSec,
    progress: 0,
    targetTime: nextEvent.start
  };
}

/**
 * Predicts Sunset & Sunrise Sky Quality / Vibrancy based on cloud cover & weather
 */
export function predictSunsetQuality(weatherData) {
  if (!weatherData) {
    return { score: 75, quality: 'Good Sky', color: '#f59e0b', description: 'Favorable light scatter expected.' };
  }

  const cloudCover = (weatherData.clouds && weatherData.clouds.all !== undefined) ? weatherData.clouds.all : 30;
  const humidity = (weatherData.main && weatherData.main.humidity) ? weatherData.main.humidity : 50;
  const mainCond = (weatherData.weather && weatherData.weather[0] && weatherData.weather[0].main) ? weatherData.weather[0].main.toLowerCase() : '';
  const visibility = weatherData.visibility || 10000;

  let score = 50;
  let quality = 'Moderate Sky';
  let color = '#f59e0b';
  let description = '';

  // Cloud cover rating curve: 40-60% cloud cover is ideal for vibrant sunsets
  if (cloudCover >= 30 && cloudCover <= 65) {
    score = 92;
    quality = 'Epic Vibrant Sky';
    color = '#ef4444'; // Radiant Crimson/Amber
    description = 'Scattered clouds at optimal altitude! High probability of intense crimson, orange, and purple sky illumination.';
  } else if (cloudCover > 65 && cloudCover <= 85) {
    score = 78;
    quality = 'Dramatic Cloudscape';
    color = '#f97316';
    description = 'Heavy cloud layers create dramatic moody light beams and high contrast golden breaks.';
  } else if (cloudCover < 30 && cloudCover >= 10) {
    score = 70;
    quality = 'Clean Golden Horizon';
    color = '#eab308';
    description = 'Light clouds provide gentle accent reflections along a bright golden horizon.';
  } else if (cloudCover < 10) {
    score = 55;
    quality = 'Clear Blue Void';
    color = '#38bdf8';
    description = 'Minimal clouds to reflect sunset rays; soft gradient sky without fiery cloud scatter.';
  } else { // > 85% cloud cover
    score = 35;
    quality = 'Dull Overcast Shield';
    color = '#64748b';
    description = 'Dense cloud ceiling likely blocks direct sunlight, resulting in muted gray twilight.';
  }

  // Penalty for fog / rain / mist
  if (mainCond.includes('rain') || mainCond.includes('drizzle')) {
    score = Math.max(20, score - 30);
    quality = 'Rain Blocked Sky';
    description = 'Active precipitation obscuring sunlight scatter.';
  } else if (mainCond.includes('fog') || mainCond.includes('mist') || visibility < 3000) {
    score = Math.max(30, score - 20);
    quality = 'Misty Atmospheric Haze';
    description = 'Low visibility and dense surface haze diffuse sunset rays near ground level.';
  }

  return {
    score,
    quality,
    color,
    description,
    cloudCover,
    visibilityKm: (visibility / 1000).toFixed(1)
  };
}

/**
 * Calculates overall Light Quality Score & provides photography recommendations
 */
export function getLightQualityScore(weatherData) {
  if (!weatherData) return { score: 75, rating: 'Good', lightType: 'Natural Light' };

  const windows = calculateSolarPhotoWindows(weatherData);
  const sunsetPred = predictSunsetQuality(weatherData);
  const now = Math.floor(Date.now() / 1000);
  const cloudCover = (weatherData.clouds && weatherData.clouds.all) ? weatherData.clouds.all : 20;

  let lightType = 'Direct Sun';
  let score = 70;
  let styleAdvice = [];
  let cameraSettings = {};

  const isGoldenHour = (now >= windows.morningGolden.start && now <= windows.morningGolden.end) ||
                       (now >= windows.eveningGolden.start && now <= windows.eveningGolden.end);
  const isBlueHour = (now >= windows.morningBlue.start && now <= windows.morningBlue.end) ||
                     (now >= windows.eveningBlue.start && now <= windows.eveningBlue.end);
  const isNight = now < windows.morningBlue.start || now > windows.eveningBlue.end;

  if (isGoldenHour) {
    score = 98;
    lightType = 'Golden Hour (Soft Warm)';
    styleAdvice = [
      'Ideal for backlit portraits with warm rim lighting',
      'Golden landscape textures & long dramatic shadows',
      'Warm natural tones; minimal color grading needed'
    ];
    cameraSettings = {
      iso: '100 - 400',
      aperture: 'f/2.8 for portraits, f/8 for landscape',
      wb: '5500K - 6500K (Warm / Shade)',
      filters: 'CPL Polarizer to enhance sky contrast',
      tripod: 'Recommended for slow shutter sweeps'
    };
  } else if (isBlueHour) {
    score = 94;
    lightType = 'Blue Hour (Cool Deep Indigo)';
    styleAdvice = [
      'Stunning urban cityscape twilight photography with warm tungsten city lights',
      'Deep blue sky background balances warm artificial architectural lighting',
      'Smooth water reflection shots with long exposures'
    ];
    cameraSettings = {
      iso: '100 - 800',
      aperture: 'f/8 - f/11',
      wb: '3200K - 4000K (Cool Tungsten)',
      filters: 'None needed',
      tripod: 'MANDATORY (Long exposures 2s - 15s)'
    };
  } else if (isNight) {
    const astroScore = Math.max(0, 100 - cloudCover);
    score = Math.round(astroScore * 0.8 + 15);
    lightType = 'Night Sky / Astrophotography';
    styleAdvice = [
      astroScore > 70 ? 'Clear night sky: Ideal for Milky Way & star trails' : 'Cloud cover restricts astro shooting',
      'Use light painting on foreground elements',
      'Urban long-exposure light trails'
    ];
    cameraSettings = {
      iso: astroScore > 70 ? '1600 - 6400' : '400 - 1600',
      aperture: 'f/1.4 - f/2.8 wide open',
      wb: '3800K - 4200K',
      filters: 'Clear / Light pollution filter optional',
      tripod: 'MANDATORY (Intervalometer for star trails)'
    };
  } else {
    // Midday Daylight
    if (cloudCover >= 70) {
      score = 82;
      lightType = 'Overcast Soft Box (Diffused)';
      styleAdvice = [
        'Huge natural softbox! Zero harsh facial shadows for outdoor portraits',
        'Vibrant color saturation in foliage & macro photography',
        'Consistent soft lighting without harsh highlights'
      ];
      cameraSettings = {
        iso: '200 - 400',
        aperture: 'f/4 - f/5.6',
        wb: '6000K (Cloudy)',
        filters: 'CPL filter to eliminate leaf glare',
        tripod: 'Optional'
      };
    } else {
      score = 55;
      lightType = 'Harsh Midday Direct Sun';
      styleAdvice = [
        'Direct overhead sun produces harsh shadows under eyes and nose',
        'Use diffusers or shoot in open shade for portraits',
        'Good for high-contrast architectural & black-and-white street photography'
      ];
      cameraSettings = {
        iso: '100',
        aperture: 'f/8 - f/16',
        wb: '5200K (Daylight)',
        filters: 'ND 3-Stop or 6-Stop filter for cinematic depth',
        tripod: 'Not required'
      };
    }
  }

  return {
    score,
    lightType,
    sunsetPred,
    styleAdvice,
    cameraSettings,
    astroScore: isNight ? Math.max(0, 100 - cloudCover) : null
  };
}
