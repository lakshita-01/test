/**
 * Main Application Component
 * 
 * This is the root component that sets up routing, theming, and global providers
 * for the Bluestock IPO platform application.
 * 
 * Features:
 * - Lazy loading for better performance
 * - Material-UI theming
 * - Global state management
 * - Responsive layout
 * - Error boundaries and loading states
 */

import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, CircularProgress, Box, Typography, Alert } from '@mui/material';
import { AppProvider } from './context/AppContext';
import Layout from './components/Layout/Layout';
import ErrorBoundary from './components/Common/ErrorBoundary';
import CookieConsent from './components/CookieConsent';
import theme from './theme/theme';
import './App.css';
import './styles/global.css';

// Lazy load components for better performance
const IpoPage = lazy(() => import('./pages/IpoPage'));
const CommunityPage = lazy(() => import('./pages/CommunityPage'));
const ProductsPage = lazy(() => import('./pages/ProductsPage'));
const BrokersPage = lazy(() => import('./pages/BrokersPage'));
const LiveNewsPage = lazy(() => import('./pages/LiveNewsPage'));
const SignInPage = lazy(() => import('./pages/SignInPage'));
const SignUpPage = lazy(() => import('./pages/SignUpPage'));
const AdminLogin = lazy(() => import('./components/Admin/AdminLogin'));
const IpoAdminDashboard = lazy(() => import('./components/IpoAdminDashboard'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

/**
 * Loading fallback component displayed during lazy loading
 */
const LoadingFallback = () => (
  <Box 
    display="flex" 
    flexDirection="column"
    justifyContent="center" 
    alignItems="center" 
    minHeight="50vh"
    gap={2}
  >
    <CircularProgress size={40} />
    <Typography variant="body2" color="text.secondary">
      Loading...
    </Typography>
  </Box>
);



/**
 * Main App Component
 * 
 * Sets up the application with:
 * - Material-UI theme provider
 * - Global CSS reset
 * - Application context
 * - Router configuration
 * - Layout wrapper
 * - Lazy-loaded routes
 */
function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppProvider>
          <Router>
            <Layout>
              <Suspense fallback={<LoadingFallback />}>
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<IpoPage />} />
                  <Route path="/community" element={<CommunityPage />} />
                  <Route path="/products" element={<ProductsPage />} />
                  <Route path="/brokers" element={<BrokersPage />} />
                  <Route path="/live-news" element={<LiveNewsPage />} />
                  
                  {/* Authentication Routes */}
                  <Route path="/signin" element={<SignInPage />} />
                  <Route path="/signup" element={<SignUpPage />} />
                  
                  {/* Admin Routes */}
                  <Route path="/admin/login" element={<AdminLogin />} />
                  <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
                  <Route path="/admin/dashboard" element={<IpoAdminDashboard />} />
                  
                  {/* 404 Not Found route */}
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </Suspense>
            </Layout>
            
            {/* Cookie Consent Popup */}
            <CookieConsent />
          </Router>
        </AppProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;


