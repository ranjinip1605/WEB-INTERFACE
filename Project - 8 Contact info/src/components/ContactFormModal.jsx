import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  X, 
  Camera, 
  Upload, 
  Sparkles, 
  User, 
  Phone, 
  Mail, 
  Building, 
  Tag, 
  FileText,
  AlertCircle,
  Globe
} from 'lucide-react';
import { 
  validatePhone, 
  validateEmail, 
  formatPhoneNumber, 
  COUNTRY_CODES,
  getInitials, 
  getAvatarColor 
} from '../utils/validation';

export default function ContactFormModal({
  isOpen,
  onClose,
  onSave,
  initialData = null
}) {
  const [name, setName] = useState('');
  const [countryCode, setCountryCode] = useState('+91'); // Default to India (+91)
  const [phoneDigits, setPhoneDigits] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [group, setGroup] = useState('Work');
  const [notes, setNotes] = useState('');
  const [avatar, setAvatar] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);

  // Validation errors state
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Webcam modal state inside form
  const [isCameraActive, setIsCameraActive] = useState(false);
  const videoRef = useRef(null);
  const mediaStreamRef = useRef(null);

  // Helper to stop webcam stream
  const stopCamera = useCallback(() => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }
    setIsCameraActive(false);
  }, []);

  // Parse existing phone number into country code + local number
  const parsePhoneData = (fullPhone) => {
    if (!fullPhone) return { code: '+91', digits: '' };
    
    // Check if phone matches any known country code
    const matchedCC = COUNTRY_CODES.find(cc => fullPhone.startsWith(cc.code));
    if (matchedCC) {
      const remaining = fullPhone.replace(matchedCC.code, '').trim();
      return { code: matchedCC.code, digits: remaining };
    }
    
    // If starts with +, parse digits
    if (fullPhone.startsWith('+')) {
      const parts = fullPhone.split(' ');
      return { code: parts[0] || '+91', digits: parts.slice(1).join(' ') || '' };
    }

    return { code: '+91', digits: fullPhone };
  };

  // Sync props to form state
  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setName(initialData.name || '');
        const parsedPhone = parsePhoneData(initialData.phone);
        setCountryCode(parsedPhone.code);
        setPhoneDigits(parsedPhone.digits);
        setEmail(initialData.email || '');
        setCompany(initialData.company || '');
        setGroup(initialData.group || 'Work');
        setNotes(initialData.notes || '');
        setAvatar(initialData.avatar || '');
        setIsFavorite(initialData.isFavorite || false);
      } else {
        setName('');
        setCountryCode('+91');
        setPhoneDigits('');
        setEmail('');
        setCompany('');
        setGroup('Work');
        setNotes('');
        setAvatar('');
        setIsFavorite(false);
      }
      setErrors({});
      setTouched({});
    } else {
      stopCamera();
    }
  }, [initialData, isOpen, stopCamera]);

  const handleCountryCodeChange = (e) => {
    const newCode = e.target.value;
    setCountryCode(newCode);
    if (phoneDigits) {
      const formatted = formatPhoneNumber(phoneDigits, newCode);
      setPhoneDigits(formatted);
    }
  };

  const handlePhoneChange = (e) => {
    const raw = e.target.value;
    const formatted = formatPhoneNumber(raw, countryCode);
    setPhoneDigits(formatted);

    const fullPhone = `${countryCode} ${formatted}`.trim();
    if (touched.phone) {
      const v = validatePhone(fullPhone);
      setErrors(prev => ({ ...prev, phone: v.isValid ? '' : v.message }));
    }
  };

  const handleEmailChange = (e) => {
    const val = e.target.value;
    setEmail(val);
    if (touched.email) {
      const v = validateEmail(val);
      setErrors(prev => ({ ...prev, email: v.isValid ? '' : v.message }));
    }
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    if (field === 'phone') {
      const fullPhone = `${countryCode} ${phoneDigits}`.trim();
      const v = validatePhone(fullPhone);
      setErrors(prev => ({ ...prev, phone: v.isValid ? '' : v.message }));
    }
    if (field === 'email') {
      const v = validateEmail(email);
      setErrors(prev => ({ ...prev, email: v.isValid ? '' : v.message }));
    }
    if (field === 'name') {
      setErrors(prev => ({ ...prev, name: name.trim() ? '' : 'Name is required' }));
    }
  };

  // Image File Upload handler
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be under 5MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // DiceBear avatar generator
  const handleGenerateAvatar = () => {
    const seed = name ? encodeURIComponent(name) : Math.random().toString(36).substring(7);
    const styles = ['adventurer', 'avataaars', 'bottts', 'micah', 'personas'];
    const randomStyle = styles[Math.floor(Math.random() * styles.length)];
    setAvatar(`https://api.dicebear.com/7.x/${randomStyle}/svg?seed=${seed}`);
  };

  // Camera capture logic
  const startCamera = async () => {
    try {
      setIsCameraActive(true);
      const stream = await navigator.mediaDevices.getUserMedia({ video: { width: 400, height: 400 } });
      mediaStreamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error('Camera access error:', err);
      alert('Could not access web camera. Please check browser permissions.');
      setIsCameraActive(false);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = 300;
      canvas.height = 300;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(videoRef.current, 0, 0, 300, 300);
      setAvatar(canvas.toDataURL('image/jpeg'));
      stopCamera();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fullPhone = `${countryCode} ${phoneDigits}`.trim();
    const phoneVal = validatePhone(fullPhone);
    const emailVal = validateEmail(email);
    const isNameValid = !!name.trim();

    const newErrors = {
      name: isNameValid ? '' : 'Name is required',
      phone: phoneVal.isValid ? '' : phoneVal.message,
      email: emailVal.isValid ? '' : emailVal.message
    };

    setErrors(newErrors);
    setTouched({ name: true, phone: true, email: true });

    if (isNameValid && phoneVal.isValid && emailVal.isValid) {
      onSave({
        id: initialData ? initialData.id : `c-${Date.now()}`,
        name: name.trim(),
        phone: fullPhone,
        email: email.trim(),
        company: company.trim(),
        group,
        notes: notes.trim(),
        avatar,
        isFavorite,
        createdAt: initialData ? initialData.createdAt : new Date().toISOString()
      });
      stopCamera();
      onClose();
    }
  };

  // Early return if modal is closed
  if (!isOpen) return null;

  const initials = getInitials(name || 'New Contact');
  const avatarBg = getAvatarColor(name || 'New');
  const selectedCountryObj = COUNTRY_CODES.find(c => c.code === countryCode) || COUNTRY_CODES[0];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card modal-lg" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <h2>{initialData ? 'Edit Contact' : 'Add New Contact'}</h2>
          <button className="close-btn" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="modal-form">
          {/* Avatar Selector Section */}
          <div className="avatar-picker-section">
            <div className="avatar-preview-box">
              {avatar ? (
                <img src={avatar} alt="Preview" className="avatar-img-preview" />
              ) : (
                <div className="avatar-initials-preview" style={{ background: avatarBg }}>
                  {initials}
                </div>
              )}
            </div>

            <div className="avatar-actions-wrap">
              <span className="picker-label">Contact Avatar</span>
              <div className="avatar-btns-row">
                <label className="btn btn-secondary btn-sm btn-icon-label cursor-pointer">
                  <Upload size={14} />
                  <span>Upload</span>
                  <input type="file" accept="image/*" onChange={handleFileUpload} hidden />
                </label>

                <button 
                  type="button" 
                  className="btn btn-secondary btn-sm btn-icon-label"
                  onClick={startCamera}
                >
                  <Camera size={14} />
                  <span>Webcam</span>
                </button>

                <button 
                  type="button" 
                  className="btn btn-secondary btn-sm btn-icon-label"
                  onClick={handleGenerateAvatar}
                  title="Generate avatar image"
                >
                  <Sparkles size={14} />
                  <span>Generate</span>
                </button>

                {avatar && (
                  <button 
                    type="button" 
                    className="btn btn-text-icon btn-sm text-danger"
                    onClick={() => setAvatar('')}
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Camera View Overlay inside Modal */}
          {isCameraActive && (
            <div className="webcam-box">
              <video ref={videoRef} autoPlay playsInline className="webcam-video" />
              <div className="webcam-controls">
                <button type="button" className="btn btn-primary btn-sm" onClick={capturePhoto}>
                  Snap Photo
                </button>
                <button type="button" className="btn btn-secondary btn-sm" onClick={stopCamera}>
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Form Input Fields */}
          <div className="form-grid">
            {/* Full Name */}
            <div className="form-group full-width">
              <label htmlFor="input-name">Full Name *</label>
              <div className="input-with-icon">
                <User size={18} className="field-icon" />
                <input
                  id="input-name"
                  type="text"
                  className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                  placeholder="e.g. Rahul Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onBlur={() => handleBlur('name')}
                />
              </div>
              {errors.name && (
                <span className="error-text">
                  <AlertCircle size={12} /> {errors.name}
                </span>
              )}
            </div>

            {/* Phone Number with Country Code Dropdown */}
            <div className="form-group full-width">
              <label htmlFor="input-phone">Phone Number * (Select Country)</label>
              <div className="phone-input-group">
                {/* Country Code Select Dropdown */}
                <div className="country-code-select-wrap">
                  <select
                    className="country-code-select"
                    value={countryCode}
                    onChange={handleCountryCodeChange}
                    aria-label="Select Country Code"
                  >
                    {COUNTRY_CODES.map((c) => (
                      <option key={`${c.code}-${c.iso}`} value={c.code}>
                        {c.flag} {c.country} ({c.code})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Local Phone Input */}
                <div className="input-with-icon flex-1">
                  <Phone size={18} className="field-icon" />
                  <input
                    id="input-phone"
                    type="tel"
                    className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                    placeholder={selectedCountryObj.placeholder}
                    value={phoneDigits}
                    onChange={handlePhoneChange}
                    onBlur={() => handleBlur('phone')}
                  />
                </div>
              </div>
              {errors.phone && (
                <span className="error-text">
                  <AlertCircle size={12} /> {errors.phone}
                </span>
              )}
            </div>

            {/* Email Address */}
            <div className="form-group">
              <label htmlFor="input-email">Email Address *</label>
              <div className="input-with-icon">
                <Mail size={18} className="field-icon" />
                <input
                  id="input-email"
                  type="email"
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  placeholder="rahul@example.com"
                  value={email}
                  onChange={handleEmailChange}
                  onBlur={() => handleBlur('email')}
                />
              </div>
              {errors.email && (
                <span className="error-text">
                  <AlertCircle size={12} /> {errors.email}
                </span>
              )}
            </div>

            {/* Company */}
            <div className="form-group">
              <label htmlFor="input-company">Company / Organization</label>
              <div className="input-with-icon">
                <Building size={18} className="field-icon" />
                <input
                  id="input-company"
                  type="text"
                  className="form-control"
                  placeholder="Tata Consultancy Services"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
              </div>
            </div>

            {/* Group Category */}
            <div className="form-group">
              <label htmlFor="input-group">Group Category</label>
              <div className="input-with-icon">
                <Tag size={18} className="field-icon" />
                <select
                  id="input-group"
                  className="form-control"
                  value={group}
                  onChange={(e) => setGroup(e.target.value)}
                >
                  <option value="Work">Work</option>
                  <option value="Family">Family</option>
                  <option value="Friends">Friends</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            {/* Notes */}
            <div className="form-group full-width">
              <label htmlFor="input-notes">Notes / Additional Info</label>
              <div className="input-with-icon align-top">
                <FileText size={18} className="field-icon icon-textarea" />
                <textarea
                  id="input-notes"
                  className="form-control textarea-input"
                  rows={3}
                  placeholder="Add notes, address, or meeting details..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Form Buttons */}
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {initialData ? 'Save Changes' : 'Create Contact'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
