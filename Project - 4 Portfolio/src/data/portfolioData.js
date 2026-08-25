export const personalInfo = {
  name: "Ranjini P",
  title: "AI & Data Science Student · Aspiring Developer",
  greeting: "Hello, World! I'm",
  bio: "B.Tech Artificial Intelligence & Data Science student with an outstanding academic record (CGPA 8.4). Passionate about Python, Web Development, Machine Learning, and Software Engineering. Experienced in remote industry internships, developing full-stack web applications, and building data-driven projects.",
  email: "ranjinip1657@gmail.com",
  phone: "+91 9159880928",
  location: "Tamil Nadu, India",
  college: "Prince Dr K Vasudevan College of Engineering and Technology, Chennai",
  cgpa: "8.4",
  languages: ["English", "Tamil", "Hindi"],
  resumeUrl: "/Ranjini_P_Resume.pdf",
  socials: {
    github: "https://github.com/ranjinip1605",
    linkedin: "https://www.linkedin.com/in/ranjini-p-3601a1387/",
    email: "mailto:ranjinip1657@gmail.com"
  },
  stats: [
    { label: "CGPA", value: 8.4, display: "8.4", suffix: "" },
    { label: "Internships", value: 2, display: "2", suffix: "+" },
    { label: "Certifications", value: 14, display: "14", suffix: "+" },
    { label: "Projects", value: 4, display: "4", suffix: "+" }
  ]
};

export const aboutDetails = [
  { icon: "GraduationCap", label: "Degree", value: "B.Tech — Artificial Intelligence & Data Science" },
  { icon: "Building2", label: "College", value: "Prince Dr K Vasudevan College of Engineering and Technology" },
  { icon: "Award", label: "CGPA", value: "8.4 / 10.0" },
  { icon: "MapPin", label: "Location", value: "Tamil Nadu, India" },
  { icon: "Languages", label: "Languages", value: "English · Tamil · Hindi" },
  { icon: "Sparkles", label: "Interests", value: "AI · Web Development · Data Science · Python · React.js" }
];

export const educationList = [
  {
    period: "2025 – 2029",
    degree: "B.Tech — Artificial Intelligence & Data Science",
    institution: "Prince Dr K Vasudevan College of Engineering and Technology, Chennai",
    score: "CGPA: 8.4",
    highlight: "Pursuing specialization in AI model development, data structures, full-stack web engineering, and machine learning."
  },
  {
    period: "Completed 2025",
    degree: "Higher Secondary Certificate (HSC)",
    institution: "Tamil Nadu State Board",
    score: "90.1%",
    highlight: "Focused on Mathematics, Physics, Chemistry, and Computer Science with distinction."
  },
  {
    period: "Completed 2023",
    degree: "Secondary School Leaving Certificate (SSLC)",
    institution: "Tamil Nadu State Board",
    score: "93.2%",
    highlight: "Achieved top academic performance across core science and mathematics subjects."
  }
];

export const skillsData = [
  { name: "Python", category: "Languages", pct: 88, icon: "FileCode2" },
  { name: "HTML5 & CSS3", category: "Web Dev", pct: 92, icon: "Code2" },
  { name: "JavaScript (ES6+)", category: "Web Dev", pct: 84, icon: "Zap" },
  { name: "React.js", category: "Web Dev", pct: 78, icon: "Atom" },
  { name: "Java Programming", category: "Languages", pct: 80, icon: "Coffee" },
  { name: "C / C++", category: "Languages", pct: 72, icon: "Cpu" },
  { name: "AI & Data Science", category: "AI & Data", pct: 75, icon: "Brain" },
  { name: "Microsoft Azure", category: "Cloud & Tools", pct: 68, icon: "Cloud" }
];

export const internshipsList = [
  {
    company: "CodeAlpha",
    role: "Artificial Intelligence Intern (Remote)",
    duration: "10th June 2026 – 10th July 2026",
    icon: "Terminal",
    desc: "Engineered Python & AI solutions during CodeAlpha Virtual Internship Program in Artificial Intelligence with dedication and hard work. Developed real-world AI tools and applied collaborative software development practices.",
    certificate: "/certificates/codealpha-ai-cert.png",
    certTitle: "Certificate of Completion — Artificial Intelligence Internship",
    certId: "Student ID: CA/DF1/119992",
    certIssueDate: "11th July 2026"
  },
  {
    company: "Thiranex",
    role: "Data Science Intern (Remote)",
    duration: "03 Jun 2026 – 02 Jul 2026",
    icon: "BarChart3",
    desc: "Successfully completed an intensive Data Science internship at Thiranex. Leveraged data analysis and machine learning workflows to evaluate datasets, derive actionable insights, and present data visualizations.",
    certificate: "/certificates/thiranex-datascience-cert.png",
    certTitle: "Certificate of Achievement — Data Science Internship",
    certId: "Verified ID: THX-JUN0326-1504",
    certIssueDate: "02 Jul 2026"
  }
];

