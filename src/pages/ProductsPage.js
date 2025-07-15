// src/pages/ProductsPage.js
import React from 'react';
import { Container, Typography, Box, Paper, Grid, Card, CardContent } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[8],
  },
}));

const ProductsPage = () => {
  const products = [
    {
      title: 'IPO Analytics Dashboard',
      description: 'Comprehensive analytics and insights for IPO performance tracking.',
    },
    {
      title: 'Portfolio Management',
      description: 'Advanced tools to manage and optimize your IPO investments.',
    },
    {
      title: 'Risk Assessment Tools',
      description: 'Evaluate investment risks with our sophisticated risk analysis tools.',
    },
    {
      title: 'Market Research Reports',
      description: 'In-depth research reports on upcoming and recent IPOs.',
    },
    {
      title: 'Trading Signals',
      description: 'Real-time trading signals and recommendations for IPO investments.',
    },
    {
      title: 'Mobile Trading App',
      description: 'Trade IPOs on the go with our mobile application.',
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        Products & Services
      </Typography>
      <Typography variant="h6" color="text.secondary" align="center" sx={{ mb: 4 }}>
        Discover our comprehensive suite of IPO investment tools
      </Typography>
      
      <Grid container spacing={3}>
        {products.map((product, index) => (
          <Grid item xs={12} md={6} lg={4} key={index}>
            <StyledCard>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" component="h2" gutterBottom>
                  {product.title}
                </Typography>
                <Typography color="text.secondary">
                  {product.description}
                </Typography>
              </CardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductsPage;