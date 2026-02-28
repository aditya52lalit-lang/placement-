// Constants for backend
const CONSTANTS = {
  // Backgrounds
  BACKGROUNDS: ['B.Tech', 'B.Com', 'MBA', 'Degree'],

  // Branches
  BRANCHES: {
    'B.Tech': ['CSE', 'ECE', 'EEE', 'IT', 'MECH', 'CIVIL'],
    'B.Com': ['GENERAL', 'ACCOUNTING', 'FINANCE'],
    'MBA': ['GENERAL', 'FINANCE', 'MARKETING', 'HR'],
    'Degree': ['GENERAL']
  },

  // Domains
  DOMAINS: ['AI', 'Web Development', 'Data Science', 'Robotics', 'Core Engineering'],

  // Difficulty levels
  DIFFICULTY_LEVELS: ['easy', 'medium', 'hard'],

  // Quiz configuration
  QUIZ: {
    DEFAULT_DURATION: 600, // 10 minutes in seconds
    DEFAULT_QUESTIONS: 5,
    PASS_PERCENTAGE: 60
  },

  // JWT
  JWT: {
    EXPIRES_IN: '7d',
    ALGORITHM: 'HS256'
  },

  // Password
  PASSWORD: {
    MIN_LENGTH: 6,
    SALT_ROUNDS: 10
  },

  // Pagination
  PAGINATION: {
    DEFAULT_PAGE: 1,
    DEFAULT_LIMIT: 10,
    MAX_LIMIT: 100
  },

  // Error messages
  ERRORS: {
    INVALID_EMAIL: 'Invalid email address',
    WEAK_PASSWORD: 'Password must be at least 6 characters',
    EMAIL_EXISTS: 'Email already registered',
    INVALID_CREDENTIALS: 'Invalid email or password',
    UNAUTHORIZED: 'Unauthorized access',
    NOT_FOUND: 'Resource not found',
    SERVER_ERROR: 'Internal server error',
    VALIDATION_ERROR: 'Validation error'
  },

  // Success messages
  SUCCESS: {
    USER_CREATED: 'User created successfully',
    LOGIN_SUCCESS: 'Login successful',
    UPDATE_SUCCESS: 'Updated successfully',
    DELETE_SUCCESS: 'Deleted successfully',
    QUIZ_SUBMITTED: 'Quiz submitted successfully'
  }
};

module.exports = CONSTANTS;
