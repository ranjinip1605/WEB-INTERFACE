// World cities dataset with coordinates (lat, lon) and UTC offsets
export const CITIES = [
  { name: 'New York (USA)', tz: 'America/New_York', offset: -4, lat: 40.7128, lon: -74.0060, code: 'NYC' },
  { name: 'London (UK)', tz: 'Europe/London', offset: 1, lat: 51.5074, lon: -0.1278, code: 'LON' },
  { name: 'Tokyo (Japan)', tz: 'Asia/Tokyo', offset: 9, lat: 35.6762, lon: 139.6503, code: 'TYO' },
  { name: 'Paris (France)', tz: 'Europe/Paris', offset: 2, lat: 48.8566, lon: 2.3522, code: 'PAR' },
  { name: 'Sydney (Australia)', tz: 'Australia/Sydney', offset: 10, lat: -33.8688, lon: 151.2093, code: 'SYD' },
  { name: 'Dubai (UAE)', tz: 'Asia/Dubai', offset: 4, lat: 25.2048, lon: 55.2708, code: 'DXB' },
  { name: 'Mumbai (India)', tz: 'Asia/Kolkata', offset: 5.5, lat: 19.0760, lon: 72.8777, code: 'BOM' },
  { name: 'Singapore', tz: 'Asia/Singapore', offset: 8, lat: 1.3521, lon: 103.8198, code: 'SIN' },
  { name: 'Los Angeles (USA)', tz: 'America/Los_Angeles', offset: -7, lat: 34.0522, lon: -118.2437, code: 'LAX' },
  { name: 'Toronto (Canada)', tz: 'America/Toronto', offset: -4, lat: 43.6532, lon: -79.3832, code: 'YYZ' },
  { name: 'Hong Kong', tz: 'Asia/Hong_Kong', offset: 8, lat: 22.3193, lon: 114.1694, code: 'HKG' },
  { name: 'Berlin (Germany)', tz: 'Europe/Berlin', offset: 2, lat: 52.5200, lon: 13.4050, code: 'BER' }
];

/**
 * Calculate Haversine distance between two coordinates in kilometers
 */
export function calculateCityDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of Earth in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distanceKm = R * c;

  return {
    km: distanceKm,
    miles: distanceKm * 0.621371,
    nauticalMiles: distanceKm * 0.539957,
    flightHours: (distanceKm / 800).toFixed(1), // ~800 km/h avg commercial plane
    drivingHours: (distanceKm / 80).toFixed(1)   // ~80 km/h avg driving
  };
}
