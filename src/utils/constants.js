// src/utils/constants.js

// IPO Sectors
export const SECTORS = [
  'Technology',
  'Healthcare',
  'Financial Services',
  'Energy',
  'Manufacturing',
  'Consumer Goods',
  'Real Estate',
  'Telecommunications',
  'Automotive',
  'Pharmaceuticals',
  'Banking',
  'Insurance',
  'Retail',
  'Infrastructure',
  'Media & Entertainment',
  'Food & Beverages',
  'Textiles',
  'Chemicals',
  'Metals & Mining',
  'Agriculture',
  'Education',
  'Transportation',
  'Hospitality',
  'Construction',
  'Other'
];

// IPO Status Constants
export const IPO_STATUS = {
  UPCOMING: 'upcoming',
  OPEN: 'open',
  CLOSED: 'closed',
  LISTED: 'listed'
};

// Status Colors
export const STATUS_COLORS = {
  [IPO_STATUS.UPCOMING]: '#2196f3', // Blue
  [IPO_STATUS.OPEN]: '#4caf50',      // Green
  [IPO_STATUS.CLOSED]: '#f44336',    // Red
  [IPO_STATUS.LISTED]: '#9c27b0'     // Purple
};

// Date Formats
export const DATE_FORMATS = {
  DISPLAY: 'MMM dd, yyyy',
  INPUT: 'yyyy-MM-dd',
  API: 'yyyy-MM-dd\'T\'HH:mm:ss.SSSxxx'
};

// Currency Settings
export const CURRENCY = {
  SYMBOL: '₹',
  LOCALE: 'en-IN',
  CODE: 'INR'
};

// Validation Constants
export const VALIDATION = {
  COMPANY_NAME: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 100
  },
  PRICE_BAND: {
    MIN: 1,
    MAX: 10000
  },
  LOT_SIZE: {
    MIN: 1,
    MAX: 10000
  },
  ISSUE_SIZE: {
    MIN_LENGTH: 1,
    MAX_LENGTH: 50
  },
  DESCRIPTION: {
    MAX_LENGTH: 1000
  }
};

// API Endpoints (for future use)
export const API_ENDPOINTS = {
  IPOS: '/ipos',
  AUTH: '/auth',
  UPLOAD: '/upload'
};

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'authToken',
  USER_PREFERENCES: 'userPreferences',
  FILTERS: 'ipoFilters'
};

// Default Values
export const DEFAULTS = {
  ITEMS_PER_PAGE: 10,
  DEBOUNCE_DELAY: 300,
  API_TIMEOUT: 30000
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  GENERIC_ERROR: 'An unexpected error occurred. Please try again.'
};

// Success Messages
export const SUCCESS_MESSAGES = {
  IPO_CREATED: 'IPO created successfully!',
  IPO_UPDATED: 'IPO updated successfully!',
  IPO_DELETED: 'IPO deleted successfully!',
  LOGIN_SUCCESS: 'Login successful!',
  LOGOUT_SUCCESS: 'Logged out successfully!'
};