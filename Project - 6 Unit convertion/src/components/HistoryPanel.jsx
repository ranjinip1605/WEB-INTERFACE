import React from 'react';
import { Clock, Trash2, ArrowUpRight, ChevronDown, ChevronUp } from 'lucide-react';

export function HistoryPanel({
  history,
  onRestoreHistory,
  onClearHistory,
  onRemoveHistoryItem
}) {
  const [isOpen, setIsOpen] = React.useState(true);

  if (!history || history.length === 0) return null;

  return (
    <div className="side-panel glass-panel animate-fade-in">
      <div className="panel-header" onClick={() => setIsOpen(!isOpen)}>
        <div className="panel-title-group">
          <Clock className="panel-icon" />
          <h3 className="panel-title">Recent History</h3>
          <span className="badge-count">{history.length}</span>
        </div>
        <div className="panel-header-actions">
          <button
            className="clear-panel-btn"
            onClick={(e) => {
              e.stopPropagation();
              onClearHistory();
            }}
            title="Clear History"
          >
            <Trash2 size={15} />
            <span>Clear</span>
          </button>
          <button className="toggle-collapse-btn">
            {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="panel-list">
          {history.map((item) => (
            <div
              key={item.id}
              className="history-item-card"
              onClick={() => onRestoreHistory(item)}
            >
              <div className="history-info">
                <span className="history-category">{item.categoryName}</span>
                <div className="history-equation">
                  <span className="val-from">{item.value} {item.fromSymbol}</span>
                  <span className="equal-sign">=</span>
                  <span className="val-to">{item.result} {item.toSymbol}</span>
                </div>
                <span className="history-time">{item.timestamp}</span>
              </div>
              <div className="history-actions">
                <button
                  className="restore-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRestoreHistory(item);
                  }}
                  title="Restore conversion"
                >
                  <ArrowUpRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
