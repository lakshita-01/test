/**
 * Header Component
 * 
 * Main navigation header for the Bluestock application.
 * Provides responsive navigation, user authentication status, and branding.
 * 
 * Features:
 * - Responsive design with mobile-first approach
 * - User authentication state management
 * - Professional navigation with active states
 * - Accessible menu interactions
 * - Optimized performance with memoization
 */

import React, { memo, useCallback, useState, useEffect } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Button, 
  Box,
  useTheme,
  useMediaQuery,
  Container,
  Avatar,
  Menu,
  MenuItem,
  Typography,
  Divider,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  AdminPanelSettings, 
  TrendingUp, 
  Group, 
  Inventory, 
  AccountBalance, 
  FiberNew, 
  Login, 
  PersonAdd, 
  Logout, 
  AccountCircle,
  Menu as MenuIcon,
  Close as CloseIcon,
  Category as CategoryIcon,
  Apps as AppsIcon,
  DarkMode,
  LightMode
} from '@mui/icons-material';
import pfizerLogo from '../../Pfizer.png';
import { useApp } from '../../context/AppContext';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: '#ffffff',
  color: theme.palette.text.primary,
  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
}));

const Logo = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    transform: 'scale(1.02)'
  }
}));

const LogoImage = styled('img')(({ theme }) => ({
  height: 40,
  width: 'auto',
  marginRight: theme.spacing(1),
  loading: 'lazy',
  decoding: 'async',
}));

const NavButton = styled(Button)(({ theme, active }) => ({
  color: active ? theme.palette.primary.main : theme.palette.text.secondary,
  textTransform: 'none',
  fontWeight: active ? 600 : 500,
  borderRadius: 8,
  padding: theme.spacing(1, 2),
  position: 'relative',
  '&:hover': {
    backgroundColor: theme.palette.primary.main + '08',
    color: theme.palette.primary.main,
  },
  '&::after': active ? {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '60%',
    height: 2,
    backgroundColor: theme.palette.primary.main,
    borderRadius: 1,
  } : {}
}));

const NewBadge = styled(Box)(({ theme }) => ({
  backgroundColor: '#ff4444',
  color: 'white',
  fontSize: '0.6rem',
  fontWeight: 'bold',
  padding: '2px 6px',
  borderRadius: '10px',
  marginLeft: theme.spacing(0.5),
  textTransform: 'uppercase',
  lineHeight: 1,
}));

const AuthButton = styled(Button)(({ theme, variant }) => ({
  textTransform: 'none',
  fontWeight: 500,
  borderRadius: 8,
  padding: theme.spacing(1, 2),
  marginLeft: theme.spacing(0.5),
  transition: 'all 0.2s ease-in-out',
  ...(variant === 'outlined' && {
    borderColor: theme.palette.primary.main,
    color: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.main + '08',
      transform: 'translateY(-1px)',
      boxShadow: '0 2px 8px rgba(37, 99, 235, 0.2)',
    },
  }),
  ...(variant === 'contained' && {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    boxShadow: '0 2px 4px rgba(37, 99, 235, 0.2)',
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)',
    },
  }),
}));

const MobileCategoriesButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: 'white',
  borderRadius: 12,
  padding: theme.spacing(1, 2),
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
    transform: 'translateY(-1px)',
    boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)',
  },
  '& .MuiTypography-root': {
    fontWeight: 600,
    fontSize: '0.875rem',
  }
}));

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.between('md', 'lg'));
  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { state, actions } = useApp();
  const { darkMode } = state;

  useEffect(() => {
    // Check for logged in user
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const isActive = (path) => location.pathname === path;

  const handleLogoClick = useCallback(() => {
    navigate('/');
  }, [navigate]);

  const handleNavigation = useCallback((path) => {
    navigate(path);
  }, [navigate]);

  const handleUserMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setAnchorEl(null);
    setMobileMenuOpen(false);
    navigate('/');
  };

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleMobileNavigation = (path) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  const navigationItems = [
    { path: '/', label: 'IPO', icon: TrendingUp },
    { path: '/community', label: 'Community', icon: Group },
    { path: '/products', label: 'Products', icon: Inventory },
    { path: '/brokers', label: 'Brokers', icon: AccountBalance },
    { path: '/live-news', label: 'Live News', icon: FiberNew, badge: 'NEW' },
    { path: '/admin', label: 'Admin', icon: AdminPanelSettings },
  ];

  const getItemDescription = (path) => {
    const descriptions = {
      '/': 'Browse and invest in IPOs',
      '/community': 'Connect with investors',
      '/products': 'Investment products',
      '/brokers': 'Compare brokers',
      '/live-news': 'Latest market news',
      '/admin': 'Admin dashboard'
    };
    return descriptions[path] || '';
  };

  return (
    <>
      <StyledAppBar position="sticky" elevation={0}>
        <Container maxWidth="xl">
          <Toolbar sx={{ px: { xs: 0, sm: 0 }, justifyContent: 'space-between' }}>
            {/* Logo Section */}
            <Logo onClick={handleLogoClick}>
              <LogoImage 
                src={pfizerLogo} 
                alt="Pfizer Logo" 
                loading="lazy"
                decoding="async"
              />
            </Logo>

            {/* Desktop Navigation */}
            {!isMobile && (
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: isTablet ? 0.5 : 1, 
                justifyContent: 'center',
                flex: 1,
                mx: 2
              }}>
                {navigationItems.map((item) => (
                  <NavButton
                    key={item.path}
                    active={item.path === '/admin' ? location.pathname.startsWith('/admin') : isActive(item.path)}
                    onClick={() => handleNavigation(item.path)}
                    startIcon={<item.icon sx={{ fontSize: 16 }} />}
                    size={isTablet ? 'small' : 'medium'}
                    sx={{ position: item.badge ? 'relative' : 'inherit' }}
                  >
                    {item.label}
                    {item.badge && <NewBadge>{item.badge}</NewBadge>}
                  </NavButton>
                ))}
              </Box>
            )}

            {/* Mobile Navigation - Show Categories Icon */}
            {isMobile && (
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1,
                flex: 1,
                mx: 1,
                justifyContent: 'center'
              }}>
                <MobileCategoriesButton
                  onClick={handleMobileMenuToggle}
                  aria-label="Open categories menu"
                >
                  <AppsIcon sx={{ mr: 0.5, fontSize: 18 }} />
                  <Typography variant="body2">
                    Categories
                  </Typography>
                </MobileCategoriesButton>
              </Box>
            )}

            {/* Right Side - Auth Section */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {/* Dark Mode Toggle */}
              <IconButton
                onClick={actions.toggleDarkMode}
                sx={{ 
                  color: 'text.primary',
                  '&:hover': {
                    backgroundColor: 'primary.main',
                    color: 'white',
                  },
                  transition: 'all 0.2s ease-in-out'
                }}
                aria-label="Toggle dark mode"
              >
                {darkMode ? <LightMode /> : <DarkMode />}
              </IconButton>
              
              {/* Authentication Section */}
              {user ? (
                <>
                  <Button
                    onClick={handleUserMenuOpen}
                    sx={{ 
                      textTransform: 'none',
                      color: 'text.primary',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      minWidth: 'auto',
                      p: 1
                    }}
                  >
                    <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
                      {user.name.charAt(0).toUpperCase()}
                    </Avatar>
                    {!isMobile && (
                      <Typography variant="body2">
                        {user.name.split(' ')[0]}
                      </Typography>
                    )}
                  </Button>
                  
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleUserMenuClose}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                  >
                    <MenuItem disabled>
                      <Box>
                        <Typography variant="subtitle2">{user.name}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {user.email}
                        </Typography>
                      </Box>
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={handleUserMenuClose}>
                      <AccountCircle sx={{ mr: 1 }} />
                      Profile
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                      <Logout sx={{ mr: 1 }} />
                      Logout
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <>
                  {!isMobile ? (
                    <>
                      <AuthButton
                        variant="outlined"
                        onClick={() => handleNavigation('/signin')}
                        startIcon={<Login sx={{ fontSize: 16 }} />}
                        size={isTablet ? 'small' : 'medium'}
                      >
                        Sign In
                      </AuthButton>
                      
                      <AuthButton
                        variant="contained"
                        onClick={() => handleNavigation('/signup')}
                        startIcon={<PersonAdd sx={{ fontSize: 16 }} />}
                        size={isTablet ? 'small' : 'medium'}
                      >
                        Sign Up
                      </AuthButton>
                    </>
                  ) : (
                    <Box sx={{ display: 'flex', gap: 0.5 }}>
                      <AuthButton
                        variant="outlined"
                        onClick={() => handleNavigation('/signin')}
                        size="small"
                        sx={{ 
                          minWidth: 'auto', 
                          px: 1.5,
                          py: 0.5,
                          fontSize: '0.75rem',
                          borderWidth: 1.5,
                          fontWeight: 600
                        }}
                      >
                        Sign In
                      </AuthButton>
                      <AuthButton
                        variant="contained"
                        onClick={() => handleNavigation('/signup')}
                        size="small"
                        sx={{ 
                          minWidth: 'auto', 
                          px: 1.5,
                          py: 0.5,
                          fontSize: '0.75rem',
                          fontWeight: 600
                        }}
                      >
                        Sign Up
                      </AuthButton>
                    </Box>
                  )}
                </>
              )}
            </Box>
          </Toolbar>
        </Container>
      </StyledAppBar>

      {/* Mobile Categories Drawer Menu */}
      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={handleMobileMenuToggle}
        sx={{
          '& .MuiDrawer-paper': {
            width: 300,
            bgcolor: 'background.paper',
          },
        }}
      >
        <Box sx={{ 
          p: 2, 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          borderBottom: 1, 
          borderColor: 'divider',
          bgcolor: 'primary.main',
          color: 'white'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <AppsIcon />
            <Typography variant="h6" color="inherit">
              All Categories
            </Typography>
          </Box>
          <IconButton onClick={handleMobileMenuToggle} sx={{ color: 'white' }}>
            <CloseIcon />
          </IconButton>
        </Box>
        
        <List sx={{ pt: 0 }}>
          {/* Main Categories Section */}
          <Box sx={{ p: 2, bgcolor: 'grey.50' }}>
            <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>
              Main Categories
            </Typography>
          </Box>
          
          {navigationItems.map((item) => (
            <ListItem key={item.path} disablePadding>
              <ListItemButton
                onClick={() => handleMobileNavigation(item.path)}
                selected={item.path === '/admin' ? location.pathname.startsWith('/admin') : isActive(item.path)}
                sx={{
                  py: 1.5,
                  '&.Mui-selected': {
                    bgcolor: 'primary.main',
                    color: 'white',
                    '& .MuiListItemIcon-root': {
                      color: 'white',
                    },
                  },
                  '&:hover': {
                    bgcolor: 'primary.light',
                    color: 'white',
                    '& .MuiListItemIcon-root': {
                      color: 'white',
                    },
                  }
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <item.icon />
                </ListItemIcon>
                <ListItemText 
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {item.label}
                      </Typography>
                      {item.badge && (
                        <Box
                          sx={{
                            bgcolor: '#ff4444',
                            color: 'white',
                            fontSize: '0.6rem',
                            fontWeight: 'bold',
                            px: 1,
                            py: 0.25,
                            borderRadius: '10px',
                            textTransform: 'uppercase',
                          }}
                        >
                          {item.badge}
                        </Box>
                      )}
                    </Box>
                  }
                  secondary={getItemDescription(item.path)}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default memo(Header);