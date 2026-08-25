import React from 'react';
import { X, Command, CornerDownLeft, RotateCcw, ArrowRightLeft, Search } from 'lucide-react';

export function KeyboardShortcutsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const shortcuts = [
    { key: 'Enter', desc: 'Save current conversion to history', icon: CornerDownLeft },
    { key: 'Esc', desc: 'Clear current input number or close modal', icon: RotateCcw },
    { key: 'S', desc: 'Swap From & To units instantly', icon: ArrowRightLeft },
    { key: '⌘ K / Ctrl+K', desc: 'Open quick unit search modal', icon: Search },
    { key: 'Tab', desc: 'Navigate input fields & dropdowns', icon: Command }
  ];

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content glass-panel animate-fade-in shortcuts-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Keyboard Shortcuts</h3>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="shortcuts-list">
          {shortcuts.map((sc, index) => {
            const Icon = sc.icon;
            return (
              <div key={index} className="shortcut-row">
                <div className="shortcut-desc-group">
                  <Icon size={16} className="shortcut-icon" />
                  <span>{sc.desc}</span>
                </div>
                <kbd className="shortcut-badge">{sc.key}</kbd>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
