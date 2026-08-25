import React from 'react';
import { Star, Trash2, Play } from 'lucide-react';

export function FavoritesPanel({
  favorites,
  onLoadFavorite,
  onRemoveFavorite
}) {
  if (!favorites || favorites.length === 0) return null;

  return (
    <div className="side-panel glass-panel animate-fade-in">
      <div className="panel-header">
        <div className="panel-title-group">
          <Star className="panel-icon text-gold" fill="currentColor" />
          <h3 className="panel-title">Pinned Favorites</h3>
          <span className="badge-count">{favorites.length}</span>
        </div>
      </div>

      <div className="favorites-grid">
        {favorites.map((fav) => (
          <div key={fav.id} className="favorite-card" onClick={() => onLoadFavorite(fav)}>
            <div className="fav-top">
              <span className="fav-category">{fav.categoryName}</span>
              <button
                className="fav-delete-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemoveFavorite(fav.id);
                }}
                title="Remove Favorite"
              >
                <Trash2 size={14} />
              </button>
            </div>
            <div className="fav-pair">
              <span>{fav.fromUnitName} ({fav.fromSymbol})</span>
              <span className="fav-arrow">➔</span>
              <span>{fav.toUnitName} ({fav.toSymbol})</span>
            </div>
            <button className="fav-load-btn">
              <Play size={12} fill="currentColor" /> Load Pair
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
