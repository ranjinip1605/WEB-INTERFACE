import React, { useState } from 'react';
import { ArrowRightLeft, Copy, Check, Star, X, Info, AlertTriangle, Calculator, Sparkles } from 'lucide-react';
import { CATEGORIES } from '../data/categories';

export function MainConverter({
  inputValue,
  setInputValue,
  activeCategory,
  fromUnit,
  setFromUnit,
  toUnit,
  setToUnit,
  precision,
  setPrecision,
  conversionResult,
  onSwap,
  onCopy,
  isCopied,
  isFavorite,
  onToggleFavorite,
  onSaveToHistory,
  customUnits = []
}) {
  const [isSwapping, setIsSwapping] = useState(false);
  const categoryMeta = CATEGORIES[activeCategory] || CATEGORIES.length;
  
  // Combine standard category units with custom user units for active category
  const standardUnits = Object.entries(categoryMeta.units);
  const relevantCustom = customUnits
    .filter((c) => c.category === activeCategory)
    .map((c) => [c.key, { name: `${c.name} (Custom)`, symbol: c.symbol }]);

  const unitList = [...standardUnits, ...relevantCustom];

  const handleSwapClick = () => {
    setIsSwapping(true);
    onSwap();
    setTimeout(() => setIsSwapping(false), 300);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleClear = () => {
    setInputValue('');
  };

  const handleManualConvert = () => {
    if (inputValue !== '') {
      onSaveToHistory();
    }
  };

  const getUnitSymbol = (uKey) => {
    if (categoryMeta.units[uKey]) return categoryMeta.units[uKey].symbol;
    const cMatch = customUnits.find((c) => c.key === uKey);
    return cMatch ? cMatch.symbol : uKey;
  };

  const getUnitName = (uKey) => {
    if (categoryMeta.units[uKey]) return categoryMeta.units[uKey].name;
    const cMatch = customUnits.find((c) => c.key === uKey);
    return cMatch ? cMatch.name : uKey;
  };

  return (
    <div className="converter-card glass-panel animate-fade-in">
      <div className="card-top-row">
        <div className="category-title-group">
          <h2 className="converter-heading">{categoryMeta.name} Converter</h2>
          <p className="converter-subheading">
            Live calculation in {getUnitName(fromUnit)} to {getUnitName(toUnit)}
          </p>
        </div>

        {/* Precision selector */}
        <div className="precision-selector">
          <label htmlFor="precision-select" className="precision-label">Decimals:</label>
          <select
            id="precision-select"
            value={precision}
            onChange={(e) => setPrecision(Number(e.target.value))}
            className="precision-dropdown"
          >
            <option value={0}>0 (123)</option>
            <option value={1}>1 (123.4)</option>
            <option value={2}>2 (123.45)</option>
            <option value={3}>3 (123.456)</option>
            <option value={4}>4 (123.4567)</option>
            <option value={5}>5 (123.45678)</option>
            <option value={6}>6 (123.456789)</option>
          </select>
        </div>
      </div>

      {/* Main Grid: Input -> Swap -> Output */}
      <div className="conversion-grid">
        {/* FROM PANEL */}
        <div className="unit-box from-box">
          <div className="unit-box-header">
            <span className="box-tag">From</span>
            <select
              className="unit-dropdown"
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
            >
              {unitList.map(([key, meta]) => (
                <option key={key} value={key}>
                  {meta.name} ({meta.symbol})
                </option>
              ))}
            </select>
          </div>

          <div className="input-wrapper">
            <input
              type="number"
              className="main-number-input"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="0"
              step="any"
              autoFocus
            />
            {inputValue !== '' && (
              <button className="clear-input-btn" onClick={handleClear} title="Clear Input (Esc)">
                <X size={16} />
              </button>
            )}
          </div>
          <div className="unit-symbol-display">
            {getUnitSymbol(fromUnit)}
          </div>
        </div>

        {/* SWAP BUTTON */}
        <div className="swap-wrapper">
          <button
            className={`swap-btn ${isSwapping ? 'animate-rotate' : ''}`}
            onClick={handleSwapClick}
            title="Swap Units (S)"
          >
            <ArrowRightLeft />
          </button>
        </div>

        {/* TO PANEL */}
        <div className="unit-box to-box">
          <div className="unit-box-header">
            <span className="box-tag">To</span>
            <select
              className="unit-dropdown"
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
            >
              {unitList.map(([key, meta]) => (
                <option key={key} value={key}>
                  {meta.name} ({meta.symbol})
                </option>
              ))}
            </select>
          </div>

          <div className="output-wrapper">
            <span className="result-display-text">
              {conversionResult.result !== '' ? conversionResult.result : '0'}
            </span>
          </div>

          <div className="to-box-actions">
            <span className="unit-symbol-display">
              {getUnitSymbol(toUnit)}
            </span>
            <div className="action-buttons-group">
              <button
                className={`action-btn ${isFavorite ? 'favorite-active' : ''}`}
                onClick={onToggleFavorite}
                title={isFavorite ? 'Remove from Favorites' : 'Pin to Favorites'}
              >
                <Star size={18} fill={isFavorite ? 'currentColor' : 'none'} />
              </button>
              <button
                className="action-btn copy-btn"
                onClick={onCopy}
                title="Copy Result"
              >
                {isCopied ? <Check size={18} className="text-green" /> : <Copy size={18} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Warning Box */}
      {conversionResult.warning && (
        <div className="warning-banner">
          <AlertTriangle size={18} />
          <span>{conversionResult.warning}</span>
        </div>
      )}

      {/* Real-Life Comparison Box */}
      {conversionResult.realLife && (
        <div className="reallife-card">
          <Sparkles size={16} className="text-gold" />
          <span className="reallife-title">Real-Life Perspective:</span>
          <span className="reallife-text">{conversionResult.realLife}</span>
        </div>
      )}

      {/* Formula & Explanation Card */}
      {conversionResult.formula && (
        <div className="formula-card">
          <div className="formula-icon-wrapper">
            <Info size={16} />
          </div>
          <div className="formula-details">
            <span className="formula-title">Formula & Rate:</span>
            <code className="formula-code">{conversionResult.formula}</code>
          </div>
          <button
            className="convert-trigger-btn"
            onClick={handleManualConvert}
            title="Save conversion to history"
          >
            <Calculator size={14} />
            <span>Save Conversion</span>
          </button>
        </div>
      )}
    </div>
  );
}
