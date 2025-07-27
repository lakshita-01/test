// src/pages/ForgotPasswordPage.js
import React, { useState } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  InputAdornment,
  Link,
  CircularProgress
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { 
  Email, 
  ArrowBack,
  CheckCircle
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { sendPasswordResetEmail, checkEmailExists } from '../utils/emailService';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  maxWidth: 450,
  margin: '0 auto',
  marginTop: theme.spacing(8),
  borderRadius: theme.spacing(2),
  boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
  background: 'linear-gradient(135deg, #ffffff 0%, #f8faff 100%)',
  border: '1px solid rgba(103, 58, 183, 0.1)',
}));

const BackButton = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.main,
  textTransform: 'none',
  marginBottom: theme.spacing(2),
  '&:hover': {
    backgroundColor: 'rgba(103, 58, 183, 0.04)',
  },
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  color: 'white',
  padding: theme.spacing(1.5),
  borderRadius: theme.spacing(1),
  textTransform: 'none',
  fontWeight: 600,
  boxShadow: '0 4px 16px rgba(103, 58, 183, 0.3)',
  '&:hover': {
    background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
    boxShadow: '0 6px 20px rgba(103, 58, 183, 0.4)',
    transform: 'translateY(-1px)',
  },
  '&:disabled': {
    background: 'rgba(0, 0, 0, 0.12)',
    color: 'rgba(0, 0, 0, 0.26)',
    boxShadow: 'none',
    transform: 'none',
  },
}));

const SuccessContainer = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(3),
}));

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: '', type: 'info' });
  const [emailSent, setEmailSent] = useState(false);

  const handleChange = (e) => {
    setEmail(e.target.value);
    // Clear error when user starts typing
    if (errors.email) {
      setErrors({});
    }
  };

  const validateEmail = () => {
    const newErrors = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateEmail()) return;
    
    setLoading(true);
    
    try {
      // First check if email exists in the system
      const emailCheck = await checkEmailExists(email);
      
      if (!emailCheck.exists) {
        setAlert({
          show: true,
          message: 'No account found with this email address.',
          type: 'error'
        });
        return;
      }
      
      // Send password reset email
      const result = await sendPasswordResetEmail(email);
      
      if (result.success) {
        setEmailSent(true);
        setAlert({
          show: true,
          message: 'Password reset email sent successfully!',
          type: 'success'
        });
      } else {
        throw new Error(result.message || 'Failed to send reset email');
      }
      
    } catch (error) {
      setAlert({
        show: true,
        message: error.message || 'Failed to send reset email. Please try again.',
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResendEmail = async () => {
    setLoading(true);
    
    try {
      // Resend password reset email
      const result = await sendPasswordResetEmail(email);
      
      if (result.success) {
        setAlert({
          show: true,
          message: 'Reset email sent again!',
          type: 'success'
        });
      } else {
        throw new Error(result.message || 'Failed to resend email');
      }
      
    } catch (error) {
      setAlert({
        show: true,
        message: error.message || 'Failed to resend email. Please try again.',
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  if (emailSent) {
    return (
      <Container maxWidth="sm" sx={{ py: 4 }}>
        <StyledPaper>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SuccessContainer>
              <CheckCircle 
                sx={{ 
                  fontSize: 64, 
                  color: 'success.main', 
                  mb: 2 
                }} 
              />
              
              <Typography variant="h5" component="h1" gutterBottom>
                Check Your Email
              </Typography>
              
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                We've sent a password reset link to:
              </Typography>
              
              <Typography variant="body1" fontWeight="600" sx={{ mb: 3 }}>
                {email}
              </Typography>
              
              <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                Click the link in the email to reset your password. 
                If you don't see the email, check your spam folder.
              </Typography>

              {alert.show && (
                <Alert 
                  severity={alert.type} 
                  sx={{ mb: 2 }}
                  onClose={() => setAlert({ ...alert, show: false })}
                >
                  {alert.message}
                </Alert>
              )}
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Button
                  variant="outlined"
                  onClick={handleResendEmail}
                  disabled={loading}
                  startIcon={loading ? <CircularProgress size={16} /> : null}
                >
                  {loading ? 'Sending...' : 'Resend Email'}
                </Button>
                
                <Button
                  variant="text"
                  onClick={() => navigate('/signin')}
                  startIcon={<ArrowBack />}
                >
                  Back to Sign In
                </Button>
              </Box>
            </SuccessContainer>
          </motion.div>
        </StyledPaper>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <StyledPaper>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <BackButton
            startIcon={<ArrowBack />}
            onClick={() => navigate('/signin')}
          >
            Back to Sign In
          </BackButton>

          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              Forgot Password?
            </Typography>
            <Typography variant="body1" color="text.secondary">
              No worries! Enter your email address and we'll send you a link to reset your password.
            </Typography>
          </Box>

          {alert.show && (
            <Alert 
              severity={alert.type} 
              sx={{ mb: 2 }}
              onClose={() => setAlert({ ...alert, show: false })}
            >
              {alert.message}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email Address"
              name="email"
              type="email"
              value={email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email || 'Enter the email address associated with your account'}
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email color={errors.email ? 'error' : 'action'} />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 3 }}
            />

            <SubmitButton
              type="submit"
              fullWidth
              size="large"
              disabled={loading}
            >
              {loading ? (
                <>
                  <CircularProgress size={20} sx={{ mr: 1 }} />
                  Sending Reset Link...
                </>
              ) : (
                'Send Reset Link'
              )}
            </SubmitButton>
          </form>

          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <Typography variant="body2" color="text.secondary">
              Remember your password?{' '}
              <Link
                component="button"
                variant="body2"
                onClick={() => navigate('/signin')}
                sx={{ 
                  textDecoration: 'none',
                  color: 'primary.main',
                  fontWeight: 600,
                  '&:hover': {
                    textDecoration: 'underline',
                  }
                }}
              >
                Sign In
              </Link>
            </Typography>
          </Box>
        </motion.div>
      </StyledPaper>
    </Container>
  );
};

export default ForgotPasswordPage;