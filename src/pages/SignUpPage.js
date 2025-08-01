// src/pages/SignUpPage.js
import React, { useState, useRef } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Divider,
  Alert,
  InputAdornment,
  IconButton,
  Link,
  FormControlLabel,
  Checkbox
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { 
  Email, 
  Lock, 
  Person,
  Visibility, 
  VisibilityOff, 
  Google as GoogleIcon,
  Security
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import api from '../utils/api';
import { useApp } from '../context/AppContext';

// reCAPTCHA site key (you'll need to get this from Google reCAPTCHA console)
const RECAPTCHA_SITE_KEY = process.env.REACT_APP_RECAPTCHA_SITE_KEY || '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'; // Test key

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  maxWidth: 450,
  margin: '0 auto',
  marginTop: theme.spacing(4),
  borderRadius: theme.spacing(2),
  boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
}));

const GoogleButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#4285f4',
  color: 'white',
  textTransform: 'none',
  padding: theme.spacing(1.5),
  borderRadius: theme.spacing(1),
  '&:hover': {
    backgroundColor: '#3367d6',
  },
}));

const SignUpPage = () => {
  const navigate = useNavigate();
  const recaptchaRef = useRef(null);
  const { state } = useApp();
  const { darkMode } = state;
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: '', type: 'info' });
  const [recaptchaToken, setRecaptchaToken] = useState(null);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleRecaptchaChange = (token) => {
    setRecaptchaToken(token);
    // Clear recaptcha error when user completes it
    if (errors.recaptcha) {
      setErrors(prev => ({
        ...prev,
        recaptcha: ''
      }));
    }
  };

  const handleRecaptchaExpired = () => {
    setRecaptchaToken(null);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and number';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }

    if (!recaptchaToken) {
      newErrors.recaptcha = 'Please verify that you are not a robot';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      // Prepare registration data
      const registrationData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        recaptchaToken: recaptchaToken,
        agreeToTerms: formData.agreeToTerms
      };

      // Call API for registration with reCAPTCHA verification
      const result = await api.register(registrationData);

      // Handle successful registration
      if (result.data.token) {
        localStorage.setItem('authToken', result.data.token);
      }
      
      localStorage.setItem('user', JSON.stringify({
        email: result.data.user.email,
        name: `${result.data.user.firstName} ${result.data.user.lastName}`,
        authMethod: 'email'
      }));
      
      setAlert({
        show: true,
        message: 'Account created successfully! Redirecting...',
        type: 'success'
      });

      // Reset reCAPTCHA
      if (recaptchaRef.current) {
        recaptchaRef.current.reset();
      }
      setRecaptchaToken(null);
      
      setTimeout(() => {
        navigate('/');
      }, 1500);
      
    } catch (error) {
      console.error('Registration error:', error);
      
      // Reset reCAPTCHA on error
      if (recaptchaRef.current) {
        recaptchaRef.current.reset();
      }
      setRecaptchaToken(null);
      
      setAlert({
        show: true,
        message: error.message || 'An error occurred during registration. Please try again.',
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    // Check if reCAPTCHA is completed
    if (!recaptchaToken) {
      setAlert({
        show: true,
        message: 'Please complete the reCAPTCHA verification first.',
        type: 'warning'
      });
      return;
    }

    setLoading(true);
    
    try {
      // Simulate Google OAuth with reCAPTCHA verification
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const googleUser = {
        id: Date.now(),
        firstName: 'Google',
        lastName: 'User',
        email: 'user@gmail.com',
        authMethod: 'google',
        createdAt: new Date().toISOString()
      };
      
      // Store in registered users
      const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      
      if (!existingUsers.find(user => user.email === googleUser.email)) {
        existingUsers.push(googleUser);
        localStorage.setItem('registeredUsers', JSON.stringify(existingUsers));
      }
      
      // Auto sign in
      localStorage.setItem('user', JSON.stringify({
        email: googleUser.email,
        name: `${googleUser.firstName} ${googleUser.lastName}`,
        authMethod: 'google'
      }));
      
      setAlert({
        show: true,
        message: 'Google sign up successful! Redirecting...',
        type: 'success'
      });
      
      setTimeout(() => {
        navigate('/');
      }, 1500);
      
    } catch (error) {
      setAlert({
        show: true,
        message: 'Google sign up failed. Please try again.',
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${darkMode ? "dark" : ""} min-h-screen transition-all duration-300`}>
      <Container maxWidth="sm" sx={{ py: 4 }}>
        <StyledPaper>
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Sign Up
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Join BlueStock IPO Platform today
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
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              error={!!errors.firstName}
              helperText={errors.firstName}
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              error={!!errors.lastName}
              helperText={errors.lastName}
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <TextField
            fullWidth
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            label="Password"
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
                  <Lock />
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

          <TextField
            fullWidth
            label="Confirm Password"
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
                  <Lock />
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
          />

          <FormControlLabel
            control={
              <Checkbox
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                color="primary"
              />
            }
            label={
              <Typography variant="body2">
                I agree to the{' '}
                <Link href="#" onClick={(e) => e.preventDefault()}>
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="#" onClick={(e) => e.preventDefault()}>
                  Privacy Policy
                </Link>
              </Typography>
            }
            sx={{ mt: 1, alignItems: 'flex-start' }}
          />
          {errors.agreeToTerms && (
            <Typography variant="caption" color="error" sx={{ ml: 4 }}>
              {errors.agreeToTerms}
            </Typography>
          )}

          {/* reCAPTCHA */}
          <Box sx={{ mt: 3, mb: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
           
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={RECAPTCHA_SITE_KEY}
              onChange={handleRecaptchaChange}
              onExpired={handleRecaptchaExpired}
              theme={darkMode ? "dark" : "light"}
              size="normal"
            />
            {errors.recaptcha && (
              <Typography variant="caption" color="error" sx={{ mt: 1, textAlign: 'center' }}>
                {errors.recaptcha}
              </Typography>
            )}
          </Box>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={loading}
            sx={{ mt: 3, mb: 2, py: 1.5 }}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </Button>
        </form>

        <Divider sx={{ my: 2 }}>
          <Typography variant="body2" color="text.secondary">
            OR
          </Typography>
        </Divider>

        <GoogleButton
          fullWidth
          onClick={handleGoogleSignUp}
          disabled={loading}
          startIcon={<GoogleIcon />}
        >
          {loading ? 'Signing Up...' : 'Sign up with Google'}
        </GoogleButton>

        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Typography variant="body2">
            Already have an account?{' '}
            <Link
              component="button"
              variant="body2"
              onClick={() => navigate('/signin')}
              sx={{ textDecoration: 'none' }}
            >
              Sign In
            </Link>
          </Typography>
        </Box>
      </StyledPaper>
    </Container>
    </div>
  );
};

export default SignUpPage;