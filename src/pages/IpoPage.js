// src/pages/IpoPage.js
import React, { useState, useEffect, useRef } from 'react';
import { Container, Typography, Box, Snackbar, Alert } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useApp } from '../context/AppContext';
import SearchFilters from '../components/IPO/SearchFilters';
import IpoList from '../components/IpoList';
import IpoDetailModal from '../components/IPO/IpoDetailModal';
import HeroSection from '../components/Common/HeroSection';

const PageContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  marginBottom: theme.spacing(3),
  textAlign: 'center',
  background: `linear-gradient(135deg, ${theme.palette.text.primary}, ${theme.palette.primary.main})`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
}));

const IpoPage = () => {
  const { state, actions } = useApp();
  const { ipos, loading, error, filters } = state;
  
  const [selectedIpo, setSelectedIpo] = useState(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'info'
  });

  const ipoListRef = useRef(null);

  // Fetch IPOs on component mount and when filters change
  useEffect(() => {
    actions.fetchIpos(filters);
  }, [filters, actions]);

  const handleFiltersChange = (newFilters) => {
    actions.setFilters(newFilters);
  };

  const handleViewDetails = (ipo) => {
    setSelectedIpo(ipo);
    setDetailModalOpen(true);
  };

  const handleCloseDetailModal = () => {
    setDetailModalOpen(false);
    setSelectedIpo(null);
  };

  const handleApply = (ipo) => {
    // Mock application process
    setSnackbar({
      open: true,
      message: `Application initiated for ${ipo.companyName}. You will be redirected to the application portal.`,
      severity: 'success'
    });
    
    // In a real application, this would redirect to the application portal
    setTimeout(() => {
      console.log('Redirecting to application portal for:', ipo.companyName);
    }, 2000);
  };

  const handleRetry = () => {
    actions.fetchIpos(filters);
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const handleExploreClick = () => {
    if (ipoListRef.current) {
      ipoListRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <>
      <HeroSection onExploreClick={handleExploreClick} />
      
      <PageContainer maxWidth="xl" ref={ipoListRef}>
        <SectionTitle variant="h3" component="h2">
          Available IPOs
        </SectionTitle>

        <SearchFilters
          filters={filters}
          onFiltersChange={handleFiltersChange}
          totalResults={ipos.length}
        />

        <IpoList
          ipos={ipos}
          loading={loading}
          error={error}
          onViewDetails={handleViewDetails}
          onApply={handleApply}
          onRetry={handleRetry}
        />
      </PageContainer>

      {/* IPO Detail Modal */}
      <IpoDetailModal
        open={detailModalOpen}
        onClose={handleCloseDetailModal}
        ipo={selectedIpo}
        onApply={handleApply}
      />

      {/* Success/Error Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default IpoPage;