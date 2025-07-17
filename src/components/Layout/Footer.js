/**
 * Footer Component
 * 
 * Professional footer with company information, navigation links, and contact details.
 * Provides comprehensive site navigation and important legal links.
 * 
 * Features:
 * - Responsive grid layout
 * - Company branding and description
 * - Quick navigation links
 * - Contact information
 * - Legal links and copyright
 * - Professional gradient design
 * - Accessible link interactions
 */

import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Link,
  Divider,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { TrendingUp, Email, Phone, LocationOn } from '@mui/icons-material';

const FooterContainer = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
  color: 'white',
  marginTop: 'auto',
  padding: theme.spacing(6, 0, 3, 0),
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
    zIndex: 0,
  }
}));

const FooterSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

const FooterTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  marginBottom: theme.spacing(2),
  color: '#1976d2',
}));

const FooterLink = styled(Link)(({ theme }) => ({
  color: '#ccc',
  textDecoration: 'none',
  display: 'block',
  marginBottom: theme.spacing(1),
  '&:hover': {
    color: '#1976d2',
    textDecoration: 'underline',
  },
}));

const ContactItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  marginBottom: theme.spacing(1),
  color: '#ccc',
}));

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <FooterContainer>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Company Info */}
          <Grid item xs={12} md={4}>
            <FooterSection>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <TrendingUp sx={{ color: '#1976d2', fontSize: 28 }} />
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  BlueStock IPO
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ color: '#ccc', lineHeight: 1.6 }}>
                Your trusted platform for IPO investments. Get access to upcoming IPOs, 
                detailed analysis, and seamless application process.
              </Typography>
            </FooterSection>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} md={2}>
            <FooterSection>
              <FooterTitle variant="h6">Quick Links</FooterTitle>
              <FooterLink href="/">Upcoming IPOs</FooterLink>
              <FooterLink href="/about">About Us</FooterLink>
              <FooterLink href="/how-it-works">How It Works</FooterLink>
              <FooterLink href="/faq">FAQ</FooterLink>
            </FooterSection>
          </Grid>

          {/* Services */}
          <Grid item xs={12} md={2}>
            <FooterSection>
              <FooterTitle variant="h6">Services</FooterTitle>
              <FooterLink href="/ipo-analysis">IPO Analysis</FooterLink>
              <FooterLink href="/market-insights">Market Insights</FooterLink>
              <FooterLink href="/portfolio">Portfolio</FooterLink>
              <FooterLink href="/alerts">Price Alerts</FooterLink>
            </FooterSection>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} md={4}>
            <FooterSection>
              <FooterTitle variant="h6">Contact Us</FooterTitle>
              <ContactItem>
                <Email sx={{ fontSize: 18 }} />
                <Typography variant="body2">support@bluestockipo.com</Typography>
              </ContactItem>
              <ContactItem>
                <Phone sx={{ fontSize: 18 }} />
                <Typography variant="body2">+91 98765 43210</Typography>
              </ContactItem>
              <ContactItem>
                <LocationOn sx={{ fontSize: 18 }} />
                <Typography variant="body2">
                  Mumbai, Maharashtra, India
                </Typography>
              </ContactItem>
            </FooterSection>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3, backgroundColor: '#333' }} />

        {/* Bottom Section */}
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            flexDirection: isMobile ? 'column' : 'row',
            gap: isMobile ? 2 : 0
          }}
        >
          <Typography variant="body2" sx={{ color: '#999' }}>
            © 2024 BlueStock IPO. All rights reserved.
          </Typography>
          <Box sx={{ display: 'flex', gap: 3 }}>
            <FooterLink href="/privacy" sx={{ display: 'inline', mb: 0 }}>
              Privacy Policy
            </FooterLink>
            <FooterLink href="/terms" sx={{ display: 'inline', mb: 0 }}>
              Terms of Service
            </FooterLink>
            <FooterLink href="/disclaimer" sx={{ display: 'inline', mb: 0 }}>
              Disclaimer
            </FooterLink>
          </Box>
        </Box>
      </Container>
    </FooterContainer>
  );
};

export default Footer;