// All personal content lives here. Source of truth: Gagandeep_T_CV.pdf.
// Edit this file to update the site — no component changes needed.

export const profile = {
  name: 'Gagandeep T',
  role: 'MCA Graduate | AI/ML | Data Science | Full-Stack Development',
  email: 'deepgagan14568@gmail.com',
  linkedin: 'https://www.linkedin.com/in/gagandeep03',
  github: 'https://github.com/GTX-Gagan',
  location: 'Karnataka, India',
  // Served from /public — the file downloads with this name.
  resumeUrl: './Gagandeep_T_CV.pdf',
  resumeFileName: 'Gagandeep_T_CV.pdf',
  portrait: './images/gagandeep-portrait.webp',
  fullPhoto: './images/gagandeep-full.webp',
};

export const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
] as const;

export type NavId = (typeof navItems)[number]['id'];

export const aboutFacts = [
  { label: 'Education', value: 'Master of Computer Applications' },
  { label: 'Focus', value: 'Artificial Intelligence, Machine Learning and Software Development' },
  { label: 'Experience', value: 'Data Science / AI/ML Internship and Full-Stack Development Internship' },
  { label: 'Location', value: 'Karnataka, India' },
] as const;

export const skillGroups = [
  { key: 'code', title: 'Programming', items: ['Python', 'Java', 'SQL'] },
  {
    key: 'ai',
    title: 'AI & Machine Learning',
    items: ['Scikit-learn', 'TensorFlow', 'PyTorch', 'XGBoost', 'Hugging Face Transformers', 'NLP'],
  },
  {
    key: 'web',
    title: 'Web Development',
    items: ['HTML5', 'CSS3', 'JavaScript', 'React', 'REST APIs', 'PHP', 'MySQL'],
  },
  {
    key: 'tools',
    title: 'Tools & Platforms',
    items: ['Git', 'GitHub', 'VS Code', 'Streamlit', 'Google Colab', 'Google Cloud'],
  },
  {
    key: 'core',
    title: 'Core Concepts',
    items: ['Data Structures & Algorithms', 'SDLC', 'Debugging', 'Testing', 'Problem Solving'],
  },
] as const;

export type ProjectVisual = 'network' | 'language' | 'scan';

export type Project = {
  index: string;
  title: string;
  short: string;
  description: string;
  tags: string[];
  visual: ProjectVisual;
  /**
   * Repository or live demo URL. Leave null until a real link exists —
   * the card then shows a clearly labelled "link coming soon" placeholder.
   */
  url: string | null;
};

export const projects: Project[] = [
  {
    index: '01',
    title: 'Network Intrusion Detection System',
    short: 'NIDS',
    description:
      'Developed a machine learning system to classify malicious network traffic and support proactive cybersecurity monitoring.',
    tags: ['Python', 'Scikit-learn', 'Random Forest', 'SVM'],
    visual: 'network',
    url: null,
  },
  {
    index: '02',
    title: 'Tulu Language LLM Fine-Tuning',
    short: 'LLM',
    description:
      'Fine-tuned a large language model for a low-resource Indian language, exploring NLP applications for text generation and classification.',
    tags: ['Python', 'Hugging Face Transformers', 'NLP'],
    visual: 'language',
    url: null,
  },
  {
    index: '03',
    title: 'Phishing Detection System',
    short: 'Web security',
    description:
      'Designed a machine learning system to identify malicious URLs and web content to help improve web security.',
    tags: ['Python', 'Machine Learning', 'Web Security'],
    visual: 'scan',
    url: null,
  },
];

export const experience = [
  {
    role: 'Data Science and AI/ML Intern',
    company: 'Comed Kares',
    period: 'February 2026 – May 2026',
    location: 'Bengaluru, India',
    points: [
      'Built a Network Intrusion Detection System using machine learning algorithms.',
      'Fine-tuned a Tulu-language LLM for NLP tasks.',
      'Worked on preprocessing and feature engineering for network traffic and text datasets.',
      'Presented the NIDS project during an industry field visit to Razz Cyber Security, Bengaluru.',
    ],
  },
  {
    role: 'Full-Stack Developer Intern',
    company: 'Accolade Tech Solution Pvt. Ltd.',
    period: 'March 2024 – June 2024',
    location: 'Mangaluru, India',
    points: [
      'Developed web applications using React, HTML, CSS, PHP, and MySQL.',
      'Contributed to frontend-backend integration and database-related development.',
      'Worked on a phishing detection project using machine learning.',
    ],
  },
];

export const education = [
  {
    degree: 'Master of Computer Applications (MCA)',
    school: 'St Joseph College of Engineering & Technology, Mangaluru',
    period: '2024 – 2026',
    score: 'CGPA 8.04 / 10',
  },
  {
    degree: 'Bachelor of Computer Applications (BCA)',
    school: 'Vivekananda College of Arts, Science and Commerce, Puttur',
    period: '2021 – 2024',
    score: 'CGPA 8.56 / 10',
  },
];

export const certifications = [
  { title: 'Cybersecurity Course', issuer: 'Skill India Digital Hub', date: 'Mar 2026' },
  { title: 'Privacy and Security in Online Social Media', issuer: 'NPTEL', date: 'Jul – Oct 2025' },
  { title: 'Google Cloud Skills Boost', issuer: 'Google Cloud', date: 'Jan 2024' },
  { title: 'Power BI and AI Tools Workshops', issuer: 'Workshops', date: null },
];

export const achievement = {
  title: 'Coding Event Head, Techno Fusion',
  date: 'May 2024',
  detail: 'Helped organize a college coding event for 50+ participants — problem sets, logistics and judging.',
};
