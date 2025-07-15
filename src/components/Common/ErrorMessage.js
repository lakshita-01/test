// src/components/Common/ErrorMessage.js
import React from 'react';
import { Alert, AlertTitle, Box, Button } from '@mui/material';
import { Refresh } from '@mui/icons-material';

const ErrorMessage = ({ 
  error, 
  onRetry, 
  title = 'Error',
  showRetry = true 
}) => {
  return (
    <Box sx={{ p: 2 }}>
      <Alert 
        severity="error" 
        action={
          showRetry && onRetry && (
            <Button
              color="inherit"
              size="small"
              startIcon={<Refresh />}
              onClick={onRetry}
            >
              Retry
            </Button>
          )
        }
      >
        <AlertTitle>{title}</AlertTitle>
        {error || 'Something went wrong. Please try again.'}
      </Alert>
    </Box>
  );
};

export default ErrorMessage;