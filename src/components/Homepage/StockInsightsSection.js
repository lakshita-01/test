import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  Button,
  Typography,
  Box,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Avatar,
  Rating,
  Container,
  useTheme,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  TextField,
  Autocomplete,
  Divider
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { TrendingUp, TrendingDown, Compare, Star, Close, Add } from "@mui/icons-material";

// Styled components
const StyledCard = styled(Card)(({ theme }) => ({
  background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
  borderRadius: theme.spacing(2),
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  backdropFilter: "blur(10px)",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: "0 12px 40px rgba(0, 0, 0, 0.15)",
  },
}));

const TestimonialCard = styled(Card)(({ theme }) => ({
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  color: "white",
  borderRadius: theme.spacing(3),
  padding: theme.spacing(3),
  height: "100%",
  position: "relative",
  overflow: "visible",
  "&::before": {
    content: '""',
    position: "absolute",
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    background: "linear-gradient(45deg, #667eea, #764ba2, #f093fb, #f5576c)",
    borderRadius: theme.spacing(3),
    zIndex: -1,
    opacity: 0.7,
  },
}));

const StockTableContainer = styled(TableContainer)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
  "& .MuiTableHead-root": {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  },
  "& .MuiTableHead-root .MuiTableCell-root": {
    color: "white",
    fontWeight: 600,
    fontSize: "0.9rem",
  },
  "& .MuiTableBody-root .MuiTableRow-root": {
    "&:nth-of-type(odd)": {
      backgroundColor: "rgba(102, 126, 234, 0.04)",
    },
    "&:hover": {
      backgroundColor: "rgba(102, 126, 234, 0.08)",
      transform: "scale(1.01)",
      transition: "all 0.2s ease",
    },
  },
}));

const BrokerCard = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
  borderRadius: theme.spacing(2),
  padding: theme.spacing(2),
  minWidth: "200px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
  },
}));

const SectionContainer = styled(Box)(({ theme }) => ({
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  minHeight: "100vh",
  padding: theme.spacing(8, 0),
  position: "relative",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><defs><pattern id=\"grain\" width=\"100\" height=\"100\" patternUnits=\"userSpaceOnUse\"><circle cx=\"50\" cy=\"50\" r=\"1\" fill=\"%23ffffff\" opacity=\"0.1\"/></pattern></defs><rect width=\"100\" height=\"100\" fill=\"url(%23grain)\"/></svg>') repeat",
    opacity: 0.3,
  },
}));

// Sample data
const testimonials = [
  {
    name: "Venkatesh",
    avatar: null,
    rating: 5,
    feedback:
      "Excellent app with a fantastic UI! 😇 Even though the app is still in progressive mode, I must say it is getting better every day. It has an amazing user interface.",
  },
  {
    name: "Sarthak",
    avatar: null,
    rating: 5,
    feedback:
      "Bluestock app provides a user-friendly interface 📈 The clean design and intuitive navigation enhance the overall experience.",
  },
  {
    name: "Sakshi",
    avatar: null,
    rating: 5,
    feedback:
      "Bluestock for chart learning & technical and it has exceeded my expectations. The UI is well-designed, making it a breeze to navigate and learn charts.",
  },
];

const brokers = [
  { name: "Angel One", logo: null, rating: 4.5 },
  { name: "Zerodha", logo: null, rating: 4.7 },
];

// Sample stock data - In real app, this would come from API
const sampleHighStocks = [
  { company: "Reliance Industries", price: "2,847.50", dayHigh: "2,865.00", change: "+1.2%" },
  { company: "TCS", price: "3,456.75", dayHigh: "3,478.90", change: "+0.8%" },
  { company: "HDFC Bank", price: "1,678.30", dayHigh: "1,689.45", change: "+0.5%" },
  { company: "Infosys", price: "1,234.60", dayHigh: "1,245.80", change: "+0.9%" },
  { company: "ICICI Bank", price: "987.25", dayHigh: "995.50", change: "+0.7%" },
];

