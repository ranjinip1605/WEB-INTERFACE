import React from 'react';

export default function CityMap({ cityName, lat, lon }) {
  if (!lat || !lon) return null;

  // Google Maps Embed URL format centered on lat, lon with marker
  const mapUrl = `https://maps.google.com/maps?q=${lat},${lon}&z=12&output=embed`;

  return (
    <section className="map-section">
      <h2 className="section-title">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>
        Interactive Map - {cityName}
      </h2>
      <div className="map-card card">
        <div className="map-wrapper">
          <iframe
            title={`Interactive Google Map of ${cityName}`}
            width="100%"
            height="340"
            style={{ border: 0, borderRadius: '16px' }}
            loading="lazy"
            allowFullScreen
            src={mapUrl}
          />
        </div>
        <div className="map-footer">
          <span>Coordinates: <strong>{lat.toFixed(4)}° N, {lon.toFixed(4)}° E</strong></span>
          <a
            href={`https://www.google.com/maps/@${lat},${lon},13z`}
            target="_blank"
            rel="noopener noreferrer"
            className="map-link"
          >
            Open in Google Maps &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
