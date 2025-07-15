// src/components/IpoCard.js
import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  Chip,
  Grid,
  Divider,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  CalendarToday,
  TrendingUp,
  AccountBalance,
  Info,
  Launch
} from '@mui/icons-material';
import { formatDate, getIpoStatus, getDaysRemaining } from '../utils/helpers';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  cursor: 'pointer',
  borderRadius: 16,
  border: '1px solid rgba(0, 0, 0, 0.08)',
  background: 'linear-gradient(145deg, #ffffff 0%, #fafbfc 100%)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 20px 40px rgba(25, 118, 210, 0.15)',
    '&::before': {
      opacity: 1,
    }
  },
}));

const CompanyHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  marginBottom: theme.spacing(2),
}));

const CompanyLogo = styled(Box)(({ theme }) => ({
  width: 48,
  height: 48,
  borderRadius: 12,
  background: `linear-gradient(135deg, ${theme.palette.primary.main}15, ${theme.palette.primary.light}08)`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: theme.spacing(2),
  flexShrink: 0,
  '& svg': {
    color: theme.palette.primary.main,
    fontSize: 24,
  }
}));

const InfoRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  marginBottom: theme.spacing(1.5),
  '& svg': {
    fontSize: 18,
    color: theme.palette.text.secondary,
  }
}));

const StatusChip = styled(Chip)(({ status, theme }) => {
  const getStatusStyles = (status) => {
    switch (status) {
      case 'open':
        return {
          backgroundColor: theme.palette.success.main,
          color: 'white',
          '&::before': {
            content: '""',
            width: 6,
            height: 6,
            borderRadius: '50%',
            backgroundColor: 'white',
            marginRight: theme.spacing(0.5),
            animation: 'pulse 2s infinite',
          }
        };
      case 'upcoming':
        return {
          backgroundColor: theme.palette.info.main,
          color: 'white',
        };
      case 'closed':
        return {
          backgroundColor: theme.palette.error.main,
          color: 'white',
        };
      default:
        return {
          backgroundColor: theme.palette.grey[500],
          color: 'white',
        };
    }
  };

  return {
    fontWeight: 600,
    fontSize: '0.75rem',
    height: 24,
    borderRadius: 12,
    ...getStatusStyles(status),
  };
});

const PriceBadge = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
  color: 'white',
  padding: theme.spacing(1, 2),
  borderRadius: 12,
  textAlign: 'center',
  marginBottom: theme.spacing(2),
}));



const IpoCard = ({ ipo, onViewDetails, onApply }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const status = getIpoStatus(ipo.ipoOpenDate, ipo.ipoCloseDate);
  const daysRemaining = getDaysRemaining(ipo.ipoOpenDate);

  const handleCardClick = () => {
    if (onViewDetails) {
      onViewDetails(ipo);
    }
  };

  const handleApplyClick = (e) => {
    e.stopPropagation();
    if (onApply) {
      onApply(ipo);
    }
  };

  return (
    <StyledCard onClick={handleCardClick}>
      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        <CompanyHeader>
          <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
            <CompanyLogo>
              <AccountBalance />
            </CompanyLogo>
            <Box sx={{ flex: 1 }}>
              <Typography 
                variant="h6" 
                component="h2" 
                sx={{ 
                  fontWeight: 700,
                  fontSize: isMobile ? '1.1rem' : '1.25rem',
                  lineHeight: 1.2,
                  mb: 0.5
                }}
              >
                {ipo.companyName}
              </Typography>
              <Typography 
                variant="body2" 
                color="text.secondary" 
                sx={{ fontWeight: 500 }}
              >
                {ipo.sector}
              </Typography>
            </Box>
          </Box>
          <StatusChip
            label={status.toUpperCase()}
            status={status}
            size="small"
          />
        </CompanyHeader>

        <PriceBadge>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
            {ipo.priceBand}
          </Typography>
          <Typography variant="caption" sx={{ opacity: 0.9 }}>
            Price Band
          </Typography>
        </PriceBadge>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <InfoRow>
              <CalendarToday sx={{ fontSize: 16, color: 'text.secondary' }} />
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Open Date
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {formatDate(ipo.ipoOpenDate)}
                </Typography>
              </Box>
            </InfoRow>
          </Grid>

          <Grid item xs={12} sm={6}>
            <InfoRow>
              <CalendarToday sx={{ fontSize: 16, color: 'text.secondary' }} />
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Close Date
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {formatDate(ipo.ipoCloseDate)}
                </Typography>
              </Box>
            </InfoRow>
          </Grid>

          <Grid item xs={12} sm={6}>
            <InfoRow>
              <TrendingUp sx={{ fontSize: 16, color: 'text.secondary' }} />
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Lot Size
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {ipo.lotSize} shares
                </Typography>
              </Box>
            </InfoRow>
          </Grid>

          <Grid item xs={12} sm={6}>
            <InfoRow>
              <AccountBalance sx={{ fontSize: 16, color: 'text.secondary' }} />
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Issue Size
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {ipo.issueSize}
                </Typography>
              </Box>
            </InfoRow>
          </Grid>
        </Grid>

        {status === 'upcoming' && daysRemaining > 0 && (
          <Box sx={{ mt: 2, p: 1, backgroundColor: '#e3f2fd', borderRadius: 1 }}>
            <Typography variant="body2" color="primary" sx={{ fontWeight: 500 }}>
              Opens in {daysRemaining} day{daysRemaining !== 1 ? 's' : ''}
            </Typography>
          </Box>
        )}

        {ipo.description && (
          <>
            <Divider sx={{ my: 2 }} />
            <Typography variant="body2" color="text.secondary">
              {ipo.description.length > 100 
                ? `${ipo.description.substring(0, 100)}...` 
                : ipo.description
              }
            </Typography>
          </>
        )}
      </CardContent>

      <CardActions sx={{ p: 3, pt: 0, gap: 1 }}>
        <Button
          variant="outlined"
          size="medium"
          startIcon={<Info />}
          onClick={handleCardClick}
          sx={{ 
            flex: 1,
            borderRadius: 2,
            fontWeight: 600,
            borderColor: theme.palette.primary.main + '40',
            color: theme.palette.primary.main,
            '&:hover': {
              borderColor: theme.palette.primary.main,
              backgroundColor: theme.palette.primary.main + '08',
            }
          }}
        >
          Details
        </Button>
        
        <Button
          variant="contained"
          size="medium"
          startIcon={<Launch />}
          onClick={handleApplyClick}
          disabled={status === 'closed'}
          sx={{ 
            flex: 1,
            borderRadius: 2,
            fontWeight: 600,
            background: status === 'closed' 
              ? theme.palette.grey[400]
              : `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
            '&:hover': status !== 'closed' ? {
              background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
              transform: 'translateY(-1px)',
              boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)',
            } : {},
            '&:disabled': {
              background: theme.palette.grey[400],
              color: 'white',
            }
          }}
        >
          {status === 'closed' ? 'Closed' : 'Apply Now'}
        </Button>
      </CardActions>
    </StyledCard>
  );
};

export default IpoCard;