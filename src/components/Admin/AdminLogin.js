// src/components/Admin/AdminLogin.js
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
  IconButton,
  useTheme
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Visibility,
  VisibilityOff,
  AdminPanelSettings,
  Login as LoginIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import LoadingSpinner from '../Common/LoadingSpinner';

const LoginContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  padding: theme.spacing(2),
  background: `linear-gradient(135deg, ${theme.palette.primary.main}08 0%, ${theme.palette.primary.light}05 100%)`,
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%231976d2" fill-opacity="0.03"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
    zIndex: 0,
  }
}));

const LoginPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(5),
  maxWidth: '450px',
  width: '100%',
  borderRadius: 20,
  boxShadow: '0 20px 60px rgba(0,0,0,0.12)',
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  position: 'relative',
  zIndex: 1,
}));

const LoginHeader = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: theme.spacing(4),
}));

const AdminIcon = styled(Box)(({ theme }) => ({
  width: 80,
  height: 80,
  borderRadius: '50%',
  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto',
  marginBottom: theme.spacing(2),
  boxShadow: '0 8px 24px rgba(25, 118, 210, 0.3)',
  '& svg': {
    color: 'white',
    fontSize: 40,
  }
}));

const LoginForm = styled('form')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

const AdminLogin = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { state, actions } = useApp();
  const { loading, error } = state;

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const handleInputChange = (field) => (event) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
    
    // Clear field error when user starts typing
    if (formErrors[field]) {
      setFormErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.username.trim()) {
      errors.username = 'Username is required';
    }
    
    if (!formData.password.trim()) {
      errors.password = 'Password is required';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      await actions.login(formData);
      navigate('/admin/dashboard');
    } catch (error) {
      // Error is handled by the context
      console.error('Login failed:', error);
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  if (loading) {
    return <LoadingSpinner message="Logging in..." />;
  }

  return (
    <LoginContainer maxWidth="sm">
      <LoginPaper elevation={3}>
        <LoginHeader>
          <AdminIcon>
            <AdminPanelSettings />
          </AdminIcon>
          <Typography 
            variant="h4" 
            component="h1" 
            sx={{ 
              fontWeight: 700, 
              mb: 1,
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Admin Portal
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 500 }}>
            Sign in to access the IPO management dashboard
          </Typography>
        </LoginHeader>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <LoginForm onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Username"
            variant="outlined"
            value={formData.username}
            onChange={handleInputChange('username')}
            error={!!formErrors.username}
            helperText={formErrors.username}
            autoComplete="username"
            autoFocus
          />

          <TextField
            fullWidth
            label="Password"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            value={formData.password}
            onChange={handleInputChange('password')}
            error={!!formErrors.password}
            helperText={formErrors.password}
            autoComplete="current-password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleTogglePasswordVisibility}
                    edge="end"
                    aria-label="toggle password visibility"
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
            startIcon={<LoginIcon />}
            disabled={loading}
            sx={{ 
              mt: 3, 
              py: 1.5,
              fontSize: '1.1rem',
              fontWeight: 600,
              borderRadius: 3,
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
              boxShadow: '0 4px 15px rgba(25, 118, 210, 0.3)',
              '&:hover': {
                background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
                boxShadow: '0 6px 20px rgba(25, 118, 210, 0.4)',
                transform: 'translateY(-1px)',
              },
              '&:disabled': {
                background: theme.palette.grey[400],
                boxShadow: 'none',
              }
            }}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </Button>
        </LoginForm>

        <Box sx={{ 
          mt: 4, 
          p: 3, 
          background: `linear-gradient(135deg, ${theme.palette.primary.main}08, ${theme.palette.primary.light}05)`,
          borderRadius: 2,
          border: '1px solid rgba(25, 118, 210, 0.1)'
        }}>
          <Typography variant="body2" color="primary" sx={{ fontWeight: 600, mb: 1 }}>
            💡 Demo Credentials
          </Typography>
          <Typography variant="body2" sx={{ fontFamily: 'monospace', color: 'text.secondary' }}>
            <strong>Username:</strong> admin<br />
            <strong>Password:</strong> admin123
          </Typography>
        </Box>
      </LoginPaper>
    </LoginContainer>
  );
};

export default AdminLogin;