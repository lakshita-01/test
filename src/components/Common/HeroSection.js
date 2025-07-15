// src/components/Common/HeroSection.js
import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  useTheme,

  Card,
  CardContent,
  Chip
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  TrendingUp,
  ShowChart,
  AccountBalance,
  Timeline,
  ArrowForward,
  Star
} from '@mui/icons-material';

const HeroContainer = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main}15 0%, ${theme.palette.primary.light}08 100%)`,
  minHeight: '60vh',
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  overflow: 'hidden',
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

const HeroContent = styled(Box)(({ theme }) => ({
  position: 'relative',
  zIndex: 1,
}));

const StatsCard = styled(Card)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  borderRadius: 16,
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 40px rgba(25, 118, 210, 0.15)',
  }
}));

const FeatureIcon = styled(Box)(({ theme }) => ({
  width: 56,
  height: 56,
  borderRadius: 16,
  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(2),
  '& svg': {
    color: 'white',
    fontSize: 28,
  }
}));

const HeroSection = ({ onExploreClick }) => {
  const theme = useTheme();

  const stats = [
    { icon: <ShowChart />, value: '50+', label: 'Active IPOs' },
    { icon: <AccountBalance />, value: '₹2,500Cr', label: 'Total Issue Size' },
    { icon: <Timeline />, value: '95%', label: 'Success Rate' },
  ];

  const features = [
    {
      icon: <TrendingUp />,
      title: 'Real-time Updates',
      description: 'Get instant notifications about IPO openings, closings, and listings'
    },
    {
      icon: <Star />,
      title: 'Expert Analysis',
      description: 'Comprehensive research and analysis for informed investment decisions'
    },
    {
      icon: <AccountBalance />,
      title: 'Secure Platform',
      description: 'Bank-grade security with seamless application process'
    }
  ];

  return (
    <HeroContainer>
      <Container maxWidth="xl">
        <HeroContent>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ mb: 3 }}>
                <Chip
                  label="🚀 India's Premier IPO Platform"
                  sx={{
                    backgroundColor: theme.palette.primary.main + '15',
                    color: theme.palette.primary.main,
                    fontWeight: 600,
                    mb: 2,
                    px: 2,
                    py: 0.5
                  }}
                />
              </Box>
              
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  fontWeight: 800,
                  lineHeight: 1.1,
                  mb: 3,
                  background: `linear-gradient(135deg, ${theme.palette.text.primary}, ${theme.palette.primary.main})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Invest in Tomorrow's
                <br />
                <span style={{ color: theme.palette.primary.main }}>
                  Market Leaders
                </span>
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  color: theme.palette.text.secondary,
                  mb: 4,
                  fontSize: '1.125rem',
                  lineHeight: 1.6,
                  maxWidth: '500px'
                }}
              >
                Discover, analyze, and invest in the most promising IPOs with our comprehensive platform. 
                Get expert insights and real-time updates to make informed investment decisions.
              </Typography>

              <Box sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForward />}
                  onClick={onExploreClick}
                  sx={{
                    px: 4,
                    py: 1.5,
                    fontSize: '1rem',
                    fontWeight: 600,
                    borderRadius: 2,
                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                    '&:hover': {
                      background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 25px rgba(25, 118, 210, 0.3)',
                    }
                  }}
                >
                  Explore IPOs
                </Button>
                
                <Button
                  variant="outlined"
                  size="large"
                  sx={{
                    px: 4,
                    py: 1.5,
                    fontSize: '1rem',
                    fontWeight: 600,
                    borderRadius: 2,
                    borderColor: theme.palette.primary.main,
                    color: theme.palette.primary.main,
                    '&:hover': {
                      backgroundColor: theme.palette.primary.main + '08',
                      borderColor: theme.palette.primary.main,
                    }
                  }}
                >
                  Learn More
                </Button>
              </Box>

              {/* Stats */}
              <Grid container spacing={3}>
                {stats.map((stat, index) => (
                  <Grid item xs={4} key={index}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Box sx={{ 
                        color: theme.palette.primary.main, 
                        mb: 1,
                        display: 'flex',
                        justifyContent: 'center'
                      }}>
                        {stat.icon}
                      </Box>
                      <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
                        {stat.value}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {stat.label}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box sx={{ position: 'relative' }}>
                {/* Feature Cards */}
                <Grid container spacing={2}>
                  {features.map((feature, index) => (
                    <Grid item xs={12} key={index}>
                      <StatsCard>
                        <CardContent sx={{ p: 3 }}>
                          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                            <FeatureIcon>
                              {feature.icon}
                            </FeatureIcon>
                            <Box>
                              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                                {feature.title}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {feature.description}
                              </Typography>
                            </Box>
                          </Box>
                        </CardContent>
                      </StatsCard>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </HeroContent>
      </Container>
    </HeroContainer>
  );
};

export default HeroSection;