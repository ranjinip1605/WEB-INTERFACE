import React, { useState } from 'react';
import { ShoppingBag, Tag, Percent } from 'lucide-react';

export function ShoppingPriceConverter() {
  const [tab, setTab] = useState('compare');

  // Comparison State
  const [p1Price, setP1Price] = useState('10');
  const [p1Qty, setP1Qty] = useState('500'); // 500 grams
  const [p1Unit, setP1Unit] = useState('g');

  const [p2Price, setP2Price] = useState('18');
  const [p2Qty, setP2Qty] = useState('1'); // 1 kg
  const [p2Unit, setP2Unit] = useState('kg');

  // Discount State
  const [origPrice, setOrigPrice] = useState('80');
  const [discountPercent, setDiscountPercent] = useState('20');

  // Unit Price Math (normalized to base unit 1 kg or 1 lb)
  const normQty = (qty, unit) => {
    const q = parseFloat(qty) || 1;
    if (unit === 'g') return q / 1000;
    if (unit === 'oz') return q * 0.0283495;
    if (unit === 'lb') return q * 0.453592;
    return q; // kg
  };

  const p1Kg = normQty(p1Qty, p1Unit);
  const p2Kg = normQty(p2Qty, p2Unit);

  const p1UnitPrice = (parseFloat(p1Price) || 0) / p1Kg;
  const p2UnitPrice = (parseFloat(p2Price) || 0) / p2Kg;

  const winner = p1UnitPrice < p2UnitPrice ? 'Package 1' : 'Package 2';
  const diffPercent = Math.abs(((p1UnitPrice - p2UnitPrice) / Math.max(p1UnitPrice, p2UnitPrice)) * 100).toFixed(1);

  // Discount Math
  const orig = parseFloat(origPrice) || 0;
  const disc = parseFloat(discountPercent) || 0;
  const savings = (orig * disc) / 100;
  const finalPrice = orig - savings;

  return (
    <div className="tool-card glass-panel animate-fade-in">
      <div className="tool-header">
        <ShoppingBag className="tool-icon text-red" />
        <div>
          <h3 className="tool-title">Shopping Price & Deal Converter</h3>
          <p className="tool-subtitle">Compare unit prices across packages & calculate discount savings</p>
        </div>
      </div>

      <div className="calc-tab-group">
        <button
          className={`calc-tab ${tab === 'compare' ? 'active' : ''}`}
          onClick={() => setTab('compare')}
        >
          Unit Price Deal Comparer
        </button>
        <button
          className={`calc-tab ${tab === 'discount' ? 'active' : ''}`}
          onClick={() => setTab('discount')}
        >
          Discount Calculator
        </button>
      </div>

      {tab === 'compare' ? (
        <div className="shopping-grid">
          {/* Package 1 */}
          <div className="pkg-box">
            <h4 className="pkg-title">Package 1</h4>
            <div className="form-group">
              <label>Price ($):</label>
              <input
                type="number"
                value={p1Price}
                onChange={(e) => setP1Price(e.target.value)}
                className="tool-input"
              />
            </div>
            <div className="form-group">
              <label>Quantity:</label>
              <div className="input-group">
                <input
                  type="number"
                  value={p1Qty}
                  onChange={(e) => setP1Qty(e.target.value)}
                  className="tool-input"
                />
                <select value={p1Unit} onChange={(e) => setP1Unit(e.target.value)} className="tool-dropdown">
                  <option value="g">Grams (g)</option>
                  <option value="kg">Kilograms (kg)</option>
                  <option value="oz">Ounces (oz)</option>
                  <option value="lb">Pounds (lb)</option>
                </select>
              </div>
            </div>
            <div className="unit-price-display">
              <span>Unit Price:</span>
              <span className="unit-val">${p1UnitPrice.toFixed(2)} / kg</span>
            </div>
          </div>

          {/* Package 2 */}
          <div className="pkg-box">
            <h4 className="pkg-title">Package 2</h4>
            <div className="form-group">
              <label>Price ($):</label>
              <input
                type="number"
                value={p2Price}
                onChange={(e) => setP2Price(e.target.value)}
                className="tool-input"
              />
            </div>
            <div className="form-group">
              <label>Quantity:</label>
              <div className="input-group">
                <input
                  type="number"
                  value={p2Qty}
                  onChange={(e) => setP2Qty(e.target.value)}
                  className="tool-input"
                />
                <select value={p2Unit} onChange={(e) => setP2Unit(e.target.value)} className="tool-dropdown">
                  <option value="g">Grams (g)</option>
                  <option value="kg">Kilograms (kg)</option>
                  <option value="oz">Ounces (oz)</option>
                  <option value="lb">Pounds (lb)</option>
                </select>
              </div>
            </div>
            <div className="unit-price-display">
              <span>Unit Price:</span>
              <span className="unit-val">${p2UnitPrice.toFixed(2)} / kg</span>
            </div>
          </div>

          <div className="winner-banner">
            <Tag size={18} className="text-gold" />
            <span>
              Best Deal: <strong className="text-red">{winner}</strong> is <strong>{diffPercent}% cheaper</strong> per unit weight!
            </span>
          </div>
        </div>
      ) : (
        <div className="discount-form">
          <div className="grid-2-col">
            <div className="form-group">
              <label>Original Price ($):</label>
              <input
                type="number"
                value={origPrice}
                onChange={(e) => setOrigPrice(e.target.value)}
                className="tool-input"
              />
            </div>
            <div className="form-group">
              <label>Discount Percentage (%):</label>
              <input
                type="number"
                value={discountPercent}
                onChange={(e) => setDiscountPercent(e.target.value)}
                className="tool-input"
              />
            </div>
          </div>

          <div className="estimation-output-card">
            <div className="est-stat">
              <span className="est-label">Final Sale Price:</span>
              <span className="est-value text-red">${finalPrice.toFixed(2)}</span>
            </div>
            <div className="est-stat">
              <span className="est-label">Total Money Saved:</span>
              <span className="est-value text-green">${savings.toFixed(2)} ({disc}%)</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