export const projectsList = [
  {
    id: 1,
    name: "College Website",
    category: "Web Dev",
    emoji: "🏫",
    desc: "Developed a modern, responsive, and intuitive college web interface providing comprehensive access to department information, academic courses, campus infrastructure, and dynamic activity feeds.",
    tech: ["HTML5", "CSS3", "JavaScript"],
    features: ["Responsive Design", "Interactive Navigation", "Department Showcases"],
    github: "https://github.com/ranjinip1605"
  },
  {
    id: 2,
    name: "Library Management Website",
    category: "Web Dev",
    emoji: "📚",
    desc: "Designed and built an end-to-end library web application for organizing, searching, and managing book catalogs and student checkout records with a clean, accessible layout.",
    tech: ["HTML5", "CSS3", "JavaScript"],
    features: ["Book Search & Filtering", "Record Management", "Clean UX"],
    github: "https://github.com/ranjinip1605"
  },
  {
    id: 3,
    name: "Password Strength Checker",
    category: "Python & AI",
    emoji: "🔐",
    desc: "Created a robust Python security tool that evaluates password entropy and complexity based on character sets, dictionary patterns, and length, providing immediate actionable recommendations.",
    tech: ["Python", "Security", "Regex"],
    features: ["Entropy Calculation", "Rule Verification", "CLI Interface"],
    github: "https://github.com/ranjinip1605"
  },
  {
    id: 4,
    name: "Movie Ticket Management System",
    category: "Java & Systems",
    emoji: "🎬",
    desc: "Engineered an object-oriented Java application for movie ticket booking, seat reservation, and billing using advanced OOP principles (inheritance, polymorphism, encapsulation).",
    tech: ["Java", "OOP", "File I/O"],
    features: ["Seat Booking Workflow", "Receipt Generation", "Object Arrays"],
    github: "https://github.com/ranjinip1605"
  }
];

