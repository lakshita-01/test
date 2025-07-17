/**
 * Cookie Consent Component
 * 
 * Simple cookie consent popup with cookie emoji image, message text,
 * Privacy Policy link, and "Got it" dismiss button.
 * 
 * Features:
 * - Light card with shadow & rounded edges
 * - Cookie emoji image on top
 * - Simple message with Privacy Policy link
 * - "Got it" button to dismiss
 * - Local storage to remember user consent
 */

import React, { useEffect, useState } from 'react';
import cookieImg from '../assets/cookie.png'; // Cookie image

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hasAccepted = localStorage.getItem('cookieConsent');
    if (!hasAccepted) setVisible(true);
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'true');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white p-6 rounded-xl shadow-xl w-[90%] max-w-md z-50">
      <div className="flex justify-center -mt-10">
        <img src={cookieImg} alt="cookie" className="w-16 h-16" />
      </div>
      <p className="text-center text-gray-700 mt-2 text-base font-medium">
        We use cookies for essential website functions and to better understand how you use our site, so we can create the best possible experience for you
      </p>
      <div className="flex justify-between items-center mt-4 text-sm">
        <a href="/privacy-policy" className="text-blue-600 underline">Privacy Policy</a>
        <button 
          onClick={handleAccept} 
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 font-semibold"
        >
          Got it
        </button>
      </div>
    </div>
  );
};

export default CookieConsent;