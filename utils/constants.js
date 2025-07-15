// src/utils/constants.js
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

export const ADMIN_CREDENTIALS = {
  USERNAME: 'admin',
  PASSWORD: 'admin123'
};