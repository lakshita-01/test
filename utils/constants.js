/**
 * Application Constants
 * 
 * Centralized configuration and constant values for the Bluestock IPO application.
 * Provides consistent values across the application for maintainability.
 * 
 * Features:
 * - API endpoint configurations
 * - IPO status definitions
 * - Industry sector classifications
 * - Application settings
 * - UI constants and configurations
 */

// API endpoint configurations
export const API_ENDPOINTS = {
  IPO_LIST: '/api/ipos',
  IPO_CREATE: '/api/ipos',
  IPO_UPDATE: '/api/ipos',
  IPO_DELETE: '/api/ipos',
  LOGIN: '/api/auth/login'
};

export const IPO_STATUS = {
  UPCOMING: 'upcoming',
  OPEN: 'open',
  CLOSED: 'closed',
  LISTED: 'listed'
};

export const SECTORS = [
  'Technology',
  'Healthcare',
  'Finance',
  'Manufacturing',
  'Retail',
  'Energy',
  'Real Estate',
  'Telecommunications',
  'Consumer Goods',
  'Automotive'
];

// Admin credentials (for development only)
export const ADMIN_CREDENTIALS = {
  USERNAME: 'admin',
  PASSWORD: 'admin123'
};

// Application configuration
export const APP_CONFIG = {
  NAME: 'Bluestock IPO',
  VERSION: '1.0.0',
  DESCRIPTION: 'Professional IPO Investment Platform',
  CONTACT_EMAIL: 'support@bluestockipo.com',
  CONTACT_PHONE: '+91 98765 43210',
  COMPANY_ADDRESS: 'Mumbai, Maharashtra, India'
};

// UI Constants
export const UI_CONSTANTS = {
  DRAWER_WIDTH: 240,
  HEADER_HEIGHT: 64,
  MOBILE_BREAKPOINT: 'md',
  ANIMATION_DURATION: 300,
  DEBOUNCE_DELAY: 500
};

// Date formats
export const DATE_FORMATS = {
  DISPLAY: 'MMM dd, yyyy',
  INPUT: 'yyyy-MM-dd',
  FULL: 'MMMM dd, yyyy',
  SHORT: 'MM/dd/yyyy'
};

// Validation rules
export const VALIDATION_RULES = {
  MIN_PASSWORD_LENGTH: 8,
  MAX_COMPANY_NAME_LENGTH: 100,
  MIN_PRICE_BAND: 1,
  MAX_PRICE_BAND: 10000,
  MIN_LOT_SIZE: 1,
  MAX_LOT_SIZE: 10000
};

// Local storage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'authToken',
  USER_DATA: 'user',
  THEME_PREFERENCE: 'themePreference',
  LANGUAGE_PREFERENCE: 'languagePreference'
};