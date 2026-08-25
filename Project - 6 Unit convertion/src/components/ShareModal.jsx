import React, { useState } from 'react';
import { Share2, Copy, Check, X, MessageSquare, Send } from 'lucide-react';

export function ShareModal({ isOpen, onClose, currentConversion, onShowToast }) {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !currentConversion) return null;

  const shareText = `Converted with OmniConvert: ${currentConversion.value} ${currentConversion.fromSymbol} = ${currentConversion.result} ${currentConversion.toSymbol} (${currentConversion.formula || ''})`;

  const handleCopyText = () => {
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    onShowToast('Share snippet copied to clipboard!');
    setTimeout(() => setCopied(false), 1500);
  };

  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
  const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content glass-panel animate-fade-in share-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-group">
            <Share2 className="text-red" />
            <h3>Share Conversion</h3>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="share-card-preview">
          <span className="preview-label">Formatted Conversion Snippet:</span>
          <blockquote className="share-quote">
            "{shareText}"
          </blockquote>
        </div>

        <div className="share-actions-row">
          <button className="share-action-btn primary" onClick={handleCopyText}>
            {copied ? <Check size={16} className="text-green" /> : <Copy size={16} />}
            <span>Copy Text Snippet</span>
          </button>

          <a href={tweetUrl} target="_blank" rel="noreferrer" className="share-action-btn twitter">
            <Send size={16} />
            <span>Twitter / X</span>
          </a>

          <a href={waUrl} target="_blank" rel="noreferrer" className="share-action-btn whatsapp">
            <MessageSquare size={16} />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