export const certificatesList = [
  {
    id: "codealpha-ai-cert",
    title: "Artificial Intelligence Internship Certificate",
    issuer: "CodeAlpha",
    topic: "Certificate of Completion · Artificial Intelligence Virtual Internship Program (ID: CA/DF1/119992)",
    date: "July 11, 2026",
    file: "/certificates/codealpha-ai-cert.png",
    badgeColor: "#7C3AED",
    category: "AI & Machine Learning"
  },
  {
    id: "thiranex-ds-cert",
    title: "Data Science Internship Certificate",
    issuer: "Thiranex",
    topic: "Certificate of Achievement · Data Science Internship (Verified ID: THX-JUN0326-1504)",
    date: "July 2, 2026",
    file: "/certificates/thiranex-datascience-cert.png",
    badgeColor: "#0078D4",
    category: "Data Science"
  },
  {
    id: "azure-storage",
    title: "Microsoft Applied Skills: Azure Storage",
    issuer: "Microsoft",
    topic: "Secure Storage for Azure Files and Azure Blob Storage",
    date: "Oct 26, 2025",
    file: "/certificates/microsoft-azure.pdf",
    badgeColor: "#0078D4",
    category: "Cloud & Security"
  },
  {
    id: "canvas-apps",
    title: "Microsoft Applied Skills: Canvas Apps",
    issuer: "Microsoft",
    topic: "Create & Manage Canvas Apps with Power Apps",
    date: "Oct 27, 2025",
    file: "/certificates/microsoft-canvas.pdf",
    badgeColor: "#0078D4",
    category: "App Dev & Cloud"
  },
  {
    id: "fcc-rwd",
    title: "Responsive Web Design Certification",
    issuer: "freeCodeCamp",
    topic: "Developer Certification · ~300 Hours coursework & 5 major projects",
    date: "Mar 12, 2026",
    file: "/certificates/freecodecamp-rwd.pdf",
    badgeColor: "#0A0A23",
    category: "Web Engineering"
  },
  {
    id: "fcc-legacy-rwd",
    title: "Legacy Responsive Web Design V8",
    issuer: "freeCodeCamp",
    topic: "Developer Certification · ~300 Hours coursework & interactive challenges",
    date: "Mar 4, 2026",
    file: "/certificates/freecodecamp-legacy-rwd.pdf",
    badgeColor: "#0A0A23",
    category: "Web Engineering"
  },
  {
    id: "scaler-java",
    title: "Java — Mastering the Fundamentals",
    issuer: "Scaler Topics",
    topic: "86 Videos · 12 Modules · 9 Code Challenges",
    date: "Oct 22, 2025",
    file: "/certificates/scaler-java.pdf",
    badgeColor: "#E76F51",
    category: "Programming"
  },
  {
    id: "scaler-js",
    title: "JavaScript: Unlocking the Power of JS",
    issuer: "Scaler",
    topic: "70 Videos · 9 Modules · 8 Challenges",
    date: "Nov 23, 2025",
    file: "/certificates/scaler-javascript.pdf",
    badgeColor: "#F4A261",
    category: "Web Engineering"
  },
  {
    id: "infosys-java",
    title: "Java Programming Fundamentals",
    issuer: "Infosys Springboard",
    topic: "OOP Concepts, Class Hierarchies, Exception Handling",
    date: "Mar 15, 2026",
    file: "/certificates/infosys-java.pdf",
    badgeColor: "#007CC3",
    category: "Programming"
  },
  {
    id: "infosys-python",
    title: "Python Fundamentals",
    issuer: "Infosys Springboard",
    topic: "Python Core, Data Structures, Modular Programming",
    date: "Mar 21, 2026",
    file: "/certificates/infosys-python.pdf",
    badgeColor: "#007CC3",
    category: "Programming"
  },
  {
    id: "gl-pet",
    title: "Virtual Pet Game — Java",
    issuer: "Great Learning",
    topic: "Interactive CLI Game using OOP Architecture",
    date: "Nov 26, 2025",
    file: "/certificates/greatlearning-virtual-pet.pdf",
    badgeColor: "#2A9D8F",
    category: "Projects & OOP"
  },
  {
    id: "gl-report",
    title: "Student Report Card System — Java",
    issuer: "Great Learning",
    topic: "File Handling, Calculation Engines & Data Structures",
    date: "Nov 26, 2025",
    file: "/certificates/greatlearning-report-card.pdf",
    badgeColor: "#2A9D8F",
    category: "Projects & OOP"
  },
  {
    id: "accenture-ux",
    title: "Digital Skills: User Experience",
    issuer: "Accenture / FutureLearn",
    topic: "UX Design, Wireframing, Information Architecture (98% Score)",
    date: "Oct 23, 2025",
    file: "/certificates/accenture-ux.pdf",
    badgeColor: "#A100FF",
    category: "UI/UX & Product"
  },
  {
    id: "anthropic-claude",
    title: "Claude Code Learning Path",
    issuer: "Anthropic",
    topic: "13 Courses · Advanced AI Engineering & Agentic Workflows",
    date: "2025",
    file: "/certificates/anthropic.pdf",
    badgeColor: "#7C3AED",
    category: "Artificial Intelligence"
  }
];

export const achievementsList = [
  { icon: "Trophy", title: "CGPA 8.4", desc: "Consistently maintaining academic excellence in B.Tech Artificial Intelligence & Data Science." },
  { icon: "CheckCircle2", title: "93.2% SSLC Record", desc: "Scored top honors in Secondary School Certificate board examinations." },
  { icon: "CheckCircle2", title: "90.1% HSC Record", desc: "Achieved distinction in Higher Secondary Science & Mathematics curriculum." },
  { icon: "Briefcase", title: "2 Remote Internships", desc: "Gained real-world industry experience at CodeAlpha (AI) & Thiranex (Data Science) with verified certificates." },
  { icon: "Award", title: "14 Professional Certificates", desc: "Earned certifications across CodeAlpha, Thiranex, Microsoft, freeCodeCamp, Infosys, Scaler, and Anthropic." },
  { icon: "BrainCircuit", title: "Anthropic AI Path", desc: "Completed all 13 courses in Anthropic's Claude Code Learning Path." }
];
