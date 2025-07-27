/**
 * API Page
 * 
 * Professional API documentation page for the Bluestock application.
 * Provides information about API endpoints, authentication, and usage.
 * 
 * Features:
 * - Responsive design with mobile-first approach
 * - Beautiful gradient backgrounds and animations
 * - API documentation sections
 * - Code examples and endpoints
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
  Paper,
  Divider
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { 
  Home,
  Api,
  Code,
  Security,
  Description,
  Speed,
  CloudDownload,
  IntegrationInstructions
} from '@mui/icons-material';

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

const FeatureCard = styled(Card)(({ theme }) => ({
  height: '100%',
  transition: 'all 0.3s ease-in-out',
  border: `1px solid ${theme.palette.divider}`,
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
    borderColor: theme.palette.primary.main,
  },
}));

const CodeBlock = styled(Paper)(({ theme }) => ({
  backgroundColor: '#1e1e1e',
  color: '#d4d4d4',
  padding: theme.spacing(2),
  borderRadius: theme.spacing(1),
  fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
  fontSize: '0.875rem',
  overflow: 'auto',
  marginTop: theme.spacing(2),
}));

const ApiPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const features = [
    {
      icon: Speed,
      title: 'High Performance',
      description: 'Fast and reliable API endpoints with 99.9% uptime guarantee',
      color: theme.palette.primary.main,
    },
    {
      icon: Security,
      title: 'Secure Access',
      description: 'Enterprise-grade security with API key authentication',
      color: theme.palette.success.main,
    },
    {
      icon: Description,
      title: 'Comprehensive Docs',
      description: 'Detailed documentation with examples and use cases',
      color: theme.palette.info.main,
    },
    {
      icon: IntegrationInstructions,
      title: 'Easy Integration',
      description: 'Simple REST API that integrates with any platform',
      color: theme.palette.warning.main,
    },
  ];

  const endpoints = [
    {
      method: 'GET',
      endpoint: '/api/v1/ipos',
      description: 'Get all active IPOs',
    },
    {
      method: 'GET',
      endpoint: '/api/v1/ipos/{id}',
      description: 'Get specific IPO details',
    },
    {
      method: 'GET',
      endpoint: '/api/v1/market/news',
      description: 'Get latest market news',
    },
    {
      method: 'POST',
      endpoint: '/api/v1/portfolio/track',
      description: 'Track IPO in portfolio',
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
              <Api sx={{ mr: 0.5, fontSize: 16 }} />
              API
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
                Bluestock API
              </Typography>
              <Typography 
                variant="h6" 
                sx={{ 
                  opacity: 0.9,
                  fontSize: { xs: '1rem', md: '1.1rem' },
                  maxWidth: 600,
                  mx: 'auto',
                  mb: 4
                }}
              >
                Access real-time IPO data, market insights, and portfolio management tools through our powerful REST API.
              </Typography>
              <Button
                variant="contained"
                size="large"
                startIcon={<CloudDownload />}
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.3)',
                    transform: 'translateY(-2px)',
                  },
                  borderRadius: 2,
                  px: 4,
                  py: 1.5,
                  fontWeight: 600,
                }}
              >
                Get API Key
              </Button>
            </Container>
          </HeroSection>
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Typography 
            variant="h3" 
            component="h2" 
            align="center"
            sx={{ 
              fontWeight: 700,
              fontSize: { xs: '1.8rem', md: '2.2rem' },
              mb: 6
            }}
          >
            Why Choose Our API?
          </Typography>

          <Grid container spacing={4} sx={{ mb: 8 }}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <FeatureCard>
                  <CardContent sx={{ p: 3, textAlign: 'center' }}>
                    <Box
                      sx={{
                        backgroundColor: feature.color + '20',
                        borderRadius: 2,
                        p: 2,
                        display: 'inline-flex',
                        mb: 2,
                      }}
                    >
                      <feature.icon sx={{ color: feature.color, fontSize: 32 }} />
                    </Box>
                    <Typography variant="h6" component="h3" sx={{ fontWeight: 600, mb: 1 }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </FeatureCard>
              </Grid>
            ))}
          </Grid>
        </motion.div>

        {/* API Endpoints Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Typography 
            variant="h3" 
            component="h2" 
            align="center"
            sx={{ 
              fontWeight: 700,
              fontSize: { xs: '1.8rem', md: '2.2rem' },
              mb: 4
            }}
          >
            API Endpoints
          </Typography>

          <Card sx={{ mb: 6 }}>
            <CardContent sx={{ p: 4 }}>
              {endpoints.map((endpoint, index) => (
                <Box key={index}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Chip 
                      label={endpoint.method}
                      size="small"
                      sx={{
                        backgroundColor: endpoint.method === 'GET' ? 'success.main' : 'primary.main',
                        color: 'white',
                        fontWeight: 600,
                        mr: 2,
                        minWidth: 60
                      }}
                    />
                    <Typography 
                      variant="h6" 
                      component="code"
                      sx={{ 
                        fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
                        backgroundColor: 'grey.100',
                        px: 1,
                        py: 0.5,
                        borderRadius: 1,
                        mr: 2
                      }}
                    >
                      {endpoint.endpoint}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {endpoint.description}
                  </Typography>
                  {index < endpoints.length - 1 && <Divider sx={{ my: 3 }} />}
                </Box>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Code Example Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Typography 
            variant="h3" 
            component="h2" 
            align="center"
            sx={{ 
              fontWeight: 700,
              fontSize: { xs: '1.8rem', md: '2.2rem' },
              mb: 4
            }}
          >
            Quick Start Example
          </Typography>

          <Card>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                <Code sx={{ mr: 1 }} />
                JavaScript Example
              </Typography>
              <CodeBlock>
                {`// Initialize API client
const apiKey = 'your-api-key-here';
const baseURL = 'https://api.bluestock.in/v1';

// Fetch all active IPOs
fetch(\`\${baseURL}/ipos\`, {
  headers: {
    'Authorization': \`Bearer \${apiKey}\`,
    'Content-Type': 'application/json'
  }
})
.then(response => response.json())
.then(data => {
  console.log('Active IPOs:', data);
})
.catch(error => {
  console.error('Error:', error);
});`}
              </CodeBlock>
            </CardContent>
          </Card>
        </motion.div>
      </Container>
    </PageContainer>
  );
};

export default memo(ApiPage);