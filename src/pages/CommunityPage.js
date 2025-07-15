// src/pages/CommunityPage.js
import React from 'react';
import { Container, Typography, Box, Paper, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: '100%',
}));

const CommunityPage = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        Community
      </Typography>
      <Typography variant="h6" color="text.secondary" align="center" sx={{ mb: 4 }}>
        Connect with fellow investors and share insights
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <StyledPaper>
            <Typography variant="h5" gutterBottom>
              Discussion Forums
            </Typography>
            <Typography>
              Join discussions about IPO trends, market analysis, and investment strategies.
            </Typography>
          </StyledPaper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <StyledPaper>
            <Typography variant="h5" gutterBottom>
              Expert Insights
            </Typography>
            <Typography>
              Get insights from market experts and experienced investors.
            </Typography>
          </StyledPaper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <StyledPaper>
            <Typography variant="h5" gutterBottom>
              Community Events
            </Typography>
            <Typography>
              Participate in webinars, Q&A sessions, and networking events.
            </Typography>
          </StyledPaper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CommunityPage;