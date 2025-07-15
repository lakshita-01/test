// src/components/IPO/SearchFilters.js
import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Paper,
  Collapse,
  IconButton,
  Typography,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Search,
  FilterList,
  Clear,
  ExpandMore,
  ExpandLess
} from '@mui/icons-material';
import { SECTORS } from '../../utils/constants';
import { debounce } from '../../utils/helpers';

const FilterContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(4),
  backgroundColor: 'white',
  borderRadius: 16,
  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
  border: '1px solid rgba(0, 0, 0, 0.05)',
}));

const SearchField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: 12,
    backgroundColor: theme.palette.background.grey,
    border: 'none',
    '&:hover': {
      backgroundColor: theme.palette.background.grey,
    },
    '&.Mui-focused': {
      backgroundColor: 'white',
      boxShadow: `0 0 0 2px ${theme.palette.primary.main}20`,
    },
    '& fieldset': {
      border: 'none',
    },
  },
  '& .MuiInputAdornment-root': {
    color: theme.palette.text.secondary,
  }
}));

const FilterButton = styled(Button)(({ theme }) => ({
  borderRadius: 10,
  textTransform: 'none',
  fontWeight: 600,
  padding: theme.spacing(1, 2),
  minHeight: 40,
}));

const StyledSelect = styled(Select)(({ theme }) => ({
  borderRadius: 12,
  backgroundColor: theme.palette.background.grey,
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    border: `2px solid ${theme.palette.primary.main}`,
  },
}));

const SearchFilters = ({ 
  filters, 
  onFiltersChange, 
  onSearch,
  totalResults = 0 
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [expanded, setExpanded] = useState(!isMobile);
  const [localFilters, setLocalFilters] = useState(filters);

  // Debounced search function
  const debouncedSearch = debounce((searchTerm) => {
    onFiltersChange({ ...localFilters, search: searchTerm });
  }, 300);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setLocalFilters(prev => ({ ...prev, search: value }));
    debouncedSearch(value);
  };

  const handleFilterChange = (field, value) => {
    const newFilters = { ...localFilters, [field]: value };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      search: '',
      sector: 'all',
      dateFrom: '',
      dateTo: ''
    };
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const hasActiveFilters = 
    localFilters.search || 
    localFilters.sector !== 'all' || 
    localFilters.dateFrom || 
    localFilters.dateTo;

  return (
    <FilterContainer>
      {/* Header */}
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        mb: expanded ? 2 : 0
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <FilterList color="primary" />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Search & Filters
          </Typography>
          {totalResults > 0 && (
            <Typography variant="body2" color="text.secondary">
              ({totalResults} results)
            </Typography>
          )}
        </Box>
        
        {isMobile && (
          <IconButton onClick={() => setExpanded(!expanded)}>
            {expanded ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        )}
      </Box>

      <Collapse in={expanded}>
        <Grid container spacing={2} alignItems="center">
          {/* Search Field */}
          <Grid item xs={12} md={4}>
            <SearchField
              fullWidth
              placeholder="Search IPOs, companies, sectors..."
              value={localFilters.search}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: <Search sx={{ color: 'text.secondary', mr: 1 }} />,
              }}
              size="small"
            />
          </Grid>

          {/* Sector Filter */}
          <Grid item xs={12} sm={6} md={2}>
            <FormControl fullWidth size="small">
              <InputLabel>Sector</InputLabel>
              <StyledSelect
                value={localFilters.sector}
                label="Sector"
                onChange={(e) => handleFilterChange('sector', e.target.value)}
              >
                <MenuItem value="all">All Sectors</MenuItem>
                {SECTORS.map((sector) => (
                  <MenuItem key={sector} value={sector}>
                    {sector}
                  </MenuItem>
                ))}
              </StyledSelect>
            </FormControl>
          </Grid>

          {/* Date From */}
          <Grid item xs={12} sm={6} md={2}>
            <TextField
              fullWidth
              size="small"
              type="date"
              label="From Date"
              value={localFilters.dateFrom}
              onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>

          {/* Date To */}
          <Grid item xs={12} sm={6} md={2}>
            <TextField
              fullWidth
              size="small"
              type="date"
              label="To Date"
              value={localFilters.dateTo}
              onChange={(e) => handleFilterChange('dateTo', e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>

          {/* Action Buttons */}
          <Grid item xs={12} sm={6} md={2}>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <FilterButton
                variant="outlined"
                size="small"
                startIcon={<Clear />}
                onClick={handleClearFilters}
                disabled={!hasActiveFilters}
                sx={{ minWidth: 'auto' }}
              >
                Clear
              </FilterButton>
            </Box>
          </Grid>
        </Grid>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid #e0e0e0' }}>
            <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
              Active Filters:
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {localFilters.search && (
                <Box sx={{ 
                  px: 1, 
                  py: 0.5, 
                  backgroundColor: 'primary.light', 
                  color: 'primary.contrastText',
                  borderRadius: 1,
                  fontSize: '0.75rem'
                }}>
                  Search: "{localFilters.search}"
                </Box>
              )}
              {localFilters.sector !== 'all' && (
                <Box sx={{ 
                  px: 1, 
                  py: 0.5, 
                  backgroundColor: 'secondary.light', 
                  color: 'secondary.contrastText',
                  borderRadius: 1,
                  fontSize: '0.75rem'
                }}>
                  Sector: {localFilters.sector}
                </Box>
              )}
              {localFilters.dateFrom && (
                <Box sx={{ 
                  px: 1, 
                  py: 0.5, 
                  backgroundColor: 'info.light', 
                  color: 'info.contrastText',
                  borderRadius: 1,
                  fontSize: '0.75rem'
                }}>
                  From: {localFilters.dateFrom}
                </Box>
              )}
              {localFilters.dateTo && (
                <Box sx={{ 
                  px: 1, 
                  py: 0.5, 
                  backgroundColor: 'info.light', 
                  color: 'info.contrastText',
                  borderRadius: 1,
                  fontSize: '0.75rem'
                }}>
                  To: {localFilters.dateTo}
                </Box>
              )}
            </Box>
          </Box>
        )}
      </Collapse>
    </FilterContainer>
  );
};

export default SearchFilters;