import React, { useState } from 'react';
import { X, Key, Check, Shield, DownloadCloud, RefreshCw, AlertCircle } from 'lucide-react';

export default function ApiSettingsModal({
  isOpen,
  onClose,
  apiKey,
  onSaveApiKey,
  onImportWithApiKey
}) {
  const [keyInput, setKeyInput] = useState(apiKey || '');
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');

  if (!isOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    onSaveApiKey(keyInput.trim());
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleImport = async () => {
    setLoading(true);
    setStatusMsg('');
    try {
      await onImportWithApiKey(keyInput.trim());
      setStatusMsg('Successfully imported new contacts via API!');
      setTimeout(() => {
        onClose();
        setStatusMsg('');
      }, 1500);
    } catch (err) {
      setStatusMsg('Failed to fetch from API. Using local generator fallback.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card modal-md" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-with-icon">
            <Key size={20} className="text-primary" />
            <h2>API Settings & Data Sync</h2>
          </div>
          <button className="close-btn" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <p className="modal-subtext">
            Configure an API key to sync or auto-populate mock contacts into your local browser database.
          </p>

          <form onSubmit={handleSave} className="api-key-form">
            <div className="form-group">
              <label htmlFor="api-key-input">API Secret Key</label>
              <div className="input-with-icon">
                <Shield size={18} className="field-icon" />
                <input
                  id="api-key-input"
                  type="password"
                  className="form-control font-mono"
                  placeholder="ch_live_xxxxxxxxxxxxxxxx"
                  value={keyInput}
                  onChange={(e) => setKeyInput(e.target.value)}
                />
              </div>
              <span className="help-text">
                Your key is stored securely in <code>localStorage</code> on your browser.
              </span>
            </div>

            <div className="api-actions-row">
              <button type="submit" className="btn btn-secondary btn-icon-label">
                {isSaved ? <Check size={16} color="#10b981" /> : <Key size={16} />}
                <span>{isSaved ? 'Key Saved!' : 'Save Key'}</span>
              </button>

              <button 
                type="button" 
                className="btn btn-primary btn-icon-label" 
                onClick={handleImport}
                disabled={loading}
              >
                {loading ? <RefreshCw size={16} className="spin-icon" /> : <DownloadCloud size={16} />}
                <span>{loading ? 'Fetching...' : 'Import 3 Contacts'}</span>
              </button>
            </div>
          </form>

          {statusMsg && (
            <div className={`status-banner ${statusMsg.includes('Failed') ? 'banner-error' : 'banner-success'}`}>
              <AlertCircle size={16} />
              <span>{statusMsg}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
