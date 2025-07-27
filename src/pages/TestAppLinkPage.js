/**
 * Test page for App Link functionality
 * This page is for testing the app link sending feature
 */

import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Paper,
  InputAdornment
} from '@mui/material';
import { Phone } from '@mui/icons-material';
import { sendAppLink, validatePhoneNumber } from '../services/appLinkService';

const TestAppLinkPage = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ show: false, type: 'success', message: '' });

  const handleSendAppLink = async (e) => {
    e.preventDefault();
    
    // Validate phone number
    if (!validatePhoneNumber(phoneNumber)) {
      setAlert({
        show: true,
        type: 'error',
        message: 'Please enter a valid 10-digit mobile number'
      });
      return;
    }

    setLoading(true);
    setAlert({ show: false, type: 'success', message: '' });

    try {
      const result = await sendAppLink(phoneNumber);
      
      if (result.success) {
        setAlert({
          show: true,
          type: 'success',
          message: result.message + (result.fallback ? ' (Using fallback mode)' : '')
        });
        setPhoneNumber('');
      } else {
        setAlert({
          show: true,
          type: 'error',
          message: result.message
        });
      }
    } catch (error) {
      setAlert({
        show: true,
        type: 'error',
        message: 'Failed to send app link. Please try again.'
      });
    } finally {
      setLoading(false);
      // Auto-hide alert after 5 seconds
      setTimeout(() => {
        setAlert({ show: false, type: 'success', message: '' });
      }, 5000);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Test App Link Service
        </Typography>
        
        <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 4 }}>
          Test the app link sending functionality
        </Typography>

        {/* Alert Message */}
        {alert.show && (
          <Alert 
            severity={alert.type} 
            sx={{ mb: 3 }}
            onClose={() => setAlert({ show: false, type: 'success', message: '' })}
          >
            {alert.message}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSendAppLink}>
          <TextField
            fullWidth
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter your 10-digit mobile number"
            variant="outlined"
            type="tel"
            inputProps={{
              maxLength: 10,
              pattern: '[0-9]{10}'
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Phone />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 3 }}
            disabled={loading}
          />
          
          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            disabled={loading || !phoneNumber.trim()}
            sx={{ py: 1.5 }}
          >
            {loading ? (
              <>
                <CircularProgress size={20} sx={{ mr: 1 }} />
                Sending...
              </>
            ) : (
              'Send App Link'
            )}
          </Button>
        </Box>

        <Typography variant="caption" color="text.secondary" align="center" display="block" sx={{ mt: 2 }}>
          This will send the Bluestock app download link to your mobile number
        </Typography>
      </Paper>
    </Container>
  );
};

export default TestAppLinkPage;