// src/pages/ProductsPage.js
import React from 'react';
import { Container, Typography, Box, Paper, Grid, Card, CardContent, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { Analytics, TrendingUp, School, Assessment, Security, Description, Notifications, PhoneAndroid } from '@mui/icons-material';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  borderRadius: theme.spacing(2),
  overflow: 'hidden',
  '&:hover': {
    transform: 'translateY(-8px) scale(1.02)',
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
  },
}));

const ProductsPage = () => {
  const navigate = useNavigate();

  const products = [
    {
      title: 'Stock School',
      description: 'Comprehensive financial education with 11 categories covering everything from basic finance to advanced trading strategies.',
      link: '/stock-school',
      icon: School,
      featured: true,
      color: '#4CAF50',
    },
    {
      title: 'IPO Analytics Dashboard',
      description: 'Comprehensive analytics and insights for IPO performance tracking.',
      link: '/ipo-analytics',
      icon: Analytics,
      featured: false,
      color: '#2196F3',
    },
    {
      title: 'Portfolio Management',
      description: 'Advanced tools to manage and optimize your IPO investments.',
      icon: Assessment,
      color: '#FF9800',
    },
    {
      title: 'Risk Assessment Tools',
      description: 'Evaluate investment risks with our sophisticated risk analysis tools.',
      icon: Security,
      color: '#F44336',
    },
    {
      title: 'Market Research Reports',
      description: 'In-depth research reports on upcoming and recent IPOs.',
      icon: Description,
      color: '#9C27B0',
    },
    {
      title: 'Trading Signals',
      description: 'Real-time trading signals and recommendations for IPO investments.',
      icon: Notifications,
      color: '#FF5722',
    },
    {
      title: 'Mobile Trading App',
      description: 'Trade IPOs on the go with our mobile application.',
      icon: PhoneAndroid,
      color: '#607D8B',
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
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
          Products & Services
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
          Discover our comprehensive suite of investment tools and educational resources
        </Typography>
      </Box>
      
      <Grid container spacing={4}>
        {products.map((product, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <StyledCard sx={{ 
              border: product.featured ? '2px solid' : '1px solid',
              borderColor: product.featured ? 'primary.main' : 'divider',
              position: 'relative'
            }}>
              {product.featured && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: -1,
                    right: 16,
                    backgroundColor: 'primary.main',
                    color: 'white',
                    px: 2,
                    py: 0.5,
                    borderRadius: '0 0 8px 8px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                  }}
                >
                  FEATURED
                </Box>
              )}
              <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 3 }}>
                {product.icon && (
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Box
                      sx={{
                        backgroundColor: product.color + '20',
                        borderRadius: 2,
                        p: 1.5,
                        mr: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 56,
                        height: 56,
                      }}
                    >
                      <product.icon sx={{ color: product.color || 'primary.main', fontSize: 28 }} />
                    </Box>
                  </Box>
                )}
                <Typography 
                  variant="h5" 
                  component="h2" 
                  gutterBottom
                  sx={{ 
                    fontWeight: 600,
                    color: 'text.primary',
                    mb: 1
                  }}
                >
                  {product.title}
                </Typography>
                <Typography 
                  color="text.secondary" 
                  sx={{ 
                    flexGrow: 1, 
                    mb: 3,
                    lineHeight: 1.6
                  }}
                >
                  {product.description}
                </Typography>
                {product.link ? (
                  <Button
                    variant="contained"
                    onClick={() => navigate(product.link)}
                    startIcon={<TrendingUp />}
                    sx={{ 
                      mt: 'auto',
                      backgroundColor: product.color || 'primary.main',
                      color: 'white',
                      borderRadius: 2,
                      fontWeight: 600,
                      py: 1.5,
                      '&:hover': {
                        backgroundColor: product.color || 'primary.main',
                        filter: 'brightness(0.9)',
                        transform: 'translateY(-2px)',
                      }
                    }}
                  >
                    {product.title === 'Stock School' ? 'Start Learning' : product.featured ? 'Launch Dashboard' : 'Learn More'}
                  </Button>
                ) : (
                  <Button
                    variant="outlined"
                    disabled
                    sx={{ 
                      mt: 'auto',
                      borderColor: product.color || 'primary.main',
                      color: product.color || 'primary.main',
                      borderRadius: 2,
                      fontWeight: 600,
                      py: 1.5,
                    }}
                  >
                    Coming Soon
                  </Button>
                )}
              </CardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductsPage;