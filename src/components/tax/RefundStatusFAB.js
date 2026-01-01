import React from 'react';
import { Fab, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PaidIcon from '@mui/icons-material/Paid';

const RefundStatusFAB = () => {
  const navigate = useNavigate();

  return (
    <Tooltip title="Check Refund Status" placement="left">
      <Fab
        color="secondary"
        size="small"
        aria-label="refund status"
        onClick={() => navigate('/refund-status')}
        sx={{
          position: 'fixed',
          bottom: 100,
          right: 24,
          zIndex: 1000,
          backgroundColor: '#10B981', // Updated to secondary color
          '&:hover': {
            backgroundColor: '#059669', // Darker shade of secondary
            transform: 'scale(1.1)',
            boxShadow: '0 8px 16px rgba(16,185,129,0.2)' // Updated shadow color
          },
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          width: '48px',
          height: '48px',
          minHeight: 'unset'
        }}
      >
        <PaidIcon sx={{ fontSize: '1.5rem' }} />
      </Fab>
    </Tooltip>
  );
};

export default RefundStatusFAB;