import React, { useState } from 'react';
import { HardHat, Calculator } from 'lucide-react';

export function ConstructionConverter({ onShowToast }) {
  const [calcType, setCalcType] = useState('concrete');

  // Concrete state
  const [length, setLength] = useState('5');
  const [width, setWidth] = useState('4');
  const [depth, setDepth] = useState('0.15'); // 15 cm slab depth

  // Wall/Room area state
  const [area, setArea] = useState('50');

  const l = parseFloat(length) || 0;
  const w = parseFloat(width) || 0;
  const d = parseFloat(depth) || 0;
  const a = parseFloat(area) || 0;

  // Concrete Math
  const volumeM3 = l * w * d;
  const concreteBags50kg = Math.ceil(volumeM3 * 20); // ~20 bags of 50kg premix per m3

  // Brick Math
  const bricksNeeded = Math.ceil(a * 60); // ~60 bricks per m2 for standard single wall

  // Drywall Math (Standard 4x8 ft sheet = 3.716 m2)
  const drywallSheets = Math.ceil(a / 3.716);

  // Tiles Math (assuming 30x30 cm tile = 0.09 m2 with +10% waste)
  const tilesNeeded = Math.ceil((a * 1.1) / 0.09);

  return (
    <div className="tool-card glass-panel animate-fade-in">
      <div className="tool-header">
        <HardHat className="tool-icon text-red" />
        <div>
          <h3 className="tool-title">Construction & Material Estimator</h3>
          <p className="tool-subtitle">Estimate concrete volume, brick counts, drywall, and tiles</p>
        </div>
      </div>

      <div className="calc-tab-group">
        <button
          className={`calc-tab ${calcType === 'concrete' ? 'active' : ''}`}
          onClick={() => setCalcType('concrete')}
        >
          Concrete Slab
        </button>
        <button
          className={`calc-tab ${calcType === 'bricks' ? 'active' : ''}`}
          onClick={() => setCalcType('bricks')}
        >
          Brick Count
        </button>
        <button
          className={`calc-tab ${calcType === 'drywall' ? 'active' : ''}`}
          onClick={() => setCalcType('drywall')}
        >
          Drywall Sheets
        </button>
        <button
          className={`calc-tab ${calcType === 'tiles' ? 'active' : ''}`}
          onClick={() => setCalcType('tiles')}
        >
          Floor Tiles
        </button>
      </div>

      {calcType === 'concrete' ? (
        <div className="construction-form">
          <div className="grid-3-col">
            <div className="form-group">
              <label>Length (meters):</label>
              <input
                type="number"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                className="tool-input"
              />
            </div>
            <div className="form-group">
              <label>Width (meters):</label>
              <input
                type="number"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                className="tool-input"
              />
            </div>
            <div className="form-group">
              <label>Thickness / Depth (meters):</label>
              <input
                type="number"
                value={depth}
                onChange={(e) => setDepth(e.target.value)}
                className="tool-input"
                step="0.01"
              />
            </div>
          </div>
          <div className="estimation-output-card">
            <div className="est-stat">
              <span className="est-label">Total Concrete Volume:</span>
              <span className="est-value text-red">{volumeM3.toFixed(2)} m³</span>
            </div>
            <div className="est-stat">
              <span className="est-label">Est. Premix Bags (50kg):</span>
              <span className="est-value">{concreteBags50kg} bags</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="construction-form">
          <div className="form-group">
            <label>Surface Area (Square Meters m²):</label>
            <input
              type="number"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              className="tool-input"
            />
          </div>

          <div className="estimation-output-card">
            {calcType === 'bricks' && (
              <div className="est-stat">
                <span className="est-label">Est. Standard Bricks Needed:</span>
                <span className="est-value text-red">{bricksNeeded} bricks</span>
                <span className="est-sub font-muted">(Based on ~60 bricks/m² single wall)</span>
              </div>
            )}

            {calcType === 'drywall' && (
              <div className="est-stat">
                <span className="est-label">Est. 4x8 ft Drywall Sheets:</span>
                <span className="est-value text-red">{drywallSheets} sheets</span>
                <span className="est-sub font-muted">(3.72 m² per sheet)</span>
              </div>
            )}

            {calcType === 'tiles' && (
              <div className="est-stat">
                <span className="est-label">Est. 30x30 cm Tiles Needed:</span>
                <span className="est-value text-red">{tilesNeeded} tiles</span>
                <span className="est-sub font-muted">(Includes +10% waste allowance)</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
