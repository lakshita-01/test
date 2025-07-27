/**
 * Stock School Categories Page
 * 
 * Educational platform for financial learning with various categories.
 * Features mobile-responsive design with Material-UI components.
 */

import React from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  Breadcrumbs,
  Link,
  useTheme,
  useMediaQuery,
  TextField,
  InputAdornment,
  Chip,
  Paper,
  Avatar,
  Divider,
  Alert,
  CircularProgress
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import {
  Home,
  School,
  ArrowForward,
  Visibility,
  MenuBook,
  GetApp,
  Phone,
  Star,
  Android,
  Apple as AppleIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { sendAppLink, validatePhoneNumber } from '../services/appLinkService';

// Styled Components
const PageContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  minHeight: '100vh',
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(4),
}));

const CategoryCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.spacing(2),
  overflow: 'hidden',
  '&:hover': {
    transform: 'translateY(-8px) scale(1.02)',
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
    borderColor: theme.palette.primary.main,
  },
}));

const CategoryIcon = styled(Box)(({ theme }) => ({
  fontSize: '2.5rem',
  marginBottom: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 60,
  height: 60,
  borderRadius: theme.spacing(1),
  backgroundColor: theme.palette.primary.light + '20',
}));

const AppBanner = styled(Paper)(({ theme }) => ({
  background: 'linear-gradient(135deg, #4a54f1 0%, #6366f1 100%)',
  color: 'white',
  borderRadius: theme.spacing(2),
  padding: theme.spacing(4),
  marginTop: theme.spacing(6),
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.1)',
    zIndex: 1,
  },
  '& > *': {
    position: 'relative',
    zIndex: 2,
  },
}));

const AppImage = styled('img')(({ theme }) => ({
  width: 100,
  height: 200,
  borderRadius: theme.spacing(2),
  objectFit: 'cover',
  border: `3px solid ${theme.palette.common.white}`,
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
  [theme.breakpoints.down('md')]: {
    width: 80,
    height: 160,
  },
}));

const StoreButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.2)',
  color: 'white',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  borderRadius: theme.spacing(1),
  padding: theme.spacing(1, 2),
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    transform: 'translateY(-2px)',
  },
}));

// Demo data for categories
const categories = [
  {
    title: "Basic Finance",
    desc: "Learn to manage money, choose investments wisely, and achieve financial goals.",
    modules: 4,
    views: "504,631",
    icon: "💰",
    color: "#4CAF50",
  },
  {
    title: "Beginners Stock Markets",
    desc: "Learn stock market terminologies, macroeconomic indicators, IPOs and more.",
    modules: 6,
    views: "372,226",
    icon: "👨‍💼",
    color: "#2196F3",
  },
  {
    title: "Stock Investing",
    desc: "Explore stock investment basics, analysis, modelling and strategies.",
    modules: 10,
    views: "300,058",
    icon: "📈",
    color: "#FF9800",
  },
  {
    title: "Technical Analysis",
    desc: "Explore basic to advanced topics for effective trading.",
    modules: 13,
    views: "119,363",
    icon: "🔬",
    color: "#9C27B0",
  },
  {
    title: "Derivatives",
    desc: "Familiarize with the principles and strategies of derivatives trading.",
    modules: 4,
    views: "325,715",
    icon: "🔄",
    color: "#F44336",
  },
  {
    title: "Mutual Funds",
    desc: "Learn mutual fund concepts for effective financial planning.",
    modules: 2,
    views: "7,591",
    icon: "🐷",
    color: "#795548",
  },
  {
    title: "Banking & Insurance",
    desc: "Basics of banking and insurance for sound financial management.",
    modules: 8,
    views: "207,612",
    icon: "🏦",
    color: "#607D8B",
  },
  {
    title: "Financial Planning",
    desc: "Thorough planning strategies and services.",
    modules: 8,
    views: "159,883",
    icon: "🗂️",
    color: "#3F51B5",
  },
  {
    title: "Cryptocurrency",
    desc: "Gain insights into the world of cryptocurrencies and blockchain.",
    modules: 2,
    views: "21,728",
    icon: "🪙",
    color: "#FF5722",
  },
  {
    title: "Alternative Investments",
    desc: "Learn about gold, real estate, commodities, and more.",
    modules: 6,
    views: "7,113",
    icon: "🌐",
    color: "#009688",
  },
  {
    title: "Book Summary",
    desc: "Summaries of popular finance books.",
    modules: 37,
    views: "74,058",
    icon: "📚",
    color: "#E91E63",
  },
];

const StockSchoolPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [alert, setAlert] = React.useState({ show: false, type: 'success', message: '' });

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
          message: result.message
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

  const handleCategoryClick = (category) => {
    // Navigate to category details page
    console.log(`Navigating to ${category.title}`);
  };

  return (
    <PageContainer>
      <Container maxWidth="lg">
        {/* Breadcrumbs */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Breadcrumbs 
            sx={{ mb: 3, color: 'text.secondary' }}
            separator="›"
          >
            <Link 
              color="inherit" 
              href="/" 
              sx={{ 
                display: 'flex', 
                alignItems: 'center',
                textDecoration: 'none',
                '&:hover': { color: 'primary.main' }
              }}
            >
              <Home sx={{ mr: 0.5, fontSize: 16 }} />
              Home
            </Link>
            <Typography color="primary" sx={{ display: 'flex', alignItems: 'center' }}>
              <School sx={{ mr: 0.5, fontSize: 16 }} />
              Stock School
            </Typography>
          </Breadcrumbs>
        </motion.div>

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography 
              variant="h2" 
              component="h1" 
              gutterBottom
              sx={{ 
                fontWeight: 700,
                fontSize: { xs: '2rem', md: '2.5rem' },
                color: 'text.primary',
                mb: 2
              }}
            >
              Stock School Categories
            </Typography>
            <Typography 
              variant="h6" 
              color="text.secondary"
              sx={{ 
                fontSize: { xs: '1rem', md: '1.1rem' },
                maxWidth: 600,
                mx: 'auto',
                lineHeight: 1.6
              }}
            >
              Begin your financial education journey by exploring a variety of categories.
            </Typography>
          </Box>
        </motion.div>

        {/* Categories Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Grid container spacing={3} sx={{ mb: 6 }}>
            {categories.map((category, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <CategoryCard>
                    <CardContent sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <CategoryIcon>
                          <Typography sx={{ fontSize: '2rem' }}>
                            {category.icon}
                          </Typography>
                        </CategoryIcon>
                      </Box>
                      
                      <Typography 
                        variant="h6" 
                        component="h3" 
                        gutterBottom
                        sx={{ 
                          fontWeight: 600,
                          color: 'text.primary',
                          mb: 1
                        }}
                      >
                        {category.title}
                      </Typography>
                      
                      <Typography 
                        variant="body2" 
                        color="text.secondary" 
                        sx={{ 
                          mb: 3, 
                          lineHeight: 1.6,
                          flexGrow: 1,
                          minHeight: 48
                        }}
                      >
                        {category.desc}
                      </Typography>

                      <Box sx={{ display: 'flex', gap: 1, mb: 3, flexWrap: 'wrap' }}>
                        <Chip
                          icon={<MenuBook />}
                          label={`${category.modules} Modules`}
                          size="small"
                          variant="outlined"
                          sx={{ fontSize: '0.75rem' }}
                        />
                        <Chip
                          icon={<Visibility />}
                          label={`${category.views} views`}
                          size="small"
                          variant="outlined"
                          sx={{ fontSize: '0.75rem' }}
                        />
                      </Box>

                      <Button
                        variant="contained"
                        onClick={() => handleCategoryClick(category)}
                        endIcon={<ArrowForward />}
                        sx={{
                          backgroundColor: category.color,
                          color: 'white',
                          '&:hover': {
                            backgroundColor: category.color,
                            filter: 'brightness(0.9)',
                            transform: 'translateY(-2px)',
                          },
                          borderRadius: 2,
                          fontWeight: 600,
                          mt: 'auto'
                        }}
                      >
                        View Details
                      </Button>
                    </CardContent>
                  </CategoryCard>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>

        {/* App Download Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <AppBanner elevation={0}>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
                <AppImage
                  src="/icons/bluestock-app.png"
                  alt="Bluestock App Screenshot"
                />
                <Box sx={{ mt: 2 }}>
                  <Chip
                    icon={<Star />}
                    label="4.4K+ Downloads"
                    sx={{
                      backgroundColor: '#FFE082',
                      color: '#333',
                      fontWeight: 600,
                      fontSize: '0.9rem'
                    }}
                  />
                </Box>
              </Grid>
              
              <Grid item xs={12} md={8}>
                <Typography 
                  variant="h4" 
                  component="h2" 
                  gutterBottom
                  sx={{ 
                    fontWeight: 700,
                    fontSize: { xs: '1.5rem', md: '2rem' },
                    mb: 2
                  }}
                >
                  Enjoy Free Learning & Analytics Club
                </Typography>
                
                <Typography 
                  variant="h6" 
                  sx={{ 
                    opacity: 0.9,
                    mb: 4,
                    fontSize: { xs: '1rem', md: '1.1rem' }
                  }}
                >
                  Get the link to download the App
                </Typography>

                {/* Alert Message */}
                {alert.show && (
                  <Alert 
                    severity={alert.type} 
                    sx={{ mb: 2, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
                    onClose={() => setAlert({ show: false, type: 'success', message: '' })}
                  >
                    {alert.message}
                  </Alert>
                )}

                <Box 
                  component="form" 
                  onSubmit={handleSendAppLink}
                  sx={{ 
                    display: 'flex', 
                    gap: 2, 
                    mb: 3,
                    flexDirection: { xs: 'column', sm: 'row' }
                  }}
                >
                  <TextField
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Enter your 10-digit mobile number"
                    variant="outlined"
                    size="medium"
                    type="tel"
                    inputProps={{
                      maxLength: 10,
                      pattern: '[0-9]{10}'
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Phone sx={{ color: 'rgba(0, 0, 0, 0.6)' }} />
                        </InputAdornment>
                      ),
                      sx: {
                        backgroundColor: 'white',
                        borderRadius: 2,
                      }
                    }}
                    sx={{ 
                      flexGrow: 1,
                      minWidth: { xs: '100%', sm: 200 }
                    }}
                    disabled={loading}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={loading || !phoneNumber.trim()}
                    sx={{
                      backgroundColor: 'white',
                      color: theme.palette.primary.main,
                      fontWeight: 600,
                      borderRadius: 2,
                      px: 3,
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        transform: 'translateY(-2px)',
                      },
                      '&:disabled': {
                        backgroundColor: 'rgba(255, 255, 255, 0.7)',
                        color: 'rgba(0, 0, 0, 0.4)',
                      },
                      minWidth: { xs: '100%', sm: 'auto' }
                    }}
                  >
                    {loading ? (
                      <>
                        <CircularProgress size={20} sx={{ mr: 1, color: 'inherit' }} />
                        Sending...
                      </>
                    ) : (
                      'Send App Link'
                    )}
                  </Button>
                </Box>

                <Box sx={{ display: 'flex', gap: 2, justifyContent: { xs: 'center', md: 'flex-start' } }}>
                  <StoreButton
                    startIcon={<Android />}
                    onClick={() => window.open('https://play.google.com/store/apps/details?id=in.bluestock.app', '_blank')}
                  >
                    Google Play
                  </StoreButton>
                  <StoreButton
                    startIcon={<AppleIcon />}
                    onClick={() => window.open('https://apps.apple.com', '_blank')}
                  >
                    App Store
                  </StoreButton>
                </Box>
              </Grid>
            </Grid>
          </AppBanner>
        </motion.div>
      </Container>
    </PageContainer>
  );
};

export default StockSchoolPage;