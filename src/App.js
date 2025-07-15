import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, CircularProgress, Box } from '@mui/material';
import { AppProvider } from './context/AppContext';
import Layout from './components/Layout/Layout';
import theme from './theme/theme';
import './App.css';
import './styles/global.css';

// Lazy load components
const IpoPage = lazy(() => import('./pages/IpoPage'));
const CommunityPage = lazy(() => import('./pages/CommunityPage'));
const ProductsPage = lazy(() => import('./pages/ProductsPage'));
const BrokersPage = lazy(() => import('./pages/BrokersPage'));
const LiveNewsPage = lazy(() => import('./pages/LiveNewsPage'));
const SignInPage = lazy(() => import('./pages/SignInPage'));
const SignUpPage = lazy(() => import('./pages/SignUpPage'));
const AdminLogin = lazy(() => import('./components/Admin/AdminLogin'));
const IpoAdminDashboard = lazy(() => import('./components/IpoAdminDashboard'));
// Loading component
const LoadingFallback = () => (
  <Box 
    display="flex" 
    justifyContent="center" 
    alignItems="center" 
    minHeight="50vh"
  >
    <CircularProgress />
  </Box>
);



function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppProvider>
        <Router>
          <Layout>
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                <Route path="/" element={<IpoPage />} />
                <Route path="/community" element={<CommunityPage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/brokers" element={<BrokersPage />} />
                <Route path="/live-news" element={<LiveNewsPage />} />
                <Route path="/signin" element={<SignInPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
                <Route path="/admin/dashboard" element={<IpoAdminDashboard />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </Layout>
        </Router>
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;


