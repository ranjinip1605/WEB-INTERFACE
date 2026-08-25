import React from 'react';
import {
  Sun,
  Moon,
  Mic,
  MicOff,
  Search,
  HelpCircle,
  Zap,
  FileImage,
  Bot,
  PlusCircle,
  Share2
} from 'lucide-react';

export function Header({
  theme,
  setTheme,
  onOpenSearch,
  onOpenShortcuts,
  isListening,
  onToggleVoice,
  currencyStatus,
  onOpenOCR,
  onOpenAI,
  onOpenCustomUnit,
  onOpenShare
}) {
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <header className="header-bar">
      <div className="logo-group">
        <div className="logo-icon-wrapper">
          <Zap className="logo-icon" />
        </div>
        <div>
          <h1 className="logo-title">
            Omni<span className="text-red">Convert</span>
          </h1>
          <p className="logo-subtitle">Smart Conversion Suite & Real-Life Engine</p>
        </div>
      </div>

      <div className="header-actions">
        {/* Live Currency Badge */}
        {currencyStatus && (
          <div className={`status-badge ${currencyStatus.isLive ? 'live' : 'offline'}`} title={currencyStatus.lastUpdated}>
            <span className="status-dot"></span>
            <span className="status-text">
              {currencyStatus.isLive ? 'Live Rates' : 'Saved Rates'}
            </span>
          </div>
        )}

        {/* Custom Unit Creator */}
        <button
          className="header-tool-btn"
          onClick={onOpenCustomUnit}
          title="Create Custom Unit"
        >
          <PlusCircle size={16} />
          <span>Custom Unit</span>
        </button>

        {/* Image OCR Scanner */}
        <button
          className="header-tool-btn"
          onClick={onOpenOCR}
          title="Image OCR Unit Scanner"
        >
          <FileImage size={16} />
          <span>Image OCR</span>
        </button>

        {/* AI Assistant */}
        <button
          className="header-tool-btn highlight"
          onClick={onOpenAI}
          title="AI Conversion Assistant"
        >
          <Bot size={16} />
          <span>AI Assistant</span>
        </button>

        {/* Share Button */}
        <button className="icon-btn" onClick={onOpenShare} title="Share Conversion">
          <Share2 size={18} />
        </button>

        {/* Voice Input */}
        <button
          className={`icon-btn ${isListening ? 'listening' : ''}`}
          onClick={onToggleVoice}
          title={isListening ? 'Listening...' : 'Voice Input'}
        >
          {isListening ? <MicOff className="pulse-icon" /> : <Mic />}
        </button>

        {/* Search Modal (Ctrl+K) */}
        <button className="icon-btn" onClick={onOpenSearch} title="Search All 20 Tools & Units (Ctrl+K)">
          <Search />
          <span className="shortcut-key">⌘K</span>
        </button>

        {/* Shortcuts */}
        <button className="icon-btn" onClick={onOpenShortcuts} title="Keyboard Shortcuts">
          <HelpCircle />
        </button>

        {/* Theme Switcher Toggle (Red & White vs Black & Red) */}
        <button
          className="theme-toggle-btn"
          onClick={toggleTheme}
          title={`Switch Theme`}
        >
          {theme === 'light' ? (
            <>
              <Moon className="btn-icon" />
              <span className="btn-text">Black & Red</span>
            </>
          ) : (
            <>
              <Sun className="btn-icon" />
              <span className="btn-text">Red & White</span>
            </>
          )}
        </button>
      </div>
    </header>
  );
}
