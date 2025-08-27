import React from 'react';
import { Dialog, DialogContent, Typography, Box, useTheme } from '@mui/material';
import ConstructionIcon from '@mui/icons-material/Construction';
import { scaleUp } from '../styles/animations';

const UnderConstructionModal = ({ open, onClose }) => {
  const theme = useTheme();
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '5.0px solid rgba(255, 255, 255, 0.2)',
          borderRadius: 2,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          animation: `${scaleUp} 1.3s ease-out`,
          overflow: 'hidden'
        }
      }}
    >
      <DialogContent>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            py: 4,
            px: 2
          }}
        >
          <ConstructionIcon
            sx={{
              fontSize: 64,
              color: 'warning.main',
              mb: 2,
              animation: 'pulse 5s infinite',
              '@keyframes pulse': {
                '0%': { transform: 'scale(1)' },
                '50%': { transform: 'scale(1.1)' },
                '100%': { transform: 'scale(1)' }
              }
            }}
          />
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{
              fontWeight: 'bold',
              color: 'text.primary',
              textShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            <span style={{ color: theme.palette.secondary.main }}>Under Construction</span>
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              maxWidth: 400,
              mx: 'auto',
              lineHeight: 1.6
            }}
          >
            <span style={{ fontSize: '1.2rem', color: theme.palette.secondary.main }}>We're working hard to bring you an amazing experience. Please check back soon!</span>
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default UnderConstructionModal;