// src/context/AppContext.js
import React, { createContext, useContext, useReducer, useEffect, useMemo } from 'react';
import api from '../utils/api';

// Initial state
const initialState = {
  ipos: [],
  loading: false,
  error: null,
  filters: {
    search: '',
    sector: 'all',
    dateFrom: '',
    dateTo: ''
  },
  selectedIpo: null,
  user: null,
  isAuthenticated: false,
  darkMode: localStorage.getItem('darkMode') === 'true' || false
};

// Action types
export const ACTION_TYPES = {
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  SET_IPOS: 'SET_IPOS',
  ADD_IPO: 'ADD_IPO',
  UPDATE_IPO: 'UPDATE_IPO',
  DELETE_IPO: 'DELETE_IPO',
  SET_FILTERS: 'SET_FILTERS',
  SET_SELECTED_IPO: 'SET_SELECTED_IPO',
  SET_USER: 'SET_USER',
  SET_AUTHENTICATED: 'SET_AUTHENTICATED',
  CLEAR_ERROR: 'CLEAR_ERROR',
  TOGGLE_DARK_MODE: 'TOGGLE_DARK_MODE'
};

// Reducer function
const appReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    
    case ACTION_TYPES.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    
    case ACTION_TYPES.CLEAR_ERROR:
      return {
        ...state,
        error: null
      };
    
    case ACTION_TYPES.SET_IPOS:
      return {
        ...state,
        ipos: action.payload,
        loading: false,
        error: null
      };
    
    case ACTION_TYPES.ADD_IPO:
      return {
        ...state,
        ipos: [...state.ipos, action.payload],
        loading: false,
        error: null
      };
    
    case ACTION_TYPES.UPDATE_IPO:
      return {
        ...state,
        ipos: state.ipos.map(ipo => 
          ipo.id === action.payload.id ? action.payload : ipo
        ),
        loading: false,
        error: null
      };
    
    case ACTION_TYPES.DELETE_IPO:
      return {
        ...state,
        ipos: state.ipos.filter(ipo => ipo.id !== action.payload),
        loading: false,
        error: null
      };
    
    case ACTION_TYPES.SET_FILTERS:
      return {
        ...state,
        filters: {
          ...state.filters,
          ...action.payload
        }
      };
    
    case ACTION_TYPES.SET_SELECTED_IPO:
      return {
        ...state,
        selectedIpo: action.payload
      };
    
    case ACTION_TYPES.SET_USER:
      return {
        ...state,
        user: action.payload
      };
    
    case ACTION_TYPES.SET_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: action.payload
      };
    
    case ACTION_TYPES.TOGGLE_DARK_MODE:
      const newDarkMode = !state.darkMode;
      localStorage.setItem('darkMode', newDarkMode.toString());
      return {
        ...state,
        darkMode: newDarkMode
      };
    
    default:
      return state;
  }
};

// Create context
const AppContext = createContext();

// Context provider component
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Actions
  const actions = useMemo(() => ({
    setLoading: (loading) => {
      dispatch({ type: ACTION_TYPES.SET_LOADING, payload: loading });
    },

    setError: (error) => {
      dispatch({ type: ACTION_TYPES.SET_ERROR, payload: error });
    },

    clearError: () => {
      dispatch({ type: ACTION_TYPES.CLEAR_ERROR });
    },

    fetchIpos: async (filters = {}) => {
      try {
        dispatch({ type: ACTION_TYPES.SET_LOADING, payload: true });
        const response = await api.getIpos(filters);
        dispatch({ type: ACTION_TYPES.SET_IPOS, payload: response.data });
      } catch (error) {
        dispatch({ type: ACTION_TYPES.SET_ERROR, payload: error.message });
      }
    },

    fetchIpoById: async (id) => {
      try {
        dispatch({ type: ACTION_TYPES.SET_LOADING, payload: true });
        const response = await api.getIpoById(id);
        dispatch({ type: ACTION_TYPES.SET_SELECTED_IPO, payload: response.data });
        dispatch({ type: ACTION_TYPES.SET_LOADING, payload: false });
        return response.data;
      } catch (error) {
        dispatch({ type: ACTION_TYPES.SET_ERROR, payload: error.message });
        throw error;
      }
    },

    createIpo: async (ipoData) => {
      try {
        dispatch({ type: ACTION_TYPES.SET_LOADING, payload: true });
        const response = await api.createIpo(ipoData);
        dispatch({ type: ACTION_TYPES.ADD_IPO, payload: response.data });
        return response.data;
      } catch (error) {
        dispatch({ type: ACTION_TYPES.SET_ERROR, payload: error.message });
        throw error;
      }
    },

    updateIpo: async (id, ipoData) => {
      try {
        dispatch({ type: ACTION_TYPES.SET_LOADING, payload: true });
        const response = await api.updateIpo(id, ipoData);
        dispatch({ type: ACTION_TYPES.UPDATE_IPO, payload: response.data });
        return response.data;
      } catch (error) {
        dispatch({ type: ACTION_TYPES.SET_ERROR, payload: error.message });
        throw error;
      }
    },

    deleteIpo: async (id) => {
      try {
        dispatch({ type: ACTION_TYPES.SET_LOADING, payload: true });
        await api.deleteIpo(id);
        dispatch({ type: ACTION_TYPES.DELETE_IPO, payload: id });
      } catch (error) {
        dispatch({ type: ACTION_TYPES.SET_ERROR, payload: error.message });
        throw error;
      }
    },

    setFilters: (filters) => {
      dispatch({ type: ACTION_TYPES.SET_FILTERS, payload: filters });
    },

    setSelectedIpo: (ipo) => {
      dispatch({ type: ACTION_TYPES.SET_SELECTED_IPO, payload: ipo });
    },

    login: async (credentials) => {
      try {
        dispatch({ type: ACTION_TYPES.SET_LOADING, payload: true });
        const response = await api.login(credentials);
        dispatch({ type: ACTION_TYPES.SET_USER, payload: response.data.user });
        dispatch({ type: ACTION_TYPES.SET_AUTHENTICATED, payload: true });
        dispatch({ type: ACTION_TYPES.SET_LOADING, payload: false });
        return response.data;
      } catch (error) {
        dispatch({ type: ACTION_TYPES.SET_ERROR, payload: error.message });
        throw error;
      }
    },

    logout: () => {
      api.logout();
      dispatch({ type: ACTION_TYPES.SET_USER, payload: null });
      dispatch({ type: ACTION_TYPES.SET_AUTHENTICATED, payload: false });
    },

    checkAuth: () => {
      const isAuth = api.isAuthenticated();
      dispatch({ type: ACTION_TYPES.SET_AUTHENTICATED, payload: isAuth });
    },

    toggleDarkMode: () => {
      dispatch({ type: ACTION_TYPES.TOGGLE_DARK_MODE });
    }
  }), [dispatch]);

  // Check authentication on mount
  useEffect(() => {
    actions.checkAuth();
  }, [actions]);

  const value = {
    state,
    actions
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the context
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export default AppContext;