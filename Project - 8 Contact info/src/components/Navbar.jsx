import React from 'react';
import { 
  Search, 
  UserPlus, 
  Sun, 
  Moon, 
  PhoneCall, 
  Users, 
  Star, 
  Briefcase, 
  Heart, 
  User,
  Grid,
  Clock,
  BookUser
} from 'lucide-react';

export default function Navbar({ 
  searchQuery, 
  setSearchQuery, 
  selectedGroup, 
  setSelectedGroup, 
  onOpenAddModal, 
  theme, 
  toggleTheme,
  contactsCount,
  favoritesCount,
  historyCount,
  activeView,
  setActiveView
}) {
  const groups = [
    { id: 'all', label: 'All', icon: Users, count: contactsCount },
    { id: 'favorites', label: 'Favorites', icon: Star, count: favoritesCount },
    { id: 'Work', label: 'Work', icon: Briefcase },
    { id: 'Family', label: 'Family', icon: Heart },
    { id: 'Friends', label: 'Friends', icon: User }
  ];

  return (
    <header className="app-navbar">
      <div className="navbar-top">
        {/* Brand Logo & Title */}
        <div className="brand-logo" onClick={() => setActiveView('contacts')}>
          <div className="logo-icon brand-dial-icon">
            <PhoneCall className="icon-svg" size={20} />
          </div>
          <div className="logo-text">
            <h1>Dial</h1>
          </div>
        </div>

        {/* Primary Main View Navigation Tabs */}
        <nav className="navbar-main-nav">
          <button
            className={`main-nav-btn ${activeView === 'contacts' ? 'active' : ''}`}
            onClick={() => setActiveView('contacts')}
          >
            <BookUser size={18} />
            <span>Contacts</span>
            <span className="nav-badge">{contactsCount}</span>
          </button>

          <button
            className={`main-nav-btn ${activeView === 'dialer' ? 'active' : ''}`}
            onClick={() => setActiveView('dialer')}
          >
            <Grid size={18} />
            <span>Dial Pad</span>
          </button>

          <button
            className={`main-nav-btn ${activeView === 'history' ? 'active' : ''}`}
            onClick={() => setActiveView('history')}
          >
            <Clock size={18} />
            <span>History</span>
            {historyCount > 0 && <span className="nav-badge badge-accent">{historyCount}</span>}
          </button>
        </nav>

        {/* Global Search Bar (When in contacts view) */}
        {activeView === 'contacts' && (
          <div className="search-container">
            <Search className="search-icon" size={18} />
            <input
              type="text"
              className="search-input"
              placeholder="Search contacts by name, phone, email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button className="clear-search-btn" onClick={() => setSearchQuery('')} aria-label="Clear search">
                &times;
              </button>
            )}
          </div>
        )}

        {/* Global Action Buttons */}
        <div className="navbar-actions">
          <button 
            className="btn btn-icon btn-secondary" 
            onClick={toggleTheme} 
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button className="btn btn-primary btn-icon-label" onClick={onOpenAddModal}>
            <UserPlus size={18} />
            <span>New Contact</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs / Chips (Only shown in Contacts View) */}
      {activeView === 'contacts' && (
        <div className="filter-chips-bar">
          {groups.map((g) => {
            const Icon = g.icon;
            const isActive = selectedGroup === g.id;
            return (
              <button
                key={g.id}
                className={`chip-btn ${isActive ? 'active' : ''}`}
                onClick={() => setSelectedGroup(g.id)}
              >
                <Icon size={14} />
                <span>{g.label}</span>
                {g.count !== undefined && <span className="chip-count">{g.count}</span>}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}
