// src/pages/IpoPage.js
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Container, 
  Typography, 
  Box, 
  Snackbar, 
  Alert, 
  Button,
  Card,
  CardContent,
  Grid,
  Chip,
  IconButton,
  useTheme,
  useMediaQuery,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
  TextField,
  InputAdornment
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { 
  TrendingUp, 
  Schedule, 
  Info, 
  ExpandMore,
  AccountBalance,
  Assessment,
  Forum,
  Article,
  Search,
  Description,
  PictureAsPdf,
  BusinessCenter,
  CalendarToday,
  TrendingUpOutlined
} from '@mui/icons-material';
import { useApp } from '../context/AppContext';
import SearchFilters from '../components/IPO/SearchFilters';
import IpoList from '../components/IpoList';
import IpoDetailModal from '../components/IPO/IpoDetailModal';

const PageContainer = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #f7f8ff 0%, #e8f2ff 50%, #f0f8ff 100%)',
  minHeight: '100vh',
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(6),
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '200px',
    background: 'linear-gradient(135deg, rgba(103, 58, 183, 0.1) 0%, rgba(63, 81, 181, 0.1) 100%)',
    zIndex: 0,
  },
  '& > *': {
    position: 'relative',
    zIndex: 1,
  },
}));

const SectionContainer = styled(Container)(({ theme }) => ({
  marginBottom: theme.spacing(8),
  [theme.breakpoints.down('md')]: {
    marginBottom: theme.spacing(6),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  [theme.breakpoints.down('sm')]: {
    marginBottom: theme.spacing(4),
    paddingLeft: theme.spacing(1.5),
    paddingRight: theme.spacing(1.5),
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  marginBottom: theme.spacing(4),
  color: theme.palette.text.primary,
  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: '-8px',
    left: 0,
    width: '60px',
    height: '4px',
    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    borderRadius: '2px',
  },
  [theme.breakpoints.down('md')]: {
    fontSize: '1.75rem',
    marginBottom: theme.spacing(3),
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.5rem',
    marginBottom: theme.spacing(2.5),
    textAlign: 'center',
    '&::after': {
      left: '50%',
      transform: 'translateX(-50%)',
    },
  },
}));

const IPOCard = styled(Card)(({ theme }) => ({
  minWidth: 280,
  backgroundColor: 'white',
  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
  borderRadius: theme.spacing(2),
  border: '1px solid rgba(103, 58, 183, 0.1)',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  },
  '&:hover': {
    transform: 'translateY(-8px) scale(1.02)',
    boxShadow: '0 12px 40px rgba(103, 58, 183, 0.2)',
    borderColor: theme.palette.primary.main,
  },
  [theme.breakpoints.down('md')]: {
    minWidth: 260,
  },
  [theme.breakpoints.down('sm')]: {
    minWidth: 240,
    '&:hover': {
      transform: 'translateY(-4px)',
    },
  },
}));

const ScrollContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(3),
  overflowX: 'auto',
  paddingBottom: theme.spacing(3),
  paddingTop: theme.spacing(1),
  scrollBehavior: 'smooth',
  '&::-webkit-scrollbar': {
    height: 8,
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 4,
  },
  '&::-webkit-scrollbar-thumb': {
    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    borderRadius: 4,
    '&:hover': {
      background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
    },
  },
  [theme.breakpoints.down('sm')]: {
    gap: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
}));

const InfoBox = styled(Paper)(({ theme }) => ({
  background: 'linear-gradient(135deg, #ffffff 0%, #f8faff 100%)',
  padding: theme.spacing(6),
  textAlign: 'center',
  borderRadius: theme.spacing(3),
  boxShadow: '0 8px 32px rgba(103, 58, 183, 0.12)',
  border: '1px solid rgba(103, 58, 183, 0.1)',
  maxWidth: 700,
  margin: '0 auto',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '6px',
    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  },
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(4),
    maxWidth: '100%',
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(3),
    borderRadius: theme.spacing(2),
  },
}));

const NewsAnalysisCard = styled(Card)(({ theme }) => ({
  background: 'linear-gradient(135deg, #ffffff 0%, #f8faff 100%)',
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2.5),
  boxShadow: '0 6px 24px rgba(0,0,0,0.08)',
  border: '1px solid rgba(103, 58, 183, 0.1)',
  height: '100%',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  },
  '&:hover': {
    transform: 'translateY(-6px)',
    boxShadow: '0 12px 40px rgba(103, 58, 183, 0.15)',
    borderColor: theme.palette.primary.main,
  },
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(3),
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2.5),
    '&:hover': {
      transform: 'translateY(-3px)',
    },
  },
}));

