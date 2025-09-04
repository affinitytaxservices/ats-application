import React from 'react';
import { AppBar, Container, Box, Typography, Link, IconButton, Divider, useMediaQuery, useTheme, Fade } from '@mui/material';
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
          py: 1.5,
          background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 58, 138, 0.95) 100%)',
          backdropFilter: 'blur(10px)',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
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
              <LogoComponent variant="small" showText={true} />
              <Typography 
                variant="body2" 
                color="text.secondary" 
                sx={{ 
                  mt: 1, 
                  maxWidth: 300,
                  textAlign: isMobile ? 'center' : 'left',
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontFamily: '"Inter", sans-serif',
                fontSize: '0.75rem',
                }}
              >
                Professional tax services for individuals and businesses. We make tax season stress-free.
              </Typography>
              <Box 
                sx={{ 
                  display: 'flex', 
                  mt: 1,
                  justifyContent: isMobile ? 'center' : 'flex-start',
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
                      color: 'rgba(255, 255, 255, 0.7)',
                      mr: 1,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        color: '#10B981',
                        transform: 'translateY(-3px)'
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
                  mb: 1,
                  color: '#ffffff',
                  fontWeight: 600,
                  fontSize: '1rem',
                  fontFamily: '"Montserrat", sans-serif',
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
                }}
              >
                {footerLinks.map((link, index) => (
                  <Link
                    key={index}
                    component={RouterLink}
                    to={link.path}
                    underline="none"
                    sx={{
                      color: 'rgba(255, 255, 255, 0.7)',
                      mb: isMobile ? 0 : 1,
                      mx: isMobile ? 1.5 : 0,
                      fontFamily: '"Inter", sans-serif',
                      transition: 'all 0.3s ease',
                      position: 'relative',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      '&:hover': {
                        color: '#10B981',
                        transform: isMobile ? 'translateY(-2px)' : 'translateX(5px)',
                        backgroundColor: 'rgba(16, 185, 129, 0.1)',
                        '&::after': {
                          width: '100%',
                        }
                      },
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: -2,
                        left: 0,
                        width: 0,
                        height: '1px',
                        backgroundColor: '#10B981',
                        transition: 'width 0.3s ease'
                      }
                    }}
                  >
                    {link.name}
                  </Link>
                ))}
              </Box>
            </Box>
          </Box>

          <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)', mb: 1 }} />

          <Box 
            sx={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography 
              variant="body2" 
              sx={{ 
                color: 'rgba(255, 255, 255, 0.5)',
                textAlign: isMobile ? 'center' : 'left',
                mb: isMobile ? 0.5 : 0,
                fontFamily: '"Inter", sans-serif',
              }}
            >
              © {currentYear} Affinity Tax Services. All rights reserved.
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                color: 'rgba(255, 255, 255, 0.5)',
                textAlign: isMobile ? 'center' : 'right',
                fontFamily: '"Inter", sans-serif',
              }}
            >
              Designed with <Box component="span" sx={{ color: theme.palette.error.main }}>♥</Box> for better tax experiences
            </Typography>
          </Box>
        </Container>
      </AppBar>
    </Fade>
  );
};

export default Footer;