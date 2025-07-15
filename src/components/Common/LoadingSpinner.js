// src/components/Common/LoadingSpinner.js
import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const LoadingContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(6),
  minHeight: '300px',
  background: `linear-gradient(135deg, ${theme.palette.primary.main}05 0%, ${theme.palette.primary.light}03 100%)`,
  borderRadius: 16,
}));

const StyledProgress = styled(CircularProgress)(({ theme }) => ({
  '& .MuiCircularProgress-circle': {
    strokeLinecap: 'round',
  },
}));

const LoadingSpinner = ({ message = 'Loading...', size = 48 }) => {
  return (
    <LoadingContainer>
      <StyledProgress 
        size={size} 
        thickness={4}
        sx={{ 
          mb: 3,
          color: 'primary.main',
          filter: 'drop-shadow(0 2px 4px rgba(25, 118, 210, 0.2))'
        }} 
      />
      <Typography 
        variant="h6" 
        color="text.secondary"
        sx={{ 
          fontWeight: 500,
          textAlign: 'center',
          maxWidth: '300px'
        }}
      >
        {message}
      </Typography>
    </LoadingContainer>
  );
};

export default LoadingSpinner;