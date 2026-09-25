import React, { useState, useEffect } from 'react';
import { User, Phone, PhoneOff, Video, VideoOff, Mic, MicOff, ExternalLink, MessageCircle } from 'lucide-react';
import { getCleanPhone } from '../utils/validation';

export default function ActiveCallModal({
  isOpen,
  onClose,
  contact,
  phoneNumber,
  callMode = 'cellular', // 'cellular' | 'whatsapp_voice' | 'whatsapp_video'
  onEndCall
}) {
  const [seconds, setSeconds] = useState(0);
  const [isVideoActive, setIsVideoActive] = useState(callMode === 'whatsapp_video');
  const [isMuted, setIsMuted] = useState(false);

  const isWhatsApp = callMode === 'whatsapp_voice' || callMode === 'whatsapp_video';
  const isVideo = callMode === 'whatsapp_video' || isVideoActive;

  // Sync video state when callMode changes
  useEffect(() => {
    if (callMode === 'whatsapp_video') {
      setIsVideoActive(true);
    } else {
      setIsVideoActive(false);
    }
  }, [callMode, isOpen]);

  // Timer effect when call is connected
  useEffect(() => {
    let interval = null;
    if (isOpen) {
      setSeconds(0);
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      setSeconds(0);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Format seconds into 0:00 style
  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formattedTimeStr = formatTime(seconds);

  const displayName = contact ? contact.name : (phoneNumber || 'Unknown');
  const displayPhone = contact ? (contact.phone || phoneNumber) : phoneNumber;
  const cleanPhone = getCleanPhone(displayPhone);
  const avatarUrl = contact?.avatar;

  const handleEnd = () => {
    if (onEndCall) {
      onEndCall({
        name: displayName,
        phone: displayPhone,
        duration: formattedTimeStr,
        contactId: contact?.id || null,
        avatar: avatarUrl || '',
        callMode: callMode
      });
    }
    onClose();
  };

  const handleOpenWhatsAppWeb = () => {
    if (!cleanPhone) return;
    const waUrl = `https://wa.me/${cleanPhone}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="active-call-overlay" onClick={(e) => e.stopPropagation()}>
      <div className={`active-call-card ${isWhatsApp ? 'is-whatsapp' : ''}`}>
        
        {/* WhatsApp Brand Header Badge */}
        {isWhatsApp && (
          <div className="whatsapp-call-header">
            <MessageCircle size={18} />
            <span>WhatsApp {callMode === 'whatsapp_video' ? 'Video' : 'Voice'} Call</span>
          </div>
        )}

        {/* Main Avatar Section with Ring & Badge */}
        <div className="call-avatar-wrapper">
          <div className={`call-avatar-circle ${isWhatsApp ? 'wa-avatar-circle' : ''}`}>
            {avatarUrl ? (
              <img src={avatarUrl} alt={displayName} className="call-avatar-img" />
            ) : (
              <User size={56} className="call-avatar-icon" />
            )}
            <div className={`call-avatar-badge ${isWhatsApp ? 'wa-badge' : ''}`} title={isWhatsApp ? "WhatsApp Line" : "Cellular Line"}>
              {isWhatsApp ? <MessageCircle size={16} /> : (isVideo ? <Video size={16} /> : <Phone size={16} />)}
            </div>
          </div>
        </div>

        {/* Name and Number */}
        <div className="call-contact-info">
          <h2 className="call-contact-name">{displayName}</h2>
          <p className="call-contact-phone">{displayPhone}</p>
        </div>

        {/* Connected Badge Pill */}
        <div className={`call-status-pill ${isWhatsApp ? 'wa-status-pill' : ''}`}>
          <span className="call-status-dot"></span>
          <span>
            {isWhatsApp ? `WhatsApp ${callMode === 'whatsapp_video' ? 'Video' : 'Voice'}` : 'Connected'} · {formattedTimeStr}
          </span>
        </div>

        {/* Helper status text */}
        <p className="call-dispatched-text">
          {isWhatsApp
            ? `WhatsApp ${callMode === 'whatsapp_video' ? 'video' : 'voice'} call dispatched to target user (${displayPhone}).`
            : 'Direct call dispatched to mobile network. Your phone device dialer will ring target number.'}
        </p>

        {/* Open WhatsApp App Direct Button */}
        {isWhatsApp && cleanPhone && (
          <button className="btn-open-wa-direct" onClick={handleOpenWhatsAppWeb}>
            <ExternalLink size={14} />
            <span>Launch WhatsApp App / Chat</span>
          </button>
        )}

        {/* Call Controls */}
        <div className="call-actions-row">
          <button 
            className={`call-action-btn btn-secondary-action ${isVideoActive ? 'active' : ''}`}
            onClick={() => setIsVideoActive(!isVideoActive)}
            title={isVideoActive ? "Turn Off Video" : "Start Video"}
            aria-label="Toggle Video"
          >
            {isVideoActive ? <VideoOff size={22} /> : <Video size={22} />}
          </button>

          <button 
            className={`call-action-btn btn-secondary-action ${isMuted ? 'active' : ''}`}
            onClick={() => setIsMuted(!isMuted)}
            title={isMuted ? "Unmute" : "Mute"}
            aria-label="Toggle Mute"
          >
            {isMuted ? <MicOff size={22} /> : <Mic size={22} />}
          </button>

          <button 
            className="call-action-btn btn-end-call"
            onClick={handleEnd}
            title="End Call"
            aria-label="End Call"
          >
            <PhoneOff size={26} />
          </button>
        </div>
      </div>
    </div>
  );
}
