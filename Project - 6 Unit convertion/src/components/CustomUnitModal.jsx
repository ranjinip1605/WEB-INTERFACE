import React, { useState } from 'react';
import { X, Plus, Trash2, Sparkles } from 'lucide-react';
import { CATEGORIES } from '../data/categories';

export function CustomUnitModal({
  isOpen,
  onClose,
  customUnits,
  onAddCustomUnit,
  onRemoveCustomUnit,
  onShowToast
}) {
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [category, setCategory] = useState('length');
  const [factor, setFactor] = useState('1');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !symbol || !factor || isNaN(parseFloat(factor))) {
      onShowToast('Please fill all fields with valid data');
      return;
    }

    const newUnit = {
      key: `custom_${Date.now()}`,
      name,
      symbol,
      category,
      factor: parseFloat(factor)
    };

    onAddCustomUnit(newUnit);
    setName('');
    setSymbol('');
    setFactor('1');
    onShowToast(`Created custom unit: 1 ${symbol} = ${factor} base units!`);
  };

  const catMeta = CATEGORIES[category];

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content glass-panel animate-fade-in custom-unit-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-group">
            <Sparkles className="text-red" />
            <h3>Custom Unit Creator</h3>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="custom-unit-form">
          <div className="form-group">
            <label>Category:</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="tool-dropdown"
            >
              {Object.values(CATEGORIES).map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div className="grid-2-col">
            <div className="form-group">
              <label>Unit Name (e.g. 'Standard Step'):</label>
              <input
                type="text"
                placeholder="My Custom Unit"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="tool-input"
                required
              />
            </div>

            <div className="form-group">
              <label>Symbol (e.g. 'step'):</label>
              <input
                type="text"
                placeholder="sym"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value)}
                className="tool-input"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Factor relative to base unit ({catMeta?.units[catMeta?.baseUnit]?.name || catMeta?.baseUnit}):</label>
            <div className="factor-input-group">
              <span>1 {symbol || 'unit'} =</span>
              <input
                type="number"
                step="any"
                value={factor}
                onChange={(e) => setFactor(e.target.value)}
                className="tool-input"
                required
              />
              <span>{catMeta?.units[catMeta?.baseUnit]?.symbol || catMeta?.baseUnit}</span>
            </div>
          </div>

          <button type="submit" className="add-unit-submit-btn">
            <Plus size={16} /> Save Custom Unit
          </button>
        </form>

        {/* Existing Custom Units List */}
        <div className="existing-custom-units">
          <h4 className="list-title">Your Custom Units ({customUnits.length})</h4>
          {customUnits.length === 0 ? (
            <p className="empty-hint">No custom units created yet.</p>
          ) : (
            <div className="custom-units-list">
              {customUnits.map((unit) => (
                <div key={unit.key} className="custom-unit-card">
                  <div className="cunit-info">
                    <span className="cunit-name">{unit.name} ({unit.symbol})</span>
                    <span className="cunit-factor">
                      1 {unit.symbol} = {unit.factor} {CATEGORIES[unit.category]?.baseUnit}
                    </span>
                  </div>
                  <button
                    className="delete-cunit-btn"
                    onClick={() => onRemoveCustomUnit(unit.key)}
                    title="Delete Custom Unit"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
