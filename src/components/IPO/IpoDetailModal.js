// src/components/IPO/IpoDetailModal.js
import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Grid,
  Chip,
  Divider,
  IconButton,
  Link,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Close,
  CalendarToday,
  TrendingUp,
  Business,
  Launch,
  GetApp,
  Info
} from '@mui/icons-material';
import { formatDate, formatCurrency, getIpoStatus, getStatusColor } from '../../utils/helpers';

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: 20,
    maxWidth: '900px',
    boxShadow: '0 24px 48px rgba(0, 0, 0, 0.15)',
    overflow: 'visible',
  },
  '& .MuiBackdrop-root': {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    backdropFilter: 'blur(4px)',
  }
}));

const HeaderSection = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
  color: 'white',
  padding: theme.spacing(3),
  margin: theme.spacing(-3, -3, 3, -3),
  borderRadius: '20px 20px 0 0',
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: -10,
    left: '50%',
    transform: 'translateX(-50%)',
    width: 60,
    height: 4,
    backgroundColor: theme.palette.primary.light,
    borderRadius: 2,
  }
}));

const InfoCard = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
  padding: theme.spacing(3),
  borderRadius: 16,
  border: '1px solid rgba(0, 0, 0, 0.08)',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
  }
}));

const InfoRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  marginBottom: theme.spacing(1),
  '&:last-child': {
    marginBottom: 0,
  },
}));

const StatusChip = styled(Chip)(({ status }) => ({
  backgroundColor: getStatusColor(status),
  color: 'white',
  fontWeight: 600,
}));

const IpoDetailModal = ({ open, onClose, ipo, onApply }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  if (!ipo) return null;

  const status = getIpoStatus(ipo.ipoOpenDate, ipo.ipoCloseDate);

  const handleApplyClick = () => {
    if (onApply) {
      onApply(ipo);
    }
  };

  const handleDownloadRHP = () => {
    if (ipo.rhpLink) {
      window.open(ipo.rhpLink, '_blank');
    }
  };

  return (
    <StyledDialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      fullScreen={isMobile}
    >
      <DialogTitle>
        <HeaderSection>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
              {ipo.companyName}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <StatusChip 
                label={status.toUpperCase()} 
                status={status}
                size="small"
              />
              <Typography variant="body2" color="text.secondary">
                {ipo.sector}
              </Typography>
            </Box>
          </Box>
          <IconButton onClick={onClose} size="small">
            <Close />
          </IconButton>
        </HeaderSection>
      </DialogTitle>

      <DialogContent>
        {/* Price Band Highlight */}
        <InfoCard sx={{ mb: 3, textAlign: 'center', backgroundColor: 'primary.light' }}>
          <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.contrastText' }}>
            {ipo.priceBand}
          </Typography>
          <Typography variant="body2" sx={{ color: 'primary.contrastText', opacity: 0.9 }}>
            Price Band
          </Typography>
        </InfoCard>

        {/* Key Information */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <InfoCard>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                <CalendarToday sx={{ mr: 1, verticalAlign: 'middle' }} />
                Timeline
              </Typography>
              
              <InfoRow>
                <Typography variant="body2" color="text.secondary" sx={{ minWidth: '80px' }}>
                  Open:
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {formatDate(ipo.ipoOpenDate)}
                </Typography>
              </InfoRow>
              
              <InfoRow>
                <Typography variant="body2" color="text.secondary" sx={{ minWidth: '80px' }}>
                  Close:
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {formatDate(ipo.ipoCloseDate)}
                </Typography>
              </InfoRow>
              
              {ipo.listingDate && (
                <InfoRow>
                  <Typography variant="body2" color="text.secondary" sx={{ minWidth: '80px' }}>
                    Listing:
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {formatDate(ipo.listingDate)}
                  </Typography>
                </InfoRow>
              )}
            </InfoCard>
          </Grid>

          <Grid item xs={12} md={6}>
            <InfoCard>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                <TrendingUp sx={{ mr: 1, verticalAlign: 'middle' }} />
                Investment Details
              </Typography>
              
              <InfoRow>
                <Typography variant="body2" color="text.secondary" sx={{ minWidth: '80px' }}>
                  Lot Size:
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {ipo.lotSize} shares
                </Typography>
              </InfoRow>
              
              <InfoRow>
                <Typography variant="body2" color="text.secondary" sx={{ minWidth: '80px' }}>
                  Min. Invest:
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {formatCurrency(ipo.minInvestment)}
                </Typography>
              </InfoRow>
              
              <InfoRow>
                <Typography variant="body2" color="text.secondary" sx={{ minWidth: '80px' }}>
                  Issue Size:
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {ipo.issueSize}
                </Typography>
              </InfoRow>
            </InfoCard>
          </Grid>
        </Grid>

        {/* Company Description */}
        {ipo.description && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              <Business sx={{ mr: 1, verticalAlign: 'middle' }} />
              About the Company
            </Typography>
            <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
              {ipo.description}
            </Typography>
          </Box>
        )}

        <Divider sx={{ my: 3 }} />

        {/* Documents */}
        <Box>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            <Info sx={{ mr: 1, verticalAlign: 'middle' }} />
            Documents & Links
          </Typography>
          
          {ipo.rhpLink && (
            <Button
              variant="outlined"
              startIcon={<GetApp />}
              onClick={handleDownloadRHP}
              sx={{ mr: 2, mb: 1 }}
            >
              Download RHP
            </Button>
          )}
          
          <Link
            href="#"
            underline="hover"
            sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5 }}
          >
            <Launch sx={{ fontSize: 16 }} />
            Company Website
          </Link>
        </Box>

        {/* Risk Disclaimer */}
        <Box sx={{ 
          mt: 3, 
          p: 2, 
          backgroundColor: 'warning.light', 
          borderRadius: 1,
          border: '1px solid',
          borderColor: 'warning.main'
        }}>
          <Typography variant="body2" sx={{ fontWeight: 500, mb: 1 }}>
            Investment Risk Disclaimer
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Investments in IPOs are subject to market risks. Please read all related documents 
            carefully before investing. Past performance is not indicative of future results.
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 0 }}>
        <Button onClick={onClose} color="inherit">
          Close
        </Button>
        <Button
          variant="contained"
          onClick={handleApplyClick}
          disabled={status === 'closed'}
          startIcon={<Launch />}
          size="large"
        >
          {status === 'closed' ? 'IPO Closed' : 'Apply Now'}
        </Button>
      </DialogActions>
    </StyledDialog>
  );
};

export default IpoDetailModal;