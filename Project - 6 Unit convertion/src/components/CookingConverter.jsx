import React, { useState } from 'react';
import { ChefHat, Copy, Check } from 'lucide-react';
import { formatNumber } from '../utils/convertEngine';

const INGREDIENTS = {
  flour_ap: { name: 'All-Purpose Flour', cupGrams: 125 },
  sugar_gran: { name: 'Granulated Sugar', cupGrams: 200 },
  sugar_powd: { name: 'Powdered Sugar', cupGrams: 120 },
  butter: { name: 'Butter', cupGrams: 227 },
  milk: { name: 'Milk / Water', cupGrams: 240 },
  oil: { name: 'Vegetable Oil', cupGrams: 218 },
  oats: { name: 'Rolled Oats', cupGrams: 90 },
  cocoa: { name: 'Cocoa Powder', cupGrams: 100 }
};

const UNITS = {
  cup: { name: 'Cups', toCup: 1 },
  tbsp: { name: 'Tablespoons', toCup: 1 / 16 },
  tsp: { name: 'Teaspoons', toCup: 1 / 48 },
  g: { name: 'Grams', isMass: true },
  oz: { name: 'Ounces (oz)', isMass: true },
  lb: { name: 'Pounds (lb)', isMass: true }
};

export function CookingConverter({ onShowToast }) {
  const [ingredient, setIngredient] = useState('flour_ap');
  const [amount, setAmount] = useState('1');
  const [fromUnit, setFromUnit] = useState('cup');
  const [toUnit, setToUnit] = useState('g');
  const [isCopied, setIsCopied] = useState(false);

  const ingData = INGREDIENTS[ingredient];
  const numVal = parseFloat(amount) || 0;

  // Convert input value to total Cups first
  let cups = 0;
  if (UNITS[fromUnit].isMass) {
    // Grams -> Cups using density
    let grams = numVal;
    if (fromUnit === 'oz') grams = numVal * 28.3495;
    if (fromUnit === 'lb') grams = numVal * 453.592;
    cups = grams / ingData.cupGrams;
  } else {
    cups = numVal * UNITS[fromUnit].toCup;
  }

  // Convert Cups to target unit
  let result = 0;
  if (UNITS[toUnit].isMass) {
    const totalGrams = cups * ingData.cupGrams;
    if (toUnit === 'g') result = totalGrams;
    if (toUnit === 'oz') result = totalGrams / 28.3495;
    if (toUnit === 'lb') result = totalGrams / 453.592;
  } else {
    result = cups / UNITS[toUnit].toCup;
  }

  const formattedResult = formatNumber(result, 2);

  const handleCopy = () => {
    const text = `${formattedResult} ${UNITS[toUnit].name} of ${ingData.name}`;
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    onShowToast(`Copied: ${text}`);
    setTimeout(() => setIsCopied(false), 1500);
  };

  return (
    <div className="tool-card glass-panel animate-fade-in">
      <div className="tool-header">
        <ChefHat className="tool-icon text-red" />
        <div>
          <h3 className="tool-title">Cooking & Culinary Converter</h3>
          <p className="tool-subtitle">Density-accurate ingredient weight & volume conversion</p>
        </div>
      </div>

      <div className="cooking-grid">
        <div className="form-group">
          <label>Select Ingredient:</label>
          <select
            value={ingredient}
            onChange={(e) => setIngredient(e.target.value)}
            className="tool-dropdown"
          >
            {Object.entries(INGREDIENTS).map(([key, item]) => (
              <option key={key} value={key}>
                {item.name} ({item.cupGrams}g/cup)
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Quantity:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="tool-input"
            step="any"
          />
        </div>

        <div className="form-group">
          <label>From Unit:</label>
          <select
            value={fromUnit}
            onChange={(e) => setFromUnit(e.target.value)}
            className="tool-dropdown"
          >
            {Object.entries(UNITS).map(([key, item]) => (
              <option key={key} value={key}>{item.name}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>To Unit:</label>
          <select
            value={toUnit}
            onChange={(e) => setToUnit(e.target.value)}
            className="tool-dropdown"
          >
            {Object.entries(UNITS).map(([key, item]) => (
              <option key={key} value={key}>{item.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="cooking-result-box">
        <div className="result-main-group">
          <span className="result-label">{numVal} {UNITS[fromUnit].name} of {ingData.name} =</span>
          <span className="result-value text-red">{formattedResult} {UNITS[toUnit].name}</span>
        </div>
        <button className="icon-btn" onClick={handleCopy} title="Copy Culinary Result">
          {isCopied ? <Check size={18} className="text-green" /> : <Copy size={18} />}
        </button>
      </div>
    </div>
  );
}
