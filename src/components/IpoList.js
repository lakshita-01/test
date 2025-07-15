// src/components/IpoList.js
import React from 'react';
import { Grid, Box, Typography, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import IpoCard from './IpoCard';
import LoadingSpinner from './Common/LoadingSpinner';
import ErrorMessage from './Common/ErrorMessage';

const ListContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(4),
}));

const EmptyState = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(8, 2),
  color: theme.palette.text.secondary,
}));

const IpoList = ({ 
  ipos = [], 
  loading = false, 
  error = null, 
  onViewDetails, 
  onApply,
  onRetry 
}) => {
  if (loading) {
    return <LoadingSpinner message="Loading IPOs..." />;
  }

  if (error) {
    return (
      <ErrorMessage 
        error={error} 
        onRetry={onRetry}
        title="Failed to load IPOs"
      />
    );
  }

  if (!ipos || ipos.length === 0) {
    return (
      <EmptyState>
        <Typography variant="h6" gutterBottom>
          No IPOs Found
        </Typography>
        <Typography variant="body2">
          There are no IPOs matching your current filters. Try adjusting your search criteria.
        </Typography>
      </EmptyState>
    );
  }

  return (
    <ListContainer maxWidth="lg">
      <Grid container spacing={3}>
        {ipos.map((ipo) => (
          <Grid item xs={12} sm={6} lg={4} key={ipo.id}>
            <IpoCard 
              ipo={ipo} 
              onViewDetails={onViewDetails}
              onApply={onApply}
            />
          </Grid>
        ))}
      </Grid>
    </ListContainer>
  );
};

export default IpoList;