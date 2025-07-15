// src/pages/LiveNewsPage.js
import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  Grid, 
  Chip,
  Avatar,
  Divider
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { TrendingUp, Schedule, FiberNew } from '@mui/icons-material';

const NewsCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: theme.shadows[4],
  },
}));

const LiveIndicator = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  marginBottom: theme.spacing(2),
  padding: theme.spacing(1),
  backgroundColor: '#ff4444',
  color: 'white',
  borderRadius: theme.spacing(1),
  width: 'fit-content',
}));

const LiveNewsPage = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const newsItems = [
    {
      id: 1,
      title: 'Pfizer IPO Oversubscribed by 3.2x in First Day',
      summary: 'Strong investor interest drives Pfizer IPO subscription beyond expectations...',
      time: '2 minutes ago',
      category: 'IPO Update',
      isBreaking: true,
    },
    {
      id: 2,
      title: 'Market Opens Higher Ahead of Major IPO Listings',
      summary: 'Sensex gains 200 points as investors show confidence in upcoming IPO listings...',
      time: '15 minutes ago',
      category: 'Market News',
      isBreaking: false,
    },
    {
      id: 3,
      title: 'SEBI Announces New Guidelines for IPO Pricing',
      summary: 'New regulations aim to improve transparency in IPO pricing mechanisms...',
      time: '1 hour ago',
      category: 'Regulatory',
      isBreaking: false,
    },
    {
      id: 4,
      title: 'Tech Sector IPOs Show Strong Performance This Quarter',
      summary: 'Technology companies lead IPO performance with average gains of 25%...',
      time: '2 hours ago',
      category: 'Sector Analysis',
      isBreaking: false,
    },
    {
      id: 5,
      title: 'Foreign Institutional Investors Increase IPO Participation',
      summary: 'FII participation in IPOs reaches highest level in 5 years...',
      time: '3 hours ago',
      category: 'Investment Trends',
      isBreaking: false,
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <Typography variant="h3" component="h1">
          Live News
        </Typography>
        <Chip 
          icon={<FiberNew />} 
          label="NEW FEATURE" 
          color="error" 
          size="small"
          sx={{ fontWeight: 'bold' }}
        />
      </Box>
      
      <LiveIndicator>
        <Box 
          sx={{ 
            width: 8, 
            height: 8, 
            borderRadius: '50%', 
            backgroundColor: 'white',
            animation: 'pulse 1.5s infinite'
          }} 
        />
        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
          LIVE • {currentTime.toLocaleTimeString()}
        </Typography>
      </LiveIndicator>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Typography variant="h5" gutterBottom>
            Latest Updates
          </Typography>
          
          {newsItems.map((news) => (
            <NewsCard key={news.id}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                <Avatar sx={{ bgcolor: 'primary.main', width: 40, height: 40 }}>
                  <TrendingUp />
                </Avatar>
                
                <Box sx={{ flex: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    {news.isBreaking && (
                      <Chip 
                        label="BREAKING" 
                        color="error" 
                        size="small" 
                        sx={{ fontWeight: 'bold', fontSize: '0.7rem' }}
                      />
                    )}
                    <Chip 
                      label={news.category} 
                      variant="outlined" 
                      size="small" 
                    />
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <Schedule sx={{ fontSize: 14, color: 'text.secondary' }} />
                      <Typography variant="caption" color="text.secondary">
                        {news.time}
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Typography variant="h6" gutterBottom>
                    {news.title}
                  </Typography>
                  
                  <Typography variant="body2" color="text.secondary">
                    {news.summary}
                  </Typography>
                </Box>
              </Box>
            </NewsCard>
          ))}
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, mb: 2 }}>
            <Typography variant="h6" gutterBottom>
              Market Summary
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2">Sensex</Typography>
              <Typography variant="body2" color="success.main">+0.8%</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2">Nifty</Typography>
              <Typography variant="body2" color="success.main">+0.6%</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2">IPO Index</Typography>
              <Typography variant="body2" color="success.main">+1.2%</Typography>
            </Box>
          </Paper>
          
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Trending Topics
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              <Chip label="#PfizerIPO" size="small" clickable />
              <Chip label="#IPOMarket" size="small" clickable />
              <Chip label="#TechIPOs" size="small" clickable />
              <Chip label="#MarketNews" size="small" clickable />
              <Chip label="#InvestmentTips" size="small" clickable />
            </Box>
          </Paper>
        </Grid>
      </Grid>
      
      <style jsx>{`
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }
      `}</style>
    </Container>
  );
};

export default LiveNewsPage;