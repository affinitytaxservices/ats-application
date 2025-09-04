import React from 'react';
import { Container, Typography, Box, Paper, Divider, List, ListItem, ListItemText } from '@mui/material';
import { fadeIn, slideUp } from '../../styles/animations';

function Terms() {
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Paper 
        elevation={3} 
        sx={{ 
          p: { xs: 3, md: 6 }, 
          borderRadius: 2,
          boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
          overflow: 'hidden',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '5px',
            background: 'linear-gradient(90deg, #2E5077 0%, #38B2AC 100%)',
          },
          animation: `${fadeIn} 0.8s ease-out`
        }}
      >
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography 
            variant="h2" 
            component="h1" 
            gutterBottom 
            sx={{ 
              color: 'primary.main', 
              fontWeight: 'bold',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)',
              position: 'relative',
              py: 3,
              animation: `${slideUp} 0.6s ease-out`,
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: '-10px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '120px',
                height: '4px',
                background: 'linear-gradient(to right, transparent, primary.main, transparent)',
                borderRadius: '2px'
              },
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'scale(1.02)',
              },
            }}
          >
            Terms & Conditions
          </Typography>
        </Box>
        
        <Divider sx={{ my: 4 }} />

        <Box sx={{ mb: 5 }}>
          <Typography variant="h5" gutterBottom sx={{ color: 'primary.main', fontWeight: 600 }}>
            1. Acceptance of Terms
          </Typography>
          <Typography paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
            By accessing or using Affinity Tax Services, you agree to be bound by these Terms and Conditions and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
          </Typography>
        </Box>

        <Box sx={{ mb: 5 }}>
          <Typography variant="h5" gutterBottom sx={{ color: 'primary.main', fontWeight: 600 }}>
            2. Use License
          </Typography>
          <Typography paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
            Permission is granted to temporarily access the materials on Affinity Tax Services' website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.
          </Typography>
          <List sx={{ pl: 4 }}>
            <ListItem sx={{ display: 'list-item', listStyleType: 'disc' }}>
              <ListItemText primary="You may not modify or copy the materials" sx={{ fontSize: '1.05rem' }} />
            </ListItem>
            <ListItem sx={{ display: 'list-item', listStyleType: 'disc' }}>
              <ListItemText primary="You may not use the materials for any commercial purpose" sx={{ fontSize: '1.05rem' }} />
            </ListItem>
            <ListItem sx={{ display: 'list-item', listStyleType: 'disc' }}>
              <ListItemText primary="You may not attempt to decompile or reverse engineer any software contained on the website" sx={{ fontSize: '1.05rem' }} />
            </ListItem>
          </List>
        </Box>

        <Box sx={{ mb: 5 }}>
          <Typography variant="h5" gutterBottom sx={{ color: 'primary.main', fontWeight: 600 }}>
            3. Disclaimer
          </Typography>
          <Typography paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
            The materials on Affinity Tax Services' website are provided on an 'as is' basis. Affinity Tax Services makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
          </Typography>
        </Box>

        <Box sx={{ mb: 5 }}>
          <Typography variant="h5" gutterBottom sx={{ color: 'primary.main', fontWeight: 600 }}>
            4. Limitations
          </Typography>
          <Typography paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
            In no event shall Affinity Tax Services or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on the website, even if Affinity Tax Services or an authorized representative has been notified orally or in writing of the possibility of such damage.
          </Typography>
        </Box>

        <Box sx={{ mb: 5 }}>
          <Typography variant="h5" gutterBottom sx={{ color: 'primary.main', fontWeight: 600 }}>
            5. Accuracy of Materials
          </Typography>
          <Typography paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
            The materials appearing on Affinity Tax Services' website could include technical, typographical, or photographic errors. Affinity Tax Services does not warrant that any of the materials on its website are accurate, complete, or current. Affinity Tax Services may make changes to the materials contained on its website at any time without notice.
          </Typography>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Box sx={{ mt: 4 }}>
          <Typography variant="body2" color="text.secondary" align="center">
            Last updated: {new Date().toLocaleDateString()}
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}

export default Terms;