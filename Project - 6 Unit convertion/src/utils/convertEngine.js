import { CATEGORIES } from '../data/categories';

/**
 * Temperature converter logic with formulas
 */
export function convertTemperature(val, fromUnit, toUnit) {
  if (fromUnit === toUnit) return { result: val, formula: `${val} °${fromUnit} = ${val} °${toUnit}` };

  let celsius;
  switch (fromUnit) {
    case 'C': celsius = val; break;
    case 'F': celsius = (val - 32) * (5 / 9); break;
    case 'K': celsius = val - 273.15; break;
    case 'R': celsius = (val - 491.67) * (5 / 9); break;
    default: celsius = val;
  }

  let result;
  let formulaStr = '';

  switch (toUnit) {
    case 'C':
      result = celsius;
      if (fromUnit === 'F') formulaStr = '°C = (°F - 32) × 5/9';
      else if (fromUnit === 'K') formulaStr = '°C = K - 273.15';
      else if (fromUnit === 'R') formulaStr = '°C = (°R - 491.67) × 5/9';
      break;
    case 'F':
      result = celsius * (9 / 5) + 32;
      if (fromUnit === 'C') formulaStr = '°F = (°C × 9/5) + 32';
      else if (fromUnit === 'K') formulaStr = '°F = (K - 273.15) × 9/5 + 32';
      else if (fromUnit === 'R') formulaStr = '°F = °R - 459.67';
      break;
    case 'K':
      result = celsius + 273.15;
      if (fromUnit === 'C') formulaStr = 'K = °C + 273.15';
      else if (fromUnit === 'F') formulaStr = 'K = (°F - 32) × 5/9 + 273.15';
      else if (fromUnit === 'R') formulaStr = 'K = °R × 5/9';
      break;
    case 'R':
      result = (celsius + 273.15) * (9 / 5);
      if (fromUnit === 'C') formulaStr = '°R = (°C + 273.15) × 9/5';
      else if (fromUnit === 'F') formulaStr = '°R = °F + 459.67';
      else if (fromUnit === 'K') formulaStr = '°R = K × 9/5';
      break;
    default:
      result = celsius;
  }

  return { result, formula: formulaStr };
}

/**
 * Main conversion function (supporting built-in categories & custom user units)
 */
export function convertValue({
  value,
  categoryId,
  fromUnitKey,
  toUnitKey,
  currencyRates = {},
  customUnits = [],
  precision = 4
}) {
  const category = CATEGORIES[categoryId];
  
  // Look for unit in standard category or custom user units
  let fromUnit = category?.units[fromUnitKey];
  let toUnit = category?.units[toUnitKey];

  if (!fromUnit) {
    const customMatch = customUnits.find((c) => c.key === fromUnitKey);
    if (customMatch) fromUnit = { name: customMatch.name, symbol: customMatch.symbol, factor: customMatch.factor };
  }

  if (!toUnit) {
    const customMatch = customUnits.find((c) => c.key === toUnitKey);
    if (customMatch) toUnit = { name: customMatch.name, symbol: customMatch.symbol, factor: customMatch.factor };
  }

  const numVal = parseFloat(value);
  if (isNaN(numVal) || value === '' || value === null) {
    return { result: '', formula: 'Enter a valid numeric value', warning: '', realLife: '' };
  }

  let warning = '';
  if (category && !category.allowNegative && numVal < 0) {
    warning = `${category.name} cannot be negative. Magnitude evaluated as positive (${Math.abs(numVal)}).`;
  }

  const effectiveVal = (category && !category.allowNegative && numVal < 0) ? Math.abs(numVal) : numVal;

  // Temperature handling
  if (categoryId === 'temperature') {
    if (fromUnitKey === 'C' && effectiveVal < -273.15) {
      warning = 'Temperature below Absolute Zero (-273.15 °C)';
    } else if (fromUnitKey === 'F' && effectiveVal < -459.67) {
      warning = 'Temperature below Absolute Zero (-459.67 °F)';
    }

    const { result, formula } = convertTemperature(effectiveVal, fromUnitKey, toUnitKey);
    const realLife = getRealLifeComparison(result, 'temperature', toUnitKey);

    return {
      result: formatNumber(result, precision),
      numericResult: result,
      formula,
      warning,
      realLife
    };
  }

  // Currency handling
  if (categoryId === 'currency') {
    const fromRate = currencyRates[fromUnitKey] || 1;
    const toRate = currencyRates[toUnitKey] || 1;
    
    const valInUSD = effectiveVal / fromRate;
    const result = valInUSD * toRate;
    
    const formula = `1 ${fromUnitKey} ≈ ${formatNumber(toRate / fromRate, 4)} ${toUnitKey}`;
    const realLife = getRealLifeComparison(result, 'currency', toUnitKey);

    return {
      result: formatNumber(result, precision),
      numericResult: result,
      formula,
      warning,
      realLife
    };
  }

  if (!fromUnit || !toUnit) {
    return { result: 0, formula: '', warning: '', realLife: '' };
  }

  // Value -> Base Unit -> Target Unit
  const valueInBase = effectiveVal * fromUnit.factor;
  const result = valueInBase / toUnit.factor;

  const ratio = fromUnit.factor / toUnit.factor;
  const formula = `1 ${fromUnit.symbol} = ${formatNumber(ratio, 6)} ${toUnit.symbol}`;
  const realLife = getRealLifeComparison(valueInBase, categoryId, category?.baseUnit || 'm');

  return {
    result: formatNumber(result, precision),
    numericResult: result,
    formula,
    warning,
    realLife
  };
}

