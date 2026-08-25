// Enhanced Conversion dataset with standard categories, crypto, and custom unit helpers

export const CATEGORIES = {
  length: {
    id: 'length',
    name: 'Length',
    icon: 'Ruler',
    baseUnit: 'm',
    allowNegative: false,
    units: {
      m: { name: 'Meter', symbol: 'm', factor: 1 },
      km: { name: 'Kilometer', symbol: 'km', factor: 1000 },
      cm: { name: 'Centimeter', symbol: 'cm', factor: 0.01 },
      mm: { name: 'Millimeter', symbol: 'mm', factor: 0.001 },
      um: { name: 'Micrometer', symbol: 'μm', factor: 0.000001 },
      nm: { name: 'Nanometer', symbol: 'nm', factor: 1e-9 },
      in: { name: 'Inch', symbol: 'in', factor: 0.0254 },
      ft: { name: 'Foot', symbol: 'ft', factor: 0.3048 },
      yd: { name: 'Yard', symbol: 'yd', factor: 0.9144 },
      mi: { name: 'Mile', symbol: 'mi', factor: 1609.344 },
      nmi: { name: 'Nautical Mile', symbol: 'nmi', factor: 1852 }
    }
  },

  weight: {
    id: 'weight',
    name: 'Weight & Mass',
    icon: 'Scale',
    baseUnit: 'kg',
    allowNegative: false,
    units: {
      kg: { name: 'Kilogram', symbol: 'kg', factor: 1 },
      g: { name: 'Gram', symbol: 'g', factor: 0.001 },
      mg: { name: 'Milligram', symbol: 'mg', factor: 0.000001 },
      mcg: { name: 'Microgram', symbol: 'μg', factor: 1e-9 },
      t: { name: 'Metric Ton', symbol: 't', factor: 1000 },
      lb: { name: 'Pound', symbol: 'lb', factor: 0.45359237 },
      oz: { name: 'Ounce', symbol: 'oz', factor: 0.028349523125 },
      st: { name: 'Stone', symbol: 'st', factor: 6.35029318 }
    }
  },

  temperature: {
    id: 'temperature',
    name: 'Temperature',
    icon: 'Thermometer',
    baseUnit: 'C',
    allowNegative: true,
    customConversion: true,
    units: {
      C: { name: 'Celsius', symbol: '°C' },
      F: { name: 'Fahrenheit', symbol: '°F' },
      K: { name: 'Kelvin', symbol: 'K' },
      R: { name: 'Rankine', symbol: '°R' }
    }
  },

  volume: {
    id: 'volume',
    name: 'Volume',
    icon: 'Box',
    baseUnit: 'l',
    allowNegative: false,
    units: {
      l: { name: 'Liter', symbol: 'L', factor: 1 },
      ml: { name: 'Milliliter', symbol: 'mL', factor: 0.001 },
      m3: { name: 'Cubic Meter', symbol: 'm³', factor: 1000 },
      cm3: { name: 'Cubic Centimeter', symbol: 'cm³', factor: 0.001 },
      gal: { name: 'US Gallon', symbol: 'gal', factor: 3.785411784 },
      qt: { name: 'US Quart', symbol: 'qt', factor: 0.946352946 },
      pt: { name: 'US Pint', symbol: 'pt', factor: 0.473176473 },
      cup: { name: 'US Cup', symbol: 'cup', factor: 0.24 },
      fl_oz: { name: 'US Fluid Ounce', symbol: 'fl oz', factor: 0.0295735295625 },
      tbsp: { name: 'Tablespoon', symbol: 'tbsp', factor: 0.01478676478125 },
      tsp: { name: 'Teaspoon', symbol: 'tsp', factor: 0.00492892159375 }
    }
  },

  area: {
    id: 'area',
    name: 'Area',
    icon: 'Square',
    baseUnit: 'm2',
    allowNegative: false,
    units: {
      m2: { name: 'Square Meter', symbol: 'm²', factor: 1 },
      km2: { name: 'Square Kilometer', symbol: 'km²', factor: 1000000 },
      cm2: { name: 'Square Centimeter', symbol: 'cm²', factor: 0.0001 },
      mm2: { name: 'Square Millimeter', symbol: 'mm²', factor: 0.000001 },
      ha: { name: 'Hectare', symbol: 'ha', factor: 10000 },
      acre: { name: 'Acre', symbol: 'ac', factor: 4046.8564224 },
      ft2: { name: 'Square Foot', symbol: 'sq ft', factor: 0.09290304 },
      in2: { name: 'Square Inch', symbol: 'sq in', factor: 0.00064516 },
      mi2: { name: 'Square Mile', symbol: 'sq mi', factor: 2589988.110336 }
    }
  },

  speed: {
    id: 'speed',
    name: 'Speed',
    icon: 'Gauge',
    baseUnit: 'm_s',
    allowNegative: false,
    units: {
      m_s: { name: 'Meters per second', symbol: 'm/s', factor: 1 },
      km_h: { name: 'Kilometers per hour', symbol: 'km/h', factor: 0.2777777777777778 },
      mph: { name: 'Miles per hour', symbol: 'mph', factor: 0.44704 },
      knot: { name: 'Knot', symbol: 'kn', factor: 0.5144444444444444 },
      ft_s: { name: 'Feet per second', symbol: 'ft/s', factor: 0.3048 }
    }
  },

  time: {
    id: 'time',
    name: 'Time',
    icon: 'Clock',
    baseUnit: 's',
    allowNegative: false,
    units: {
      ms: { name: 'Millisecond', symbol: 'ms', factor: 0.001 },
      s: { name: 'Second', symbol: 's', factor: 1 },
      min: { name: 'Minute', symbol: 'min', factor: 60 },
      h: { name: 'Hour', symbol: 'h', factor: 3600 },
      d: { name: 'Day', symbol: 'd', factor: 86400 },
      wk: { name: 'Week', symbol: 'wk', factor: 604800 },
      mo: { name: 'Month (Avg)', symbol: 'mo', factor: 2629746 },
      yr: { name: 'Year (365d)', symbol: 'yr', factor: 31536000 }
    }
  },

  data: {
    id: 'data',
    name: 'Data Storage',
    icon: 'HardDrive',
    baseUnit: 'B',
    allowNegative: false,
    units: {
      B: { name: 'Byte', symbol: 'B', factor: 1 },
      KB: { name: 'Kilobyte (1000 B)', symbol: 'KB', factor: 1000 },
      MB: { name: 'Megabyte', symbol: 'MB', factor: 1e6 },
      GB: { name: 'Gigabyte', symbol: 'GB', factor: 1e9 },
      TB: { name: 'Terabyte', symbol: 'TB', factor: 1e12 },
      PB: { name: 'Petabyte', symbol: 'PB', factor: 1e15 },
      KiB: { name: 'Kibibyte (1024 B)', symbol: 'KiB', factor: 1024 },
      MiB: { name: 'Mebibyte', symbol: 'MiB', factor: 1048576 },
      GiB: { name: 'Gibibyte', symbol: 'GiB', factor: 1073741824 },
      bit: { name: 'Bit', symbol: 'bit', factor: 0.125 }
    }
  },

  currency: {
    id: 'currency',
    name: 'Currency & Crypto',
    icon: 'Coins',
    baseUnit: 'USD',
    allowNegative: false,
    isCurrency: true,
    units: {
      USD: { name: 'US Dollar', symbol: '$' },
      EUR: { name: 'Euro', symbol: '€' },
      GBP: { name: 'British Pound', symbol: '£' },
      INR: { name: 'Indian Rupee', symbol: '₹' },
      JPY: { name: 'Japanese Yen', symbol: '¥' },
      CAD: { name: 'Canadian Dollar', symbol: 'CA$' },
      AUD: { name: 'Australian Dollar', symbol: 'A$' },
      CNY: { name: 'Chinese Yuan', symbol: 'CN¥' },
      CHF: { name: 'Swiss Franc', symbol: 'CHF' },
      BRL: { name: 'Brazilian Real', symbol: 'R$' },
      AED: { name: 'Emirati Dirham', symbol: 'AED' },
      KRW: { name: 'South Korean Won', symbol: '₩' },
      ZAR: { name: 'South African Rand', symbol: 'R' },
      BTC: { name: 'Bitcoin (Crypto)', symbol: '₿' },
      ETH: { name: 'Ethereum (Crypto)', symbol: 'Ξ' },
      SOL: { name: 'Solana (Crypto)', symbol: 'SOL' }
    }
  },

  energy: {
    id: 'energy',
    name: 'Energy',
    icon: 'Zap',
    baseUnit: 'J',
    allowNegative: false,
    units: {
      J: { name: 'Joule', symbol: 'J', factor: 1 },
      kJ: { name: 'Kilojoule', symbol: 'kJ', factor: 1000 },
      MJ: { name: 'Megajoule', symbol: 'MJ', factor: 1e6 },
      cal: { name: 'Calorie', symbol: 'cal', factor: 4.184 },
      kcal: { name: 'Kilocalorie', symbol: 'kcal', factor: 4184 },
      Wh: { name: 'Watt-hour', symbol: 'Wh', factor: 3600 },
      kWh: { name: 'Kilowatt-hour', symbol: 'kWh', factor: 3.6e6 },
      BTU: { name: 'British Thermal Unit', symbol: 'BTU', factor: 1055.056 }
    }
  },

  power: {
    id: 'power',
    name: 'Power',
    icon: 'Activity',
    baseUnit: 'W',
    allowNegative: false,
    units: {
      W: { name: 'Watt', symbol: 'W', factor: 1 },
      kW: { name: 'Kilowatt', symbol: 'kW', factor: 1000 },
      MW: { name: 'Megawatt', symbol: 'MW', factor: 1e6 },
      GW: { name: 'Gigawatt', symbol: 'GW', factor: 1e9 },
      hp: { name: 'Horsepower (mechanical)', symbol: 'hp', factor: 745.699872 }
    }
  }
};