const sampleLowStocks = [
  { company: "Vodafone Idea", price: "12.45", change: "-2.3%", dayLow: "12.20" },
  { company: "Yes Bank", price: "18.75", change: "-1.8%", dayLow: "18.50" },
  { company: "SAIL", price: "89.30", change: "-1.5%", dayLow: "88.90" },
  { company: "BHEL", price: "67.80", change: "-2.1%", dayLow: "67.20" },
  { company: "PNB", price: "45.60", change: "-1.2%", dayLow: "45.30" },
];

export default function StockInsightsSection() {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [highStocks, setHighStocks] = useState(sampleHighStocks);
  const [lowStocks, setLowStocks] = useState(sampleLowStocks);
  const [loading, setLoading] = useState(false);
  
  // Modal state for stock comparison
  const [compareModalOpen, setCompareModalOpen] = useState(false);
  const [selectedStocks, setSelectedStocks] = useState([]);
  const [stockSearchValue, setStockSearchValue] = useState('');

  // Sample stock data for comparison
  const availableStocks = [
    { symbol: 'AAPL', name: 'Apple Inc.', price: 175.43, change: 2.34, changePercent: 1.35 },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 2847.63, change: -15.23, changePercent: -0.53 },
    { symbol: 'MSFT', name: 'Microsoft Corporation', price: 378.85, change: 4.12, changePercent: 1.10 },
    { symbol: 'TSLA', name: 'Tesla Inc.', price: 248.50, change: -8.75, changePercent: -3.40 },
    { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 3342.88, change: 12.45, changePercent: 0.37 },
    { symbol: 'NVDA', name: 'NVIDIA Corporation', price: 875.28, change: 18.92, changePercent: 2.21 },
    { symbol: 'META', name: 'Meta Platforms Inc.', price: 484.20, change: -6.33, changePercent: -1.29 },
    { symbol: 'NFLX', name: 'Netflix Inc.', price: 445.03, change: 7.89, changePercent: 1.80 }
  ];

  // Modal handlers
  const handleOpenCompareModal = () => {
    navigate('/broker-compare');
  };

  const handleCloseCompareModal = () => {
    setCompareModalOpen(false);
    setSelectedStocks([]);
    setStockSearchValue('');
  };

  const handleAddStock = (stock) => {
    if (selectedStocks.length < 4 && !selectedStocks.find(s => s.symbol === stock.symbol)) {
      setSelectedStocks([...selectedStocks, stock]);
    }
  };

  const handleRemoveStock = (symbol) => {
    setSelectedStocks(selectedStocks.filter(stock => stock.symbol !== symbol));
  };

  useEffect(() => {
    // Simulate API call
    const fetchStocks = async () => {
      setLoading(true);
      try {
        // In real app, replace with actual API calls
        await new Promise(resolve => setTimeout(resolve, 1000));
        setHighStocks(sampleHighStocks);
        setLowStocks(sampleLowStocks);
      } catch (error) {
        console.error("Error fetching stock data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStocks();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <SectionContainer>
      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants}>
            <Box textAlign="center" mb={8}>
              <Typography
                variant="h2"
                component="h2"
                sx={{
                  fontWeight: 800,
                  background: "linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  mb: 2,
                  fontSize: { xs: "2rem", md: "3rem" },
                }}
              >
                What Our Users Say
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: "rgba(255, 255, 255, 0.8)",
                  maxWidth: "600px",
                  mx: "auto",
                }}
              >
                Join thousands of satisfied traders who trust Bluestock for their investment journey
              </Typography>
            </Box>
          </motion.div>

          {/* Testimonials Section */}
          <motion.div variants={itemVariants}>
            <Grid container spacing={4} mb={8}>
              {testimonials.map((testimonial, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <TestimonialCard>
                    <CardContent sx={{ p: 3 }}>
                      <Box display="flex" alignItems="center" mb={2}>
                        <Avatar
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          sx={{ width: 48, height: 48, mr: 2 }}
                        >
                          {testimonial.name[0]}
                        </Avatar>
                        <Box>
                          <Typography variant="h6" fontWeight={600}>
                            {testimonial.name}
                          </Typography>
                          <Rating
                            value={testimonial.rating}
                            readOnly
                            size="small"
                            sx={{ color: "#ffd700" }}
                          />
                        </Box>
                      </Box>
                      <Typography
                        variant="body2"
                        sx={{
                          lineHeight: 1.6,
                          fontStyle: "italic",
                          position: "relative",
                          "&::before": {
                            content: '"\\201C"',
                            fontSize: "3rem",
                            position: "absolute",
                            top: "-10px",
                            left: "-10px",
                            opacity: 0.3,
                          },
                        }}
                      >
                        {testimonial.feedback}
                      </Typography>
                    </CardContent>
                  </TestimonialCard>
                </Grid>
              ))}
            </Grid>
          </motion.div>

          {/* Market Insights Header */}
          <motion.div variants={itemVariants}>
            <Box textAlign="center" mb={6}>
              <Typography
                variant="h3"
                component="h3"
                sx={{
                  fontWeight: 700,
                  color: "white",
                  mb: 2,
                  fontSize: { xs: "1.8rem", md: "2.5rem" },
                }}
              >
                Live Market Insights
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "rgba(255, 255, 255, 0.8)",
                  maxWidth: "500px",
                  mx: "auto",
                }}
              >
                Stay updated with real-time market movements and make informed decisions
              </Typography>
            </Box>
          </motion.div>

          {/* Stock Tables */}
          <motion.div variants={itemVariants}>
            <Grid container spacing={4} mb={8}>
              {/* 52 Week High */}
              <Grid item xs={12} lg={6}>
                <StyledCard>
                  <CardContent sx={{ p: 3 }}>
                    <Box display="flex" alignItems="center" mb={3}>
                      <TrendingUp sx={{ color: "#10b981", mr: 1, fontSize: "2rem" }} />
                      <Typography variant="h5" fontWeight={600} color="primary">
                        52 Week High
                      </Typography>
                    </Box>
                    <StockTableContainer component={Paper} elevation={0}>
                      <Table size={isMobile ? "small" : "medium"}>
                        <TableHead>
                          <TableRow>
                            <TableCell>Company</TableCell>
                            <TableCell align="right">Price ₹</TableCell>
                            <TableCell align="right">Day High ₹</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {highStocks.map((stock, index) => (
                            <TableRow key={index}>
                              <TableCell>
                                <Typography variant="body2" fontWeight={500}>
                                  {stock.company}
                                </Typography>
                              </TableCell>
                              <TableCell align="right">
                                <Typography variant="body2" fontWeight={600}>
                                  {stock.price}
                                </Typography>
                              </TableCell>
                              <TableCell align="right">
                                <Chip
                                  label={stock.dayHigh}
                                  size="small"
                                  sx={{
                                    backgroundColor: "#dcfce7",
                                    color: "#166534",
                                    fontWeight: 600,
                                  }}
                                />
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </StockTableContainer>
                  </CardContent>
                </StyledCard>
              </Grid>

              {/* 52 Week Low */}
              <Grid item xs={12} lg={6}>
                <StyledCard>
                  <CardContent sx={{ p: 3 }}>
                    <Box display="flex" alignItems="center" mb={3}>
                      <TrendingDown sx={{ color: "#ef4444", mr: 1, fontSize: "2rem" }} />
                      <Typography variant="h5" fontWeight={600} color="primary">
                        52 Week Low
                      </Typography>
                    </Box>
                    <StockTableContainer component={Paper} elevation={0}>
                      <Table size={isMobile ? "small" : "medium"}>
                        <TableHead>
                          <TableRow>
                            <TableCell>Company</TableCell>
                            <TableCell align="right">Price ₹</TableCell>
                            <TableCell align="right">Change %</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {lowStocks.map((stock, index) => (
                            <TableRow key={index}>
                              <TableCell>
                                <Typography variant="body2" fontWeight={500}>
                                  {stock.company}
                                </Typography>
                              </TableCell>
                              <TableCell align="right">
                                <Typography variant="body2" fontWeight={600}>
                                  {stock.price}
                                </Typography>
                              </TableCell>
                              <TableCell align="right">
                                <Chip
                                  label={stock.change}
                                  size="small"
                                  sx={{
                                    backgroundColor: "#fef2f2",
                                    color: "#dc2626",
                                    fontWeight: 600,
                                  }}
                                />
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </StockTableContainer>
                  </CardContent>
                </StyledCard>
              </Grid>
            </Grid>
          </motion.div>

          {/* Broker Comparison Section */}
          <motion.div variants={itemVariants}>
            <StyledCard sx={{ background: "rgba(255, 255, 255, 0.95)" }}>
              <CardContent sx={{ p: 4 }}>
                <Grid container spacing={4} alignItems="center">
                  <Grid item xs={12} md={4}>
                    <Box textAlign={{ xs: "center", md: "left" }}>
                      <Typography
                        variant="h4"
                        component="h3"
                        sx={{
                          fontWeight: 700,
                          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                          mb: 1,
                        }}
                      >
                        Best Stock Brokers
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        Compare and choose the perfect broker for your trading needs
                      </Typography>
                    </Box>
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <Box
                      display="flex"
                      flexDirection={{ xs: "column", sm: "row" }}
                      gap={2}
                      justifyContent="center"
                    >
                      {brokers.map((broker, index) => (
                        <motion.div
                          key={index}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <BrokerCard>
                            <Avatar
                              src={broker.logo}
                              alt={broker.name}
                              sx={{ width: 40, height: 40, mr: 2 }}
                            >
                              {broker.name[0]}
                            </Avatar>
                            <Box>
                              <Typography variant="body1" fontWeight={600}>
                                {broker.name}
                              </Typography>
                              <Box display="flex" alignItems="center">
                                <Star sx={{ color: "#ffd700", fontSize: "1rem", mr: 0.5 }} />
                                <Typography variant="body2" color="text.secondary">
                                  {broker.rating}
                                </Typography>
                              </Box>
                            </Box>
                          </BrokerCard>
                        </motion.div>
                      ))}
                    </Box>
                  </Grid>
                  
                  <Grid item xs={12} md={2}>
                    <Box textAlign="center">
                      <Button
                        variant="contained"
                        size="large"
                        startIcon={<Compare />}
                        onClick={handleOpenCompareModal}
                        sx={{
                          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                          borderRadius: 3,
                          px: 4,
                          py: 1.5,
                          fontWeight: 600,
                          textTransform: "none",
                          boxShadow: "0 8px 24px rgba(102, 126, 234, 0.3)",
                          "&:hover": {
                            background: "linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)",
                            transform: "translateY(-2px)",
                            boxShadow: "0 12px 32px rgba(102, 126, 234, 0.4)",
                          },
                        }}
                      >
                        Compare Now
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </StyledCard>
          </motion.div>
        </motion.div>
      </Container>

      {/* Stock Comparison Modal */}
      <Dialog
        open={compareModalOpen}
        onClose={handleCloseCompareModal}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
          }
        }}
      >
        <DialogTitle sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: 'white',
          fontWeight: 600
        }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
            Compare Stocks
          </Typography>
          <IconButton 
            onClick={handleCloseCompareModal}
            sx={{ color: 'white' }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        
        <DialogContent sx={{ p: 3 }}>
          {/* Stock Search Section */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Add Stocks to Compare (Max 4)
            </Typography>
            <Autocomplete
              options={availableStocks.filter(stock => 
                !selectedStocks.find(s => s.symbol === stock.symbol)
              )}
              getOptionLabel={(option) => `${option.symbol} - ${option.name}`}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search stocks"
                  placeholder="Type to search stocks..."
                  variant="outlined"
                  fullWidth
                />
              )}
              onChange={(event, value) => {
                if (value) {
                  handleAddStock(value);
                }
              }}
              value={null}
              disabled={selectedStocks.length >= 4}
            />
          </Box>

          {/* Selected Stocks Display */}
          {selectedStocks.length > 0 && (
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Selected Stocks ({selectedStocks.length}/4)
              </Typography>
              <Grid container spacing={2}>
                {selectedStocks.map((stock) => (
                  <Grid item xs={12} sm={6} md={3} key={stock.symbol}>
                    <Card sx={{ 
                      p: 2, 
                      border: '2px solid #667eea',
                      borderRadius: 2,
                      position: 'relative'
                    }}>
                      <IconButton
                        size="small"
                        onClick={() => handleRemoveStock(stock.symbol)}
                        sx={{ 
                          position: 'absolute',
                          top: 4,
                          right: 4,
                          color: 'error.main'
                        }}
                      >
                        <Close fontSize="small" />
                      </IconButton>
                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                        {stock.symbol}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        {stock.name}
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        ${stock.price.toFixed(2)}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                        {stock.change >= 0 ? (
                          <TrendingUp sx={{ color: 'success.main', mr: 0.5 }} />
                        ) : (
                          <TrendingDown sx={{ color: 'error.main', mr: 0.5 }} />
                        )}
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            color: stock.change >= 0 ? 'success.main' : 'error.main',
                            fontWeight: 600
                          }}
                        >
                          {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
                        </Typography>
                      </Box>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}

          {/* Comparison Table */}
          {selectedStocks.length >= 2 && (
            <Box>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Comparison Table
              </Typography>
              <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
                <Table>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                      <TableCell sx={{ fontWeight: 600 }}>Metric</TableCell>
                      {selectedStocks.map((stock) => (
                        <TableCell key={stock.symbol} sx={{ fontWeight: 600 }}>
                          {stock.symbol}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600 }}>Company Name</TableCell>
                      {selectedStocks.map((stock) => (
                        <TableCell key={stock.symbol}>{stock.name}</TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600 }}>Current Price</TableCell>
                      {selectedStocks.map((stock) => (
                        <TableCell key={stock.symbol}>${stock.price.toFixed(2)}</TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600 }}>Change</TableCell>
                      {selectedStocks.map((stock) => (
                        <TableCell 
                          key={stock.symbol}
                          sx={{ 
                            color: stock.change >= 0 ? 'success.main' : 'error.main',
                            fontWeight: 600
                          }}
                        >
                          {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}
                        </TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600 }}>Change %</TableCell>
                      {selectedStocks.map((stock) => (
                        <TableCell 
                          key={stock.symbol}
                          sx={{ 
                            color: stock.changePercent >= 0 ? 'success.main' : 'error.main',
                            fontWeight: 600
                          }}
                        >
                          {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}

          {selectedStocks.length === 0 && (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="h6" color="text.secondary">
                Select stocks to start comparing
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Use the search box above to add stocks for comparison
              </Typography>
            </Box>
          )}

          {selectedStocks.length === 1 && (
            <Box sx={{ textAlign: 'center', py: 2 }}>
              <Typography variant="body1" color="text.secondary">
                Add at least one more stock to see the comparison
              </Typography>
            </Box>
          )}
        </DialogContent>

        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button 
            onClick={handleCloseCompareModal}
            variant="outlined"
            sx={{ mr: 1 }}
          >
            Close
          </Button>
          <Button 
            variant="contained"
            disabled={selectedStocks.length < 2}
            sx={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              "&:hover": {
                background: "linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)",
              },
            }}
          >
            Analyze Comparison
          </Button>
        </DialogActions>
      </Dialog>
    </SectionContainer>
  );
}