/**
 * Format helper for numbers
 */
export function formatNumber(num, precision = 4) {
  if (num === null || num === undefined || isNaN(num)) return '';
  if (num === 0) return '0';

  const absNum = Math.abs(num);
  if (absNum >= 1e12 || (absNum < 1e-6 && absNum > 0)) {
    return num.toExponential(precision);
  }

  const factor = Math.pow(10, precision);
  const rounded = Math.round(num * factor) / factor;
  return rounded.toString();
}

/**
 * Real-Life Comparison Generator
 * Returns intuitive contextual comparisons for values (e.g. "Equivalent to ~5 football fields")
 */
export function getRealLifeComparison(valueInBase, categoryId, baseUnit) {
  if (isNaN(valueInBase) || valueInBase <= 0) return '';

  if (categoryId === 'length') {
    // baseUnit is meter
    const meters = valueInBase;
    if (meters >= 1000) {
      const fields = (meters / 100).toFixed(1);
      return `≈ ${fields} American Football Fields (100m each)`;
    } else if (meters >= 300) {
      const eiffels = (meters / 330).toFixed(1);
      return `≈ ${eiffels} Eiffel Towers stacked (330m high)`;
    } else if (meters >= 10) {
      const buses = (meters / 11).toFixed(1);
      return `≈ ${buses} London double-decker buses`;
    } else if (meters >= 1) {
      const guitars = (meters / 1).toFixed(1);
      return `≈ ${guitars} standard acoustic guitars`;
    } else {
      return `≈ ${(meters * 100).toFixed(1)} cm (about the size of an index finger)`;
    }
  }

  if (categoryId === 'weight') {
    // baseUnit is kg
    const kg = valueInBase;
    if (kg >= 1000) {
      const cars = (kg / 1200).toFixed(1);
      return `≈ ${cars} compact passenger cars`;
    } else if (kg >= 50) {
      const dogs = (kg / 30).toFixed(1);
      return `≈ ${dogs} adult Golden Retrievers (~30kg each)`;
    } else if (kg >= 1) {
      const apples = (kg / 0.18).toFixed(0);
      return `≈ ${apples} medium apples`;
    }
  }

  if (categoryId === 'data') {
    // baseUnit is Byte
    const gb = valueInBase / 1e9;
    if (gb >= 1000) {
      return `≈ ${Math.round(gb / 2)} HD movies (~2 GB each)`;
    } else if (gb >= 1) {
      return `≈ ${Math.round(gb * 250)} high-quality MP3 songs`;
    }
  }

  if (categoryId === 'volume') {
    // baseUnit is Liter
    const liters = valueInBase;
    if (liters >= 1000) {
      const pools = (liters / 2500000).toFixed(3);
      return `≈ ${pools} Olympic Swimming Pools`;
    } else if (liters >= 1) {
      const sodas = (liters / 0.355).toFixed(1);
      return `≈ ${sodas} cans of soda (355 ml)`;
    }
  }

  return '';
}

/**
 * Convert value to all units in category
 */
export function convertToAllUnits({
  value,
  categoryId,
  fromUnitKey,
  currencyRates = {},
  customUnits = [],
  precision = 4
}) {
  const category = CATEGORIES[categoryId];
  if (!category) return [];

  const numVal = parseFloat(value);
  if (isNaN(numVal)) return [];

  // Combine standard units + custom units for this category
  const standardEntries = Object.entries(category.units);
  const relevantCustom = customUnits
    .filter((c) => c.category === categoryId)
    .map((c) => [c.key, { name: c.name, symbol: c.symbol, factor: c.factor }]);

  const allEntries = [...standardEntries, ...relevantCustom];

  return allEntries.map(([unitKey, unitMeta]) => {
    const converted = convertValue({
      value: numVal,
      categoryId,
      fromUnitKey,
      toUnitKey: unitKey,
      currencyRates,
      customUnits,
      precision
    });

    return {
      key: unitKey,
      name: unitMeta.name,
      symbol: unitMeta.symbol,
      result: converted.result,
      isCurrent: unitKey === fromUnitKey
    };
  });
}
