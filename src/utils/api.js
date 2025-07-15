// src/utils/api.js

// Base API configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

// Mock data for development
const mockIpos = [
  {
    id: '1',
    companyName: 'Tech Innovations Ltd',
    sector: 'Technology',
    priceBand: '₹100-120',
    priceBandMin: '100',
    priceBandMax: '120',
    lotSize: '100',
    minInvestment: '10000',
    issueSize: '₹500 Cr',
    ipoOpenDate: '2024-01-15',
    ipoCloseDate: '2024-01-18',
    listingDate: '2024-01-22',
    description: 'Leading technology company specializing in AI and machine learning solutions.',
    rhpLink: 'https://example.com/rhp1.pdf'
  },
  {
    id: '2',
    companyName: 'Green Energy Solutions',
    sector: 'Energy',
    priceBand: '₹80-95',
    priceBandMin: '80',
    priceBandMax: '95',
    lotSize: '150',
    minInvestment: '12000',
    issueSize: '₹300 Cr',
    ipoOpenDate: '2024-02-01',
    ipoCloseDate: '2024-02-05',
    listingDate: '2024-02-10',
    description: 'Renewable energy company focused on solar and wind power solutions.',
    rhpLink: 'https://example.com/rhp2.pdf'
  }
];

// Helper function to simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Helper function to simulate API responses
const createResponse = (data, success = true) => ({
  data,
  success,
  message: success ? 'Success' : 'Error occurred'
});

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