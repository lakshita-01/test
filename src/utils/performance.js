/**
 * Performance Utilities
 * 
 * Collection of utilities to optimize loading performance
 * and user experience across the application.
 */

/**
 * Preload critical resources
 * @param {string} href - Resource URL to preload
 * @param {string} as - Resource type (script, style, font, etc.)
 * @param {string} type - MIME type (optional)
 */
export const preloadResource = (href, as, type = null) => {
  if (typeof window === 'undefined') return;
  
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = href;
  link.as = as;
  if (type) link.type = type;
  
  document.head.appendChild(link);
};

/**
 * Lazy load images with intersection observer
 * @param {HTMLElement} img - Image element
 * @param {string} src - Image source URL
 */
export const lazyLoadImage = (img, src) => {
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.src = src;
          entry.target.classList.remove('lazy');
          observer.unobserve(entry.target);
        }
      });
    });
    
    observer.observe(img);
  } else {
    // Fallback for older browsers
    img.src = src;
  }
};

/**
 * Debounce function to limit function calls
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @param {boolean} immediate - Execute immediately
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

/**
 * Throttle function to limit function calls
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 */
export const throttle = (func, limit) => {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

/**
 * Check if user prefers reduced motion
 */
export const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Get connection speed information
 */
export const getConnectionSpeed = () => {
  if (typeof navigator === 'undefined' || !navigator.connection) {
    return 'unknown';
  }
  
  const connection = navigator.connection;
  const effectiveType = connection.effectiveType;
  
  switch (effectiveType) {
    case 'slow-2g':
    case '2g':
      return 'slow';
    case '3g':
      return 'medium';
    case '4g':
      return 'fast';
    default:
      return 'unknown';
  }
};

/**
 * Optimize animations based on device capabilities
 */
export const shouldUseReducedAnimations = () => {
  return prefersReducedMotion() || getConnectionSpeed() === 'slow';
};

/**
 * Preload critical CSS for faster rendering
 */
export const preloadCriticalCSS = () => {
  // This would typically preload critical CSS files
  // For now, we'll focus on ensuring our components are optimized
  if (typeof window === 'undefined') return;
  
  // Add critical CSS preload hints
  const criticalStyles = [
    // Add any critical CSS files here
  ];
  
  criticalStyles.forEach(href => {
    preloadResource(href, 'style', 'text/css');
  });
};

/**
 * Measure and report performance metrics
 */
export const measurePerformance = (name, fn) => {
  if (typeof performance === 'undefined') return fn();
  
  const start = performance.now();
  const result = fn();
  const end = performance.now();
  
  console.log(`${name} took ${end - start} milliseconds`);
  
  return result;
};

/**
 * Create a performance observer for monitoring
 */
export const createPerformanceObserver = () => {
  if (typeof PerformanceObserver === 'undefined') return null;
  
  const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      // Log performance entries for monitoring
      if (entry.entryType === 'navigation') {
        console.log('Navigation timing:', entry);
      } else if (entry.entryType === 'paint') {
        console.log('Paint timing:', entry);
      }
    });
  });
  
  observer.observe({ entryTypes: ['navigation', 'paint'] });
  return observer;
};