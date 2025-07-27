// src/pages/HomePage.js
import React from 'react';
import { motion } from 'framer-motion';
import { Box, Container, Typography, Button, useTheme, useMediaQuery } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, Assessment, Group } from '@mui/icons-material';
import Homepage from '../components/Homepage/Homepage';

const HeroSection = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  color: 'white',
  padding: theme.spacing(8, 0),
  textAlign: 'center',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.3)',
    zIndex: 1,
  },
  '& > *': {
    position: 'relative',
    zIndex: 2,
  },
}));

const FeatureCard = styled(Box)(({ theme }) => ({
  backgroundColor: 'white',
  borderRadius: theme.spacing(2),
  padding: theme.spacing(4),
  textAlign: 'center',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s ease',
  height: '100%',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.15)',
  },
}));

const StatsSection = styled(Box)(({ theme }) => ({
  backgroundColor: '#f8fafc',
  padding: theme.spacing(6, 0),
}));

const StatCard = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(2),
}));

const HomePage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  const features = [
    {
      icon: <TrendingUp sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />,
      title: 'IPO Investments',
      description: 'Discover and invest in the most promising Initial Public Offerings with comprehensive analysis and real-time updates.',
      action: () => navigate('/ipo'),
    },
    {
      icon: <Assessment sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />,
      title: 'Market Analysis',
      description: 'Get expert insights, detailed reports, and advanced analytics to make informed investment decisions.',
      action: () => navigate('/live-news'),
    },
    {
      icon: <Group sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />,
      title: 'Community',
      description: 'Connect with fellow investors, share insights, and learn from experienced traders in our vibrant community.',
      action: () => navigate('/community'),
    },
  ];

  const stats = [
    { number: '500+', label: 'IPOs Tracked' },
    { number: '50K+', label: 'Active Users' },
    { number: '₹100Cr+', label: 'Investments Facilitated' },
    { number: '4.8★', label: 'User Rating' },
  ];

  
      
};
export default HomePage;