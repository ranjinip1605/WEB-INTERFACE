import React, { useState, useMemo } from 'react';
import { 
  Phone, 
  PhoneOutgoing, 
  PhoneIncoming, 
  PhoneMissed, 
  Trash2, 
  UserPlus, 
  Search, 
  Clock, 
  User, 
  RotateCcw,
  Calendar,
  AlertCircle
} from 'lucide-react';

export default function CallHistory({
  callHistory = [],
  onInitiateCall,
  onOpenAddModalWithPhone,
  onDeleteHistoryItem,
  onClearHistory
}) {
  const [filterType, setFilterType] = useState('all'); // 'all' | 'missed' | 'outgoing' | 'incoming'
  const [searchQuery, setSearchQuery] = useState('');
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  // Filter & Search History
  const filteredHistory = useMemo(() => {
    return callHistory.filter((item) => {
      // Filter by type
      if (filterType !== 'all' && item.type !== filterType) {
        return false;
      }
      // Filter by query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const nameMatch = item.name.toLowerCase().includes(query);
        const phoneMatch = item.phone.toLowerCase().includes(query);
        return nameMatch || phoneMatch;
      }
      return true;
    });
  }, [callHistory, filterType, searchQuery]);

  // Counts
  const counts = useMemo(() => {
    return {
      all: callHistory.length,
      missed: callHistory.filter((h) => h.type === 'missed').length,
      outgoing: callHistory.filter((h) => h.type === 'outgoing').length,
      incoming: callHistory.filter((h) => h.type === 'incoming').length
    };
  }, [callHistory]);

  // Helper for formatting timestamp
  const formatCallDate = (isoStr) => {
    if (!isoStr) return 'Recent';
    const date = new Date(isoStr);
    if (isNaN(date.getTime())) return isoStr;

    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();
    
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    const isYesterday = date.toDateString() === yesterday.toDateString();

    const timeStr = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    if (isToday) return `Today, ${timeStr}`;
    if (isYesterday) return `Yesterday, ${timeStr}`;

    return `${date.toLocaleDateString([], { month: 'short', day: 'numeric' })}, ${timeStr}`;
  };

  const getDirectionIcon = (type) => {
    switch (type) {
      case 'outgoing':
        return <PhoneOutgoing size={16} className="history-icon outgoing" />;
      case 'incoming':
        return <PhoneIncoming size={16} className="history-icon incoming" />;
      case 'missed':
        return <PhoneMissed size={16} className="history-icon missed" />;
      default:
        return <Phone size={16} />;
    }
  };

  return (
    <div className="history-container">
      {/* Header Controls */}
      <div className="history-header">
        <div className="history-title-row">
          <div className="history-title">
            <Clock className="history-header-icon" size={24} />
            <h2>Call History</h2>
            <span className="history-count-badge">{callHistory.length} calls</span>
          </div>

          {callHistory.length > 0 && (
            <button 
              className="btn btn-secondary btn-icon-label btn-danger-outline" 
              onClick={() => setShowClearConfirm(true)}
            >
              <Trash2 size={16} />
              <span>Clear History</span>
            </button>
          )}
        </div>

        {/* Filters and Search Bar */}
        <div className="history-filter-bar">
          <div className="history-tabs">
            <button
              className={`history-tab ${filterType === 'all' ? 'active' : ''}`}
              onClick={() => setFilterType('all')}
            >
              All ({counts.all})
            </button>
            <button
              className={`history-tab ${filterType === 'missed' ? 'active' : ''}`}
              onClick={() => setFilterType('missed')}
            >
              Missed ({counts.missed})
            </button>
            <button
              className={`history-tab ${filterType === 'outgoing' ? 'active' : ''}`}
              onClick={() => setFilterType('outgoing')}
            >
              Outgoing ({counts.outgoing})
            </button>
            <button
              className={`history-tab ${filterType === 'incoming' ? 'active' : ''}`}
              onClick={() => setFilterType('incoming')}
            >
              Incoming ({counts.incoming})
            </button>
          </div>

          <div className="history-search">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder="Search call log..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* History List */}
      <div className="history-list-wrapper">
        {filteredHistory.length > 0 ? (
          <div className="history-list">
            {filteredHistory.map((item) => {
              const isSavedContact = Boolean(item.contactId || item.name !== item.phone && !item.name.toLowerCase().includes('unknown'));
              return (
                <div key={item.id} className="history-card">
                  <div className="history-card-left">
                    <div className="history-avatar">
                      {item.avatar ? (
                        <img src={item.avatar} alt={item.name} />
                      ) : (
                        <User size={20} />
                      )}
                    </div>
                    <div className="history-info">
                      <div className="history-name-row">
                        <span className={`history-name ${item.type === 'missed' ? 'is-missed' : ''}`}>
                          {item.name}
                        </span>
                        <div className={`history-direction-pill ${item.type}`}>
                          {getDirectionIcon(item.type)}
                          <span className="capitalize">{item.type}</span>
                        </div>
                      </div>
                      <div className="history-meta-row">
                        <span className="history-phone">{item.phone}</span>
                        <span className="meta-dot">•</span>
                        <span className="history-time">{formatCallDate(item.timestamp)}</span>
                        <span className="meta-dot">•</span>
                        <span className="history-duration">{item.duration}</span>
                      </div>
                    </div>
                  </div>

                  <div className="history-card-actions">
                    {!isSavedContact && onOpenAddModalWithPhone && (
                      <button
                        className="btn-history-action btn-add-contact"
                        onClick={() => onOpenAddModalWithPhone(item.phone)}
                        title="Save Number to Contacts"
                      >
                        <UserPlus size={16} />
                        <span className="action-text">Save</span>
                      </button>
                    )}

                    <button
                      className="btn-history-action btn-call-back"
                      onClick={() => onInitiateCall(null, item.phone)}
                      title={`Call back ${item.name}`}
                    >
                      <Phone size={16} />
                      <span className="action-text">Call Back</span>
                    </button>

                    <button
                      className="btn-history-action btn-delete-item"
                      onClick={() => onDeleteHistoryItem(item.id)}
                      title="Delete Call Record"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="history-empty">
            <Clock size={48} className="empty-icon" />
            <h3>No call history found</h3>
            <p>
              {searchQuery || filterType !== 'all' 
                ? 'Try clearing your filters or search terms.' 
                : 'Calls placed using the DialPad or Contact cards will automatically appear here.'}
            </p>
          </div>
        )}
      </div>

      {/* Clear Confirmation Modal */}
      {showClearConfirm && (
        <div className="modal-overlay" onClick={() => setShowClearConfirm(false)}>
          <div className="modal-card modal-sm text-center" onClick={(e) => e.stopPropagation()}>
            <div className="prompt-icon-badge badge-danger">
              <AlertCircle size={28} />
            </div>
            <h3>Clear All Call Logs?</h3>
            <p className="prompt-desc">
              This will permanently delete all call log history records from your device storage.
            </p>
            <div className="prompt-actions-row">
              <button 
                className="btn btn-secondary flex-1" 
                onClick={() => setShowClearConfirm(false)}
              >
                Cancel
              </button>
              <button 
                className="btn btn-danger flex-1" 
                onClick={() => {
                  onClearHistory();
                  setShowClearConfirm(false);
                }}
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
