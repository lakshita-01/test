/**
 * Test script for the app link API
 */

const axios = require('axios');

const API_BASE_URL = 'http://localhost:8000/api';

async function testAppLinkAPI() {
  try {
    console.log('Testing App Link API...');
    
    const response = await axios.post(`${API_BASE_URL}/send-app-link/`, {
      phone_number: '9876543210',
      message: 'Download the Bluestock App and start your investment journey today! https://play.google.com/store/apps/details?id=in.bluestock.app',
      app_link: 'https://play.google.com/store/apps/details?id=in.bluestock.app'
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log('✅ API Response:', response.data);
    
    if (response.data.success) {
      console.log('✅ App link sent successfully!');
      
      // Test status endpoint if request_id is available
      if (response.data.request_id) {
        console.log('\nTesting status endpoint...');
        const statusResponse = await axios.get(`${API_BASE_URL}/app-link-status/${response.data.request_id}/`);
        console.log('✅ Status Response:', statusResponse.data);
      }
    } else {
      console.log('❌ Failed to send app link:', response.data.message);
    }
    
  } catch (error) {
    console.error('❌ API Test Failed:');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    } else if (error.request) {
      console.error('Network Error:', error.message);
    } else {
      console.error('Error:', error.message);
    }
  }
}

// Run the test
testAppLinkAPI();