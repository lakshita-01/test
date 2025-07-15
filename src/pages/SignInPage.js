// src/pages/SignInPage.js
import React, { useState } from 'react';
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
  Link
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { 
  Email, 
  Lock, 
  Visibility, 
  VisibilityOff, 
  Google as GoogleIcon 
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  maxWidth: 400,
  margin: '0 auto',
  marginTop: theme.spacing(8),
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

const SignInPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: '', type: 'info' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
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
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock authentication logic
      if (formData.email === 'admin@pfizer.com' && formData.password === 'admin123') {
        setAlert({
          show: true,
          message: 'Sign in successful! Redirecting...',
          type: 'success'
        });
        
        // Store user data in localStorage (in real app, use proper auth state management)
        localStorage.setItem('user', JSON.stringify({
          email: formData.email,
          name: 'Admin User',
          authMethod: 'email'
        }));
        
        setTimeout(() => {
          navigate('/');
        }, 1500);
      } else {
        setAlert({
          show: true,
          message: 'Invalid email or password. Try admin@pfizer.com / admin123',
          type: 'error'
        });
      }
    } catch (error) {
      setAlert({
        show: true,
        message: 'An error occurred. Please try again.',
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    
    try {
      // Simulate Google OAuth
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setAlert({
        show: true,
        message: 'Google sign in successful! Redirecting...',
        type: 'success'
      });
      
      // Store user data
      localStorage.setItem('user', JSON.stringify({
        email: 'user@gmail.com',
        name: 'Google User',
        authMethod: 'google'
      }));
      
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (error) {
      setAlert({
        show: true,
        message: 'Google sign in failed. Please try again.',
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <StyledPaper>
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Sign In
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Welcome back to BlueStock IPO Platform
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

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={loading}
            sx={{ mt: 3, mb: 2, py: 1.5 }}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </Button>
        </form>

        <Divider sx={{ my: 2 }}>
          <Typography variant="body2" color="text.secondary">
            OR
          </Typography>
        </Divider>

        <GoogleButton
          fullWidth
          onClick={handleGoogleSignIn}
          disabled={loading}
          startIcon={<GoogleIcon />}
        >
          {loading ? 'Signing In...' : 'Continue with Google'}
        </GoogleButton>

        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Typography variant="body2">
            Don't have an account?{' '}
            <Link
              component="button"
              variant="body2"
              onClick={() => navigate('/signup')}
              sx={{ textDecoration: 'none' }}
            >
              Sign Up
            </Link>
          </Typography>
        </Box>
      </StyledPaper>
    </Container>
  );
};

export default SignInPage;