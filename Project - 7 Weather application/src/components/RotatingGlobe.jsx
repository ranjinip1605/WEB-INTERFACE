import React, { useRef, useEffect, useState } from 'react';

// Geographic polygon coordinate dataset for detailed world continent shapes
const WORLD_CONTINENTS = [
  // North America
  {
    name: 'North America',
    fill: '#22c55e',
    points: [
      [70, -165], [72, -140], [70, -110], [60, -85], [55, -55], [45, -60],
      [48, -66], [42, -70], [35, -75], [25, -80], [15, -88], [8, -78],
      [9, -83], [16, -95], [20, -105], [30, -115], [34, -118], [48, -125],
      [58, -135], [65, -168], [70, -165]
    ]
  },
  // South America
  {
    name: 'South America',
    fill: '#16a34a',
    points: [
      [12, -72], [10, -62], [5, -52], [-5, -35], [-20, -40], [-35, -55],
      [-55, -68], [-52, -75], [-30, -72], [-15, -75], [0, -80], [8, -77], [12, -72]
    ]
  },
  // Europe
  {
    name: 'Europe',
    fill: '#4ade80',
    points: [
      [71, 28], [68, 15], [60, 5], [55, 8], [50, -2], [44, -8], [36, -6],
      [37, -2], [43, 10], [45, 13], [40, 18], [40, 25], [45, 35], [55, 38],
      [65, 42], [70, 60], [60, 60], [50, 45], [50, 30], [60, 25], [71, 28]
    ]
  },
  // Scandinavia
  {
    name: 'Scandinavia',
    fill: '#34d399',
    points: [
      [70, 20], [60, 10], [57, 12], [60, 18], [65, 25], [70, 30], [70, 20]
    ]
  },
  // Great Britain & Ireland
  {
    name: 'British Isles',
    fill: '#4ade80',
    points: [
      [58, -5], [55, -2], [50, -1], [50, -5], [54, -4], [58, -5]
    ]
  },
  // Africa
  {
    name: 'Africa',
    fill: '#84cc16',
    points: [
      [36, 10], [32, 32], [28, 34], [12, 44], [11, 51], [2, 45], [-10, 40],
      [-26, 33], [-34, 26], [-34, 18], [-22, 14], [-5, 12], [5, 2], [10, -14],
      [15, -17], [20, -17], [30, -10], [37, 10]
    ]
  },
  // Madagascar
  {
    name: 'Madagascar',
    fill: '#84cc16',
    points: [
      [-12, 49], [-16, 49], [-25, 47], [-25, 44], [-15, 46], [-12, 49]
    ]
  },
  // Eurasia / Asia Main
  {
    name: 'Asia',
    fill: '#22c55e',
    points: [
      [75, 60], [70, 100], [68, 140], [60, 170], [55, 160], [45, 135],
      [35, 120], [22, 114], [20, 100], [10, 103], [1, 104], [10, 98],
      [22, 90], [25, 80], [15, 75], [8, 77], [20, 70], [25, 60], [25, 55],
      [12, 44], [28, 34], [35, 40], [40, 50], [50, 60], [60, 60], [75, 60]
    ]
  },
  // India Subcontinent
  {
    name: 'India',
    fill: '#10b981',
    points: [
      [30, 78], [24, 88], [20, 85], [15, 80], [8, 77], [15, 74], [20, 72], [24, 69], [30, 78]
    ]
  },
  // East Asia & Japan
  {
    name: 'Japan',
    fill: '#34d399',
    points: [
      [45, 142], [40, 140], [35, 135], [31, 130], [33, 132], [38, 138], [45, 142]
    ]
  },
  // Southeast Asia Islands (Indonesia / Philippines)
  {
    name: 'Indonesia Archipelago',
    fill: '#10b981',
    points: [
      [6, 117], [7, 125], [0, 125], [-8, 115], [-6, 106], [3, 98], [6, 117]
    ]
  },
  // Australia
  {
    name: 'Australia',
    fill: '#eab308',
    points: [
      [-12, 132], [-12, 142], [-24, 153], [-37, 150], [-35, 137], [-34, 115],
      [-22, 114], [-15, 124], [-12, 132]
    ]
  },
  // New Zealand
  {
    name: 'New Zealand',
    fill: '#22c55e',
    points: [
      [-35, 174], [-40, 176], [-46, 168], [-42, 172], [-35, 174]
    ]
  },
  // Greenland
  {
    name: 'Greenland',
    fill: '#e2e8f0',
    points: [
      [82, -30], [80, -15], [70, -20], [60, -42], [65, -52], [76, -65], [82, -60], [82, -30]
    ]
  },
  // Antarctica
  {
    name: 'Antarctica',
    fill: '#f1f5f9',
    points: [
      [-68, -180], [-70, -120], [-72, -60], [-75, 0], [-72, 60], [-70, 120], [-68, 180], [-85, 0], [-68, -180]
    ]
  }
];

