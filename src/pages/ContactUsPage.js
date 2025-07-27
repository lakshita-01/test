/**
 * Contact Us Page
 * 
 * Professional contact page for the Bluestock application.
 * Provides multiple ways for users to get in touch with support.
 * 
 * Features:
 * - Responsive design with mobile-first approach
 * - Beautiful gradient backgrounds and animations
 * - Multiple contact methods (email, chat)
 * - Community engagement section
 * - Fixed mobile app download widget
 * - Accessible and user-friendly interface
 */

import React, { memo } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Card, 
  CardContent,
  Grid,
  Breadcrumbs,
  Link,
  useTheme,
  useMediaQuery,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Chip
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { 
  Email, 
  Chat, 
  Group, 
  GetApp, 
  QrCode,
  Home,
  ContactSupport,
  ArrowForward,
  Close,
  Schedule,
  Reply
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// Styled Components
const PageContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  minHeight: '100vh',
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(8),
}));

const HeroSection = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  color: 'white',
  padding: theme.spacing(6, 0),
  marginBottom: theme.spacing(6),
  borderRadius: theme.spacing(2),
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.2)',
    zIndex: 1,
  },
  '& > *': {
    position: 'relative',
    zIndex: 2,
  },
}));

const ContactCard = styled(Card)(({ theme }) => ({
  height: '100%',
  transition: 'all 0.3s ease-in-out',
  border: `1px solid ${theme.palette.divider}`,
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
    borderColor: theme.palette.primary.main,
  },
}));

const CommunitySection = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #4a54f1 0%, #6366f1 100%)',
  color: 'white',
  borderRadius: theme.spacing(2),
  padding: theme.spacing(6, 4),
  textAlign: 'center',
  marginTop: theme.spacing(6),
  marginBottom: theme.spacing(8),
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

const AppDownloadWidget = styled(Box)(({ theme }) => ({
  position: 'fixed',
  bottom: theme.spacing(3),
  left: theme.spacing(3),
  zIndex: 1000,
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.spacing(2),
  padding: theme.spacing(2),
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
  border: `1px solid ${theme.palette.divider}`,
  width: 200,
  textAlign: 'center',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.2)',
  },
  [theme.breakpoints.down('sm')]: {
    width: 160,
    padding: theme.spacing(1.5),
    bottom: theme.spacing(2),
    left: theme.spacing(2),
  },
}));

const QRCodeImage = styled('img')(({ theme }) => ({
  width: 100,
  height: 100,
  margin: theme.spacing(2, 'auto'),
  borderRadius: theme.spacing(1),
  border: `2px solid ${theme.palette.divider}`,
  [theme.breakpoints.down('sm')]: {
    width: 80,
    height: 80,
  },
}));

const StoreButton = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(1),
  marginTop: theme.spacing(1),
}));

const ContactUsPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [qrDialogOpen, setQrDialogOpen] = React.useState(false);

  const handleEmailClick = () => {
    window.location.href = 'mailto:hello@bluestock.in';
  };

  const handleChatClick = () => {
    // In a real app, this would open a chat widget
    alert('Chat feature will be available soon!');
  };

  const handleCommunityClick = () => {
    // Navigate to community page
    navigate('/community');
  };

  const handleQRClick = () => {
    setQrDialogOpen(true);
  };

  const contactMethods = [
    {
      icon: Email,
      title: 'Email us',
      description: 'One of our agents will respond at the earliest',
      action: 'hello@bluestock.in',
      onClick: handleEmailClick,
      color: theme.palette.primary.main,
      bgColor: theme.palette.primary.main + '10',
    },
    {
      icon: Chat,
      title: 'Chat us',
      description: 'Available from 8:00AM to 5:00PM',
      action: 'Open Chat',
      onClick: handleChatClick,
      color: theme.palette.success.main,
      bgColor: theme.palette.success.main + '10',
    },
  ];

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
                <ContactSupport sx={{ mr: 0.5, fontSize: 16 }} />
                Contact Us
              </Typography>
            </Breadcrumbs>
          </motion.div>

          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <HeroSection>
              <Container maxWidth="md">
                <Typography 
                  variant="h2" 
                  component="h1" 
                  gutterBottom
                  sx={{ 
                    fontWeight: 700,
                    fontSize: { xs: '2rem', md: '2.5rem' },
                    mb: 2
                  }}
                >
                  How Can We Help You?
                </Typography>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    opacity: 0.9,
                    fontSize: { xs: '1rem', md: '1.1rem' },
                    maxWidth: 600,
                    mx: 'auto'
                  }}
                >
                  We're here to support your investment journey. Get in touch with our team for any questions or assistance.
                </Typography>
              </Container>
            </HeroSection>
          </motion.div>

          {/* Contact Methods */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Grid container spacing={4} sx={{ mb: 6 }}>
              {contactMethods.map((method, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <ContactCard>
                    <CardContent sx={{ p: 4 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Box
                          sx={{
                            backgroundColor: method.bgColor,
                            borderRadius: 2,
                            p: 1.5,
                            mr: 2,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <method.icon sx={{ color: method.color, fontSize: 24 }} />
                        </Box>
                        <Typography variant="h5" component="h3" sx={{ fontWeight: 600 }}>
                          {method.title}
                        </Typography>
                      </Box>
                      
                      <Typography 
                        variant="body1" 
                        color="text.secondary" 
                        sx={{ mb: 3, lineHeight: 1.6 }}
                      >
                        {method.description}
                      </Typography>

                      {method.title === 'Chat us' && (
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <Schedule sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                          <Typography variant="body2" color="text.secondary">
                            Monday - Friday, 8:00 AM - 5:00 PM
                          </Typography>
                        </Box>
                      )}

                      {method.title === 'Email us' && (
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <Reply sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                          <Typography variant="body2" color="text.secondary">
                            Response within 24 hours
                          </Typography>
                        </Box>
                      )}

                      <Button
                        variant="contained"
                        onClick={method.onClick}
                        endIcon={<ArrowForward />}
                        sx={{
                          backgroundColor: method.color,
                          color: 'white',
                          '&:hover': {
                            backgroundColor: method.color,
                            filter: 'brightness(0.9)',
                            transform: 'translateY(-2px)',
                          },
                          borderRadius: 2,
                          px: 3,
                          py: 1.5,
                          fontWeight: 600,
                        }}
                      >
                        {method.action}
                      </Button>
                    </CardContent>
                  </ContactCard>
                </Grid>
              ))}
            </Grid>
          </motion.div>

          {/* Community Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <CommunitySection>
              <Container maxWidth="md">
                <Group sx={{ fontSize: 48, mb: 2, opacity: 0.9 }} />
                <Typography 
                  variant="h3" 
                  component="h2" 
                  gutterBottom
                  sx={{ 
                    fontWeight: 700,
                    fontSize: { xs: '1.8rem', md: '2.2rem' },
                    mb: 2
                  }}
                >
                  Interact With Us in Our Active Community
                </Typography>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    opacity: 0.9,
                    mb: 4,
                    fontSize: { xs: '1rem', md: '1.1rem' },
                    lineHeight: 1.6
                  }}
                >
                  Ask questions or discuss anything related to investing or trading
                  <br />
                  in the most active trading & investing community
                </Typography>
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleCommunityClick}
                  sx={{
                    backgroundColor: '#121212',
                    color: 'white',
                    px: 4,
                    py: 2,
                    borderRadius: 3,
                    fontWeight: 700,
                    fontSize: '1.1rem',
                    letterSpacing: '0.5px',
                    '&:hover': {
                      backgroundColor: '#000000',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3)',
                    },
                  }}
                >
                  JOIN NOW
                </Button>
              </Container>
            </CommunitySection>
          </motion.div>
        </Container>

        {/* App Download Widget */}
        {!isMobile && (
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <AppDownloadWidget>
              <Typography 
                variant="subtitle1" 
                sx={{ 
                  fontWeight: 700, 
                  mb: 1,
                  fontSize: '0.9rem',
                  lineHeight: 1.3
                }}
              >
                Download Bluestock
                <br />
                Mobile App
              </Typography>
              
              <QRCodeImage
                src="/icons/qr-code.png"
                alt="Bluestock QR Code"
                onClick={handleQRClick}
                sx={{ cursor: 'pointer' }}
              />
              
              <StoreButton>
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                  alt="Google Play"
                  style={{ height: 24 }}
                />
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
                  alt="App Store"
                  style={{ height: 20 }}
                />
              </StoreButton>
            </AppDownloadWidget>
          </motion.div>
        )}

        {/* Mobile App Download FAB */}
        {isMobile && (
          <Fab
            color="primary"
            sx={{
              position: 'fixed',
              bottom: 16,
              right: 16,
              zIndex: 1000,
            }}
            onClick={handleQRClick}
          >
            <GetApp />
          </Fab>
        )}

        {/* QR Code Dialog */}
        <Dialog 
          open={qrDialogOpen} 
          onClose={() => setQrDialogOpen(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle sx={{ textAlign: 'center', pb: 1 }}>
            <Typography variant="h5" component="h2" sx={{ fontWeight: 600 }}>
              Download Bluestock App
            </Typography>
            <IconButton
              onClick={() => setQrDialogOpen(false)}
              sx={{ position: 'absolute', right: 8, top: 8 }}
            >
              <Close />
            </IconButton>
          </DialogTitle>
          <DialogContent sx={{ textAlign: 'center', py: 3 }}>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Scan the QR code with your phone to download the app
            </Typography>
            <QRCodeImage
              src="/icons/qr-code.png"
              alt="Bluestock QR Code"
              sx={{ width: 200, height: 200 }}
            />
            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center', gap: 2 }}>
              <Chip 
                icon={<QrCode />} 
                label="Scan with Camera" 
                variant="outlined" 
                color="primary"
              />
            </Box>
          </DialogContent>
          <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
            <StoreButton sx={{ gap: 2 }}>
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Google Play"
                style={{ height: 40 }}
              />
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
                alt="App Store"
                style={{ height: 32 }}
              />
            </StoreButton>
          </DialogActions>
        </Dialog>
    </PageContainer>
  );
};

export default memo(ContactUsPage);