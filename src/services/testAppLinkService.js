/**
 * Test file for App Link Service
 * Run this to test the service functionality
 */

import { sendAppLink, validatePhoneNumber, formatPhoneNumber } from './appLinkService';

// Test the service
async function testService() {
  console.log('Testing App Link Service...');
  
  // Test phone number validation
  console.log('Testing phone number validation:');
  console.log('9876543210 is valid:', validatePhoneNumber('9876543210'));
  console.log('123 is valid:', validatePhoneNumber('123'));
  console.log('98765432101 is valid:', validatePhoneNumber('98765432101'));
  
  // Test phone number formatting
  console.log('\nTesting phone number formatting:');
  console.log('Format 9876543210:', formatPhoneNumber('9876543210'));
  console.log('Format 919876543210:', formatPhoneNumber('919876543210'));
  
  // Test sending app link
  console.log('\nTesting app link sending:');
  try {
    const result = await sendAppLink('9876543210');
    console.log('Result:', result);
  } catch (error) {
    console.error('Error:', error);
  }
}

export default testService;