export default function RotatingGlobe({ lat = 35.6762, lon = 139.6503, cityName = 'Tokyo' }) {
  const canvasRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [rotationOffset, setRotationOffset] = useState(0);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let rot = rotationOffset;

    const render = () => {
      if (!isDraggingRef.current) {
        rot += 0.006; // Smooth Earth rotation speed
      }

      const width = canvas.width;
      const height = canvas.height;
      const radius = Math.min(width, height) * 0.42;
      const cx = width / 2;
      const cy = height / 2;

      // Tilt angle of Earth's axis (~18 deg)
      const tilt = 0.28;

      ctx.clearRect(0, 0, width, height);

      // 1. Atmosphere Outer Glow
      const glowGrad = ctx.createRadialGradient(cx, cy, radius * 0.95, cx, cy, radius * 1.3);
      glowGrad.addColorStop(0, 'rgba(56, 189, 248, 0.45)');
      glowGrad.addColorStop(0.5, 'rgba(56, 189, 248, 0.15)');
      glowGrad.addColorStop(1, 'rgba(56, 189, 248, 0)');
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.3, 0, Math.PI * 2);
      ctx.fill();

      // 2. Base Ocean Sphere (Rich 3D Deep Blue Gradient)
      const oceanGrad = ctx.createRadialGradient(cx - radius * 0.35, cy - radius * 0.35, radius * 0.1, cx, cy, radius);
      oceanGrad.addColorStop(0, '#1d4ed8');
      oceanGrad.addColorStop(0.5, '#1e3a8a');
      oceanGrad.addColorStop(0.85, '#0f172a');
      oceanGrad.addColorStop(1, '#020617');

      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fillStyle = oceanGrad;
      ctx.fill();

      // Sharp Atmosphere Border Outline
      ctx.strokeStyle = 'rgba(125, 211, 252, 0.6)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Clip canvas drawing inside Earth sphere
      ctx.clip();

      // Helper for 3D Orthographic Projection
      const projectPoint = (lDeg, Ldeg) => {
        const phi = (lDeg * Math.PI) / 180;
        const lambda = ((Ldeg + (rot * 180 / Math.PI)) * Math.PI) / 180;

        // Visibility cos(c)
        const cosC = Math.sin(tilt) * Math.sin(phi) + Math.cos(tilt) * Math.cos(phi) * Math.cos(lambda);
        const x = cx + radius * Math.cos(phi) * Math.sin(lambda);
        const y = cy - radius * (Math.cos(tilt) * Math.sin(phi) - Math.sin(tilt) * Math.cos(phi) * Math.cos(lambda));

        return { x, y, visible: cosC > -0.1 };
      };

      // 3. Draw Latitude & Longitude Graticule Lines (Earth Grid)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.lineWidth = 0.8;

      // Parallels (Latitudes)
      for (let latDeg = -60; latDeg <= 60; latDeg += 30) {
        ctx.beginPath();
        let started = false;
        for (let lonDeg = -180; lonDeg <= 180; lonDeg += 10) {
          const pt = projectPoint(latDeg, lonDeg);
          if (pt.visible) {
            if (!started) {
              ctx.moveTo(pt.x, pt.y);
              started = true;
            } else {
              ctx.lineTo(pt.x, pt.y);
            }
          } else {
            started = false;
          }
        }
        ctx.stroke();
      }

      // Meridians (Longitudes)
      for (let lonDeg = -180; lonDeg < 180; lonDeg += 30) {
        ctx.beginPath();
        let started = false;
        for (let latDeg = -85; latDeg <= 85; latDeg += 10) {
          const pt = projectPoint(latDeg, lonDeg);
          if (pt.visible) {
            if (!started) {
              ctx.moveTo(pt.x, pt.y);
              started = true;
            } else {
              ctx.lineTo(pt.x, pt.y);
            }
          } else {
            started = false;
          }
        }
        ctx.stroke();
      }

      // 4. Draw Detailed Continents with Landmass Fills & Coastal Borders
      WORLD_CONTINENTS.forEach(cont => {
        ctx.beginPath();
        let visibleCount = 0;
        const projectedPts = [];

        cont.points.forEach(([lDeg, Ldeg]) => {
          const pt = projectPoint(lDeg, Ldeg);
          projectedPts.push(pt);
          if (pt.visible) visibleCount++;
        });

        // Render continent polygon if at least part is on the visible front hemisphere
        if (visibleCount > 0) {
          let first = true;
          projectedPts.forEach(pt => {
            if (first) {
              ctx.moveTo(pt.x, pt.y);
              first = false;
            } else {
              ctx.lineTo(pt.x, pt.y);
            }
          });
          ctx.closePath();

          // Landmass fill styling (Emerald green / gold topo colors)
          ctx.fillStyle = cont.fill || '#22c55e';
          ctx.globalAlpha = 0.85;
          ctx.fill();

          // Coastal Border Outline
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
          ctx.lineWidth = 1.2;
          ctx.globalAlpha = 1.0;
          ctx.stroke();
        }
      });

      // 5. Draw Atmospheric Cloud Swirls (Decorative 3D Motion Layers)
      ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
      const cloudPuffs = [
        { lat: 40, lon: -120 + (rot * 60) },
        { lat: 10, lon: 20 + (rot * 60) },
        { lat: -20, lon: 100 + (rot * 60) },
        { lat: 50, lon: 80 + (rot * 60) },
        { lat: -30, lon: -60 + (rot * 60) }
      ];

      cloudPuffs.forEach(c => {
        const pt = projectPoint(c.lat, c.lon);
        if (pt.visible) {
          ctx.beginPath();
          ctx.ellipse(pt.x, pt.y, 25, 10, 0.2, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // 6. Draw Day / Night Shadow Shading (Terminator Line)
      const nightGrad = ctx.createLinearGradient(cx - radius, cy, cx + radius, cy);
      nightGrad.addColorStop(0, 'rgba(2, 6, 23, 0.7)');
      nightGrad.addColorStop(0.45, 'rgba(15, 23, 42, 0.25)');
      nightGrad.addColorStop(0.8, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = nightGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fill();

      // 7. Active Target Location Marker & Pulsing Radar Pin
      const targetPt = projectPoint(lat, lon);

      if (targetPt.visible) {
        const tx = targetPt.x;
        const ty = targetPt.y;

        // Outer Pulsing Radar Ring
        const pulse = (Date.now() % 1600) / 1600;
        const pulseRadius = 6 + pulse * 18;
        const alpha = 1 - pulse;

        ctx.beginPath();
        ctx.arc(tx, ty, pulseRadius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(239, 68, 68, ${alpha})`;
        ctx.lineWidth = 2.5;
        ctx.stroke();

        // Pin Core Dot
        ctx.beginPath();
        ctx.arc(tx, ty, 6, 0, Math.PI * 2);
        ctx.fillStyle = '#ef4444';
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.stroke();

        // City Callout Badge
        ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 1.5;
        const labelText = `📍 ${cityName}`;
        ctx.font = 'bold 11px sans-serif';
        const tw = ctx.measureText(labelText).width + 16;

        ctx.beginPath();
        ctx.roundRect(tx - tw / 2, ty - 30, tw, 22, 11);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.fillText(labelText, tx, ty - 15);
      }

      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [lat, lon, cityName, rotationOffset]);

  // Mouse drag handling to manually spin globe
  const handleMouseDown = (e) => {
    isDraggingRef.current = true;
    startXRef.current = e.clientX;
  };

  const handleMouseMove = (e) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - startXRef.current;
    startXRef.current = e.clientX;
    setRotationOffset(prev => prev + deltaX * 0.005);
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  return (
    <div
      className="card rotating-globe-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="globe-card-header">
        <div className="globe-title-group">
          <span className="live-dot" />
          <h3 className="globe-card-title">3D Interactive Earth Globe</h3>
        </div>
        <span className="globe-coord-tag">
          🌍 {lat >= 0 ? `${lat.toFixed(2)}°N` : `${Math.abs(lat).toFixed(2)}°S`}, {lon >= 0 ? `${lon.toFixed(2)}°E` : `${Math.abs(lon).toFixed(2)}°W`}
        </span>
      </div>

      <div
        className="globe-canvas-wrapper"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <canvas
          ref={canvasRef}
          width={310}
          height={300}
          className="globe-canvas"
        />
        <div className="globe-drag-hint">
          <span>{isHovered ? '🖱️ Drag to spin Earth' : '🌍 Rotating Earth'}</span>
        </div>
      </div>

      <div className="globe-footer-stats">
        <div className="globe-stat-pill">
          <span>Location: <strong>{cityName}</strong></span>
        </div>
        <div className="globe-stat-pill">
          <span>Projection: <strong>3D Orthographic</strong></span>
        </div>
      </div>
    </div>
  );
}
