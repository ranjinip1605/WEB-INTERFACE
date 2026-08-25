import { CATEGORIES } from '../data/categories';

export function isSpeechSupported() {
  return typeof window !== 'undefined' && 
    ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window);
}

export function createSpeechRecognizer({ onResult, onError, onEnd }) {
  if (!isSpeechSupported()) return null;

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = 'en-US';

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript.toLowerCase();
    const parsed = parseVoiceTranscript(transcript);
    onResult({ transcript, ...parsed });
  };

  recognition.onerror = (event) => {
    if (onError) onError(event.error);
  };

  recognition.onend = () => {
    if (onEnd) onEnd();
  };

  return recognition;
}

/**
 * Smart parsing of spoken input e.g. "convert 50 celsius to fahrenheit" or "100 meters"
 */
function parseVoiceTranscript(transcript) {
  // Extract number
  const numMatch = transcript.match(/-?\d+(\.\d+)?/);
  const number = numMatch ? numMatch[0] : null;

  let matchedCategory = null;
  let matchedFromUnit = null;
  let matchedToUnit = null;

  // Search through categories and unit names/symbols
  Object.values(CATEGORIES).forEach((cat) => {
    Object.entries(cat.units).forEach(([unitKey, meta]) => {
      const uName = meta.name.toLowerCase();
      const uSym = meta.symbol.toLowerCase();

      if (transcript.includes(uName) || transcript.includes(uSym)) {
        if (!matchedFromUnit) {
          matchedCategory = cat.id;
          matchedFromUnit = unitKey;
        } else if (cat.id === matchedCategory && !matchedToUnit && unitKey !== matchedFromUnit) {
          matchedToUnit = unitKey;
        }
      }
    });
  });

  return {
    value: number,
    category: matchedCategory,
    fromUnit: matchedFromUnit,
    toUnit: matchedToUnit
  };
}
