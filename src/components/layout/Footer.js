import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Link, 
  IconButton, 
  Stack, 
  Divider,
  keyframes,
  SvgIcon
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import LogoComponent from '../common/LogoComponent';

const floatAnimation = keyframes`
  0% { transform: translateY(0) translateX(0); }
  50% { transform: translateY(-5px) translateX(3px); }
  100% { transform: translateY(0) translateX(0); }
`;

const XIcon = (props) => (
  <SvgIcon {...props}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </SvgIcon>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Company',
      links: [
        { name: 'About Us', path: '/about' },
        { name: 'Our Team', path: '/team' },
        { name: 'Careers', path: '/careers' },
        { name: 'Contact Us', path: '/contact' },
        { name: 'Under Construction', path: '/under-construction' },
      ]
    },
    {
      title: 'Services',
      links: [
        { name: 'Individual Tax', path: '/individual-tax' },
        { name: 'Business Tax', path: '/business-tax' },
        { name: 'Tax Planning', path: '/tax-planning' },
        { name: 'IRS Audit Support', path: '/contact' },
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'FAQs', path: '/faqs' },
        { name: 'Client Portal', path: '/login' },
        { name: 'Privacy Policy', path: '/privacy-policy' },
        { name: 'Terms of Service', path: '/terms-and-conditions' },
      ]
    }
  ];

  return (
    <Box 
      component="footer" 
      sx={{ 
        bgcolor: 'background.default',
        borderTop: '1px solid',
        borderColor: 'divider',
        pt: 8,
        pb: 4
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Brand Column */}
          <Grid item xs={12} md={4}>
            <Box sx={{ mb: 2 }}>
              <LogoComponent variant="medium" />
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2, maxWidth: 300 }}>
              Professional tax preparation and planning services. We help individuals and businesses maximize their returns with expert strategies.
            </Typography>
            <Stack direction="row" spacing={1}>
              {[
                { icon: <FacebookIcon />, label: 'Facebook' },
                { icon: <XIcon />, label: 'X (formerly Twitter)' },
                { icon: <LinkedInIcon />, label: 'LinkedIn' },
                { icon: <InstagramIcon />, label: 'Instagram' },
              ].map((social) => (
                <IconButton 
                  key={social.label} 
                  aria-label={social.label}
                  size="small"
                  sx={{ 
                    color: 'text.secondary',
                    '&:hover': { color: 'primary.main', bgcolor: 'primary.light' }
                  }}
                >
                  {social.icon}
                </IconButton>
              ))}
            </Stack>
          </Grid>

          {/* Link Columns */}
          {footerSections.map((section) => (
            <Grid item xs={6} sm={4} md={2} key={section.title}>
              <Typography variant="subtitle2" color="text.primary" fontWeight={700} sx={{ mb: 2 }}>
                {section.title}
              </Typography>
              <Stack spacing={1}>
                {section.links.map((link) => (
                  <Link
                    key={link.name}
                    component={RouterLink}
                    to={link.path}
                    color="text.secondary"
                    variant="body2"
                    sx={{ 
                      textDecoration: 'none',
                      '&:hover': { color: 'primary.main' }
                    }}
                  >
                    {link.name}
                  </Link>
                ))}
              </Stack>
            </Grid>
          ))}
          
          {/* Contact Info */}
          <Grid item xs={12} sm={4} md={2}>
             <Typography variant="subtitle2" color="text.primary" fontWeight={700} sx={{ mb: 2 }}>
                Contact
              </Typography>
              <Stack spacing={1}>
                <Typography variant="body2" color="text.secondary">
                  123 Tax Avenue,<br />
                  Finance City, FC 12345
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  +91 8341154481
                </Typography>
                <Link href="mailto:info@affinitytaxservices.com" variant="body2" color="primary.main" underline="hover">
                  info@affinitytaxservices.com    
                </Link>
              </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            © {currentYear} Affinity Tax Services. All rights reserved.
          </Typography>
          <Box sx={{ mt: { xs: 2, sm: 0 }, display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="caption" color="text.disabled">
              Crafted and Developed by ATS Squad
            </Typography>
            <RocketLaunchIcon 
              sx={{ 
                fontSize: '1.2rem', 
                color: 'text.disabled',
                animation: `${floatAnimation} 3s ease-in-out infinite`
              }} 
              aria-label="Rocket launching"
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
