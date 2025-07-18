/**
 * Layout Component
 * 
 * Main layout wrapper that provides consistent structure across all pages.
 * Includes header, main content area, and footer.
 * 
 * Features:
 * - Responsive design
 * - Consistent spacing
 * - Sticky header
 * - Flexible main content area
 * - Professional styling
 */

import React, { memo } from 'react';
import { Box, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import Header from './Header';
import Footer from '../Footer'; // Updated to use TailwindCSS Footer

// Styled components for layout structure
const LayoutContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  backgroundColor: theme.palette.background.default,
}));

const MainContent = styled(Box)(({ theme }) => ({
  flex: 1,
  backgroundColor: theme.palette.background.default,
}));

const ContentWrapper = styled(Container)(({ theme }) => ({
  maxWidth: '100%',
  padding: theme.spacing(0, 2),
  
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(0, 3),
  },
  
  [theme.breakpoints.up('md')]: {
    maxWidth: theme.breakpoints.values.xl,
    padding: theme.spacing(0, 4),
  },
}));

/**
 * Layout Component
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render in main content
 * @returns {React.Component} Layout wrapper component
 */
const Layout = ({ children }) => {
  return (
    <LayoutContainer>
      {/* Header with navigation */}
      <Header />
      
      {/* Main content area */}
      <MainContent component="main" role="main">
        {children}
      </MainContent>
      
      {/* Footer */}
      <Footer />
    </LayoutContainer>
  );
};

// Memoize component to prevent unnecessary re-renders
export default memo(Layout);