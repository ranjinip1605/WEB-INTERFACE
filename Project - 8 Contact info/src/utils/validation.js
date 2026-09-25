export const COUNTRY_CODES = [
  { code: '+91', country: 'India', flag: '🇮🇳', iso: 'IN', placeholder: '98765 43210' },
  { code: '+1', country: 'US / Canada', flag: '🇺🇸', iso: 'US', placeholder: '(555) 000-0000' },
  { code: '+44', country: 'United Kingdom', flag: '🇬🇧', iso: 'GB', placeholder: '7911 123456' },
  { code: '+61', country: 'Australia', flag: '🇦🇺', iso: 'AU', placeholder: '412 345 678' },
  { code: '+49', country: 'Germany', flag: '🇩🇪', iso: 'DE', placeholder: '151 23456789' },
  { code: '+971', country: 'UAE', flag: '🇦🇪', iso: 'AE', placeholder: '50 123 4567' },
  { code: '+65', country: 'Singapore', flag: '🇸🇬', iso: 'SG', placeholder: '8123 4567' },
  { code: '+81', country: 'Japan', flag: '🇯🇵', iso: 'JP', placeholder: '90 1234 5678' },
  { code: '+33', country: 'France', flag: '🇫🇷', iso: 'FR', placeholder: '6 12 34 56 78' },
  { code: '+86', country: 'China', flag: '🇨🇳', iso: 'CN', placeholder: '138 0013 8000' },
  { code: '+55', country: 'Brazil', flag: '🇧🇷', iso: 'BR', placeholder: '11 91234-5678' },
  { code: '+60', country: 'Malaysia', flag: '🇲🇾', iso: 'MY', placeholder: '12-345 6789' }
];

/**
 * Validates email syntax
 */
export function validateEmail(email) {
  if (!email || !email.trim()) return { isValid: false, message: 'Email address is required' };
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(email.trim())) {
    return { isValid: false, message: 'Please enter a valid email address (e.g. user@domain.com)' };
  }
  return { isValid: true, message: '' };
}

/**
 * Validates phone number format
 */
export function validatePhone(phone) {
  if (!phone || !phone.trim()) return { isValid: false, message: 'Phone number is required' };
  const digits = phone.replace(/[^0-9]/g, '');
  if (digits.length < 7) {
    return { isValid: false, message: 'Phone number must contain at least 7 digits' };
  }
  if (digits.length > 15) {
    return { isValid: false, message: 'Phone number is too long (max 15 digits)' };
  }
  return { isValid: true, message: '' };
}

/**
 * Formats digits based on country code
 */
export function formatPhoneNumber(rawDigits, countryCode = '+91') {
  const digits = rawDigits.replace(/[^0-9]/g, '');
  if (!digits) return '';

  if (countryCode === '+91') {
    // India format: XXXXX XXXXX
    if (digits.length <= 5) return digits;
    return `${digits.slice(0, 5)} ${digits.slice(5, 10)}`;
  }

  if (countryCode === '+1') {
    // US format: (XXX) XXX-XXXX
    if (digits.length <= 3) return `(${digits}`;
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
  }

  // General international format: groups of 3 or 4
  if (digits.length <= 4) return digits;
  if (digits.length <= 7) return `${digits.slice(0, 4)} ${digits.slice(4)}`;
  return `${digits.slice(0, 4)} ${digits.slice(4, 8)} ${digits.slice(8, 12)}`;
}

/**
 * Extract clean numeric phone for tel: links
 */
export function getCleanPhone(phone) {
  if (!phone) return '';
  let cleaned = phone.replace(/[^0-9+]/g, '');
  if (!cleaned.startsWith('+')) {
    cleaned = '+' + cleaned;
  }
  return cleaned;
}

/**
 * Get initials from name
 */
export function getInitials(name) {
  if (!name) return '?';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/**
 * Generates a dynamic background color from a string seed
 */
export function getAvatarColor(name) {
  if (!name) return 'linear-gradient(135deg, #6366f1, #8b5cf6)';
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const gradients = [
    'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
    'linear-gradient(135deg, #3b82f6 0%, #2dd4bf 100%)',
    'linear-gradient(135deg, #f43f5e 0%, #fb923c 100%)',
    'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
    'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
    'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
  ];
  const index = Math.abs(hash) % gradients.length;
  return gradients[index];
}

/**
 * Generates and downloads a vCard (.vcf) file
 */
export function exportVCard(contact) {
  const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${contact.name}
TEL;TYPE=CELL:${contact.phone}
EMAIL;TYPE=INTERNET:${contact.email}
${contact.company ? `ORG:${contact.company}` : ''}
${contact.notes ? `NOTE:${contact.notes}` : ''}
END:VCARD`;

  const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${contact.name.replace(/\s+/g, '_')}.vcf`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
