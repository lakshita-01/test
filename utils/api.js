
const mockIpos = [
  {
    id: 1,
    companyName: 'TechCorp Ltd',
    sector: 'Technology',
    ipoOpenDate: '2024-02-15',
    ipoCloseDate: '2024-02-17',
    priceBand: '₹100 - ₹120',
    lotSize: 100,
    issueSize: '₹500 Cr',
    rhpLink: 'https://example.com/rhp1.pdf',
    status: 'open',
    description: 'Leading technology solutions provider',
    listingDate: '2024-02-22',
    minInvestment: 10000
  },
  {
    id: 2,
    companyName: 'HealthPlus Inc',
    sector: 'Healthcare',
    ipoOpenDate: '2024-02-20',
    ipoCloseDate: '2024-02-22',
    priceBand: '₹80 - ₹95',
    lotSize: 150,
    issueSize: '₹300 Cr',
    rhpLink: 'https://example.com/rhp2.pdf',
    status: 'upcoming',
    description: 'Pharmaceutical company specializing in generic drugs',
    listingDate: '2024-02-27',
    minInvestment: 12000
  },
  {
    id: 3,
    companyName: 'GreenEnergy Ltd',
    sector: 'Energy',
    ipoOpenDate: '2024-02-25',
    ipoCloseDate: '2024-02-27',
    priceBand: '₹150 - ₹180',
    lotSize: 75,
    issueSize: '₹750 Cr',
    rhpLink: 'https://example.com/rhp3.pdf',
    status: 'upcoming',
    description: 'Renewable energy solutions provider',
    listingDate: '2024-03-05',
    minInvestment: 11250
  }
];

const api = {
  getIpos: async (filters = {}) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      let filteredIpos = [...mockIpos];
      
      if (filters.search) {
        filteredIpos = filteredIpos.filter(ipo => 
          ipo.companyName.toLowerCase().includes(filters.search.toLowerCase()) ||
          ipo.sector.toLowerCase().includes(filters.search.toLowerCase())
        );
      }
      
      if (filters.sector && filters.sector !== 'all') {
        filteredIpos = filteredIpos.filter(ipo => ipo.sector === filters.sector);
      }
      
      return { data: filteredIpos };
    } catch (error) {
      console.error('Error fetching IPOs:', error);
      throw error;
    }
  },

  createIpo: async (ipoData) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const newIpo = {
        ...ipoData,
        id: mockIpos.length + 1,
        status: 'upcoming'
      };
      mockIpos.push(newIpo);
      return { data: newIpo };
    } catch (error) {
      console.error('Error creating IPO:', error);
      throw error;
    }
  },

  updateIpo: async (id, ipoData) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const index = mockIpos.findIndex(ipo => ipo.id === parseInt(id));
      if (index === -1) {
        throw new Error('IPO not found');
      }
      mockIpos[index] = { ...mockIpos[index], ...ipoData };
      return { data: mockIpos[index] };
    } catch (error) {
      console.error('Error updating IPO:', error);
      throw error;
    }
  },

  deleteIpo: async (id) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      const index = mockIpos.findIndex(ipo => ipo.id === parseInt(id));
      if (index === -1) {
        throw new Error('IPO not found');
      }
      mockIpos.splice(index, 1);
      return { data: { message: 'IPO deleted successfully' } };
    } catch (error) {
      console.error('Error deleting IPO:', error);
      throw error;
    }
  },

  login: async (credentials) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      if (credentials.username === 'admin' && credentials.password === 'admin123') {
        const token = 'mock-jwt-token-' + Date.now();
        localStorage.setItem('authToken', token);
        return { 
          data: { 
            token, 
            user: { 
              id: 1, 
              username: 'admin', 
              role: 'admin' 
            } 
          } 
        };
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('authToken');
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('authToken');
  }
};

export default api;