import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, Sparkles, Wrench } from 'lucide-react';
import { CATEGORIES } from '../data/categories';

// Special tools registry for global search indexing
const SPECIAL_TOOLS = [
  { id: 'cooking', name: 'Cooking & Culinary Converter', category: 'Specialized Tool', keywords: ['cooking', 'baking', 'flour', 'sugar', 'butter', 'cups', 'grams', 'recipe'] },
  { id: 'construction', name: 'Construction & Material Estimator', category: 'Specialized Tool', keywords: ['construction', 'concrete', 'brick', 'drywall', 'tiles', 'slab', 'building'] },
  { id: 'developer', name: 'Developer & Tech Converter', category: 'Specialized Tool', keywords: ['developer', 'hex', 'binary', 'octal', 'px', 'rem', 'base64', 'download', 'bitrate'] },
  { id: 'timezone', name: 'World Time-Zone Converter', category: 'Specialized Tool', keywords: ['timezone', 'time', 'clock', 'cities', 'utc', 'est', 'pst', 'gmt', 'london', 'tokyo'] },
  { id: 'distance', name: 'Distance Between Places', category: 'Specialized Tool', keywords: ['distance', 'places', 'cities', 'haversine', 'flight', 'driving', 'km', 'miles'] },
  { id: 'shopping', name: 'Shopping & Deal Converter', category: 'Specialized Tool', keywords: ['shopping', 'price', 'deal', 'discount', 'savings', 'compare'] },
  { id: 'analytics', name: 'Conversion Analytics & Usage Insights', category: 'Specialized Tool', keywords: ['analytics', 'history', 'stats', 'frequency', 'charts'] },
  { id: 'quiz', name: 'Gamified Quiz & Badges', category: 'Specialized Tool', keywords: ['quiz', 'trivia', 'badges', 'achievements', 'gamified', 'trophy'] },
  { id: 'ocr', name: 'Image-Based OCR Scanner', category: 'Specialized Tool', keywords: ['image', 'ocr', 'scanner', 'photo', 'receipt', 'upload'] },
  { id: 'ai', name: 'AI Conversion Assistant', category: 'Specialized Tool', keywords: ['ai', 'assistant', 'chat', 'baking questions', 'fuel'] },
  { id: 'custom_unit', name: 'Custom Unit Creator', category: 'Specialized Tool', keywords: ['custom', 'create unit', 'inventor', 'my unit'] }
];

export function SearchUnitModal({
  isOpen,
  onClose,
  onSelectSearchResult,
  onOpenTool,
  customUnits = []
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setSearchTerm('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const results = [];
  const query = searchTerm.trim().toLowerCase();

  if (query) {
    // 1. Search Special Tools
    SPECIAL_TOOLS.forEach((tool) => {
      if (
        tool.name.toLowerCase().includes(query) ||
        tool.keywords.some((k) => k.toLowerCase().includes(query))
      ) {
        results.push({
          type: 'tool',
          toolId: tool.id,
          name: tool.name,
          categoryName: tool.category
        });
      }
    });

    // 2. Search Standard Category Units
    Object.values(CATEGORIES).forEach((cat) => {
      Object.entries(cat.units).forEach(([unitKey, meta]) => {
        if (
          meta.name.toLowerCase().includes(query) ||
          meta.symbol.toLowerCase().includes(query) ||
          unitKey.toLowerCase().includes(query) ||
          cat.name.toLowerCase().includes(query)
        ) {
          results.push({
            type: 'unit',
            categoryId: cat.id,
            categoryName: cat.name,
            unitKey,
            unitName: meta.name,
            symbol: meta.symbol
          });
        }
      });
    });

    // 3. Search Custom User Units
    customUnits.forEach((unit) => {
      if (
        unit.name.toLowerCase().includes(query) ||
        unit.symbol.toLowerCase().includes(query)
      ) {
        results.push({
          type: 'unit',
          categoryId: unit.category,
          categoryName: `Custom (${unit.category})`,
          unitKey: unit.key,
          unitName: unit.name,
          symbol: unit.symbol
        });
      }
    });
  }

  const handleSelect = (item) => {
    if (item.type === 'tool') {
      onOpenTool(item.toolId);
    } else {
      onSelectSearchResult(item);
    }
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content glass-panel animate-fade-in" onClick={(e) => e.stopPropagation()}>
        <div className="modal-search-header">
          <Search className="modal-search-icon" />
          <input
            ref={inputRef}
            type="text"
            className="modal-search-input"
            placeholder="Global Search (e.g. 'Cooking', 'Hex', 'Distance', 'Baking', 'Pound')..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-results-container">
          {searchTerm.trim() === '' ? (
            <div className="modal-empty-state">
              <p>Type to search across 20 tools, 100+ units, and custom creator...</p>
              <div className="popular-tags">
                <span className="tag-label">Quick Tools:</span>
                {['Cooking', 'Construction', 'Developer', 'Time Zones', 'Distance', 'Shopping', 'AI Assistant', 'OCR Scanner'].map((tag) => (
                  <button key={tag} className="tag-btn" onClick={() => setSearchTerm(tag)}>
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="modal-empty-state">
              <p>No units or tools found matching "{searchTerm}"</p>
            </div>
          ) : (
            <div className="modal-results-list">
              {results.slice(0, 30).map((item, index) => (
                <div
                  key={index}
                  className={`search-result-item ${item.type === 'tool' ? 'tool-item-highlight' : ''}`}
                  onClick={() => handleSelect(item)}
                >
                  <div className="result-main">
                    {item.type === 'tool' ? <Wrench size={16} className="text-red" /> : <Sparkles size={14} className="text-gold" />}
                    <span className="result-name">{item.name || item.unitName}</span>
                    {item.symbol && <span className="result-symbol">({item.symbol})</span>}
                  </div>
                  <div className="result-cat">
                    <span>{item.categoryName}</span>
                    <ArrowRight size={14} className="result-arrow" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
