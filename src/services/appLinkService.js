/**
 * App Link Service
 * 
 * Service for sending app download links to mobile numbers via SMS
 */

// Using native fetch API instead of axios to avoid import issues

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api';

// App download link
const APP_DOWNLOAD_LINK = 'https://play.google.com/store/apps/details?id=in.bluestock.app';

/**
 * Send app download link to mobile number
 * @param {string} phoneNumber - Mobile number to send the link to
 * @returns {Promise} - API response
 */
export const sendAppLink = async (phoneNumber) => {
  // Validate phone number
  if (!phoneNumber || phoneNumber.length < 10) {
    return {
      success: false,
      message: 'Please enter a valid mobile number',
      error: 'Invalid phone number'
    };
  }

  // Clean phone number (remove spaces, dashes, etc.)
  const cleanedNumber = phoneNumber.replace(/\D/g, '');
  
  // Ensure it's a valid Indian mobile number
  if (cleanedNumber.length !== 10 && cleanedNumber.length !== 12) {
    return {
      success: false,
      message: 'Please enter a valid 10-digit mobile number',
      error: 'Invalid phone number length'
    };
  }

  // Format the message
  const message = `Download the Bluestock App and start your investment journey today! ${APP_DOWNLOAD_LINK}`;

  try {
    // API call to send SMS using fetch
    const response = await fetch(`${API_BASE_URL}/send-app-link/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phone_number: cleanedNumber,
        message: message,
        app_link: APP_DOWNLOAD_LINK
      })
    });

    const data = await response.json();

    if (response.ok && data.success) {
      return {
        success: true,
        message: data.message || 'App link sent successfully!',
        data: data
      };
    } else {
      return {
        success: false,
        message: data?.message || 'Failed to send app link',
        error: data
      };
    }

  } catch (error) {
    console.error('Error sending app link:', error);
    
    // Handle different types of errors
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      // Network error or server not available - use fallback
      console.log('API server not available, using fallback mode');
      return await sendAppLinkFallback(cleanedNumber);
    } else {
      // Other errors
      return {
        success: false,
        message: error.message || 'Something went wrong. Please try again.',
        error: error.message
      };
    }
  }
};

/**
 * Fallback method when API is not available
 * @param {string} phoneNumber - Mobile number
 * @returns {Promise} - Fallback response
 */
const sendAppLinkFallback = async (phoneNumber) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // In development, show success message
  // In production, this could integrate with a different SMS service
  if (process.env.NODE_ENV === 'development') {
    console.log(`Fallback: Would send app link to ${phoneNumber}`);
    return {
      success: true,
      message: `App link would be sent to ${formatPhoneNumber(phoneNumber)} (Demo mode)`,
      fallback: true
    };
  }
  
  return {
    success: false,
    message: 'SMS service is temporarily unavailable. Please try again later.',
    fallback: true
  };
};

/**
 * Validate phone number format
 * @param {string} phoneNumber - Phone number to validate
 * @returns {boolean} - Whether the phone number is valid
 */
export const validatePhoneNumber = (phoneNumber) => {
  if (!phoneNumber) return false;
  
  const cleanedNumber = phoneNumber.replace(/\D/g, '');
  return cleanedNumber.length === 10 || cleanedNumber.length === 12;
};

/**
 * Format phone number for display
 * @param {string} phoneNumber - Phone number to format
 * @returns {string} - Formatted phone number
 */
export const formatPhoneNumber = (phoneNumber) => {
  const cleanedNumber = phoneNumber.replace(/\D/g, '');
  
  if (cleanedNumber.length === 10) {
    return `+91 ${cleanedNumber.slice(0, 5)} ${cleanedNumber.slice(5)}`;
  }
  
  return phoneNumber;
};