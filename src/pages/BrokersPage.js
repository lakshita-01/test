// src/pages/BrokersPage.js
import React from 'react';
import { Container, Typography, Box, Paper, Grid, Avatar, Rating } from '@mui/material';
import { styled } from '@mui/material/styles';

const BrokerCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: 'center',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[8],
  },
}));

const BrokersPage = () => {
  const brokers = [
    {
      name: 'Zerodha',
      rating: 4.5,
      commission: '₹20 per order',
      specialty: 'Low-cost trading',
    },
    {
      name: 'Upstox',
      rating: 4.3,
      commission: '₹20 per order',
      specialty: 'Mobile-first platform',
    },
    {
      name: 'Angel One',
      rating: 4.2,
      commission: '₹20 per order',
      specialty: 'Research & advisory',
    },
    {
      name: 'ICICI Direct',
      rating: 4.1,
      commission: '0.05% of trade value',
      specialty: 'Full-service broker',
    },
    {
      name: 'HDFC Securities',
      rating: 4.0,
      commission: '0.05% of trade value',
      specialty: 'Banking integration',
    },
    {
      name: 'Kotak Securities',
      rating: 3.9,
      commission: '₹20 per order',
      specialty: 'Premium services',
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        Partner Brokers
      </Typography>
      <Typography variant="h6" color="text.secondary" align="center" sx={{ mb: 4 }}>
        Choose from our trusted broker partners for IPO investments
      </Typography>
      
      <Grid container spacing={3}>
        {brokers.map((broker, index) => (
          <Grid item xs={12} md={6} lg={4} key={index}>
            <BrokerCard>
              <Avatar
                sx={{ 
                  width: 80, 
                  height: 80, 
                  mb: 2,
                  bgcolor: 'primary.main',
                  fontSize: '1.5rem'
                }}
              >
                {broker.name.charAt(0)}
              </Avatar>
              
              <Typography variant="h5" component="h2" gutterBottom>
                {broker.name}
              </Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Rating value={broker.rating} precision={0.1} readOnly size="small" />
                <Typography variant="body2" sx={{ ml: 1 }}>
                  ({broker.rating})
                </Typography>
              </Box>
              
              <Typography color="text.secondary" sx={{ mb: 1 }}>
                Commission: {broker.commission}
              </Typography>
              
              <Typography variant="body2" color="primary">
                {broker.specialty}
              </Typography>
            </BrokerCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default BrokersPage;