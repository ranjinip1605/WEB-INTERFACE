import React from 'react';
import {
  Ruler,
  Scale,
  Thermometer,
  Box,
  Square,
  Gauge,
  Clock,
  HardDrive,
  Coins,
  Zap,
  Activity
} from 'lucide-react';
import { CATEGORIES } from '../data/categories';

const ICON_MAP = {
  Ruler,
  Scale,
  Thermometer,
  Box,
  Square,
  Gauge,
  Clock,
  HardDrive,
  Coins,
  Zap,
  Activity
};

export function CategorySelector({ activeCategory, onSelectCategory }) {
  return (
    <nav className="category-ribbon">
      <div className="category-scroll-container">
        {Object.values(CATEGORIES).map((cat) => {
          const IconComponent = ICON_MAP[cat.icon] || Ruler;
          const isActive = activeCategory === cat.id;

          return (
            <button
              key={cat.id}
              className={`category-tab ${isActive ? 'active' : ''}`}
              onClick={() => onSelectCategory(cat.id)}
            >
              <IconComponent className="tab-icon" />
              <span className="tab-name">{cat.name}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
