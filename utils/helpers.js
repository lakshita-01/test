// src/utils/helpers.js
import { format, parseISO, isAfter, isBefore } from 'date-fns';

export const formatDate = (dateString, formatStr = 'dd MMM yyyy') => {
  try {
    const date = typeof dateString === 'string' ? parseISO(dateString) : dateString;
    return format(date, formatStr);
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
};

export const formatCurrency = (amount, currency = '₹') => {
  if (typeof amount === 'string') {
    return amount;
  }
  return `${currency}${amount?.toLocaleString('en-IN') || '0'}`;
};

export const getIpoStatus = (openDate, closeDate) => {
  const now = new Date();
  const open = new Date(openDate);
  const close = new Date(closeDate);

  if (isBefore(now, open)) {
    return 'upcoming';
  } else if (isAfter(now, open) && isBefore(now, close)) {
    return 'open';
  } else {
    return 'closed';
  }
};

export const getDaysRemaining = (targetDate) => {
  const now = new Date();
  const target = new Date(targetDate);
  const diffTime = target - now;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays < 0) return 0;
  return diffDays;
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone) => {
  const phoneRegex = /^[6-9]\d{9}$/;
  return phoneRegex.test(phone);
};

export const validatePAN = (pan) => {
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  return panRegex.test(pan);
};

export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

export const getStatusColor = (status) => {
  switch (status) {
    case 'upcoming':
      return '#1976d2'; // Blue
    case 'open':
      return '#2e7d32'; // Green
    case 'closed':
      return '#d32f2f'; // Red
    case 'listed':
      return '#ed6c02'; // Orange
    default:
      return '#757575'; // Gray
  }
};

export const getStatusText = (status) => {
  switch (status) {
    case 'upcoming':
      return 'Upcoming';
    case 'open':
      return 'Open';
    case 'closed':
      return 'Closed';
    case 'listed':
      return 'Listed';
    default:
      return 'Unknown';
  }
};

export const sortIposByDate = (ipos, sortOrder = 'asc') => {
  return [...ipos].sort((a, b) => {
    const dateA = new Date(a.ipoOpenDate);
    const dateB = new Date(b.ipoOpenDate);
    
    if (sortOrder === 'asc') {
      return dateA - dateB;
    } else {
      return dateB - dateA;
    }
  });
};

export const filterIposBySearch = (ipos, searchTerm) => {
  if (!searchTerm) return ipos;
  
  const term = searchTerm.toLowerCase();
  return ipos.filter(ipo => 
    ipo.companyName.toLowerCase().includes(term) ||
    ipo.sector.toLowerCase().includes(term) ||
    ipo.description?.toLowerCase().includes(term)
  );
};

export const generateUniqueId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const truncateText = (text, maxLength = 100) => {
  if (!text || text.length <= maxLength) return text;
  return text.substr(0, maxLength) + '...';
};

export const isValidUrl = (string) => {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
};

export const downloadFile = (url, filename) => {
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};