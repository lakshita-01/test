// src/utils/api.js

// Base API configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

// Mock data for development
const mockIpos = [];

// Helper function to simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Helper function to simulate API responses
const createResponse = (data, success = true) => ({
  data,
  success,
  message: success ? 'Success' : 'Error occurred'
});

// Mock reCAPTCHA verification function
const verifyRecaptcha = async (token) => {
  await delay(500); // Simulate verification delay
  
  // In a real application, you would verify the token with Google's API
  // For testing purposes, we'll accept any non-empty token
  if (!token) {
    return false;
  }
  
  // Mock verification - in production, you would call:
  // const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  //   body: `secret=${RECAPTCHA_SECRET_KEY}&response=${token}`
  // });
  // const result = await response.json();
  // return result.success;
  
  return true; // Mock success for development
};

// Authentication token management
let authToken = localStorage.getItem('authToken');

const api = {
  // Authentication methods
  isAuthenticated: () => {
    return !!authToken;
  },

  login: async (credentials) => {
    await delay(1000); // Simulate network delay
    
    // Mock authentication - in real app, this would call actual API
    if (credentials.username === 'admin' && credentials.password === 'admin123') {
      authToken = 'mock-jwt-token-' + Date.now();
      localStorage.setItem('authToken', authToken);
      
      return createResponse({
        user: {
          id: '1',
          username: 'admin',
          email: 'admin@example.com',
          role: 'admin'
        },
        token: authToken
      });
    } else {
      throw new Error('Invalid credentials');
    }
  },

  logout: () => {
    authToken = null;
    localStorage.removeItem('authToken');
  },

  register: async (userData) => {
    await delay(1500); // Simulate network delay
    
    // Verify reCAPTCHA token (mock verification)
    if (!userData.recaptchaToken) {
      throw new Error('reCAPTCHA verification required');
    }

    // Mock reCAPTCHA verification
    const recaptchaValid = await verifyRecaptcha(userData.recaptchaToken);
    if (!recaptchaValid) {
      throw new Error('reCAPTCHA verification failed. Please try again.');
    }
    
    // Check if user already exists
    const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    if (existingUsers.find(user => user.email === userData.email)) {
      throw new Error('An account with this email already exists');
    }
    
    // Create new user
    const newUser = {
      id: Date.now().toString(),
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      authMethod: 'email',
      createdAt: new Date().toISOString(),
      recaptchaVerified: true
    };
    
    // Store user
    existingUsers.push(newUser);
    localStorage.setItem('registeredUsers', JSON.stringify(existingUsers));
    
    // Generate auth token
    authToken = 'mock-jwt-token-' + Date.now();
    localStorage.setItem('authToken', authToken);
    
    return createResponse({
      user: {
        id: newUser.id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        authMethod: newUser.authMethod
      },
      token: authToken
    });
  },

  // IPO CRUD operations
  getIpos: async (filters = {}) => {
    await delay(500); // Simulate network delay
    
    let filteredIpos = [...mockIpos];
    
    // Apply filters
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filteredIpos = filteredIpos.filter(ipo => 
        ipo.companyName.toLowerCase().includes(searchTerm) ||
        ipo.sector.toLowerCase().includes(searchTerm)
      );
    }
    
    if (filters.sector && filters.sector !== 'all') {
      filteredIpos = filteredIpos.filter(ipo => 
        ipo.sector.toLowerCase() === filters.sector.toLowerCase()
      );
    }
    
    if (filters.dateFrom) {
      filteredIpos = filteredIpos.filter(ipo => 
        new Date(ipo.ipoOpenDate) >= new Date(filters.dateFrom)
      );
    }
    
    if (filters.dateTo) {
      filteredIpos = filteredIpos.filter(ipo => 
        new Date(ipo.ipoCloseDate) <= new Date(filters.dateTo)
      );
    }
    
    return createResponse(filteredIpos);
  },

  getIpoById: async (id) => {
    await delay(300);
    
    const ipo = mockIpos.find(ipo => ipo.id === id);
    if (!ipo) {
      throw new Error('IPO not found');
    }
    
    return createResponse(ipo);
  },

  createIpo: async (ipoData) => {
    await delay(800);
    
    if (!authToken) {
      throw new Error('Authentication required');
    }
    
    const newIpo = {
      ...ipoData,
      id: Date.now().toString(), // Simple ID generation for mock
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    mockIpos.push(newIpo);
    return createResponse(newIpo);
  },

  updateIpo: async (id, ipoData) => {
    await delay(800);
    
    if (!authToken) {
      throw new Error('Authentication required');
    }
    
    const index = mockIpos.findIndex(ipo => ipo.id === id);
    if (index === -1) {
      throw new Error('IPO not found');
    }
    
    const updatedIpo = {
      ...mockIpos[index],
      ...ipoData,
      id, // Ensure ID doesn't change
      updatedAt: new Date().toISOString()
    };
    
    mockIpos[index] = updatedIpo;
    return createResponse(updatedIpo);
  },

  deleteIpo: async (id) => {
    await delay(500);
    
    if (!authToken) {
      throw new Error('Authentication required');
    }
    
    const index = mockIpos.findIndex(ipo => ipo.id === id);
    if (index === -1) {
      throw new Error('IPO not found');
    }
    
    mockIpos.splice(index, 1);
    return createResponse({ id });
  },

  // Additional utility methods
  uploadFile: async (file) => {
    await delay(1500);
    
    if (!authToken) {
      throw new Error('Authentication required');
    }
    
    // Mock file upload - in real app, this would upload to cloud storage
    const mockUrl = `https://example.com/uploads/${file.name}`;
    return createResponse({ url: mockUrl, filename: file.name });
  },

  // Real API methods (commented out for mock implementation)
  /*
  // Uncomment and modify these for real API integration
  
  makeRequest: async (endpoint, options = {}) => {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(authToken && { Authorization: `Bearer ${authToken}` }),
        ...options.headers
      },
      ...options
    };

    const response = await fetch(url, config);
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'API request failed');
    }
    
    return response.json();
  },

  get: (endpoint) => api.makeRequest(endpoint),
  post: (endpoint, data) => api.makeRequest(endpoint, {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  put: (endpoint, data) => api.makeRequest(endpoint, {
    method: 'PUT',
    body: JSON.stringify(data)
  }),
  delete: (endpoint) => api.makeRequest(endpoint, { method: 'DELETE' })
  */
};

export default api;