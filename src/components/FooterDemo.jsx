/**
 * Footer Demo Component
 * 
 * Demonstration component showing the TailwindCSS Footer in action.
 * This can be used to test and showcase the footer component.
 */

import React from 'react';
import Footer from './Footer';

const FooterDemo = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Demo content */}
      <div className="flex-1 bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            🚀 TailwindCSS Footer Demo
          </h1>
          
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              ✅ Footer Features
            </h2>
            <ul className="space-y-2 text-gray-600">
              <li>✨ <strong>Responsive Design:</strong> Adapts to mobile, tablet, and desktop</li>
              <li>🎨 <strong>TailwindCSS Styling:</strong> Modern utility-first CSS framework</li>
              <li>🔗 <strong>Social Media Icons:</strong> React Icons integration</li>
              <li>📱 <strong>Mobile-First:</strong> Optimized for all screen sizes</li>
              <li>♿ <strong>Accessible:</strong> Proper ARIA labels and semantic HTML</li>
              <li>🏢 <strong>Company Info:</strong> Complete business information</li>
              <li>📋 <strong>Legal Links:</strong> Terms, privacy, and compliance</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              🛠️ Technical Implementation
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-2">Dependencies</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• React Icons (v5.5.0)</li>
                  <li>• TailwindCSS (v4.1.11)</li>
                  <li>• Responsive Grid System</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-2">Features</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• 6-column responsive grid</li>
                  <li>• Hover effects on links</li>
                  <li>• Professional typography</li>
                  <li>• Semantic HTML structure</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-blue-800 mb-3">
              📝 Usage Instructions
            </h2>
            <div className="text-sm text-blue-700 space-y-2">
              <p><strong>1. Import:</strong> <code className="bg-blue-100 px-2 py-1 rounded">import Footer from './components/Footer';</code></p>
              <p><strong>2. Use:</strong> <code className="bg-blue-100 px-2 py-1 rounded">&lt;Footer /&gt;</code></p>
              <p><strong>3. Customize:</strong> Edit the component to add your own links and content</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* The actual footer component */}
      <Footer />
    </div>
  );
};

export default FooterDemo;