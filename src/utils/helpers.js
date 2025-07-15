// src/utils/helpers.js

/**
 * Format date to a readable string
 * @param {string|Date} date - Date to format
 * @returns {string} Formatted date string
 */
export const formatDate = (date) => {
  if (!date) return 'N/A';
  
  const dateObj = new Date(date);
  if (isNaN(dateObj.getTime())) return 'Invalid Date';
  
  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

/**
 * Format currency amount
 * @param {number|string} amount - Amount to format
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount) => {
  if (!amount || isNaN(amount)) return '₹0';
  
  const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(numAmount);
};

/**
 * Get IPO status based on open and close dates
 * @param {string|Date} openDate - IPO open date
 * @param {string|Date} closeDate - IPO close date
 * @returns {string} Status: 'upcoming', 'open', or 'closed'
 */
export const getIpoStatus = (openDate, closeDate) => {
  if (!openDate || !closeDate) return 'unknown';
  
  const now = new Date();
  const open = new Date(openDate);
  const close = new Date(closeDate);
  
  if (now < open) return 'upcoming';
  if (now >= open && now <= close) return 'open';
  return 'closed';
};

/**
 * Get status color based on IPO status
 * @param {string} status - IPO status
 * @returns {string} Color code
 */
export const getStatusColor = (status) => {
  switch (status) {
    case 'upcoming':
      return '#2196f3'; // Blue
    case 'open':
      return '#4caf50'; // Green
    case 'closed':
      return '#f44336'; // Red
    default:
      return '#9e9e9e'; // Grey
  }
};

/**
 * Get days remaining until IPO opens
 * @param {string|Date} openDate - IPO open date
 * @returns {number} Days remaining (negative if past)
 */
export const getDaysRemaining = (openDate) => {
  if (!openDate) return 0;
  
  const now = new Date();
  const open = new Date(openDate);
  const diffTime = open.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays;
};

/**
 * Get days remaining text for display
 * @param {string|Date} openDate - IPO open date
 * @returns {string} Formatted days remaining text
 */
export const getDaysRemainingText = (openDate) => {
  const days = getDaysRemaining(openDate);
  
  if (days > 0) {
    return `${days} day${days === 1 ? '' : 's'} to open`;
  } else if (days === 0) {
    return 'Opens today';
  } else {
    return 'Already opened';
  }
};

/**
 * Check if IPO is currently open for subscription
 * @param {string|Date} openDate - IPO open date
 * @param {string|Date} closeDate - IPO close date
 * @returns {boolean} True if IPO is open
 */
export const isIpoOpen = (openDate, closeDate) => {
  return getIpoStatus(openDate, closeDate) === 'open';
};

/**
 * Format number with Indian numbering system (lakhs, crores)
 * @param {number} num - Number to format
 * @returns {string} Formatted number string
 */
export const formatIndianNumber = (num) => {
  if (!num || isNaN(num)) return '0';
  
  const numValue = typeof num === 'string' ? parseFloat(num) : num;
  
  if (numValue >= 10000000) { // 1 crore
    return `${(numValue / 10000000).toFixed(1)} Cr`;
  } else if (numValue >= 100000) { // 1 lakh
    return `${(numValue / 100000).toFixed(1)} L`;
  } else if (numValue >= 1000) { // 1 thousand
    return `${(numValue / 1000).toFixed(1)} K`;
  }
  
  return numValue.toString();
};

/**
 * Debounce function to limit the rate of function calls
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @param {boolean} immediate - Whether to execute immediately
 * @returns {Function} Debounced function
 */
export const debounce = (func, wait, immediate = false) => {
  let timeout;
  
  return function executedFunction(...args) {
    const later = () => {
      timeout = null;
      if (!immediate) func(...args);
    };
    
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    
    if (callNow) func(...args);
  };
};