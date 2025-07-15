// src/components/Layout/Layout.js
import React, { memo } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import Header from './Header';
import Footer from './Footer';

const LayoutContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
});

const MainContent = styled(Box)(({ theme }) => ({
  flex: 1,
  backgroundColor: '#f5f5f5',
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
}));

const Layout = ({ children }) => {
  return (
    <LayoutContainer>
      <Header />
      <MainContent>
        {children}
      </MainContent>
      <Footer />
    </LayoutContainer>
  );
};

export default memo(Layout);