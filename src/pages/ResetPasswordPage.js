// src/pages/ResetPasswordPage.js
import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  InputAdornment,
  IconButton,
  CircularProgress,
  LinearProgress
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { 
  Lock, 
  Visibility, 
  VisibilityOff,
  CheckCircle,
  Error as ErrorIcon
} from '@mui/icons-material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { validateResetToken, resetPasswordWithToken } from '../utils/emailService';

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

const PasswordStrengthIndicator = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(2),
}));

const SuccessContainer = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(3),
}));

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const email = searchParams.get('email');

  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: '', type: 'info' });
  const [passwordReset, setPasswordReset] = useState(false);
  const [tokenValid, setTokenValid] = useState(null);
  const [passwordStrength, setPasswordStrength] = useState(0);

  // Validate token on component mount
  useEffect(() => {
    const validateToken = async () => {
      if (!token || !email) {
        setTokenValid(false);
        setAlert({
          show: true,
          message: 'Invalid or missing reset token. Please request a new password reset.',
          type: 'error'
        });
        return;
      }

      try {
        // Validate token using email service
        await validateResetToken(email, token);
        setTokenValid(true);
      } catch (error) {
        setTokenValid(false);
        let errorMessage = 'This reset link is invalid or has expired.';
        
        if (error.message.includes('expired')) {
          errorMessage = 'This reset link has expired. Please request a new password reset.';
        } else if (error.message.includes('used')) {
          errorMessage = 'This reset link has already been used. Please request a new password reset.';
        } else if (error.message.includes('not found')) {
          errorMessage = 'Invalid reset link. Please request a new password reset.';
        }
        
        setAlert({
          show: true,
          message: errorMessage,
          type: 'error'
        });
      }
    };

    validateToken();
  }, [token, email]);

  // Calculate password strength
  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[a-z]/.test(password)) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 12.5;
    if (/[^A-Za-z0-9]/.test(password)) strength += 12.5;
    return Math.min(strength, 100);
  };

  const getPasswordStrengthColor = (strength) => {
    if (strength < 25) return 'error';
    if (strength < 50) return 'warning';
    if (strength < 75) return 'info';
    return 'success';
  };

  const getPasswordStrengthText = (strength) => {
    if (strength < 25) return 'Weak';
    if (strength < 50) return 'Fair';
    if (strength < 75) return 'Good';
    return 'Strong';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Calculate password strength for password field
    if (name === 'password') {
      setPasswordStrength(calculatePasswordStrength(value));
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      // Reset password using email service
      const result = await resetPasswordWithToken(email, token, formData.password);
      
      if (result.success) {
        setPasswordReset(true);
        setAlert({
          show: true,
          message: 'Password reset successful!',
          type: 'success'
        });
      } else {
        throw new Error(result.message || 'Failed to reset password');
      }
      
    } catch (error) {
      let errorMessage = 'Failed to reset password. Please try again.';
      
      if (error.message.includes('expired')) {
        errorMessage = 'This reset link has expired. Please request a new password reset.';
      } else if (error.message.includes('used')) {
        errorMessage = 'This reset link has already been used. Please request a new password reset.';
      } else if (error.message.includes('Invalid')) {
        errorMessage = 'Invalid reset link. Please request a new password reset.';
      }
      
      setAlert({
        show: true,
        message: errorMessage,
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  // Show loading while validating token
  if (tokenValid === null) {
    return (
      <Container maxWidth="sm" sx={{ py: 4 }}>
        <StyledPaper>
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <CircularProgress size={40} />
            <Typography variant="body1" sx={{ mt: 2 }}>
              Validating reset link...
            </Typography>
          </Box>
        </StyledPaper>
      </Container>
    );
  }

  // Show error if token is invalid
  if (tokenValid === false) {
    return (
      <Container maxWidth="sm" sx={{ py: 4 }}>
        <StyledPaper>
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <ErrorIcon sx={{ fontSize: 64, color: 'error.main', mb: 2 }} />
            <Typography variant="h5" gutterBottom>
              Invalid Reset Link
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              This password reset link is invalid or has expired.
            </Typography>
            <Button
              variant="contained"
              onClick={() => navigate('/forgot-password')}
            >
              Request New Reset Link
            </Button>
          </Box>
        </StyledPaper>
      </Container>
    );
  }

  // Show success message after password reset
  if (passwordReset) {
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
                Password Reset Successful!
              </Typography>
              
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                Your password has been successfully reset. You can now sign in with your new password.
              </Typography>
              
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate('/signin')}
                sx={{ px: 4 }}
              >
                Sign In Now
              </Button>
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
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              Reset Your Password
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Enter your new password below
            </Typography>
            {email && (
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                for {email}
              </Typography>
            )}
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
              label="New Password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock color={errors.password ? 'error' : 'action'} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {formData.password && (
              <PasswordStrengthIndicator>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Typography variant="caption" sx={{ mr: 1 }}>
                    Password strength:
                  </Typography>
                  <Typography 
                    variant="caption" 
                    color={`${getPasswordStrengthColor(passwordStrength)}.main`}
                    fontWeight="600"
                  >
                    {getPasswordStrengthText(passwordStrength)}
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={passwordStrength}
                  color={getPasswordStrengthColor(passwordStrength)}
                  sx={{ height: 6, borderRadius: 3 }}
                />
              </PasswordStrengthIndicator>
            )}

            <TextField
              fullWidth
              label="Confirm New Password"
              name="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              value={formData.confirmPassword}
              onChange={handleChange}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock color={errors.confirmPassword ? 'error' : 'action'} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
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
                  Resetting Password...
                </>
              ) : (
                'Reset Password'
              )}
            </SubmitButton>
          </form>

          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <Typography variant="body2" color="text.secondary">
              Remember your password?{' '}
              <Button
                variant="text"
                onClick={() => navigate('/signin')}
                sx={{ 
                  textTransform: 'none',
                  p: 0,
                  minWidth: 'auto',
                  color: 'primary.main',
                  fontWeight: 600,
                  '&:hover': {
                    backgroundColor: 'transparent',
                    textDecoration: 'underline',
                  }
                }}
              >
                Sign In
              </Button>
            </Typography>
          </Box>
        </motion.div>
      </StyledPaper>
    </Container>
  );
};

export default ResetPasswordPage;