const FAQAccordion = styled(Accordion)(({ theme }) => ({
  backgroundColor: 'white',
  marginBottom: theme.spacing(1.5),
  borderRadius: `${theme.spacing(1.5)} !important`,
  boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
  border: '1px solid rgba(103, 58, 183, 0.08)',
  transition: 'all 0.3s ease',
  '&:before': {
    display: 'none',
  },
  '&:hover': {
    boxShadow: '0 4px 20px rgba(103, 58, 183, 0.12)',
    borderColor: 'rgba(103, 58, 183, 0.2)',
  },
  '&.Mui-expanded': {
    margin: `${theme.spacing(1.5)} 0`,
    boxShadow: '0 6px 24px rgba(103, 58, 183, 0.15)',
    borderColor: theme.palette.primary.main,
  },
}));

const StatusChip = styled(Chip)(({ theme, status }) => ({
  fontSize: '0.75rem',
  fontWeight: 600,
  height: 24,
  borderRadius: 12,
  ...(status === 'ongoing' && {
    backgroundColor: '#e8f5e8',
    color: '#2e7d32',
    border: '1px solid #4caf50',
  }),
  ...(status === 'upcoming' && {
    backgroundColor: '#fff3e0',
    color: '#f57c00',
    border: '1px solid #ff9800',
  }),
  ...(status === 'listed' && {
    backgroundColor: '#e3f2fd',
    color: '#1976d2',
    border: '1px solid #2196f3',
  }),
}));

const PriceTag = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  color: 'white',
  padding: theme.spacing(0.5, 1.5),
  borderRadius: theme.spacing(3),
  fontSize: '0.875rem',
  fontWeight: 600,
  display: 'inline-block',
  marginBottom: theme.spacing(1),
}));

const IpoPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  
  const { state, actions } = useApp();
  const { ipos, loading, error, filters } = state;
  
  const [selectedIpo, setSelectedIpo] = useState(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [faqSearchTerm, setFaqSearchTerm] = useState('');
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'info'
  });

  const ipoListRef = useRef(null);

  // Handle View All button clicks
  const handleViewAllOngoing = () => {
    setSnackbar({
      open: true,
      message: 'Navigating to all ongoing IPOs...',
      severity: 'info'
    });
    // Here you would typically navigate to a dedicated ongoing IPOs page
    // For now, we'll just show a message
  };

  const handleViewAllUpcoming = () => {
    setSnackbar({
      open: true,
      message: 'Navigating to all upcoming IPOs...',
      severity: 'info'
    });
    // Here you would typically navigate to a dedicated upcoming IPOs page
  };

  const handleViewAllListed = () => {
    setSnackbar({
      open: true,
      message: 'Navigating to all recently listed IPOs...',
      severity: 'info'
    });
    // Here you would typically navigate to a dedicated listed IPOs page
  };

  // Mock data for demonstration
  const ongoingIPOs = [
    {
      name: "Niva Bupa Health",
      priceRange: "₹200-₹220",
      openDate: "18 Jul 2025",
      closeDate: "22 Jul 2025",
      issueSize: "₹2,200 Cr",
      issueType: "Book Building",
      listingDate: "25 Jul 2025",
      status: "ongoing",
      rhpUrl: "#",
      drhpUrl: "#"
    },
    {
      name: "EPAK Durable Ltd.",
      priceRange: "₹150-₹180",
      openDate: "18 Jul 2025",
      closeDate: "22 Jul 2025",
      issueSize: "₹850 Cr",
      issueType: "Book Building",
      listingDate: "25 Jul 2025",
      status: "ongoing",
      rhpUrl: "#",
      drhpUrl: "#"
    },
    {
      name: "TK Spandex Ltd.",
      priceRange: "₹300-₹350",
      openDate: "18 Jul 2025",
      closeDate: "22 Jul 2025",
      issueSize: "₹1,500 Cr",
      issueType: "Book Building",
      listingDate: "25 Jul 2025",
      status: "ongoing",
      rhpUrl: "#",
      drhpUrl: "#"
    }
  ];

  const upcomingIPOs = [
    {
      name: "Medi Assist Healthcare",
      priceRange: "₹180-₹200",
      openDate: "25 Jul 2025",
      closeDate: "29 Jul 2025",
      issueSize: "₹1,200 Cr",
      issueType: "Book Building",
      listingDate: "01 Aug 2025",
      status: "upcoming",
      rhpUrl: "#",
      drhpUrl: "#"
    }
  ];

  const recentlyListedIPOs = [
    {
      name: "Asarfi Hospitals",
      ipoPrice: "₹180",
      listingPrice: "₹225",
      listingGain: "+25.0%",
      listingDate: "15 Jul 2025",
      cmp: "₹240",
      currentReturn: "+33.3%",
      status: "listed",
      rhpUrl: "#",
      drhpUrl: "#"
    },
    {
      name: "Innoka Capital",
      ipoPrice: "₹150",
      listingPrice: "₹135",
      listingGain: "-10.0%",
      listingDate: "15 Jul 2025",
      cmp: "₹142",
      currentReturn: "-5.3%",
      status: "listed",
      rhpUrl: "#",
      drhpUrl: "#"
    },
    {
      name: "Accord Infotech",
      ipoPrice: "₹200",
      listingPrice: "₹280",
      listingGain: "+40.0%",
      listingDate: "15 Jul 2025",
      cmp: "₹295",
      currentReturn: "+47.5%",
      status: "listed",
      rhpUrl: "#",
      drhpUrl: "#"
    }
  ];

  const faqData = [
    {
      question: "What is an IPO?",
      answer: "An Initial Public Offering (IPO) is the process by which a private company offers shares to the public for the first time. It allows companies to raise capital from public investors and enables retail and institutional investors to buy shares in the company. Through an IPO, a company transitions from being privately held to publicly traded on stock exchanges."
    },
    {
      question: "How to invest in an IPO?",
      answer: "To invest in an IPO, you need a Demat account and trading account with a registered broker. You can apply through your broker's online platform, mobile app, or visit their branch. Fill the application form with your details, select the number of shares, and make the payment. The application process is usually open for 3-5 days during the IPO period."
    },
    {
      question: "What is the benefit of an IPO?",
      answer: "IPO investments offer several benefits: potential for high returns if the company performs well, opportunity to invest in growing companies at an early stage, liquidity as shares can be traded on exchanges, and the chance to be part of a company's growth story. Additionally, IPOs often provide better transparency and corporate governance."
    },
    {
      question: "What are the disadvantages of an IPO?",
      answer: "IPO investments carry risks including price volatility on listing day, potential losses if the company underperforms, limited historical data for new companies, market risks, and the possibility of overvaluation. There's also no guarantee of allotment in oversubscribed IPOs, and lock-in periods may apply for certain categories."
    },
    {
      question: "What is the difference between book building issue and fixed price issue?",
      answer: "In a book building issue, the company provides a price band (e.g., ₹100-120) and investors bid within this range. The final price is determined based on demand. In a fixed price issue, the company sets a specific price, and investors apply at that fixed price. Book building is more common and allows price discovery based on market demand."
    },
    {
      question: "Is it mandatory to have a PAN number to apply in an IPO?",
      answer: "Yes, having a PAN (Permanent Account Number) is mandatory for applying in any IPO in India. PAN is required for KYC compliance and tax purposes. Additionally, you need a valid Demat account and bank account linked to your PAN for IPO applications."
    },
    {
      question: "Where do I get an IPO application form?",
      answer: "IPO application forms are available at broker offices, banks, and online platforms. However, most applications are now done electronically through broker websites, mobile apps, or internet banking. Physical forms are rarely used as online applications are more convenient and efficient."
    },
    {
      question: "How one can apply in IPO's online?",
      answer: "To apply online: 1) Log into your broker's trading platform or mobile app, 2) Navigate to the IPO section, 3) Select the IPO you want to apply for, 4) Enter the number of shares and bid price (for book building), 5) Provide UPI ID or select payment method, 6) Review and submit your application. Ensure sufficient funds are available in your account."
    },
    {
      question: "How one can apply in IPO's offline?",
      answer: "For offline applications: 1) Obtain physical application form from broker or bank, 2) Fill in all required details including DP ID, Client ID, and bank details, 3) Attach a cheque or demand draft for the application amount, 4) Submit the form at the designated collection centers before the deadline. However, online applications are recommended for faster processing."
    },
    {
      question: "Can a minor apply in an IPO?",
      answer: "Yes, minors can apply for IPOs through their guardian. The application must be made in the minor's name with the guardian acting on their behalf. Required documents include minor's PAN card, guardian's PAN card, birth certificate, and a Demat account opened in the minor's name with guardian as the operator."
    },
    {
      question: "What is the procedure to withdraw from an IPO?",
      answer: "IPO applications cannot be withdrawn or cancelled once submitted during the bidding period. However, you can modify your bid (price or quantity) multiple times during the IPO period through your broker's platform. The application becomes final after the IPO closes, and refunds are processed automatically for unallotted applications."
    },
    {
      question: "How is IPO return calculated?",
      answer: "IPO returns are calculated as: ((Current Market Price - IPO Price) / IPO Price) × 100. For example, if you bought shares at ₹100 IPO price and current market price is ₹150, your return is ((150-100)/100) × 100 = 50%. Returns can be calculated for listing day gains or long-term performance based on your holding period."
    },
    {
      question: "Can one apply for an IPO from a sweep in/out saving bank account?",
      answer: "It's not recommended to apply for IPOs from sweep-in/sweep-out accounts as the funds might be automatically transferred to fixed deposits, potentially causing application rejection due to insufficient balance. It's better to use a regular savings account or current account with adequate balance maintained throughout the IPO process."
    },
    {
      question: "What is the minimum and maximum investment one could do in the HNI category?",
      answer: "For HNI (High Net Worth Individual) category, the minimum investment is ₹2 lakhs and above. There's no upper limit for HNI applications. HNI category is for applications above the retail limit (₹2 lakhs) and below ₹10 crores. Applications above ₹10 crores fall under the QIB (Qualified Institutional Buyer) category."
    },
    {
      question: "How to apply more than one application in an IPO?",
      answer: "Multiple applications from the same PAN are not allowed and will be rejected. However, you can apply through different family members' Demat accounts (spouse, children, parents) with their respective PANs. Each application should be from a unique PAN and Demat account combination. Ensure each person meets the eligibility criteria independently."
    }
  ];

  // Fetch IPOs on component mount and when filters change
  useEffect(() => {
    actions.fetchIpos(filters);
  }, [filters, actions]);

  const handleViewDetails = (ipo) => {
    setSelectedIpo(ipo);
    setDetailModalOpen(true);
  };

  const handleCloseDetailModal = () => {
    setDetailModalOpen(false);
    setSelectedIpo(null);
  };

  const handleApply = (ipo) => {
    setSnackbar({
      open: true,
      message: `Application initiated for ${ipo.companyName || ipo.name}. You will be redirected to the application portal.`,
      severity: 'success'
    });
    
    setTimeout(() => {
      console.log('Redirecting to application portal for:', ipo.companyName || ipo.name);
    }, 2000);
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  // Filter FAQ data based on search term
  const filteredFaqData = faqData.filter(faq =>
    faq.question.toLowerCase().includes(faqSearchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(faqSearchTerm.toLowerCase())
  );

  const renderIPOCard = (ipo, showPrice = true) => (
    <IPOCard key={ipo.name}>
      <CardContent sx={{ p: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
          <Typography 
            variant="h6" 
            fontWeight="700" 
            sx={{ 
              fontSize: { xs: '1rem', sm: '1.1rem' },
              lineHeight: 1.3,
              color: 'text.primary'
            }}
          >
            {ipo.name}
          </Typography>
          <StatusChip 
            label={ipo.status} 
            status={ipo.status}
            size="small"
          />
        </Box>
        
        {/* Price Band */}
        {ipo.priceRange && (
          <PriceTag sx={{ mb: 2 }}>
            Price Band: {ipo.priceRange}
          </PriceTag>
        )}
        
        {/* IPO Details */}
        <Box sx={{ mb: 3 }}>
          {/* Open and Close Dates */}
          {ipo.openDate && (
            <Box display="flex" alignItems="center" mb={0.5}>
              <CalendarToday sx={{ fontSize: 16, mr: 1, color: 'success.main' }} />
              <Typography variant="body2" color="text.secondary">
                Open: {ipo.openDate}
              </Typography>
            </Box>
          )}
          {ipo.closeDate && (
            <Box display="flex" alignItems="center" mb={0.5}>
              <CalendarToday sx={{ fontSize: 16, mr: 1, color: 'error.main' }} />
              <Typography variant="body2" color="text.secondary">
                Close: {ipo.closeDate}
              </Typography>
            </Box>
          )}
          
          {/* Issue Size */}
          {ipo.issueSize && (
            <Box display="flex" alignItems="center" mb={0.5}>
              <BusinessCenter sx={{ fontSize: 16, mr: 1, color: 'primary.main' }} />
              <Typography variant="body2" color="text.secondary">
                Issue Size: {ipo.issueSize}
              </Typography>
            </Box>
          )}
          
          {/* Issue Type */}
          {ipo.issueType && (
            <Box display="flex" alignItems="center" mb={0.5}>
              <Assessment sx={{ fontSize: 16, mr: 1, color: 'info.main' }} />
              <Typography variant="body2" color="text.secondary">
                Issue Type: {ipo.issueType}
              </Typography>
            </Box>
          )}
          
          {/* Listing Date */}
          {ipo.listingDate && (
            <Box display="flex" alignItems="center" mb={0.5}>
              <TrendingUpOutlined sx={{ fontSize: 16, mr: 1, color: 'success.main' }} />
              <Typography variant="body2" color="text.secondary">
                Listing: {ipo.listingDate}
              </Typography>
            </Box>
          )}
        </Box>
        
        {/* Document Buttons */}
        <Box sx={{ mb: 2 }}>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Button 
                variant="outlined"
                size="small"
                fullWidth
                startIcon={<PictureAsPdf />}
                href={ipo.rhpUrl}
                target="_blank"
                sx={{ 
                  textTransform: 'none',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  borderRadius: 1.5,
                  borderColor: 'primary.main',
                  color: 'primary.main',
                  '&:hover': {
                    borderColor: 'primary.dark',
                    backgroundColor: 'primary.50',
                    transform: 'translateY(-1px)',
                  },
                }}
              >
                RHP
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button 
                variant="outlined"
                size="small"
                fullWidth
                startIcon={<Description />}
                href={ipo.drhpUrl}
                target="_blank"
                sx={{ 
                  textTransform: 'none',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  borderRadius: 1.5,
                  borderColor: 'secondary.main',
                  color: 'secondary.main',
                  '&:hover': {
                    borderColor: 'secondary.dark',
                    backgroundColor: 'secondary.50',
                    transform: 'translateY(-1px)',
                  },
                }}
              >
                DRHP
              </Button>
            </Grid>
          </Grid>
        </Box>
        
        {/* View Details Button */}
        <Button 
          variant="contained"
          size="small"
          fullWidth
          startIcon={<Info />}
          sx={{ 
            textTransform: 'none',
            fontSize: '0.875rem',
            fontWeight: 600,
            borderRadius: 2,
            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            '&:hover': {
              background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
              transform: 'translateY(-1px)',
            },
          }}
        >
          View Details
        </Button>
      </CardContent>
    </IPOCard>
  );

  const renderListedIPOCard = (ipo) => (
    <IPOCard key={ipo.name}>
      <CardContent sx={{ p: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
          <Typography 
            variant="h6" 
            fontWeight="700" 
            sx={{ 
              fontSize: { xs: '1rem', sm: '1.1rem' },
              lineHeight: 1.3,
              color: 'text.primary'
            }}
          >
            {ipo.name}
          </Typography>
          <StatusChip 
            label={ipo.status} 
            status={ipo.status}
            size="small"
          />
        </Box>
        
        {/* Price Information */}
        <Box sx={{ mb: 3 }}>
          {/* IPO Price and Listing Price */}
          <Box display="flex" justifyContent="space-between" mb={1}>
            <Box>
              <Typography variant="caption" color="text.secondary" display="block">
                IPO Price
              </Typography>
              <Typography variant="body2" fontWeight="600" color="text.primary">
                {ipo.ipoPrice}
              </Typography>
            </Box>
            <Box textAlign="right">
              <Typography variant="caption" color="text.secondary" display="block">
                Listing Price
              </Typography>
              <Typography variant="body2" fontWeight="600" color="text.primary">
                {ipo.listingPrice}
              </Typography>
            </Box>
          </Box>
          
          {/* Listing Gain */}
          <Box display="flex" alignItems="center" mb={1}>
            <TrendingUpOutlined sx={{ 
              fontSize: 16, 
              mr: 1, 
              color: ipo.listingGain.startsWith('+') ? 'success.main' : 'error.main' 
            }} />
            <Typography 
              variant="body2" 
              fontWeight="600"
              color={ipo.listingGain.startsWith('+') ? 'success.main' : 'error.main'}
            >
              Listing Gain: {ipo.listingGain}
            </Typography>
          </Box>
          
          {/* Listing Date */}
          <Box display="flex" alignItems="center" mb={1}>
            <CalendarToday sx={{ fontSize: 16, mr: 1, color: 'info.main' }} />
            <Typography variant="body2" color="text.secondary">
              Listed: {ipo.listingDate}
            </Typography>
          </Box>
          
          {/* Current Market Price and Return */}
          <Box display="flex" justifyContent="space-between" mb={1}>
            <Box>
              <Typography variant="caption" color="text.secondary" display="block">
                CMP
              </Typography>
              <Typography variant="body2" fontWeight="600" color="text.primary">
                {ipo.cmp}
              </Typography>
            </Box>
            <Box textAlign="right">
              <Typography variant="caption" color="text.secondary" display="block">
                Current Return
              </Typography>
              <Typography 
                variant="body2" 
                fontWeight="600"
                color={ipo.currentReturn.startsWith('+') ? 'success.main' : 'error.main'}
              >
                {ipo.currentReturn}
              </Typography>
            </Box>
          </Box>
        </Box>
        
        {/* Document Buttons */}
        <Box sx={{ mb: 2 }}>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Button 
                variant="outlined"
                size="small"
                fullWidth
                startIcon={<PictureAsPdf />}
                href={ipo.rhpUrl}
                target="_blank"
                sx={{ 
                  textTransform: 'none',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  borderRadius: 1.5,
                  borderColor: 'primary.main',
                  color: 'primary.main',
                  '&:hover': {
                    borderColor: 'primary.dark',
                    backgroundColor: 'primary.50',
                    transform: 'translateY(-1px)',
                  },
                }}
              >
                RHP
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button 
                variant="outlined"
                size="small"
                fullWidth
                startIcon={<Description />}
                href={ipo.drhpUrl}
                target="_blank"
                sx={{ 
                  textTransform: 'none',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  borderRadius: 1.5,
                  borderColor: 'secondary.main',
                  color: 'secondary.main',
                  '&:hover': {
                    borderColor: 'secondary.dark',
                    backgroundColor: 'secondary.50',
                    transform: 'translateY(-1px)',
                  },
                }}
              >
                DRHP
              </Button>
            </Grid>
          </Grid>
        </Box>
        
        {/* View Details Button */}
        <Button 
          variant="contained"
          size="small"
          fullWidth
          startIcon={<Info />}
          sx={{ 
            textTransform: 'none',
            fontSize: '0.875rem',
            fontWeight: 600,
            borderRadius: 2,
            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            '&:hover': {
              background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
              transform: 'translateY(-1px)',
            },
          }}
        >
          View Details
        </Button>
      </CardContent>
    </IPOCard>
  );

  return (
    <PageContainer>
      {/* Hero Section */}
      <SectionContainer maxWidth="xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Box 
            textAlign="center" 
            sx={{ 
              py: { xs: 4, sm: 6, md: 8 },
              px: { xs: 2, sm: 4 }
            }}
          >
            <Typography 
              variant={isMobile ? "h3" : "h2"} 
              component="h1"
              fontWeight="800"
              sx={{
                mb: 3,
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }
              }}
            >
              IPO Investment Hub
            </Typography>
            <Typography 
              variant={isMobile ? "h6" : "h5"}
              color="text.secondary"
              sx={{ 
                mb: 4,
                maxWidth: 800,
                mx: 'auto',
                lineHeight: 1.6,
                fontSize: { xs: '1rem', sm: '1.2rem' }
              }}
            >
              Discover, analyze, and invest in the most promising Initial Public Offerings 
              with comprehensive insights and real-time market data
            </Typography>
            <Box 
              display="flex" 
              gap={2} 
              justifyContent="center" 
              flexWrap="wrap"
              sx={{ mb: 4 }}
            >
              <Chip 
                label="500+ IPOs Tracked" 
                sx={{ 
                  backgroundColor: `${theme.palette.primary.main}15`,
                  color: 'primary.main',
                  fontWeight: 600
                }}
              />
              <Chip 
                label="Real-time Updates" 
                sx={{ 
                  backgroundColor: `${theme.palette.success.main}15`,
                  color: 'success.main',
                  fontWeight: 600
                }}
              />
              <Chip 
                label="Expert Analysis" 
                sx={{ 
                  backgroundColor: `${theme.palette.secondary.main}15`,
                  color: 'secondary.main',
                  fontWeight: 600
                }}
              />
            </Box>
          </Box>
        </motion.div>
      </SectionContainer>

      {/* Ongoing IPOs Section */}
      <SectionContainer maxWidth="xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <SectionTitle variant={isMobile ? "h6" : "h5"} sx={{ mb: 0 }}>
              Ongoing IPOs
            </SectionTitle>
            <Button
              variant="outlined"
              size="small"
              endIcon={<TrendingUp />}
              onClick={handleViewAllOngoing}
              sx={{
                textTransform: 'none',
                fontWeight: 600,
                borderRadius: 2,
                borderColor: 'primary.main',
                color: 'primary.main',
                '&:hover': {
                  borderColor: 'primary.dark',
                  backgroundColor: 'primary.50',
                  transform: 'translateY(-1px)',
                },
              }}
            >
              View All
            </Button>
          </Box>
          <ScrollContainer>
            {ongoingIPOs.map(ipo => renderIPOCard(ipo))}
          </ScrollContainer>
        </motion.div>
      </SectionContainer>

      {/* IPO Info Box */}
      <SectionContainer maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <InfoBox>
            <Box display="flex" alignItems="center" justifyContent="center" mb={3}>
              <AccountBalance sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
              <Typography 
                variant={isMobile ? "h5" : "h4"} 
                fontWeight="800" 
                sx={{
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                BLUESTOCK
              </Typography>
            </Box>
            <Typography 
              variant={isMobile ? "body2" : "body1"} 
              color="text.secondary" 
              sx={{ 
                mb: 4, 
                lineHeight: 1.7,
                fontSize: { xs: '0.95rem', sm: '1.1rem' },
                maxWidth: 500,
                mx: 'auto'
              }}
            >
              If you are planning to invest in any of these IPOs, this page will offer you necessary and
              interesting facts and information. Open an account and start applying to your favourite IPOs.
            </Typography>
            <Button 
              variant="contained" 
              size={isMobile ? "medium" : "large"}
              startIcon={<AccountBalance />}
              sx={{ 
                textTransform: 'none',
                borderRadius: 3,
                px: { xs: 3, sm: 6 },
                py: { xs: 1.5, sm: 2 },
                fontSize: { xs: '0.95rem', sm: '1.1rem' },
                fontWeight: 700,
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                boxShadow: '0 4px 20px rgba(103, 58, 183, 0.3)',
                '&:hover': {
                  background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 25px rgba(103, 58, 183, 0.4)',
                },
              }}
            >
              Open a Free Demat Account
            </Button>
          </InfoBox>
        </motion.div>
      </SectionContainer>

      {/* Upcoming IPOs Section */}
      <SectionContainer maxWidth="xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <SectionTitle variant={isMobile ? "h6" : "h5"} sx={{ mb: 0 }}>
              Upcoming IPOs
            </SectionTitle>
            <Button
              variant="outlined"
              size="small"
              endIcon={<Schedule />}
              onClick={handleViewAllUpcoming}
              sx={{
                textTransform: 'none',
                fontWeight: 600,
                borderRadius: 2,
                borderColor: 'secondary.main',
                color: 'secondary.main',
                '&:hover': {
                  borderColor: 'secondary.dark',
                  backgroundColor: 'secondary.50',
                  transform: 'translateY(-1px)',
                },
              }}
            >
              View All
            </Button>
          </Box>
          <ScrollContainer>
            {upcomingIPOs.map(ipo => renderIPOCard(ipo, true))}
          </ScrollContainer>
        </motion.div>
      </SectionContainer>

      {/* Recently Listed IPOs Section */}
      <SectionContainer maxWidth="xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <SectionTitle variant={isMobile ? "h6" : "h5"} sx={{ mb: 0 }}>
              Recently Listed IPOs
            </SectionTitle>
            <Button
              variant="outlined"
              size="small"
              endIcon={<TrendingUpOutlined />}
              onClick={handleViewAllListed}
              sx={{
                textTransform: 'none',
                fontWeight: 600,
                borderRadius: 2,
                borderColor: 'success.main',
                color: 'success.main',
                '&:hover': {
                  borderColor: 'success.dark',
                  backgroundColor: 'success.50',
                  transform: 'translateY(-1px)',
                },
              }}
            >
              View All
            </Button>
          </Box>
          <Grid container spacing={2}>
            {recentlyListedIPOs.map((ipo, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                {renderListedIPOCard(ipo)}
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </SectionContainer>

      {/* News and Analysis Section */}
      <SectionContainer maxWidth="xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Grid container spacing={{ xs: 2, md: 4 }}>
            <Grid item xs={12} md={6}>
              <NewsAnalysisCard>
                <Box display="flex" alignItems="center" mb={3}>
                  <Box 
                    sx={{ 
                      p: 1.5, 
                      borderRadius: 2, 
                      background: `linear-gradient(135deg, ${theme.palette.primary.main}20, ${theme.palette.secondary.main}20)`,
                      mr: 2 
                    }}
                  >
                    <Article sx={{ fontSize: 28, color: 'primary.main' }} />
                  </Box>
                  <Typography variant="h5" fontWeight="700" color="text.primary">
                    IPO News
                  </Typography>
                </Box>
                <Typography 
                  variant="body1" 
                  color="text.secondary" 
                  sx={{ 
                    lineHeight: 1.7,
                    fontSize: { xs: '0.95rem', sm: '1rem' },
                    mb: 3
                  }}
                >
                  Latest IPO-related developments and reports. Stay updated with market trends,
                  regulatory changes, and company announcements.
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  sx={{
                    textTransform: 'none',
                    borderRadius: 2,
                    fontWeight: 600,
                    borderColor: 'primary.main',
                    '&:hover': {
                      background: `${theme.palette.primary.main}10`,
                    },
                  }}
                >
                  Read Latest News
                </Button>
              </NewsAnalysisCard>
            </Grid>
            <Grid item xs={12} md={6}>
              <NewsAnalysisCard>
                <Box display="flex" alignItems="center" mb={3}>
                  <Box 
                    sx={{ 
                      p: 1.5, 
                      borderRadius: 2, 
                      background: `linear-gradient(135deg, ${theme.palette.primary.main}20, ${theme.palette.secondary.main}20)`,
                      mr: 2 
                    }}
                  >
                    <Assessment sx={{ fontSize: 28, color: 'primary.main' }} />
                  </Box>
                  <Typography variant="h5" fontWeight="700" color="text.primary">
                    IPO Analysis
                  </Typography>
                </Box>
                <Typography 
                  variant="body1" 
                  color="text.secondary" 
                  sx={{ 
                    lineHeight: 1.7,
                    fontSize: { xs: '0.95rem', sm: '1rem' },
                    mb: 3
                  }}
                >
                  In-depth study on IPO performance and valuation. Expert insights and 
                  comprehensive analysis to help you make informed investment decisions.
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  sx={{
                    textTransform: 'none',
                    borderRadius: 2,
                    fontWeight: 600,
                    borderColor: 'primary.main',
                    '&:hover': {
                      background: `${theme.palette.primary.main}10`,
                    },
                  }}
                >
                  View Analysis
                </Button>
              </NewsAnalysisCard>
            </Grid>
          </Grid>
        </motion.div>
      </SectionContainer>

      {/* FAQ Section */}
      <SectionContainer maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <Box textAlign="center" mb={5}>
            <SectionTitle variant={isMobile ? "h5" : "h4"}>
              Frequently Asked Questions
            </SectionTitle>
            <Typography 
              variant="body1" 
              color="text.secondary" 
              sx={{ 
                maxWidth: 600, 
                mx: 'auto',
                fontSize: { xs: '0.95rem', sm: '1rem' },
                mb: 4
              }}
            >
              Get answers to common questions about IPO investments and processes
            </Typography>
            <TextField
              placeholder="Search FAQ..."
              value={faqSearchTerm}
              onChange={(e) => setFaqSearchTerm(e.target.value)}
              sx={{
                maxWidth: 500,
                width: '100%',
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                  backgroundColor: 'white',
                  '&:hover fieldset': {
                    borderColor: 'primary.main',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'primary.main',
                  },
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ color: 'text.secondary' }} />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          {filteredFaqData.length === 0 && faqSearchTerm && (
            <Box textAlign="center" py={4}>
              <Typography variant="body1" color="text.secondary">
                No FAQs found matching "{faqSearchTerm}". Try different keywords.
              </Typography>
            </Box>
          )}
          {filteredFaqData.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              viewport={{ once: true }}
            >
              <FAQAccordion>
                <AccordionSummary
                  expandIcon={<ExpandMore sx={{ color: 'primary.main' }} />}
                  sx={{ 
                    '& .MuiAccordionSummary-content': {
                      margin: '16px 0',
                    },
                    '&:hover': {
                      backgroundColor: `${theme.palette.primary.main}05`,
                    },
                  }}
                >
                  <Box display="flex" alignItems="center">
                    <Box
                      sx={{
                        width: 24,
                        height: 24,
                        borderRadius: '50%',
                        background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.75rem',
                        fontWeight: 'bold',
                        mr: 2,
                        flexShrink: 0,
                      }}
                    >
                      {index + 1}
                    </Box>
                    <Typography 
                      variant="body1" 
                      fontWeight="600" 
                      color="text.primary"
                      sx={{ 
                        fontSize: { xs: '0.9rem', sm: '1rem' },
                        lineHeight: 1.4
                      }}
                    >
                      {faq.question}
                    </Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails sx={{ pt: 0, pl: 6 }}>
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{ 
                      fontSize: { xs: '0.85rem', sm: '0.9rem' },
                      lineHeight: 1.6
                    }}
                  >
                    {faq.answer}
                  </Typography>
                </AccordionDetails>
              </FAQAccordion>
            </motion.div>
          ))}
        </motion.div>
      </SectionContainer>

      {/* Original IPO List Section */}
      <SectionContainer maxWidth="xl" ref={ipoListRef}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <IpoList
            ipos={ipos}
            loading={loading}
            error={error}
            onViewDetails={handleViewDetails}
            onApply={handleApply}
            onRetry={() => actions.fetchIpos(filters)}
          />
        </motion.div>
      </SectionContainer>

      {/* IPO Detail Modal */}
      <IpoDetailModal
        open={detailModalOpen}
        onClose={handleCloseDetailModal}
        ipo={selectedIpo}
        onApply={handleApply}
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
    </PageContainer>
  );
};

export default IpoPage;