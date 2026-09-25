import React, { useState, useEffect, useMemo } from 'react';
import { Phone, Delete, UserPlus, Video, Search, User, Check } from 'lucide-react';
import { getCleanPhone } from '../utils/validation';

const KEYPAD_KEYS = [
  { digit: '1', letters: '' },
  { digit: '2', letters: 'ABC' },
  { digit: '3', letters: 'DEF' },
  { digit: '4', letters: 'GHI' },
  { digit: '5', letters: 'JKL' },
  { digit: '6', letters: 'MNO' },
  { digit: '7', letters: 'PQRS' },
  { digit: '8', letters: 'TUV' },
  { digit: '9', letters: 'WXYZ' },
  { digit: '*', letters: '' },
  { digit: '0', letters: '+' },
  { digit: '#', letters: '' }
];

export default function DialPad({
  contacts = [],
  onInitiateCall,
  onOpenAddModalWithPhone
}) {
  const [dialedNumber, setDialedNumber] = useState('');

  // Physical keyboard listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't capture keyboard inputs if focus is inside an input or textarea
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) {
        return;
      }

      if (/^[0-9*#]$/.test(e.key)) {
        setDialedNumber((prev) => prev + e.key);
      } else if (e.key === 'Backspace') {
        setDialedNumber((prev) => prev.slice(0, -1));
      } else if (e.key === 'Enter' && dialedNumber) {
        handleCall();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [dialedNumber]);

  // Handle keypad button click
  const handleKeyClick = (digit) => {
    setDialedNumber((prev) => prev + digit);
  };

  // Backspace click
  const handleBackspace = () => {
    setDialedNumber((prev) => prev.slice(0, -1));
  };

  // Long press backspace to clear all
  const handleClearAll = () => {
    setDialedNumber('');
  };

  // Filter contacts matching dialed digits / numbers
  const matchedContacts = useMemo(() => {
    if (!dialedNumber.trim()) return [];
    const cleanQuery = getCleanPhone(dialedNumber);
    return contacts.filter((c) => {
      const cleanContactPhone = getCleanPhone(c.phone);
      const nameMatch = c.name.toLowerCase().includes(dialedNumber.toLowerCase());
      const phoneMatch = cleanContactPhone.includes(cleanQuery);
      return nameMatch || phoneMatch;
    }).slice(0, 4);
  }, [dialedNumber, contacts]);

  // Exact contact match if available
  const exactContactMatch = useMemo(() => {
    if (!dialedNumber.trim()) return null;
    const cleanQuery = getCleanPhone(dialedNumber);
    return contacts.find((c) => getCleanPhone(c.phone) === cleanQuery) || null;
  }, [dialedNumber, contacts]);

  // Initiate call
  const handleCall = (targetContact = null, phoneToCall = dialedNumber) => {
    const num = targetContact ? targetContact.phone : phoneToCall;
    if (!num.trim()) return;

    if (onInitiateCall) {
      onInitiateCall(targetContact, num);
    }
  };

  return (
    <div className="dialpad-container">
      <div className="dialpad-card">
        {/* Display header */}
        <div className="dialpad-display-wrapper">
          <input
            type="text"
            className="dialpad-number-input"
            value={dialedNumber}
            onChange={(e) => setDialedNumber(e.target.value.replace(/[^0-9*#+ -]/g, ''))}
            placeholder="Dial a number..."
            autoFocus
          />
          {dialedNumber && (
            <button
              className="dialpad-backspace-btn"
              onClick={handleBackspace}
              onDoubleClick={handleClearAll}
              title="Backspace (Double-click to clear all)"
              aria-label="Backspace"
            >
              <Delete size={22} />
            </button>
          )}
        </div>

        {/* Real-Time Contact Lookup Suggestions */}
        {dialedNumber && (
          <div className="dialpad-suggestions">
            <div className="suggestions-header">
              <Search size={14} />
              <span>Matching Contacts ({matchedContacts.length})</span>
            </div>
            {matchedContacts.length > 0 ? (
              <div className="suggestions-list">
                {matchedContacts.map((c) => (
                  <div
                    key={c.id}
                    className="suggestion-item"
                    onClick={() => handleCall(c, c.phone)}
                  >
                    <div className="suggestion-avatar">
                      {c.avatar ? (
                        <img src={c.avatar} alt={c.name} />
                      ) : (
                        <User size={18} />
                      )}
                    </div>
                    <div className="suggestion-info">
                      <span className="suggestion-name">{c.name}</span>
                      <span className="suggestion-phone">{c.phone}</span>
                    </div>
                    <button className="btn-quick-call" title={`Call ${c.name}`}>
                      <Phone size={16} />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="suggestion-empty">
                <span>No saved contact matches "{dialedNumber}"</span>
                {onOpenAddModalWithPhone && (
                  <button
                    className="btn-add-unsaved"
                    onClick={() => onOpenAddModalWithPhone(dialedNumber)}
                  >
                    <UserPlus size={14} />
                    <span>Create New Contact</span>
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {/* Keypad Grid */}
        <div className="keypad-grid">
          {KEYPAD_KEYS.map((k) => (
            <button
              key={k.digit}
              className="keypad-btn"
              onClick={() => handleKeyClick(k.digit)}
            >
              <span className="keypad-digit">{k.digit}</span>
              {k.letters && <span className="keypad-letters">{k.letters}</span>}
            </button>
          ))}
        </div>

        {/* Bottom Dialer Action Buttons */}
        <div className="dialpad-bottom-actions">
          {dialedNumber && !exactContactMatch && onOpenAddModalWithPhone && (
            <button
              className="dialpad-action-circle action-add"
              onClick={() => onOpenAddModalWithPhone(dialedNumber)}
              title="Add Number to Contacts"
              aria-label="Add to Contacts"
            >
              <UserPlus size={22} />
            </button>
          )}

          <button
            className={`dialpad-action-circle action-call ${!dialedNumber ? 'disabled' : ''}`}
            onClick={() => handleCall(exactContactMatch, dialedNumber)}
            disabled={!dialedNumber}
            title="Start Voice Call"
            aria-label="Call Number"
          >
            <Phone size={28} />
          </button>
        </div>
      </div>
    </div>
  );
}
