// src/components/IpoAdminDashboard.js
import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Paper,
  Grid,
  Card,
  CardContent,
  Snackbar,
  Alert,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Dashboard,
  TrendingUp,
  Business,
  Schedule,
  Logout
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import IpoAdminTable from './IpoAdminTable';
import IpoAddForm from './IpoAddForm';
import IpoDetailModal from './IPO/IpoDetailModal';

const DashboardContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(4),
}));

const DashboardHeader = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
  color: 'white',
  borderRadius: theme.spacing(2),
}));

const StatsCard = styled(Card)(({ theme }) => ({
  height: '100%',
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-2px)',
  },
}));

const StatsIcon = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 60,
  height: 60,
  borderRadius: '50%',
  marginBottom: theme.spacing(2),
}));

const IpoAdminDashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const { state, actions } = useApp();
  const { ipos, user, isAuthenticated } = state;

  const [addFormOpen, setAddFormOpen] = useState(false);
  const [editingIpo, setEditingIpo] = useState(null);
  const [viewingIpo, setViewingIpo] = useState(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'info'
  });

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, navigate]);

  // Fetch IPOs on component mount
  useEffect(() => {
    if (isAuthenticated) {
      actions.fetchIpos();
    }
  }, [isAuthenticated, actions]);

  // Calculate statistics
  const stats = {
    total: ipos.length,
    upcoming: ipos.filter(ipo => {
      const now = new Date();
      const openDate = new Date(ipo.ipoOpenDate);
      return openDate > now;
    }).length,
    open: ipos.filter(ipo => {
      const now = new Date();
      const openDate = new Date(ipo.ipoOpenDate);
      const closeDate = new Date(ipo.ipoCloseDate);
      return openDate <= now && now <= closeDate;
    }).length,
    closed: ipos.filter(ipo => {
      const now = new Date();
      const closeDate = new Date(ipo.ipoCloseDate);
      return closeDate < now;
    }).length
  };

  const handleAddIpo = () => {
    setEditingIpo(null);
    setAddFormOpen(true);
  };

  const handleEditIpo = (ipo) => {
    setEditingIpo(ipo);
    setAddFormOpen(true);
  };

  const handleViewIpo = (ipo) => {
    setViewingIpo(ipo);
    setDetailModalOpen(true);
  };

  const handleCloseAddForm = () => {
    setAddFormOpen(false);
    setEditingIpo(null);
  };

  const handleCloseDetailModal = () => {
    setDetailModalOpen(false);
    setViewingIpo(null);
  };

  const handleLogout = () => {
    actions.logout();
    navigate('/admin/login');
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  return (
    <>
      <DashboardContainer maxWidth="lg">
        {/* Dashboard Header */}
        <DashboardHeader elevation={0}>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            flexDirection: isMobile ? 'column' : 'row',
            gap: isMobile ? 2 : 0
          }}>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                <Dashboard sx={{ mr: 2, verticalAlign: 'middle' }} />
                IPO Admin Dashboard
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.9 }}>
                Welcome back, {user?.username || 'Admin'}!
              </Typography>
            </Box>
            <Button
              variant="outlined"
              color="inherit"
              startIcon={<Logout />}
              onClick={handleLogout}
              sx={{ 
                borderColor: 'rgba(255,255,255,0.5)',
                '&:hover': {
                  borderColor: 'white',
                  backgroundColor: 'rgba(255,255,255,0.1)'
                }
              }}
            >
              Logout
            </Button>
          </Box>
        </DashboardHeader>

        {/* Statistics Cards */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} md={3}>
            <StatsCard>
              <CardContent sx={{ textAlign: 'center' }}>
                <StatsIcon sx={{ backgroundColor: 'primary.light', mx: 'auto' }}>
                  <Business sx={{ color: 'primary.main', fontSize: 30 }} />
                </StatsIcon>
                <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main' }}>
                  {stats.total}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total IPOs
                </Typography>
              </CardContent>
            </StatsCard>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <StatsCard>
              <CardContent sx={{ textAlign: 'center' }}>
                <StatsIcon sx={{ backgroundColor: 'info.light', mx: 'auto' }}>
                  <Schedule sx={{ color: 'info.main', fontSize: 30 }} />
                </StatsIcon>
                <Typography variant="h4" sx={{ fontWeight: 700, color: 'info.main' }}>
                  {stats.upcoming}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Upcoming
                </Typography>
              </CardContent>
            </StatsCard>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <StatsCard>
              <CardContent sx={{ textAlign: 'center' }}>
                <StatsIcon sx={{ backgroundColor: 'success.light', mx: 'auto' }}>
                  <TrendingUp sx={{ color: 'success.main', fontSize: 30 }} />
                </StatsIcon>
                <Typography variant="h4" sx={{ fontWeight: 700, color: 'success.main' }}>
                  {stats.open}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Currently Open
                </Typography>
              </CardContent>
            </StatsCard>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <StatsCard>
              <CardContent sx={{ textAlign: 'center' }}>
                <StatsIcon sx={{ backgroundColor: 'error.light', mx: 'auto' }}>
                  <Business sx={{ color: 'error.main', fontSize: 30 }} />
                </StatsIcon>
                <Typography variant="h4" sx={{ fontWeight: 700, color: 'error.main' }}>
                  {stats.closed}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Closed
                </Typography>
              </CardContent>
            </StatsCard>
          </Grid>
        </Grid>

        {/* IPO Management Table */}
        <IpoAdminTable
          onAdd={handleAddIpo}
          onEdit={handleEditIpo}
          onView={handleViewIpo}
        />
      </DashboardContainer>

      {/* Add/Edit IPO Form Modal */}
      <IpoAddForm
        open={addFormOpen}
        onClose={handleCloseAddForm}
        editingIpo={editingIpo}
      />

      {/* IPO Detail Modal */}
      <IpoDetailModal
        open={detailModalOpen}
        onClose={handleCloseDetailModal}
        ipo={viewingIpo}
      />

      {/* Success/Error Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default IpoAdminDashboard;