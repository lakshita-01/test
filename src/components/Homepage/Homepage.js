import React, { useState } from "react";
import { motion } from "framer-motion";
import { useApp } from "../../context/AppContext";
import StockInsightsSection from "./StockInsightsSection";
import { sendAppLink, validatePhoneNumber } from "../../services/appLinkService";

// Enhanced App Promo Section Component
function AppPromoSection() {
  return (
    <section className="bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 dark:from-gray-800 dark:via-gray-900 dark:to-indigo-900 py-20 px-4 md:px-10 transition-all duration-300">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Bluestock App 2.0
            </span>{" "}
            is Live Now!
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Download Our App & Start Trading Today
          </p>
        </motion.div>
        
        {/* Download Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center justify-center gap-6 flex-wrap"
        >
          <motion.a 
            href="#" 
            target="_blank" 
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center bg-black text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-800 transition-all duration-300 shadow-lg"
          >
            <img src="/icons/apple-store.png" alt="Apple" className="w-18 h-8 mr-2" />
            Download for iOS
          </motion.a>
          <motion.a 
            href="https://play.google.com/store/apps/details?id=in.bluestock.app" 
            target="_blank" 
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center bg-black text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition-all duration-300 shadow-lg"
          >
            <img src="/icons/google-play.png" alt="Android" className="w-18 h-8 mr-2" />
            Download for Android
          </motion.a>
        </motion.div>

        {/* Rating Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex justify-center mt-8"
        >
          <img 
            src="/rating.png" 
            alt="App Rating" 
            className="h-12 md:h-16 object-contain opacity-90 hover:opacity-100 transition-opacity duration-300"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
          {/* Fallback rating display */}
          <div className="hidden items-center justify-center bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl px-6 py-3 shadow-lg">
            <div className="flex items-center space-x-2">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="text-white font-semibold ml-2">4.8/5</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// It's Easy Section
function ItsEasySection() {
  return (
    <section className="w-full bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 py-16 px-8 transition-all duration-300">
      <motion.div
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 50 }}
        transition={{ duration: 1 }}
        className="mb-12 px-4 md:px-0 max-w-6xl mx-auto"
      >
        <div className="flex justify-between items-start">
          {/* Left side - Text content */}
          <div className="flex flex-col items-start">
            <p className="text-sm text-gray-500 dark:text-gray-300 mb-2">Built for a growing India.</p>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-3xl md:text-4xl font-extrabold text-purple-700 dark:text-purple-400 mb-2"
            >
              It's Easy
            </motion.h2>
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4"
            >
              It's Powerful
            </motion.h3>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-3xl md:text-4xl font-extrabold text-purple-700 dark:text-purple-400 mb-2"
            >
              It's Beautiful
            </motion.h2>
          </div>

          {/* Right side - Thumbs up and description */}
          <div className="flex flex-col items-center gap-3">
            <img 
              src="/thumbs-up.png" 
              alt="Thumbs up" 
              className="w-12 h-12 object-contain"
            />
            <p className="text-gray-500 dark:text-gray-300 text-base md:text-lg text-center">
              for the modern trader,<br />
              with access on all platforms,<br />
              to trade
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

// Bluestock Highlights Section
function BluestockHighlightsSection() {
  return (
    <section className="bg-gradient-to-br from-gray-900 via-black to-purple-900 text-white px-4 md:px-6 lg:px-8 py-10 font-sans w-full transition-all duration-300 shadow-2xl">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-xl md:text-2xl font-medium mb-2">Power-packed with everything you need.</h1>
        <p className="text-sm md:text-base text-gray-400">
          Simplified enough for beginners, Detailed enough for experts. <br />
          Track upcoming IPOs, Leverage advanced tools to make the best decisions.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 max-w-6xl mx-auto">
        {/* Learn Chart */}
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-white text-black rounded-xl p-6 shadow-md"
        >
          <h2 className="text-blue-600 font-bold text-lg mb-4 flex items-center">
            Learn Chart <span className="ml-2">✏️</span>
          </h2>
          <ul className="space-y-2">
            {[
              "Technical, Fundamental",
              "Finology, Facts, Equity",
              "Trading Psychology",
              "Risk Assessment",
              "Option Trading"
            ].map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="bg-green-500 text-white rounded-full px-2 py-1 text-sm font-bold mr-2 min-w-[24px] text-center">
                  {index + 1}
                </span>
                <span className="text-sm md:text-base">{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>
        
        {/* Analytics */}
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-pink-50 text-black rounded-xl p-6 shadow-md"
        >
          <h2 className="text-pink-600 font-bold text-lg mb-4 flex items-center">
            Analytics <span className="ml-2">📤</span>
          </h2>
          <ul className="space-y-2">
            {[
              "Live Sector Trend",
              "IPO DRHP",
              "Sectoral Distribution",
              "Stock Overview",
              "TradingView Chart",
              "Technical, Fundamental"
            ].map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="bg-green-500 text-white rounded-full px-2 py-1 text-sm font-bold mr-2 min-w-[24px] text-center">
                  {index + 1}
                </span>
                <span className="text-sm md:text-base">{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>
        
        {/* Club */}
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-yellow-50 text-black rounded-xl p-6 shadow-md"
        >
          <h2 className="text-yellow-600 font-bold text-lg mb-4 flex items-center">
            Club <span className="ml-2">⚡</span>
          </h2>
          <ul className="space-y-2">
            {[
              "Educational Resources",
              "Real-time Chat",
              "Forums"
            ].map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="bg-green-500 text-white rounded-full px-2 py-1 text-sm font-bold mr-2 min-w-[24px] text-center">
                  {index + 1}
                </span>
                <span className="text-sm md:text-base">{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}

// Why Do Traders Love Bluestock Section
function WhyTradersLoveSection() {
  return (
    <section className="bg-gradient-to-br from-indigo-900 via-black to-blue-900 text-white px-4 md:px-6 lg:px-8 py-10 w-full transition-all duration-300 shadow-2xl">
      <div className="max-w-6xl mx-auto mt-16">
        {/* Heading Section */}
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white text-left mb-4">
            Why do traders love Bluestock?
          </h2>
          <p className="text-sm md:text-base text-gray-400 text-left max-w-2xl">
            Bluestock caters to traders looking to enhance their technical analysis
            skills, providing a user-friendly environment to interpret and leverage
            charts effectively for strategic decision-making in the financial markets.
          </p>
        </div>
        
        {/* Two Column Layout */}
        <div className="flex flex-col lg:flex-row items-start gap-8">
          {/* Left side - Icons in horizontal line */}
          <div className="lg:w-1/2">
            <div className="flex gap-6 md:gap-8 lg:gap-10 justify-start items-start flex-wrap">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-col items-center group cursor-pointer"
              >
                <div className="bg-white rounded-2xl p-4 md:p-5 mb-3 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <img 
                    src="/icons/icon1.png" 
                    alt="Analytics" 
                    className="w-12 h-12 md:w-16 md:h-16 lg:w-18 lg:h-18 object-contain filter drop-shadow-sm" 
                  />
                </div>
                <h3 className="text-white font-semibold text-sm md:text-base lg:text-lg text-center group-hover:text-purple-300 transition-colors duration-300">
                  Analytics
                </h3>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-col items-center group cursor-pointer"
              >
                <div className="bg-black rounded-2xl p-4 md:p-5 mb-3 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <img 
                    src="/icons/icon2.png" 
                    alt="Blogs" 
                    className="w-12 h-12 md:w-16 md:h-16 lg:w-18 lg:h-18 object-contain filter drop-shadow-sm" 
                  />
                </div>
                <h3 className="text-white font-semibold text-sm md:text-base lg:text-lg text-center group-hover:text-purple-300 transition-colors duration-300">
                  Blogs
                </h3>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-col items-center group cursor-pointer"
              >
                <div className="bg-white rounded-2xl p-4 md:p-5 mb-3 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <img 
                    src="/icons/icon3.png" 
                    alt="Videos" 
                    className="w-12 h-12 md:w-16 md:h-16 lg:w-18 lg:h-18 object-contain filter drop-shadow-sm" 
                  />
                </div>
                <h3 className="text-white font-semibold text-sm md:text-base lg:text-lg text-center group-hover:text-purple-300 transition-colors duration-300">
                  Videos
                </h3>
              </motion.div>
            </div>
          </div>
          
          {/* Right side - Shark investor and Resources Box */}
          <div className="lg:w-1/2 relative flex flex-col items-center lg:items-end lg:-mt-0">
            {/* Shark Investor Image */}
            <motion.img 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              src="/sharkinvestor.png" 
              alt="Shark Investor" 
              className="w-[180px] h-[180px] md:w-[220px] md:h-[220px] lg:w-[280px] lg:h-[280px] object-contain lg:absolute lg:-top-40 lg:right-0 lg:z-30"
            />
            
            {/* Resources Box */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-5 shadow-xl max-w-sm w-full lg:max-w-xs lg:absolute lg:top-8 lg:right-12 lg:z-20 mt-4 lg:mt-0"
            >
              <div className="flex items-center justify-start mb-3">
                <span className="bg-green-300 text-black rounded-md px-3 py-1 text-xs font-bold">
                  Resources
                </span>
              </div>
              <p className="text-white text-center text-xs leading-relaxed">
                Master the art of investing and secure your financial future with Bluestock learning resources
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

// On the Go Section
function OnTheGoSection() {
  return (
    <section className="min-h-screen flex flex-col lg:flex-row items-center justify-center px-6 py-16 bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white relative overflow-hidden transition-all duration-300">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-500 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-green-500 rounded-full blur-3xl opacity-20"></div>
      </div>

      {/* On the Go Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-center mb-6 z-10"
      >
        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
          On the Go
        </h2>
        <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto">
          We believe that everyone should be able to wield technology while learn trading. 
          Use Bluestock on the go, on your mobile device. Experience the ultimate trading 
          experience on Android or iOS.
        </p>
      </motion.div>

      {/* QR Code Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="flex items-center gap-6 p-6 bg-white bg-opacity-5 backdrop-blur-sm rounded-2xl border border-white border-opacity-10 hover:bg-opacity-10 transition-all duration-300 z-10"
      >
        <div className="relative">
          <img
            src="/icons/qr-code.png"
            alt="QR Code"
            className="w-24 h-24 rounded-xl border-2 border-gray-600 shadow-lg"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
          {/* Fallback QR placeholder */}
          <div className="hidden w-24 h-24 rounded-xl border-2 border-gray-600 bg-gray-800 items-center justify-center">
            <div className="text-xs text-gray-400 text-center">QR<br/>Code</div>
          </div>
        </div>
        
        <div className="flex-1">
          <h3 className="text-white font-semibold mb-2">Scan to Download</h3>
          <p className="text-gray-300 text-sm leading-relaxed">
            Get instant access to our mobile app and start trading on the go
          </p>
        </div>
      </motion.div>
    </section>
  );
}

// Enhanced Stats Section
function StatsSection() {
  const stats = [
    { number: "50K+", label: "Active Users", icon: "👥" },
    { number: "₹100Cr+", label: "Total Investments", icon: "💰" },
    { number: "4.8★", label: "App Rating", icon: "⭐" },
    { number: "24/7", label: "Support Available", icon: "🛟" }
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-yellow-300 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-green-300 rounded-full blur-3xl opacity-30"></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="text-center text-white"
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-3xl md:text-4xl font-bold mb-2">{stat.number}</div>
              <div className="text-sm md:text-base opacity-90">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Main Homepage Component
export default function Homepage() {
  const { state, actions } = useApp();
  const { darkMode } = state;
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ show: false, type: 'success', message: '' });

  const handleSendAppLink = async (e) => {
    e.preventDefault();
    
    // Validate phone number
    if (!validatePhoneNumber(phoneNumber)) {
      setAlert({
        show: true,
        type: 'error',
        message: 'Please enter a valid 10-digit mobile number'
      });
      return;
    }

    setLoading(true);
    setAlert({ show: false, type: 'success', message: '' });

    try {
      const result = await sendAppLink(phoneNumber);
      
      if (result.success) {
        setAlert({
          show: true,
          type: 'success',
          message: result.message
        });
        setPhoneNumber('');
      } else {
        setAlert({
          show: true,
          type: 'error',
          message: result.message
        });
      }
    } catch (error) {
      setAlert({
        show: true,
        type: 'error',
        message: 'Failed to send app link. Please try again.'
      });
    } finally {
      setLoading(false);
      // Auto-hide alert after 5 seconds
      setTimeout(() => {
        setAlert({ show: false, type: 'success', message: '' });
      }, 5000);
    }
  };

  return (
    <div className={`${darkMode ? "dark" : ""} min-h-screen transition-all duration-300`}>
      {/* Enhanced Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16 md:h-18">
            {/* Logo */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-2 cursor-pointer hover:scale-105 transition-transform duration-200"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xs sm:text-sm md:text-base">B</span>
              </div>
              <span className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
                Bluestock
              </span>
            </motion.div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">Home</a>
              <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">IPOs</a>
              <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">Analysis</a>
              <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">About</a>
            </div>

            {/* Dark Mode Toggle & CTA */}
            <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
              <motion.button
                onClick={actions.toggleDarkMode}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-1.5 sm:p-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
                aria-label="Toggle dark mode"
              >
                {darkMode ? (
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-2 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-medium text-xs sm:text-sm md:text-base"
              >
                <span className="hidden sm:inline">Get Started</span>
                <span className="sm:hidden">Start</span>
              </motion.button>
            </div>
          </div>
        </div>
      </nav>

      {/* Enhanced Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900 transition-all duration-300 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            
            {/* Left Content */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.8 }}
              className="flex-1 text-center lg:text-left"
            >
              {/* Badge */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center mb-6"
              >
                <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm font-semibold px-4 py-2 rounded-full mr-3 shadow-lg">
                  NEW
                </span>
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 mr-2">App 2.0</span>
                <span className="text-blue-600 dark:text-blue-400">→</span>
              </motion.div>

              {/* Main Heading */}
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
              >
                <span className="text-gray-900 dark:text-white">Free and open</span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  stock market analysis
                </span>
                <br />
                <span className="text-gray-900 dark:text-white">for GenZ</span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0"
              >
                Thousands of traders and investors in India use our stable and reliable mobile app regularly. 
                Join the revolution of smart investing.
              </motion.p>

              {/* Alert Message */}
              {alert.show && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mb-4 p-3 rounded-lg ${
                    alert.type === 'success' 
                      ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 border border-green-300 dark:border-green-700' 
                      : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 border border-red-300 dark:border-red-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{alert.message}</span>
                    <button 
                      onClick={() => setAlert({ show: false, type: 'success', message: '' })}
                      className="ml-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                      ×
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Enhanced Input Section */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col sm:flex-row items-center gap-4 max-w-md mx-auto lg:mx-0 mb-8"
              >
                <form onSubmit={handleSendAppLink} className="flex items-center w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400 px-4 font-semibold">+91</span>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Enter 10-digit mobile number"
                    maxLength="10"
                    pattern="[0-9]{10}"
                    disabled={loading}
                    className="flex-grow p-4 text-gray-800 dark:text-white bg-transparent focus:outline-none disabled:opacity-50"
                  />
                  <motion.button 
                    type="submit"
                    disabled={loading || !phoneNumber.trim()}
                    whileHover={{ scale: loading ? 1 : 1.05 }}
                    whileTap={{ scale: loading ? 1 : 0.95 }}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <div className="h-6 w-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    )}
                  </motion.button>
                </form>
              </motion.div>
            </motion.div>

            {/* Right Content - Enhanced Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex-1 relative max-w-lg"
            >
              <div className="relative">
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-3xl transform rotate-6 opacity-20"></div>
                
                {/* Main Image Container */}
                <div className="relative bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl">
                  <img
                    src="/icons/smanalysis.png"
                    alt="Stock Market Analysis"
                    className="w-full h-auto object-contain rounded-2xl"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  {/* Enhanced Fallback */}
                  <div className="hidden w-full h-96 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-gray-700 dark:to-gray-600 rounded-2xl items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl mb-4">📊</div>
                      <div className="text-xl font-semibold text-gray-700 dark:text-gray-300">Stock Analysis Dashboard</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">Real-time market insights</div>
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -top-4 -right-4 bg-green-500 text-white p-3 rounded-full shadow-lg"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                  </svg>
                </motion.div>

                <motion.div 
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  className="absolute -bottom-4 -left-4 bg-blue-500 text-white p-3 rounded-full shadow-lg"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                  </svg>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <StatsSection />

      {/* It's Easy Section */}
      <ItsEasySection />

      {/* Bluestock Highlights Section */}
      <BluestockHighlightsSection />

      {/* Why Do Traders Love Bluestock Section */}
      <WhyTradersLoveSection />

      {/* On the Go Section */}
      <OnTheGoSection />

      {/* Enhanced App Promo Section */}
      <AppPromoSection />

      {/* Enhanced Stock Insights Section */}
      <StockInsightsSection />
    </div>
  );
};