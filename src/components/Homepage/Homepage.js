import React, { useState } from "react";
import { motion } from "framer-motion";
import { useApp } from "../../context/AppContext";

// App Promo Section Component
function AppPromoSection() {
  return (
    <div className="bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 dark:from-gray-800 dark:via-gray-900 dark:to-indigo-900 py-8 px-4 md:px-10 border-t-4 border-indigo-500 shadow-lg">
      {/* Top Row: Text + Store Buttons */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col lg:flex-row justify-between items-center text-center lg:text-left gap-6 mb-8"
      >
        {/* Text Section */}
        <div className="space-y-3 flex-1">
          <motion.h2 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 dark:text-white leading-tight"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 font-extrabold">
              Bluestock App 2.0
            </span>{" "}
            <span className="block mt-2">is Live Now!</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-gray-600 dark:text-gray-300 text-lg font-medium"
          >
            Download Our App & Start Trading Today
          </motion.p>
        </div>
        
        {/* Download Buttons */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex items-center gap-4 flex-wrap justify-center lg:justify-end"
        >
          <motion.a 
            href="#" 
            target="_blank" 
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="transform transition-all duration-200"
          >
            <img
              src="/icons/google-play.png"
              alt="Get it on Google Play"
              className="h-14 md:h-16 drop-shadow-lg hover:drop-shadow-xl"
            />
          </motion.a>
          <motion.a 
            href="#" 
            target="_blank" 
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="transform transition-all duration-200"
          >
            <img
              src="/icons/apple-store.png"
              alt="Download on the App Store"
              className="h-14 md:h-16 drop-shadow-lg hover:drop-shadow-xl"
            />
          </motion.a>
        </motion.div>
      </motion.div>
      
      {/* Bottom Row: Rating image with enhanced styling */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="py-6 px-4 mt-6 flex justify-center bg-white/50 dark:bg-gray-800/50 rounded-2xl backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-inner"
      >
        <motion.img
          whileHover={{ scale: 1.05 }}
          src="/icons/rating.png"
          alt="User rating with avatars and stars"
          className="h-14 md:h-16 object-contain drop-shadow-md"
        />
      </motion.div>
    </div>
  );
}

export default function Homepage() {
  const { state, actions } = useApp();
  const { darkMode } = state;

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      {/* Dark Mode Toggle Button */}
      <button
        onClick={actions.toggleDarkMode}
        className="fixed top-4 right-4 z-50 p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-600 hover:scale-110"
        aria-label="Toggle dark mode"
      >
        {darkMode ? (
          <svg
            className="w-6 h-6 text-yellow-500"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg
            className="w-6 h-6 text-gray-800"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        )}
      </button>
      
      <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="w-[973px] h-[651px] flex flex-row dark:bg-gray-900 transition-colors duration-300 shadow-2xl rounded-lg overflow-hidden mx-auto">
        {/* Left Side */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.8 }}
          className="w-full md:w-1/2 bg-black dark:bg-gray-800 text-white flex flex-col justify-center items-start p-8 md:p-16"
        >
          <div className="flex items-center mb-4">
            <span className="bg-green-600 text-xs text-white font-semibold px-3 py-1 rounded mr-2">NEW</span>
            <span className="text-xs text-white font-semibold mr-2">App 2.0</span>
            <span className="text-white">→</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold mb-4 text-white">
            Free and open stock market analysis for GenZ
          </h1>
          <p className="text-base md:text-lg font-normal mb-4 text-gray-400">
            Thousands of traders and investors in India use our stable and reliable mobile app regularly.
          </p>
          <div className="flex items-center w-full max-w-md bg-white rounded shadow overflow-hidden mt-4">
            <span className="text-gray-600 px-4 font-semibold">+91</span>
            <input
              type="text"
              placeholder="Enter mobile number"
              className="flex-grow p-3 text-gray-800 focus:outline-none"
            />
            <button className="bg-indigo-600 p-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2v6m0-6V4"
                />
              </svg>
            </button>
          </div>

        </motion.div>

          {/* Right Side - Flipped horizontally */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-1/2 bg-gray-100 dark:bg-gray-700 rounded-l-3xl flex flex-col items-center justify-center p-8 transform scale-x-[-1]"
          >
            {/* Flipped container */}
          </motion.div>
        </div>
      </div>

      {/* Content Section Below - Moved from right side */}
      <div className="w-full bg-white dark:bg-gray-800 py-16 px-8">
        {/* Additional Section with Scroll Animation */}
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
                className="text-3xl md:text-4xl font-extrabold text-purple-700 mb-2"
              >
                It's easy
              </motion.h2>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-3xl md:text-4xl font-extrabold text-black dark:text-white mb-2"
              >
                It's powerful
              </motion.h2>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-3xl md:text-4xl font-extrabold text-purple-700"
              >
                It's beautiful
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

        {/* Bluestock Dashboard Section */}
        <div className="bg-black text-white px-6 py-10 font-sans rounded-2xl">
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
          {/* Description */}
          <div className="max-w-4xl mx-auto text-gray-400 mt-16 text-center">
            <p className="text-sm md:text-base">
              Bluestock caters to traders looking to enhance their technical analysis
              skills, providing a user-friendly environment to interpret and leverage
              charts effectively for strategic decision-making in the financial markets.
            </p>
          </div>
          {/* Icons */}
          <div className="flex justify-center gap-6 md:gap-10 mt-10 flex-wrap">
            <div className="bg-white rounded-2xl p-4">
              <img src="/icon1.png" alt="icon1" className="w-12 h-12 md:w-16 md:h-16" />
            </div>
            <div className="bg-white rounded-2xl p-4">
              <img src="/icon2.png" alt="icon2" className="w-12 h-12 md:w-16 md:h-16" />
            </div>
            <div className="bg-white rounded-2xl p-4">
              <img src="/icon3.png" alt="icon3" className="w-12 h-12 md:w-16 md:h-16" />
            </div>
          </div>
          {/* Footer */}
          <div className="text-center text-sm text-gray-400 mt-6">
            <span className="bg-green-300 text-black rounded-md px-3 py-1 text-xs font-bold mr-2">
              Resources
            </span>
            Master the art of investing and secure your financial future with Bluestock learning resources.
          </div>
        </div>

        {/* Mobile App Section */}
        <MobileAppSection />

        {/* App Promo Section */}
        <AppPromoSection />
      </div>
    </div>
  );
}

// Enhanced Mobile App Section Component
function MobileAppSection() {
  return (
    <section className="min-h-screen flex flex-col lg:flex-row items-center justify-center px-6 py-16 bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-500 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-green-500 rounded-full blur-3xl opacity-20"></div>
      </div>

      {/* Left Content */}
      <motion.div
        className="flex-1 space-y-8 max-w-lg z-10"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-green-600 text-white text-xs font-bold rounded-full">
              NEW
            </span>
            <span className="text-green-400 text-sm font-semibold">App 2.0</span>
            <span className="text-gray-400">→</span>
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
            <span className="text-white">Free and open</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              stock market analysis
            </span>
            <br />
            <span className="text-white">for GenZ</span>
          </h1>
          
          <p className="text-gray-300 text-lg leading-relaxed">
            Thousands of traders and investors in India use our stable and reliable mobile app regularly.
          </p>
        </motion.div>

        {/* Phone Input */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white rounded-lg overflow-hidden shadow-xl max-w-md"
        >
          <div className="flex items-center">
            <div className="px-4 py-3 bg-gray-50 border-r border-gray-200">
              <span className="text-gray-600 font-semibold">+91</span>
            </div>
            <input
              type="tel"
              placeholder="Enter mobile number"
              className="flex-1 px-4 py-3 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="px-4 py-3 bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </button>
          </div>
        </motion.div>

        {/* QR Code Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex items-center gap-6 p-6 bg-white bg-opacity-5 backdrop-blur-sm rounded-2xl border border-white border-opacity-10 hover:bg-opacity-10 transition-all duration-300"
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
            <div className="flex gap-2 mt-3">
              <span className="px-2 py-1 bg-green-600 bg-opacity-20 text-green-400 text-xs rounded-full border border-green-600 border-opacity-30">
                Android
              </span>
              <span className="px-2 py-1 bg-blue-600 bg-opacity-20 text-blue-400 text-xs rounded-full border border-blue-600 border-opacity-30">
                iOS
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Right Content - Mobile UI */}
      <motion.div
        className="flex-1 mt-12 lg:mt-0 flex justify-center lg:justify-end relative z-10 lg:pr-8"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        viewport={{ once: true }}
      >
        <div className="relative">
          {/* Glowing effect behind phone */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl blur-2xl opacity-20 scale-110"></div>
          
          {/* Phone mockup container */}
          <motion.div
            whileHover={{ y: -10, rotateY: 5 }}
            transition={{ duration: 0.3 }}
            className="relative bg-gray-900 p-2 rounded-3xl shadow-2xl border border-gray-700"
          >
            <img
              src="/icons/mobile-ui.png"
              alt="Mobile App UI"
              className="max-w-[280px] w-full rounded-2xl shadow-lg"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            {/* Fallback mobile UI placeholder */}
            <div className="hidden max-w-[280px] w-full h-[500px] rounded-2xl bg-gradient-to-b from-gray-800 to-gray-900 items-center justify-center border border-gray-600">
              <div className="text-center text-gray-400">
                <div className="text-4xl mb-2">📱</div>
                <div className="text-sm">Mobile App UI</div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}