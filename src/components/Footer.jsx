/**
 * TailwindCSS Footer Component
 * 
 * Modern footer component built with TailwindCSS for the Bluestock IPO platform.
 * Features responsive grid layout, social media links, and comprehensive site navigation.
 * 
 * Features:
 * - Responsive grid layout (2 cols mobile, 3 cols tablet, 6 cols desktop)
 * - Social media icons with react-icons
 * - Company information and legal links
 * - Professional styling with TailwindCSS
 * - Accessible link interactions
 * - Mobile-first responsive design
 */

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faXTwitter, 
  faTelegram, 
  faFacebookF, 
  faLinkedinIn, 
  faInstagram, 
  faYoutube 
} from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-slate-50 to-gray-100 text-gray-700 mt-16 border-t border-gray-300 shadow-inner">
      {/* Main Footer Content - 5 Columns for navigation */}
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-10 gap-y-12 mb-20">
          
          {/* Resources Column */}
          <div className="space-y-5">
            <h4 className="relative font-extrabold text-gray-900 text-xl tracking-wider uppercase pb-4 mb-7">
              <span className="relative z-10">Resources</span>
              <div className="absolute bottom-0 left-0 w-16 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></div>
              <div className="absolute bottom-0 left-0 w-8 h-1 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full transform translate-y-2"></div>
            </h4>
            <ul className="space-y-4">
              <li>
                <a href="#" className="group text-gray-600 hover:text-blue-600 transition-all duration-300 text-sm leading-relaxed flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  Trading View
                </a>
              </li>
              <li>
                <a href="#" className="group text-gray-600 hover:text-blue-600 transition-all duration-300 text-sm leading-relaxed flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  NSDL Holidays
                </a>
              </li>
              <li>
                <a href="#" className="group text-gray-600 hover:text-blue-600 transition-all duration-300 text-sm leading-relaxed flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  e-Voting CDSL
                </a>
              </li>
              <li>
                <a href="#" className="group text-gray-600 hover:text-blue-600 transition-all duration-300 text-sm leading-relaxed flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  e-Voting NSDL
                </a>
              </li>
              <li>
                <a href="#" className="group text-gray-600 hover:text-blue-600 transition-all duration-300 text-sm leading-relaxed flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  Market Timings
                </a>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div className="space-y-5">
            <h4 className="relative font-extrabold text-gray-900 text-xl tracking-wider uppercase pb-4 mb-7">
              <span className="relative z-10">Company</span>
              <div className="absolute bottom-0 left-0 w-16 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></div>
              <div className="absolute bottom-0 left-0 w-8 h-1 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full transform translate-y-2"></div>
            </h4>
            <ul className="space-y-4">
              <li>
                <a href="#" className="group text-gray-600 hover:text-blue-600 transition-all duration-300 text-sm leading-relaxed flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="group text-gray-600 hover:text-blue-600 transition-all duration-300 text-sm leading-relaxed flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="group text-gray-600 hover:text-blue-600 transition-all duration-300 text-sm leading-relaxed flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="group text-gray-600 hover:text-blue-600 transition-all duration-300 text-sm leading-relaxed flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  Community
                </a>
              </li>
              <li>
                <a href="#" className="group text-gray-600 hover:text-blue-600 transition-all duration-300 text-sm leading-relaxed flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  Blogs
                </a>
              </li>
            </ul>
          </div>

          {/* Offerings Column */}
          <div className="space-y-5">
            <h4 className="relative font-extrabold text-gray-900 text-xl tracking-wider uppercase pb-4 mb-7">
              <span className="relative z-10">Offerings</span>
              <div className="absolute bottom-0 left-0 w-16 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></div>
              <div className="absolute bottom-0 left-0 w-8 h-1 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full transform translate-y-2"></div>
            </h4>
            <ul className="space-y-4">
              <li>
                <a href="#" className="group text-gray-600 hover:text-blue-600 transition-all duration-300 text-sm leading-relaxed flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  Compare Broker
                </a>
              </li>
              <li>
                <a href="#" className="group text-gray-600 hover:text-blue-600 transition-all duration-300 text-sm leading-relaxed flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  IPO Applications
                </a>
              </li>
              <li>
                <a href="#" className="group text-gray-600 hover:text-blue-600 transition-all duration-300 text-sm leading-relaxed flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  FD
                </a>
              </li>
              <li>
                <a href="#" className="group text-gray-600 hover:text-blue-600 transition-all duration-300 text-sm leading-relaxed flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  US Stocks
                </a>
              </li>
              <li>
                <a href="#" className="group text-gray-600 hover:text-blue-600 transition-all duration-300 text-sm leading-relaxed flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  Products
                </a>
              </li>
            </ul>
          </div>

          {/* Links Column */}
          <div className="space-y-5">
            <h4 className="relative font-extrabold text-gray-900 text-xl tracking-wider uppercase pb-4 mb-7">
              <span className="relative z-10">Links</span>
              <div className="absolute bottom-0 left-0 w-16 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></div>
              <div className="absolute bottom-0 left-0 w-8 h-1 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full transform translate-y-2"></div>
            </h4>
            <ul className="space-y-4">
              <li>
                <a href="#" className="group text-gray-600 hover:text-blue-600 transition-all duration-300 text-sm leading-relaxed flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  Shark Investor
                </a>
              </li>
              <li>
                <a href="#" className="group text-gray-600 hover:text-blue-600 transition-all duration-300 text-sm leading-relaxed flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  Mutual Funds
                </a>
              </li>
              <li>
                <a href="#" className="group text-gray-600 hover:text-blue-600 transition-all duration-300 text-sm leading-relaxed flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  Sitemap
                </a>
              </li>
              <li>
                <a href="#" className="group text-gray-600 hover:text-blue-600 transition-all duration-300 text-sm leading-relaxed flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  Indian Indices
                </a>
              </li>
              <li>
                <a href="#" className="group text-gray-600 hover:text-blue-600 transition-all duration-300 text-sm leading-relaxed flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  Bug Bounty Program
                </a>
              </li>
            </ul>
          </div>

          {/* Policy Column */}
          <div className="space-y-5">
            <h4 className="relative font-extrabold text-gray-900 text-xl tracking-wider uppercase pb-4 mb-7">
              <span className="relative z-10">Policy</span>
              <div className="absolute bottom-0 left-0 w-16 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></div>
              <div className="absolute bottom-0 left-0 w-8 h-1 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full transform translate-y-2"></div>
            </h4>
            <ul className="space-y-4">
              <li>
                <a href="#" className="group text-gray-600 hover:text-blue-600 transition-all duration-300 text-sm leading-relaxed flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="group text-gray-600 hover:text-blue-600 transition-all duration-300 text-sm leading-relaxed flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="group text-gray-600 hover:text-blue-600 transition-all duration-300 text-sm leading-relaxed flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  Refund Policy
                </a>
              </li>
              <li>
                <a href="#" className="group text-gray-600 hover:text-blue-600 transition-all duration-300 text-sm leading-relaxed flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  Disclaimer
                </a>
              </li>
              <li>
                <a href="#" className="group text-gray-600 hover:text-blue-600 transition-all duration-300 text-sm leading-relaxed flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  Trust & Security
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section - Logo/Address Left, Disclaimer Right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 border-t border-gray-300 pt-16 relative">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></div>
          
          {/* Left Side - Social Icons and Company Information */}
          <div className="flex flex-col space-y-8">
            {/* Social Media Icons */}
            <div className="flex gap-6 text-2xl">
              <a href="#" className="group relative p-3 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1" aria-label="X (Twitter)">
                <FontAwesomeIcon icon={faXTwitter} className="text-gray-500 group-hover:text-black transition-colors duration-300" />
                <div className="absolute inset-0 bg-gradient-to-r from-gray-400 to-black rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              </a>
              <a href="#" className="group relative p-3 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1" aria-label="Telegram">
                <FontAwesomeIcon icon={faTelegram} className="text-gray-500 group-hover:text-blue-500 transition-colors duration-300" />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              </a>
              <a href="#" className="group relative p-3 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1" aria-label="Facebook">
                <FontAwesomeIcon icon={faFacebookF} className="text-gray-500 group-hover:text-blue-600 transition-colors duration-300" />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              </a>
              <a href="#" className="group relative p-3 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1" aria-label="LinkedIn">
                <FontAwesomeIcon icon={faLinkedinIn} className="text-gray-500 group-hover:text-blue-700 transition-colors duration-300" />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              </a>
              <a href="#" className="group relative p-3 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1" aria-label="Instagram">
                <FontAwesomeIcon icon={faInstagram} className="text-gray-500 group-hover:text-pink-500 transition-colors duration-300" />
                <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-600 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              </a>
              <a href="#" className="group relative p-3 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1" aria-label="YouTube">
                <FontAwesomeIcon icon={faYoutube} className="text-gray-500 group-hover:text-red-500 transition-colors duration-300" />
                <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-600 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              </a>
            </div>

            {/* Company Information Box - Single Embedded Box */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-sm leading-relaxed space-y-4">
              {/* Logo and Company Name in Same Line */}
              <div className="flex items-center space-x-4 mb-4">
                <img 
                  src="/logo.png" 
                  alt="Bluestock logo" 
                  className="h-12 w-auto object-contain" 
                />
                <h3 className="font-bold text-gray-900 text-xl">Bluestock</h3>
              </div>

              {/* Address */}
              <div className="text-gray-700 mb-3">
                <p className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  Pune, Maharashtra, India
                </p>
              </div>

              {/* MSME Registration Number - 2 Lines */}
              <div className="text-gray-600 text-xs mb-4">
                <p className="flex items-center mb-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  MSME Registration No:
                </p>
                <p className="ml-5 font-mono">UDYAM-MH-27-0038581</p>
              </div>

              {/* Startup India Logo */}
              <div className="pt-2 border-t border-gray-100">
                <img 
                  src="/startup-india.png" 
                  alt="Startup India" 
                  className="h-10 w-auto object-contain" 
                />
              </div>
            </div>
          </div>

          {/* Right Side - Disclaimer */}
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 text-sm text-gray-600 space-y-5 leading-relaxed">
            <div className="border-l-4 border-blue-500 pl-4">
              <p className="text-justify">
                Investments in securities markets are subject to market risk; read all the related documents carefully before investing. Past performance is not an indicator of future returns.
              </p>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <p className="text-justify">
                This site can't write to{' '}
                <a 
                  className="text-blue-600 underline hover:text-blue-800 transition-colors duration-200 font-semibold" 
                  href="mailto:help@bluestock.in"
                >
                  help@bluestock.in
                </a>
                . For complaints, write to{' '}
                <a 
                  className="text-blue-600 underline hover:text-blue-800 transition-colors duration-200 font-semibold" 
                  href="mailto:tech@bluestock.in"
                >
                  tech@bluestock.in
                </a>
              </p>
            </div>
            <div className="border-l-4 border-orange-500 pl-4">
              <p className="text-justify">
                Bluestock is not a registered research analyst company. We do not provide any stock recommendations. All stocks/data shown are for educational purposes only.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 py-8 text-sm text-gray-300 border-t border-gray-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center">
            <p className="font-semibold text-base">
              Bluestock Fintech © 2025 All Rights Reserved.
            </p>
            <p className="font-semibold text-base">
              Made with ❤️ in Pune, Maharashtra.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;