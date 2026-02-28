// Constants for the application
export const BACKGROUNDS = {
  BTECH: 'B.Tech',
  BCOM: 'B.Com',
  MBA: 'MBA',
  DEGREE: 'Degree'
};

export const BRANCHES = {
  // B.Tech branches
  CSE: 'Computer Science',
  ECE: 'Electronics',
  EEE: 'Electrical',
  IT: 'Information Technology',
  MECH: 'Mechanical',
  CIVIL: 'Civil',
  
  // B.Com branches
  GENERAL: 'General',
  ACCOUNTING: 'Accounting',
  FINANCE: 'Finance',
  
  // MBA specializations
  MARKETING: 'Marketing',
  HR: 'Human Resources'
};

export const DOMAINS = {
  AI: 'Artificial Intelligence',
  WEB: 'Web Development',
  DATA: 'Data Science',
  ROBOTICS: 'Robotics',
  CORE: 'Core Engineering'
};

export const DIFFICULTY_LEVELS = {
  EASY: 'easy',
  MEDIUM: 'medium',
  HARD: 'hard'
};

export const PERFORMANCE_LEVELS = {
  EXCELLENT: 'Excellent',
  GOOD: 'Good',
  AVERAGE: 'Average',
  NEEDS_IMPROVEMENT: 'Needs Improvement'
};

export const API_TIMEOUT = 30000; // 30 seconds
export const TOKEN_KEY = 'token';
export const USER_KEY = 'user';

export const ROUTES = {
  LOGIN: '/login',
  SIGNUP: '/signup',
  BACKGROUND: '/background-selection',
  BRANCH: '/branch-selection',
  DOMAIN: '/domain-selection',
  LEARNING: '/learning',
  QUIZ: '/quiz',
  RESULTS: '/results'
};
