// src/components/IpoAdminTable.js
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
  Chip,
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  Tooltip
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Edit,
  Delete,
  Add,
  Visibility,
  GetApp
} from '@mui/icons-material';
import { formatDate, getIpoStatus, getStatusColor } from '../utils/helpers';
import { useApp } from '../context/AppContext';
import LoadingSpinner from './Common/LoadingSpinner';
import ErrorMessage from './Common/ErrorMessage';
import ConfirmDialog from './Common/ConfirmDialog';

const TableContainerStyled = styled(Paper)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  borderRadius: theme.spacing(1),
  overflow: 'hidden',
}));

const TableHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(2),
  backgroundColor: theme.palette.grey[50],
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 600,
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
}));

const ActionCell = styled(TableCell)(({ theme }) => ({
  minWidth: '120px',
}));

const StatusChip = styled(Chip)(({ status }) => ({
  backgroundColor: getStatusColor(status),
  color: 'white',
  fontWeight: 600,
  minWidth: '80px',
}));

const IpoAdminTable = ({ onAdd, onEdit, onView }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { state, actions } = useApp();
  const { ipos, loading, error } = state;

  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    ipoId: null,
    ipoName: ''
  });

  const handleDelete = (ipo) => {
    setDeleteDialog({
      open: true,
      ipoId: ipo.id,
      ipoName: ipo.companyName
    });
  };

  const handleConfirmDelete = async () => {
    try {
      await actions.deleteIpo(deleteDialog.ipoId);
      setDeleteDialog({ open: false, ipoId: null, ipoName: '' });
    } catch (error) {
      console.error('Failed to delete IPO:', error);
    }
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialog({ open: false, ipoId: null, ipoName: '' });
  };

  const handleDownloadRHP = (rhpLink) => {
    if (rhpLink) {
      window.open(rhpLink, '_blank');
    }
  };

  if (loading) {
    return <LoadingSpinner message="Loading IPOs..." />;
  }

  if (error) {
    return (
      <ErrorMessage 
        error={error} 
        onRetry={() => actions.fetchIpos()}
        title="Failed to load IPOs"
      />
    );
  }

  return (
    <>
      <TableContainerStyled>
        <TableHeader>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            IPO Management
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={onAdd}
            size={isMobile ? 'small' : 'medium'}
          >
            Add New IPO
          </Button>
        </TableHeader>

        <TableContainer component={Paper} elevation={0}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <StyledTableCell>Company</StyledTableCell>
                <StyledTableCell>Sector</StyledTableCell>
                <StyledTableCell>Open Date</StyledTableCell>
                <StyledTableCell>Close Date</StyledTableCell>
                <StyledTableCell>Price Band</StyledTableCell>
                <StyledTableCell>Status</StyledTableCell>
                <ActionCell>
                  <StyledTableCell>Actions</StyledTableCell>
                </ActionCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ipos.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                    <Typography variant="body2" color="text.secondary">
                      No IPOs found. Click "Add New IPO" to create one.
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                ipos.map((ipo) => {
                  const status = getIpoStatus(ipo.ipoOpenDate, ipo.ipoCloseDate);
                  
                  return (
                    <TableRow key={ipo.id} hover>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {ipo.companyName}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {ipo.sector}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {formatDate(ipo.ipoOpenDate)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {formatDate(ipo.ipoCloseDate)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {ipo.priceBand}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <StatusChip
                          label={status.toUpperCase()}
                          status={status}
                          size="small"
                        />
                      </TableCell>
                      <ActionCell>
                        <Box sx={{ display: 'flex', gap: 0.5 }}>
                          <Tooltip title="View Details">
                            <IconButton
                              size="small"
                              onClick={() => onView && onView(ipo)}
                              color="info"
                            >
                              <Visibility fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          
                          <Tooltip title="Edit IPO">
                            <IconButton
                              size="small"
                              onClick={() => onEdit && onEdit(ipo)}
                              color="primary"
                            >
                              <Edit fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          
                          {ipo.rhpLink && (
                            <Tooltip title="Download RHP">
                              <IconButton
                                size="small"
                                onClick={() => handleDownloadRHP(ipo.rhpLink)}
                                color="secondary"
                              >
                                <GetApp fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          )}
                          
                          <Tooltip title="Delete IPO">
                            <IconButton
                              size="small"
                              onClick={() => handleDelete(ipo)}
                              color="error"
                            >
                              <Delete fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </ActionCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </TableContainerStyled>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        open={deleteDialog.open}
        onClose={handleCloseDeleteDialog}
        onConfirm={handleConfirmDelete}
        title="Delete IPO"
        message={`Are you sure you want to delete "${deleteDialog.ipoName}"? This action cannot be undone.`}
        confirmText="Delete"
        severity="error"
      />
    </>
  );
};

export default IpoAdminTable;