import React, { useState } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { parseSmartQuery } from '../utils/smartParser';

export function SmartSearchInput({ onParsedConversion, onShowToast }) {
  const [query, setQuery] = useState('');

  const handleQueryChange = (e) => {
    const val = e.target.value;
    setQuery(val);

    const parsed = parseSmartQuery(val);
    if (parsed) {
      onParsedConversion(parsed);
    }
  };

  const handleApply = (e) => {
    e.preventDefault();
    const parsed = parseSmartQuery(query);
    if (parsed) {
      onParsedConversion(parsed);
      onShowToast(`Smart converted: ${query}`);
    } else {
      onShowToast('Could not parse query. Try "50 lbs to kg" or "100 usd in inr"');
    }
  };

  return (
    <form className="smart-search-bar glass-panel" onSubmit={handleApply}>
      <div className="smart-icon-wrapper">
        <Sparkles className="smart-icon" />
      </div>
      <input
        type="text"
        className="smart-input"
        placeholder="Smart Conversion: Type e.g. '50 lbs to kg', '100 usd in inr', '37 c to f'..."
        value={query}
        onChange={handleQueryChange}
      />
      <button type="submit" className="smart-apply-btn">
        <span>Convert</span>
        <ArrowRight size={16} />
      </button>
    </form>
  );
}
