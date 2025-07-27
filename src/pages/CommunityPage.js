/**
 * Community Page
 * 
 * Professional community page for the Bluestock application.
 * Features an active trading and investing community with expert interactions.
 * 
 * Features:
 * - Responsive design with mobile-first approach
 * - Beautiful gradient backgrounds and animations
 * - Interactive chat cards and expert sections
 * - Community engagement features
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
  Chip,
  Avatar,
  Paper
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { 
  Home,
  Group,
  CheckCircle,
  Forum,
  TrendingUp,
  Lightbulb,
  Schedule
} from '@mui/icons-material';

// Styled Components
const PageContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  minHeight: '100vh',
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(8),
}));

const MainSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(6),
  alignItems: 'flex-start',
  marginBottom: theme.spacing(8),
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    gap: theme.spacing(3),
  },
}));

const LeftContent = styled(Box)(({ theme }) => ({
  flex: 1.3,
  [theme.breakpoints.down('md')]: {
    flex: 1,
  },
}));

const RightContent = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  marginTop: theme.spacing(1),
  [theme.breakpoints.down('md')]: {
    alignItems: 'center',
    marginTop: 0,
  },
}));

const JoinButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(135deg, #4362ea 0%, #6366f1 100%)',
  color: 'white',
  fontWeight: 600,
  padding: theme.spacing(1.5, 3.5),
  borderRadius: theme.spacing(1),
  fontSize: '1rem',
  marginBottom: theme.spacing(4),
  boxShadow: '0 4px 15px rgba(67, 98, 234, 0.3)',
  '&:hover': {
    background: 'linear-gradient(135deg, #3b56d9 0%, #5b5fe6 100%)',
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 20px rgba(67, 98, 234, 0.4)',
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    padding: theme.spacing(1.2, 2),
    fontSize: '0.9rem',
  },
}));

const FeatureBoxes = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  marginTop: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    gap: theme.spacing(1),
  },
}));

const FeatureBox = styled(Chip)(({ theme }) => ({
  backgroundColor: '#f5f6fa',
  borderRadius: theme.spacing(1),
  padding: theme.spacing(1.5, 2.5),
  fontWeight: 500,
  color: '#2b383b',
  fontSize: '0.9rem',
  height: 'auto',
  '&:hover': {
    backgroundColor: theme.palette.primary.light,
    color: 'white',
    transform: 'translateY(-2px)',
  },
  transition: 'all 0.3s ease',
  [theme.breakpoints.down('sm')]: {
    justifyContent: 'flex-start',
    width: '100%',
  },
}));

const ChatCard = styled(Card)(({ theme }) => ({
  background: 'white',
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.spacing(1.5),
  padding: theme.spacing(2),
  width: 280,
  boxShadow: '0 10px 40px rgba(178, 193, 246, 0.15)',
  fontSize: '0.9rem',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 15px 50px rgba(178, 193, 246, 0.25)',
  },
  [theme.breakpoints.down('md')]: {
    width: '100%',
    maxWidth: 400,
  },
}));

const BluestockSection = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #fafaff 0%, #f8f9ff 100%)',
  borderRadius: theme.spacing(2),
  padding: theme.spacing(4, 3.5),
  textAlign: 'center',
  border: `1px solid ${theme.palette.divider}`,
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(3, 2),
  },
}));

const ExpertCard = styled(Card)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  maxWidth: 400,
  padding: theme.spacing(2),
  borderRadius: theme.spacing(1.5),
  textAlign: 'left',
  background: 'white',
  fontSize: '0.9rem',
  margin: '0 auto',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    fontSize: '0.85rem',
  },
}));

const BluestockBadge = styled(Chip)(({ theme }) => ({
  background: 'linear-gradient(135deg, #ffe381 0%, #ffeb9c 100%)',
  color: '#6a541a',
  fontSize: '0.75rem',
  padding: theme.spacing(0.3, 1),
  borderRadius: theme.spacing(1),
  fontWeight: 600,
  marginBottom: theme.spacing(1),
  height: 'auto',
}));

const PointsList = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  '& .tick': {
    color: theme.palette.primary.main,
    marginRight: theme.spacing(1),
    fontSize: '1.1rem',
  },
  '& ul': {
    listStyle: 'disc',
    marginLeft: theme.spacing(2.5),
    marginTop: theme.spacing(1),
    color: theme.palette.text.secondary,
    '& li': {
      marginBottom: theme.spacing(0.5),
    },
  },
}));

const CommunityPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleJoinCommunity = () => {
    // In a real app, this would open community registration
    alert('Community registration will be available soon!');
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
              <Group sx={{ mr: 0.5, fontSize: 16 }} />
              Community
            </Typography>
          </Breadcrumbs>
        </motion.div>

        {/* Main Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <MainSection>
            <LeftContent>
              <Typography 
                variant="h2" 
                component="h1" 
                sx={{ 
                  fontWeight: 700,
                  fontSize: { xs: '1.8rem', md: '2.5rem' },
                  marginBottom: 2,
                  color: 'text.primary',
                  lineHeight: 1.2
                }}
              >
                The Most Active Community of Traders & Investors
              </Typography>
              
              <Typography 
                variant="h6" 
                sx={{ 
                  fontSize: { xs: '1rem', md: '1.1rem' },
                  marginBottom: 3.5,
                  color: 'text.secondary',
                  lineHeight: 1.6
                }}
              >
                Join now to interact with thousands of active traders and investors to learn and share your knowledge on our buzzing forum.
              </Typography>

              <JoinButton
                variant="contained"
                size="large"
                onClick={handleJoinCommunity}
                startIcon={<Group />}
              >
                Join Our Community
              </JoinButton>

              <PointsList>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <CheckCircle sx={{ color: 'primary.main', mr: 1, fontSize: 20 }} />
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    Be a part of trading & investments club
                  </Typography>
                </Box>
                <ul>
                  <li>Rich environment for knowledge exchange.</li>
                  <li>Stay connected about the latest stock market.</li>
                  <li>Access exclusive community events, webinars, and meet-ups.</li>
                </ul>
              </PointsList>

              <FeatureBoxes>
                <FeatureBox 
                  label="Dynamic Discussions" 
                  icon={<Forum />}
                />
                <FeatureBox 
                  label="Expert Insights" 
                  icon={<Lightbulb />}
                />
                <FeatureBox 
                  label="Real-Time Interaction" 
                  icon={<TrendingUp />}
                />
              </FeatureBoxes>
            </LeftContent>

            <RightContent>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <ChatCard>
                  <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Avatar sx={{ width: 32, height: 32, mr: 1, bgcolor: 'primary.main' }}>
                        O
                      </Avatar>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        Om Jainwal
                      </Typography>
                    </Box>
                    
                    <Typography variant="body2" sx={{ mb: 1.5, color: 'text.primary' }}>
                      What are long term investments?
                    </Typography>

                    <Box sx={{ bgcolor: 'grey.50', p: 1.5, borderRadius: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                        <Avatar sx={{ width: 24, height: 24, mr: 1, bgcolor: 'success.main' }}>
                          A
                        </Avatar>
                        <Typography variant="caption" sx={{ color: 'primary.main', fontWeight: 500 }}>
                          Ashish Warke
                        </Typography>
                      </Box>
                      <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.8rem' }}>
                        <strong>Dinesh Karole</strong>: <br />
                        Calls & knockouts depend on financial instruments. For example, in equity, the risk is purely the capital, but in options, there can be a complete term structure.
                      </Typography>
                    </Box>
                  </CardContent>
                </ChatCard>
              </motion.div>
            </RightContent>
          </MainSection>
        </motion.div>

        {/* Team Bluestock Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <BluestockSection>
            <Typography 
              variant="h3" 
              component="h2" 
              sx={{ 
                fontWeight: 700,
                fontSize: { xs: '1.5rem', md: '2rem' },
                mb: 2,
                color: 'text.primary'
              }}
            >
              Team Bluestock Cares
            </Typography>
            
            <Typography 
              variant="h6" 
              sx={{ 
                mb: 4,
                color: 'text.secondary',
                fontSize: { xs: '1rem', md: '1.1rem' }
              }}
            >
              Interact with our members to engage, clarify, and contribute
            </Typography>

            <Box sx={{ mb: 3 }}>
              <Typography 
                variant="h5" 
                component="h3" 
                sx={{ 
                  fontWeight: 600,
                  mb: 2,
                  fontSize: { xs: '1.2rem', md: '1.4rem' }
                }}
              >
                Interact With Our Experts
              </Typography>
              <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12} sm={4}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <CheckCircle sx={{ color: 'success.main', mr: 1, fontSize: 18 }} />
                    <Typography variant="body2">Get valid suggestions</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <CheckCircle sx={{ color: 'success.main', mr: 1, fontSize: 18 }} />
                    <Typography variant="body2">Raise issues or concerns</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <CheckCircle sx={{ color: 'success.main', mr: 1, fontSize: 18 }} />
                    <Typography variant="body2">Ask your questions</Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
              <ExpertCard>
                <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Avatar sx={{ width: 32, height: 32, mr: 1, bgcolor: 'secondary.main' }}>
                      P
                    </Avatar>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      Pravin Deshmukh
                    </Typography>
                  </Box>
                  
                  <Typography variant="body2" sx={{ mb: 1.5, color: 'text.secondary' }}>
                    What is options trading?
                  </Typography>

                  <Box sx={{ mt: 1 }}>
                    <BluestockBadge 
                      label="Bluestock team" 
                      size="small"
                    />
                    <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
                      <strong>Dinesh Karole</strong>: <br />
                      Options trading is for leveraging stock exposure. Profits in calls and puts depend on expiry, the risk profile, and whether you are a buyer or a seller.
                    </Typography>
                  </Box>
                </CardContent>
              </ExpertCard>
            </Box>
          </BluestockSection>
        </motion.div>
      </Container>
    </PageContainer>
  );
};

export default memo(CommunityPage);