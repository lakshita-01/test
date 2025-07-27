/**
 * IPO Analytics Dashboard Page
 * 
 * Professional analytics dashboard for IPO data visualization.
 * Features real-time market data, interactive charts, and comprehensive analytics.
 * 
 * Features:
 * - Responsive design with mobile-first approach
 * - Real-time market status indicators
 * - Interactive data table with sorting and filtering
 * - Beautiful gradient backgrounds and animations
 * - Market statistics and performance metrics
 * - Accessible and user-friendly interface
 */

import React, { memo, useState } from 'react';
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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  InputAdornment,
  IconButton,
  Tooltip,
  Avatar
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { 
  Home,
  Analytics,
  TrendingUp,
  TrendingDown,
  Search,
  ShowChart,
  FilterList,
  GetApp,
  Refresh,
  Circle
} from '@mui/icons-material';

// Styled Components
const PageContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  minHeight: '100vh',
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(8),
}));

const HeaderSection = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  color: 'white',
  padding: theme.spacing(4, 0),
  marginBottom: theme.spacing(4),
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
    background: 'rgba(0, 0, 0, 0.1)',
    zIndex: 1,
  },
  '& > *': {
    position: 'relative',
    zIndex: 2,
  },
}));

const MarketStatusCard = styled(Card)(({ theme }) => ({
  background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)',
  color: 'white',
  marginBottom: theme.spacing(3),
  '&.closed': {
    background: 'linear-gradient(135deg, #ffa726 0%, #ff9800 100%)',
  },
  '&.open': {
    background: 'linear-gradient(135deg, #66bb6a 0%, #4caf50 100%)',
  },
}));

const StatsCard = styled(Card)(({ theme }) => ({
  height: '100%',
  transition: 'all 0.3s ease-in-out',
  border: `1px solid ${theme.palette.divider}`,
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
    borderColor: theme.palette.primary.main,
  },
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
  border: `1px solid ${theme.palette.divider}`,
  '& .MuiTableHead-root': {
    background: 'linear-gradient(135deg, #f8f9ff 0%, #f0f2ff 100%)',
  },
  '& .MuiTableCell-head': {
    fontWeight: 600,
    color: theme.palette.primary.main,
    borderBottom: `2px solid ${theme.palette.primary.light}`,
  },
  '& .MuiTableRow-root:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const SearchField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: theme.spacing(3),
    backgroundColor: 'white',
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.primary.main,
    },
  },
}));

const IpoAnalyticsPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [searchTerm, setSearchTerm] = useState('NIFTY 50');

  // Sample data - in real app, this would come from API
  const columns = [
    "Company", "OPEN", "HIGH", "LOW", "PREV. CLOSE", "LTE", "CHNG", "%CHNG",
    "VOLUME (Shares)", "VALUE (₹ Crores)", "52W H", "52W L", "30 D %CHNG", "CHART"
  ];

  const dataRows = [
    {
      company: "Reliance Industries",
      open: "2,456.00",
      high: "2,465.00",
      low: "2,455.00",
      prevClose: "2,455.00",
      lte: "2,459.00",
      chng: "73.98",
      pctChng: "4.36",
      volume: "23,89,91,890",
      value: "209.59",
      high52w: "2,834.35",
      low52w: "1,833.75",
      pctChng30d: "9.10",
      isPositive: true
    },
    {
      company: "TCS",
      open: "3,756.00",
      high: "3,765.00",
      low: "3,755.00",
      prevClose: "3,755.00",
      lte: "3,759.00",
      chng: "-23.98",
      pctChng: "-2.36",
      volume: "13,89,91,890",
      value: "189.59",
      high52w: "3,934.35",
      low52w: "2,833.75",
      pctChng30d: "-5.10",
      isPositive: false
    },
    {
      company: "HDFC Bank",
      open: "1,656.00",
      high: "1,665.00",
      low: "1,655.00",
      prevClose: "1,655.00",
      lte: "1,659.00",
      chng: "43.98",
      pctChng: "3.16",
      volume: "33,89,91,890",
      value: "309.59",
      high52w: "1,834.35",
      low52w: "1,233.75",
      pctChng30d: "7.10",
      isPositive: true
    },
    // Add more sample data...
  ];

  const marketStats = [
    { label: 'Advances', value: 30, color: 'success.main', icon: TrendingUp },
    { label: 'Declines', value: 20, color: 'error.main', icon: TrendingDown },
    { label: 'Unchanged', value: 0, color: 'grey.500', icon: Circle },
  ];

  const handleRefresh = () => {
    // In real app, this would refresh data from API
    console.log('Refreshing data...');
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-IN').format(num);
  };

  return (
    <PageContainer>
      <Container maxWidth="xl">
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
            <Link 
              color="inherit" 
              href="/products" 
              sx={{ 
                display: 'flex', 
                alignItems: 'center',
                textDecoration: 'none',
                '&:hover': { color: 'primary.main' }
              }}
            >
              Products
            </Link>
            <Typography color="primary" sx={{ display: 'flex', alignItems: 'center' }}>
              <Analytics sx={{ mr: 0.5, fontSize: 16 }} />
              IPO Analytics
            </Typography>
          </Breadcrumbs>
        </motion.div>

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <HeaderSection>
            <Container maxWidth="lg">
              <Grid container spacing={3} alignItems="center">
                <Grid item xs={12} md={8}>
                  <Typography 
                    variant="h2" 
                    component="h1" 
                    sx={{ 
                      fontWeight: 700,
                      fontSize: { xs: '1.8rem', md: '2.5rem' },
                      mb: 2
                    }}
                  >
                    IPO Analytics Dashboard
                  </Typography>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      opacity: 0.9,
                      fontSize: { xs: '1rem', md: '1.1rem' },
                      mb: 2
                    }}
                  >
                    Real-time market data and comprehensive analytics for informed investment decisions
                  </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Box sx={{ display: 'flex', gap: 2, justifyContent: { xs: 'center', md: 'flex-end' } }}>
                    <Button
                      variant="contained"
                      startIcon={<Refresh />}
                      onClick={handleRefresh}
                      sx={{
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        color: 'white',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        '&:hover': {
                          backgroundColor: 'rgba(255, 255, 255, 0.3)',
                        },
                      }}
                    >
                      Refresh
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<GetApp />}
                      sx={{
                        color: 'white',
                        borderColor: 'rgba(255, 255, 255, 0.5)',
                        '&:hover': {
                          borderColor: 'white',
                          backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        },
                      }}
                    >
                      Export
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Container>
          </HeaderSection>
        </motion.div>

        {/* Search and Market Status */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} md={6}>
              <SearchField
                fullWidth
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search index or company..."
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton size="small">
                        <FilterList />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <MarketStatusCard className="closed">
                <CardContent sx={{ py: 2 }}>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    Market Status: Closed
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Today Market has Closed as on 09 Jan 2024 16:00:00 IST
                  </Typography>
                </CardContent>
              </MarketStatusCard>
            </Grid>
          </Grid>
        </motion.div>

        {/* Market Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {marketStats.map((stat, index) => (
              <Grid item xs={12} sm={4} key={index}>
                <StatsCard>
                  <CardContent sx={{ textAlign: 'center', py: 3 }}>
                    <Box
                      sx={{
                        backgroundColor: stat.color + '20',
                        borderRadius: 2,
                        p: 2,
                        display: 'inline-flex',
                        mb: 2,
                      }}
                    >
                      <stat.icon sx={{ color: stat.color, fontSize: 32 }} />
                    </Box>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: stat.color }}>
                      {stat.value}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {stat.label}
                    </Typography>
                  </CardContent>
                </StatsCard>
              </Grid>
            ))}
          </Grid>
        </motion.div>

        {/* Data Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <StyledTableContainer component={Paper}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {columns.map((column, index) => (
                    <TableCell 
                      key={index}
                      sx={{ 
                        fontWeight: 600,
                        whiteSpace: 'nowrap',
                        fontSize: { xs: '0.75rem', md: '0.875rem' }
                      }}
                    >
                      {column}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {dataRows.map((row, index) => (
                  <TableRow key={index} hover>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar 
                          sx={{ 
                            width: 32, 
                            height: 32, 
                            mr: 2, 
                            bgcolor: 'primary.main',
                            fontSize: '0.875rem'
                          }}
                        >
                          {row.company.charAt(0)}
                        </Avatar>
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            fontWeight: 600,
                            fontSize: { xs: '0.75rem', md: '0.875rem' }
                          }}
                        >
                          {row.company}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' } }}>
                      {row.open}
                    </TableCell>
                    <TableCell sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' } }}>
                      {row.high}
                    </TableCell>
                    <TableCell sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' } }}>
                      {row.low}
                    </TableCell>
                    <TableCell sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' } }}>
                      {row.prevClose}
                    </TableCell>
                    <TableCell sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' } }}>
                      {row.lte}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={row.chng}
                        size="small"
                        sx={{
                          backgroundColor: row.isPositive ? 'success.light' : 'error.light',
                          color: row.isPositive ? 'success.dark' : 'error.dark',
                          fontWeight: 600,
                          fontSize: { xs: '0.7rem', md: '0.75rem' }
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={`${row.pctChng}%`}
                        size="small"
                        sx={{
                          backgroundColor: row.isPositive ? 'success.light' : 'error.light',
                          color: row.isPositive ? 'success.dark' : 'error.dark',
                          fontWeight: 600,
                          fontSize: { xs: '0.7rem', md: '0.75rem' }
                        }}
                      />
                    </TableCell>
                    <TableCell sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' } }}>
                      {formatNumber(row.volume)}
                    </TableCell>
                    <TableCell sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' } }}>
                      ₹{row.value}
                    </TableCell>
                    <TableCell sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' } }}>
                      {row.high52w}
                    </TableCell>
                    <TableCell sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' } }}>
                      {row.low52w}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={`${row.pctChng30d}%`}
                        size="small"
                        sx={{
                          backgroundColor: row.pctChng30d.includes('-') ? 'error.light' : 'success.light',
                          color: row.pctChng30d.includes('-') ? 'error.dark' : 'success.dark',
                          fontWeight: 600,
                          fontSize: { xs: '0.7rem', md: '0.75rem' }
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Tooltip title="View Chart">
                        <IconButton 
                          size="small" 
                          sx={{ color: 'primary.main' }}
                        >
                          <ShowChart />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </StyledTableContainer>
        </motion.div>
      </Container>
    </PageContainer>
  );
};

export default memo(IpoAnalyticsPage);