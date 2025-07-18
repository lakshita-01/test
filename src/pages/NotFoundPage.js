/**
 * 404 Not Found Page Component
 * 
 * Optimized 404 error page for the Bluestock IPO platform.
 * Features lightweight CSS animations, responsive design, and fast loading.
 * 
 * Features:
 * - Pure CSS animations (no external libraries)
 * - Responsive design with Material-UI
 * - Consistent with app theme
 * - Fast loading and minimal bundle size
 * - Accessible design
 * - SEO optimized
 */

import React, { useEffect, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Container,
  Paper,
  Stack,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import { Home, ArrowBack, Search } from '@mui/icons-material';
import AnimatedIcon from '../components/Common/AnimatedIcon';
import { shouldUseReducedAnimations } from '../utils/performance';

// Animation keyframes
const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  25% { transform: translateY(-10px) rotate(1deg); }
  50% { transform: translateY(-5px) rotate(-1deg); }
  75% { transform: translateY(-15px) rotate(1deg); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
`;

const slideIn = keyframes`
  from { 
    opacity: 0; 
    transform: translateY(30px); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0); 
  }
`;

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-10px); }
  60% { transform: translateY(-5px); }
`;

// Styled components
const AnimatedContainer = styled(Container)(({ theme }) => ({
  minHeight: '70vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  padding: theme.spacing(4),
  animation: `${slideIn} 0.8s ease-out`,
}));

const ErrorNumber = styled(Typography)(({ theme }) => ({
  fontSize: '8rem',
  fontWeight: 900,
  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  textShadow: '0 4px 8px rgba(25, 118, 210, 0.3)',
  animation: `${float} 3s ease-in-out infinite`,
  lineHeight: 1,
  
  [theme.breakpoints.down('md')]: {
    fontSize: '6rem',
  },
  
  [theme.breakpoints.down('sm')]: {
    fontSize: '4rem',
  },
}));

const AnimatedPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.spacing(3),
  background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
  border: `1px solid ${theme.palette.divider}`,
  position: 'relative',
  overflow: 'hidden',
  
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: `linear-gradient(90deg, transparent, ${theme.palette.primary.main}20, transparent)`,
    animation: `${pulse} 2s ease-in-out infinite`,
  },
}));

const IconContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  display: 'flex',
  justifyContent: 'center',
}));

const ActionButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
  padding: theme.spacing(1.5, 3),
  borderRadius: theme.spacing(3),
  fontWeight: 600,
  textTransform: 'none',
  transition: 'all 0.3s ease',
  
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 16px rgba(25, 118, 210, 0.3)',
  },
}));

/**
 * NotFoundPage Component
 * 
 * Displays a user-friendly 404 error page with navigation options
 * and maintains consistency with the app's design system.
 */
const NotFoundPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const useReducedAnimations = shouldUseReducedAnimations();

  // Set page title for SEO and performance tracking
  useEffect(() => {
    document.title = '404 - Page Not Found | Bluestock';
    
    // Add meta description for SEO
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Page not found. Return to Bluestock IPO platform to explore investment opportunities.');
    }
    
    // Optional: Track 404 errors for analytics
    // analytics.track('404_page_viewed', { path: window.location.pathname });
    
    return () => {
      document.title = 'Bluestock - IPO Platform';
      if (metaDescription) {
        metaDescription.setAttribute('content', 'Bluestock - Your trusted IPO investment platform');
      }
    };
  }, []);

  const handleGoHome = () => {
    navigate('/', { replace: true });
  };

  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/', { replace: true });
    }
  };

  const handleSearchIPOs = () => {
    navigate('/', { replace: true });
  };

  return (
    <AnimatedContainer maxWidth="md">
      <AnimatedPaper elevation={0}>
        <Stack spacing={4} alignItems="center">
          {/* Animated Stock Chart Icon */}
          <IconContainer>
            <AnimatedIcon 
              type="stockChart" 
              animation={useReducedAnimations ? "pulse" : "float"} 
              duration={useReducedAnimations ? "1s" : "3s"}
              size="4rem"
            />
          </IconContainer>
          
          {/* 404 Number */}
          <ErrorNumber variant="h1" component="h1">
            404
          </ErrorNumber>
          
          {/* Error Message */}
          <Stack spacing={2} alignItems="center">
            <Typography 
              variant={isMobile ? "h5" : "h4"} 
              component="h2" 
              color="text.primary"
              fontWeight={700}
            >
              Oops! Page Not Found
            </Typography>
            
            <Typography 
              variant="body1" 
              color="text.secondary"
              maxWidth="500px"
              lineHeight={1.6}
            >
              The page you're looking for seems to have moved or doesn't exist. 
              Don't worry, let's get you back to exploring IPO opportunities!
            </Typography>
            
            <Typography 
              variant="body2" 
              color="text.disabled"
              sx={{ fontFamily: 'monospace' }}
            >
              Error Code: 404
            </Typography>
          </Stack>
          
          {/* Action Buttons */}
          <Stack 
            direction={isMobile ? "column" : "row"} 
            spacing={2} 
            sx={{ mt: 4 }}
          >
            <ActionButton
              variant="contained"
              size="large"
              startIcon={<Home />}
              onClick={handleGoHome}
              sx={{
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                '&:hover': {
                  background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
                },
              }}
            >
              Go to Homepage
            </ActionButton>
            
            <ActionButton
              variant="outlined"
              size="large"
              startIcon={<ArrowBack />}
              onClick={handleGoBack}
              sx={{
                borderColor: theme.palette.primary.main,
                color: theme.palette.primary.main,
                '&:hover': {
                  borderColor: theme.palette.primary.dark,
                  backgroundColor: `${theme.palette.primary.main}08`,
                },
              }}
            >
              Go Back
            </ActionButton>
            
            <ActionButton
              variant="text"
              size="large"
              startIcon={<Search />}
              onClick={handleSearchIPOs}
              sx={{
                color: theme.palette.text.secondary,
                '&:hover': {
                  backgroundColor: `${theme.palette.primary.main}08`,
                  color: theme.palette.primary.main,
                },
              }}
            >
              Browse IPOs
            </ActionButton>
          </Stack>
          
          {/* Additional Help Text */}
          <Box sx={{ mt: 4, p: 2, backgroundColor: theme.palette.background.default, borderRadius: 2 }}>
            <Typography variant="body2" color="text.secondary">
              💡 <strong>Quick Links:</strong> Check out our latest IPO listings, 
              market analysis, or contact our support team if you need assistance.
            </Typography>
          </Box>
        </Stack>
      </AnimatedPaper>
    </AnimatedContainer>
  );
};

// Memoize component to prevent unnecessary re-renders
export default memo(NotFoundPage);