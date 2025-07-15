// src/components/IpoAddForm.js
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  Alert,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useForm, Controller } from 'react-hook-form';
import { Save, Close } from '@mui/icons-material';
import { SECTORS } from '../utils/constants';
import { useApp } from '../context/AppContext';
import LoadingSpinner from './Common/LoadingSpinner';

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: theme.spacing(2),
    maxWidth: '800px',
  },
}));

const FormSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  marginBottom: theme.spacing(2),
  color: theme.palette.primary.main,
}));

const IpoAddForm = ({ open, onClose, editingIpo = null }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { state, actions } = useApp();
  const { loading } = state;

  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState('');

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
    setValue
  } = useForm({
    defaultValues: {
      companyName: '',
      sector: '',
      ipoOpenDate: '',
      ipoCloseDate: '',
      priceBandMin: '',
      priceBandMax: '',
      lotSize: '',
      issueSize: '',
      rhpLink: '',
      description: '',
      listingDate: '',
      minInvestment: ''
    }
  });

  const watchOpenDate = watch('ipoOpenDate');

  // Reset form when dialog opens/closes or editing IPO changes
  useEffect(() => {
    if (open) {
      if (editingIpo) {
        // Parse price band for editing
        const priceBandMatch = editingIpo.priceBand.match(/₹(\d+)\s*-\s*₹(\d+)/);
        const priceBandMin = priceBandMatch ? priceBandMatch[1] : '';
        const priceBandMax = priceBandMatch ? priceBandMatch[2] : '';

        reset({
          companyName: editingIpo.companyName || '',
          sector: editingIpo.sector || '',
          ipoOpenDate: editingIpo.ipoOpenDate || '',
          ipoCloseDate: editingIpo.ipoCloseDate || '',
          priceBandMin,
          priceBandMax,
          lotSize: editingIpo.lotSize?.toString() || '',
          issueSize: editingIpo.issueSize || '',
          rhpLink: editingIpo.rhpLink || '',
          description: editingIpo.description || '',
          listingDate: editingIpo.listingDate || '',
          minInvestment: editingIpo.minInvestment?.toString() || ''
        });
      } else {
        reset({
          companyName: '',
          sector: '',
          ipoOpenDate: '',
          ipoCloseDate: '',
          priceBandMin: '',
          priceBandMax: '',
          lotSize: '',
          issueSize: '',
          rhpLink: '',
          description: '',
          listingDate: '',
          minInvestment: ''
        });
      }
      setSubmitError('');
      setSubmitSuccess('');
    }
  }, [open, editingIpo, reset]);

  // Auto-calculate minimum investment
  const priceBandMin = watch('priceBandMin');
  const lotSize = watch('lotSize');
  
  useEffect(() => {
    if (priceBandMin && lotSize) {
      const minInvestment = parseInt(priceBandMin) * parseInt(lotSize);
      setValue('minInvestment', minInvestment.toString());
    }
  }, [priceBandMin, lotSize, setValue]);

  const onSubmit = async (data) => {
    try {
      setSubmitError('');
      setSubmitSuccess('');

      // Format the data
      const formattedData = {
        ...data,
        priceBand: `₹${data.priceBandMin} - ₹${data.priceBandMax}`,
        lotSize: parseInt(data.lotSize),
        minInvestment: parseInt(data.minInvestment),
        status: 'upcoming'
      };

      // Remove the separate price band fields
      delete formattedData.priceBandMin;
      delete formattedData.priceBandMax;

      if (editingIpo) {
        await actions.updateIpo(editingIpo.id, formattedData);
        setSubmitSuccess('IPO updated successfully!');
      } else {
        await actions.createIpo(formattedData);
        setSubmitSuccess('IPO created successfully!');
      }

      // Close dialog after a short delay
      setTimeout(() => {
        onClose();
      }, 1500);

    } catch (error) {
      setSubmitError(error.message || 'Failed to save IPO. Please try again.');
    }
  };

  const handleClose = () => {
    if (!loading) {
      onClose();
    }
  };

  return (
    <StyledDialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      fullScreen={isMobile}
    >
      <DialogTitle>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          {editingIpo ? 'Edit IPO' : 'Add New IPO'}
        </Typography>
      </DialogTitle>

      <DialogContent>
        {loading && <LoadingSpinner message="Saving IPO..." />}
        
        {!loading && (
          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            {submitError && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {submitError}
              </Alert>
            )}

            {submitSuccess && (
              <Alert severity="success" sx={{ mb: 2 }}>
                {submitSuccess}
              </Alert>
            )}

            {/* Company Information */}
            <FormSection>
              <SectionTitle variant="h6">Company Information</SectionTitle>
              <Grid container spacing={2}>
                <Grid item xs={12} md={8}>
                  <Controller
                    name="companyName"
                    control={control}
                    rules={{ required: 'Company name is required' }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Company Name"
                        error={!!errors.companyName}
                        helperText={errors.companyName?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Controller
                    name="sector"
                    control={control}
                    rules={{ required: 'Sector is required' }}
                    render={({ field }) => (
                      <FormControl fullWidth error={!!errors.sector}>
                        <InputLabel>Sector</InputLabel>
                        <Select {...field} label="Sector">
                          {SECTORS.map((sector) => (
                            <MenuItem key={sector} value={sector}>
                              {sector}
                            </MenuItem>
                          ))}
                        </Select>
                        {errors.sector && (
                          <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.5 }}>
                            {errors.sector.message}
                          </Typography>
                        )}
                      </FormControl>
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Company Description"
                        multiline
                        rows={3}
                        placeholder="Brief description of the company and its business..."
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </FormSection>

            {/* IPO Timeline */}
            <FormSection>
              <SectionTitle variant="h6">IPO Timeline</SectionTitle>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <Controller
                    name="ipoOpenDate"
                    control={control}
                    rules={{ required: 'IPO open date is required' }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        type="date"
                        label="IPO Open Date"
                        InputLabelProps={{ shrink: true }}
                        error={!!errors.ipoOpenDate}
                        helperText={errors.ipoOpenDate?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Controller
                    name="ipoCloseDate"
                    control={control}
                    rules={{ 
                      required: 'IPO close date is required',
                      validate: (value) => {
                        if (watchOpenDate && value <= watchOpenDate) {
                          return 'Close date must be after open date';
                        }
                        return true;
                      }
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        type="date"
                        label="IPO Close Date"
                        InputLabelProps={{ shrink: true }}
                        error={!!errors.ipoCloseDate}
                        helperText={errors.ipoCloseDate?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Controller
                    name="listingDate"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        type="date"
                        label="Expected Listing Date"
                        InputLabelProps={{ shrink: true }}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </FormSection>

            {/* Pricing Information */}
            <FormSection>
              <SectionTitle variant="h6">Pricing Information</SectionTitle>
              <Grid container spacing={2}>
                <Grid item xs={12} md={3}>
                  <Controller
                    name="priceBandMin"
                    control={control}
                    rules={{ 
                      required: 'Minimum price is required',
                      min: { value: 1, message: 'Price must be greater than 0' }
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        type="number"
                        label="Min Price (₹)"
                        error={!!errors.priceBandMin}
                        helperText={errors.priceBandMin?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <Controller
                    name="priceBandMax"
                    control={control}
                    rules={{ 
                      required: 'Maximum price is required',
                      min: { value: 1, message: 'Price must be greater than 0' },
                      validate: (value) => {
                        const minPrice = watch('priceBandMin');
                        if (minPrice && parseInt(value) <= parseInt(minPrice)) {
                          return 'Max price must be greater than min price';
                        }
                        return true;
                      }
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        type="number"
                        label="Max Price (₹)"
                        error={!!errors.priceBandMax}
                        helperText={errors.priceBandMax?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <Controller
                    name="lotSize"
                    control={control}
                    rules={{ 
                      required: 'Lot size is required',
                      min: { value: 1, message: 'Lot size must be greater than 0' }
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        type="number"
                        label="Lot Size"
                        error={!!errors.lotSize}
                        helperText={errors.lotSize?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <Controller
                    name="minInvestment"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        type="number"
                        label="Min Investment (₹)"
                        disabled
                        helperText="Auto-calculated"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controller
                    name="issueSize"
                    control={control}
                    rules={{ required: 'Issue size is required' }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Issue Size"
                        placeholder="e.g., ₹500 Cr"
                        error={!!errors.issueSize}
                        helperText={errors.issueSize?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controller
                    name="rhpLink"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="RHP Document Link"
                        placeholder="https://example.com/rhp.pdf"
                        type="url"
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </FormSection>
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 0 }}>
        <Button onClick={handleClose} disabled={loading}>
          <Close sx={{ mr: 1 }} />
          Cancel
        </Button>
        <Button
          onClick={handleSubmit(onSubmit)}
          variant="contained"
          disabled={loading}
          startIcon={<Save />}
        >
          {editingIpo ? 'Update IPO' : 'Create IPO'}
        </Button>
      </DialogActions>
    </StyledDialog>
  );
};

export default IpoAddForm;