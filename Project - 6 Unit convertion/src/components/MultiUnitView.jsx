import React from 'react';
import { Grid, Copy, Check } from 'lucide-react';

export function MultiUnitView({
  multiUnitList,
  inputValue,
  fromUnit,
  categoryName,
  onCopyText,
  onSelectTargetUnit
}) {
  const [copiedKey, setCopiedKey] = React.useState(null);

  const handleCopy = (item) => {
    const textToCopy = `${item.result} ${item.symbol}`;
    onCopyText(textToCopy);
    setCopiedKey(item.key);
    setTimeout(() => setCopiedKey(null), 1500);
  };

  if (!multiUnitList || multiUnitList.length === 0 || inputValue === '') {
    return null;
  }

  return (
    <div className="multi-unit-section glass-panel animate-fade-in">
      <div className="section-header">
        <div className="section-title-group">
          <Grid className="section-icon" />
          <h3 className="section-title">All {categoryName} Conversions at a Glance</h3>
        </div>
        <p className="section-subtitle">
          Instant breakdown of {inputValue} {fromUnit} across all category units
        </p>
      </div>

      <div className="multi-unit-grid">
        {multiUnitList.map((item) => {
          const isCopied = copiedKey === item.key;

          return (
            <div
              key={item.key}
              className={`multi-unit-card ${item.isCurrent ? 'current-active' : ''}`}
            >
              <div className="card-top">
                <span className="unit-name">{item.name}</span>
                <span className="unit-symbol">{item.symbol}</span>
              </div>
              <div className="card-bottom">
                <span className="multi-result-val">{item.result}</span>
                <div className="card-actions">
                  <button
                    className="card-copy-btn"
                    onClick={() => handleCopy(item)}
                    title={`Copy ${item.result} ${item.symbol}`}
                  >
                    {isCopied ? <Check size={14} className="text-green" /> : <Copy size={14} />}
                  </button>
                  {!item.isCurrent && (
                    <button
                      className="card-select-btn"
                      onClick={() => onSelectTargetUnit(item.key)}
                      title="Set as target unit"
                    >
                      Target
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
