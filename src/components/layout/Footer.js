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
          py: 3,
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
              mb: 2
            }}
          >
            <Box 
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: isMobile ? 'center' : 'flex-start',
                mb: isMobile ? 3 : 0
              }}
            >
              <LogoComponent variant="medium" showText={true} />
              <Typography 
                variant="body2" 
                color="text.secondary" 
                sx={{ 
                  mt: 1.5, 
                  maxWidth: 300,
                  textAlign: isMobile ? 'center' : 'left',
                  color: '#6B7280',
                  fontFamily: '"Inter", sans-serif',
                  fontSize: '0.875rem',
                  lineHeight: 1.5,
                }}
              >
                Professional tax services for individuals and businesses. We make tax season stress-free.
              </Typography>
              <Box 
                sx={{ 
                  display: 'flex', 
                  mt: 2,
                  justifyContent: isMobile ? 'center' : 'flex-start',
                  gap: 1,
                }}
              >
                {socialLinks.map((social, index) => (
                  <IconButton 
                    key={index} 
                    onClick={() => window.open(social.url, '_blank', 'noopener,noreferrer')}
                    aria-label={social.label}
                    sx={{
                      color: '#9CA3AF',
                      width: 40,
                      height: 40,
                      borderRadius: '8px',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        color: '#3B82F6',
                        backgroundColor: 'rgba(59, 130, 246, 0.08)',
                        transform: 'translateY(-1px)',
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
                flexDirection: 'column',
                alignItems: isMobile ? 'center' : 'flex-end',
              }}
            >
              <Typography 
                variant="h6" 
                sx={{ 
                  mb: 2,
                  color: '#374151',
                  fontWeight: 600,
                  fontSize: '1rem',
                  fontFamily: '"Inter", sans-serif',
                }}
              >
                Quick Links
              </Typography>
              <Box 
                sx={{ 
                  display: 'flex', 
                  flexDirection: isMobile ? 'row' : 'column',
                  flexWrap: isMobile ? 'wrap' : 'nowrap',
                  justifyContent: isMobile ? 'center' : 'flex-end',
                  gap: isMobile ? 2 : 1,
                }}
              >
                {footerLinks.map((link, index) => (
                  <Link
                    key={index}
                    component={RouterLink}
                    to={link.path}
                    underline="none"
                    sx={{
                      color: '#6B7280',
                      fontFamily: '"Inter", sans-serif',
                      fontSize: '0.875rem',
                      transition: 'all 0.2s ease',
                      padding: '4px 8px',
                      borderRadius: '6px',
                      '&:hover': {
                        color: '#3B82F6',
                        backgroundColor: 'rgba(59, 130, 246, 0.06)',
                        transform: 'translateY(-1px)',
                      }
                    }}
                  >
                    {link.name}
                  </Link>
                ))}
              </Box>
            </Box>
          </Box>

          <Divider sx={{ borderColor: 'rgba(229, 231, 235, 0.6)', mb: 2 }} />

          <Box 
            sx={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: isMobile ? 1 : 0,
            }}
          >
            <Typography 
              variant="body2" 
              sx={{ 
                color: '#9CA3AF',
                textAlign: isMobile ? 'center' : 'left',
                fontFamily: '"Inter", sans-serif',
                fontSize: '0.875rem',
              }}
            >
              © {currentYear} <Box component="span" sx={{ color: '#3B82F6', fontWeight: 600 }}>Affinity Tax Services</Box>. All rights reserved.
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                color: '#1F2937', // Dark gray color instead of light gray
                textAlign: isMobile ? 'center' : 'right',
                fontFamily: '"Inter", sans-serif',
                fontSize: '0.875rem',
                animation: `${slideUpFade} 1s ease-out`,
                animationDelay: '0.5s',
                animationFillMode: 'both',
              }}
            >
              Designed with <Box 
                component="span" 
                sx={{ 
                  color: '#3B82F6',
                  animation: `${heartBeat} 2s ease-in-out infinite`,
                  animationDelay: '3.0s',
                  display: 'inline-block',
                }}
              >♥</Box> for better tax experiences
            </Typography>
          </Box>
        </Container>
      </AppBar>
    </Fade>
  );
};

export default Footer;