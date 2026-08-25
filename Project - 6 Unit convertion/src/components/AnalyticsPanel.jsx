import React from 'react';
import { BarChart3, TrendingUp, Award } from 'lucide-react';

export function AnalyticsPanel({ history }) {
  const totalCount = history ? history.length : 0;

  // Category counts
  const categoryCounts = {};
  if (history) {
    history.forEach((item) => {
      const catName = item.categoryName || item.category;
      categoryCounts[catName] = (categoryCounts[catName] || 0) + 1;
    });
  }

  const sortedCategories = Object.entries(categoryCounts).sort((a, b) => b[1] - a[1]);
  const topCategory = sortedCategories.length > 0 ? sortedCategories[0][0] : 'None yet';

  return (
    <div className="tool-card glass-panel animate-fade-in">
      <div className="tool-header">
        <BarChart3 className="tool-icon text-red" />
        <div>
          <h3 className="tool-title">Conversion Analytics & Usage Insights</h3>
          <p className="tool-subtitle">Statistical breakdown of your conversion activity</p>
        </div>
      </div>

      <div className="analytics-stats-row">
        <div className="stat-card highlight">
          <TrendingUp className="stat-icon text-red" />
          <div className="stat-content">
            <span className="stat-label">Total Conversions:</span>
            <span className="stat-value text-red">{totalCount}</span>
          </div>
        </div>

        <div className="stat-card">
          <Award className="stat-icon text-gold" />
          <div className="stat-content">
            <span className="stat-label">Most Used Category:</span>
            <span className="stat-value">{topCategory}</span>
          </div>
        </div>
      </div>

      {sortedCategories.length > 0 ? (
        <div className="category-breakdown-section">
          <h4 className="breakdown-title">Category Usage Breakdown</h4>
          <div className="breakdown-list">
            {sortedCategories.map(([catName, count]) => {
              const percentage = Math.round((count / totalCount) * 100);
              return (
                <div key={catName} className="breakdown-row">
                  <div className="breakdown-info">
                    <span className="cat-label">{catName}</span>
                    <span className="cat-count">{count} times ({percentage}%)</span>
                  </div>
                  <div className="progress-track">
                    <div
                      className="progress-fill"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="empty-analytics">
          <p>Perform conversions in the app to see your usage analytics!</p>
        </div>
      )}
    </div>
  );
}
