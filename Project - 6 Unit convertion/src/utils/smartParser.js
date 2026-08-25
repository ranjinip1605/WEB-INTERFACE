import { CATEGORIES } from '../data/categories';

/**
 * Smart Natural Language Query Parser
 * e.g. "50 lbs to kg", "100 usd in inr", "25 c to f", "10 meters"
 */
export function parseSmartQuery(query) {
  if (!query || typeof query !== 'string') return null;

  const clean = query.trim().toLowerCase();
  if (!clean) return null;

  // Regex pattern matching: [number] [from_unit] (to|in|into) [to_unit]
  const pattern = /^(-?\d+(?:\.\d+)?)\s*([a-z°μ%/]+)?(?:\s+(?:to|in|into|\=\>|\->)\s+([a-z°μ%/]+))?$/i;
  const match = clean.match(pattern);

  if (!match) return null;

  const valueStr = match[1];
  const rawFrom = match[2] ? match[2].trim() : null;
  const rawTo = match[3] ? match[3].trim() : null;

  const value = parseFloat(valueStr);
  if (isNaN(value)) return null;

  let foundCategory = null;
  let foundFromKey = null;
  let foundToKey = null;

  // Function to search unit key/name/symbol
  const findUnitMatch = (str) => {
    if (!str) return null;
    for (const [catId, catMeta] of Object.entries(CATEGORIES)) {
      for (const [unitKey, unitMeta] of Object.entries(catMeta.units)) {
        if (
          unitKey.toLowerCase() === str ||
          unitMeta.symbol.toLowerCase() === str ||
          unitMeta.name.toLowerCase() === str ||
          unitMeta.name.toLowerCase().startsWith(str)
        ) {
          return { catId, unitKey };
        }
      }
    }
    return null;
  };

  if (rawFrom) {
    const fromMatch = findUnitMatch(rawFrom);
    if (fromMatch) {
      foundCategory = fromMatch.catId;
      foundFromKey = fromMatch.unitKey;

      if (rawTo) {
        // Find to unit in same category if possible
        const catMeta = CATEGORIES[foundCategory];
        for (const [unitKey, unitMeta] of Object.entries(catMeta.units)) {
          if (
            unitKey.toLowerCase() === rawTo ||
            unitMeta.symbol.toLowerCase() === rawTo ||
            unitMeta.name.toLowerCase() === rawTo ||
            unitMeta.name.toLowerCase().startsWith(rawTo)
          ) {
            foundToKey = unitKey;
            break;
          }
        }
        // Fallback global search for target unit
        if (!foundToKey) {
          const globalToMatch = findUnitMatch(rawTo);
          if (globalToMatch && globalToMatch.catId === foundCategory) {
            foundToKey = globalToMatch.unitKey;
          }
        }
      }
    }
  }

  if (foundCategory && foundFromKey) {
    return {
      value: value.toString(),
      category: foundCategory,
      fromUnit: foundFromKey,
      toUnit: foundToKey || null
    };
  }

  return null;
}
