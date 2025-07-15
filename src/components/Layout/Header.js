// src/components/Layout/Header.js
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
  Divider
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate, useLocation } from 'react-router-dom';
import { AdminPanelSettings, TrendingUp, Group, Inventory, AccountBalance, FiberNew, Login, PersonAdd, Logout, AccountCircle } from '@mui/icons-material';
import pfizerLogo from '../../Pfizer.png';

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
  marginLeft: theme.spacing(1),
  ...(variant === 'outlined' && {
    borderColor: theme.palette.primary.main,
    color: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.main + '08',
    },
  }),
  ...(variant === 'contained' && {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  }),
}));

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

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
    navigate('/');
  };

  return (
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

          {/* Centered Navigation */}
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: isMobile ? 0.5 : 1, 
            flexWrap: 'wrap',
            justifyContent: 'center',
            flex: 1,
            mx: 2
          }}>
            <NavButton
              active={isActive('/')}
              onClick={() => handleNavigation('/')}
              startIcon={!isMobile ? <TrendingUp sx={{ fontSize: 16 }} /> : null}
              size={isMobile ? 'small' : 'medium'}
            >
              IPO
            </NavButton>
            
            {!isMobile && (
              <>
                <NavButton
                  active={isActive('/community')}
                  onClick={() => handleNavigation('/community')}
                  startIcon={<Group sx={{ fontSize: 16 }} />}
                >
                  Community
                </NavButton>
                
                <NavButton
                  active={isActive('/products')}
                  onClick={() => handleNavigation('/products')}
                  startIcon={<Inventory sx={{ fontSize: 16 }} />}
                >
                  Products
                </NavButton>
                
                <NavButton
                  active={isActive('/brokers')}
                  onClick={() => handleNavigation('/brokers')}
                  startIcon={<AccountBalance sx={{ fontSize: 16 }} />}
                >
                  Brokers
                </NavButton>
              </>
            )}
            
            <NavButton
              active={isActive('/live-news')}
              onClick={() => handleNavigation('/live-news')}
              startIcon={!isMobile ? <FiberNew sx={{ fontSize: 16 }} /> : null}
              sx={{ position: 'relative' }}
              size={isMobile ? 'small' : 'medium'}
            >
              {isMobile ? 'News' : 'Live News'}
              <NewBadge>NEW</NewBadge>
            </NavButton>
            
            <NavButton
              active={location.pathname.startsWith('/admin')}
              onClick={() => handleNavigation('/admin')}
              startIcon={!isMobile ? <AdminPanelSettings sx={{ fontSize: 16 }} /> : null}
              size={isMobile ? 'small' : 'medium'}
            >
              Admin
            </NavButton>
          </Box>

          {/* Authentication Section */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {user ? (
              <>
                <Button
                  onClick={handleUserMenuOpen}
                  sx={{ 
                    textTransform: 'none',
                    color: 'text.primary',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
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
                <AuthButton
                  variant="outlined"
                  onClick={() => handleNavigation('/signin')}
                  startIcon={<Login sx={{ fontSize: 16 }} />}
                  size={isMobile ? 'small' : 'medium'}
                >
                  Sign In
                </AuthButton>
                
                <AuthButton
                  variant="contained"
                  onClick={() => handleNavigation('/signup')}
                  startIcon={<PersonAdd sx={{ fontSize: 16 }} />}
                  size={isMobile ? 'small' : 'medium'}
                >
                  Sign Up
                </AuthButton>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </StyledAppBar>
  );
};

export default memo(Header);