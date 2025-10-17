import React from 'react';
import { AppBar, Container, Box, Typography, Link, IconButton, Divider, useMediaQuery, useTheme, Fade, keyframes } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import LogoComponent from '../common/LogoComponent';

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const currentYear = new Date().getFullYear();

  // Animation keyframes for the footer text
  const slideUpFade = keyframes`
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  `;

  const heartBeat = keyframes`
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.2);
    }
  `;

  const socialLinks = [
    { icon: <FacebookIcon />, url: 'https://facebook.com', label: 'Facebook' },
    { icon: <XIcon />, url: 'https://x.com', label: 'X' },
    { icon: <LinkedInIcon />, url: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: <InstagramIcon />, url: 'https://instagram.com', label: 'Instagram' },
  ];

  const footerLinks = [
    { name: 'Home', path: '/' },
    { name: 'Privacy Policy', path: '/privacy-policy' },
    { name: 'Terms', path: '/terms-and-conditions' },
    { name: 'Contact', path: '/contacts' },
  ];

  return (
    <Fade in={true}>
      <AppBar 
        position="static" 
        color="transparent" 
        elevation={0}
        component="footer"
        sx={{
          mt: 'auto',
          py: { xs: 4, sm: 3 },
          background: 'rgba(249, 250, 251, 0.95)',
          backdropFilter: 'blur(20px)',
          borderTop: '1px solid rgba(229, 231, 235, 0.8)',
          color: '#374151',
        }}
      >
        <Container maxWidth="lg">
          <Box 
            sx={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              justifyContent: 'space-between',
              alignItems: isMobile ? 'center' : 'flex-start',
              mb: { xs: 3, sm: 2 }
            }}
          >
            <Box 
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: isMobile ? 'center' : 'flex-start',
                mb: isMobile ? 4 : 0
              }}
            >
              <LogoComponent variant="medium" showText={true} />
              <Typography 
                variant="body2" 
                color="text.secondary" 
                sx={{ 
                  mt: { xs: 2, sm: 1.5 }, 
                  maxWidth: 300,
                  textAlign: isMobile ? 'center' : 'left',
                  color: '#6B7280',
                  fontFamily: '"Inter", sans-serif',
                  fontSize: { xs: '0.9rem', sm: '0.875rem' },
                  lineHeight: 1.5,
                  px: { xs: 2, sm: 0 },
                }}
              >
                Professional tax services for individuals and businesses. We make tax season stress-free.
              </Typography>
              <Box 
                sx={{
                  display: 'flex',
                  gap: { xs: 1.5, sm: 1 },
                  mt: { xs: 3, sm: 2 },
                  justifyContent: isMobile ? 'center' : 'flex-start'
                }}
              >
                {socialLinks.map((social, index) => (
                  <IconButton
                    key={index}
                    component="a"
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    sx={{
                      color: '#6B7280',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      p: { xs: 1.5, sm: 1 },
                      '&:hover': {
                        color: '#3B82F6',
                        transform: 'translateY(-2px) scale(1.1)',
                        backgroundColor: 'rgba(59, 130, 246, 0.08)',
                      },
                      '&:active': {
                        transform: 'translateY(0) scale(1)',
                      }
                    }}
                  >
                    {social.icon}
                  </IconButton>
                ))}
              </Box>
            </Box>

            <Box 
              sx={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                gap: { xs: 2, sm: 4 },
                alignItems: isMobile ? 'center' : 'flex-start'
              }}
            >
              {footerLinks.map((link, index) => (
                <Link
                  key={index}
                  component={RouterLink}
                  to={link.path}
                  sx={{
                    color: '#6B7280',
                    textDecoration: 'none',
                    fontFamily: '"Inter", sans-serif',
                    fontSize: { xs: '0.95rem', sm: '0.875rem' },
                    fontWeight: 500,
                    transition: 'all 0.2s ease',
                    py: { xs: 0.5, sm: 0 },
                    '&:hover': {
                      color: '#3B82F6',
                      transform: 'translateY(-1px)',
                    },
                    '&:active': {
                      transform: 'translateY(0)',
                    }
                  }}
                >
                  {link.name}
                </Link>
              ))}
            </Box>
          </Box>

          <Divider sx={{ 
            my: { xs: 3, sm: 2 }, 
            backgroundColor: 'rgba(229, 231, 235, 0.6)' 
          }} />

          <Box 
            sx={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: { xs: 2, sm: 0 }
            }}
          >
            <Typography 
              variant="body2" 
              sx={{
                color: '#9CA3AF',
                fontFamily: '"Inter", sans-serif',
                fontSize: { xs: '0.8rem', sm: '0.75rem' },
                textAlign: isMobile ? 'center' : 'left',
                animation: `${slideUpFade} 0.6s ease-out`,
              }}
            >
              © {currentYear} Affinity Tax Services. All rights reserved.
            </Typography>
            
            <Typography 
              variant="body2" 
              sx={{
                color: '#9CA3AF',
                fontFamily: '"Inter", sans-serif',
                fontSize: { xs: '0.8rem', sm: '0.75rem' },
                textAlign: isMobile ? 'center' : 'right',
                animation: `${slideUpFade} 0.8s ease-out`,
                display: 'flex',
                alignItems: 'center',
                gap: 0.5
              }}
            >
              Crafted with excellence 
              <Box 
                component="span" 
                sx={{ 
                  color: '#8B5CF6',
                  animation: `${heartBeat} 2s ease-in-out infinite`,
                  display: 'inline-block'
                }}
              >
                🚀
              </Box> 
              by Affinity Tax Services
            </Typography>
          </Box>
        </Container>
      </AppBar>
    </Fade>
  );
};

export default Footer;