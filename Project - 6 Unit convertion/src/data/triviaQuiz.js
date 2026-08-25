export const TRIVIA_QUESTIONS = [
  {
    id: 1,
    question: "How many meters are in 1 Nautical Mile?",
    options: ["1,000 m", "1,609 m", "1,852 m", "2,000 m"],
    correctIndex: 2,
    explanation: "1 Nautical Mile is officially defined as exactly 1,852 meters based on one minute of latitude on Earth."
  },
  {
    id: 2,
    question: "What temperature is equal in both Celsius and Fahrenheit?",
    options: ["0°", "-40°", "100°", "-273.15°"],
    correctIndex: 1,
    explanation: "-40°C equals -40°F. Formula: (-40 × 9/5) + 32 = -40."
  },
  {
    id: 3,
    question: "How many Gigabytes are in 1 Terabyte?",
    options: ["100 GB", "500 GB", "1,000 GB", "1,024 GB (binary) / 1,000 GB (decimal)"],
    correctIndex: 3,
    explanation: "In decimal standard 1 TB = 1,000 GB, while in binary (TiB/GiB) 1 TiB = 1,024 GiB."
  },
  {
    id: 4,
    question: "How many tablespoons are in 1 US Cup?",
    options: ["8 tbsp", "12 tbsp", "16 tbsp", "24 tbsp"],
    correctIndex: 2,
    explanation: "1 US Cup equals 16 tablespoons or 48 teaspoons."
  },
  {
    id: 5,
    question: "What is 0 Kelvin in Celsius?",
    options: ["0°C", "-100°C", "-273.15°C", "-459.67°C"],
    correctIndex: 2,
    explanation: "Absolute Zero is 0 K, which equals -273.15°C."
  }
];

export const BADGES = [
  { id: 'first_conv', name: 'First Steps', icon: '🚀', desc: 'Perform your first unit conversion' },
  { id: 'master_baker', name: 'Master Baker', icon: '🍰', desc: 'Use the Cooking Converter' },
  { id: 'builder', name: 'Site Engineer', icon: '🏗️', desc: 'Use the Construction Converter' },
  { id: 'dev_guru', name: 'Binary Wizard', icon: '💻', desc: 'Use the Developer Converter' },
  { id: 'globe_trotter', name: 'Globe Trotter', icon: '🌍', desc: 'Check Distance Between Places' },
  { id: 'quiz_champ', name: 'Trivia Master', icon: '🏆', desc: 'Score 100% on the Unit Trivia Quiz' },
  { id: 'custom_creator', name: 'Inventor', icon: '🧪', desc: 'Create your first Custom Unit' }
];
