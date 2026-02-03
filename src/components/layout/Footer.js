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
  SvgIcon,
  useTheme,
  alpha
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import DescriptionIcon from '@mui/icons-material/Description';
import { motion } from 'framer-motion';

const XIcon = (props) => (
  <SvgIcon {...props}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </SvgIcon>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const theme = useTheme();

  const footerSections = [
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
      ]
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <Box 
      component={motion.footer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
      sx={{ 
        bgcolor: 'primary.main',
        color: 'primary.contrastText',
        pt: 10,
        pb: 4,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Decorative Background Element */}
      <Box
        component={motion.div}
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 0.15, scale: 1 }}
        transition={{ duration: 1.5 }}
        sx={{
          position: 'absolute',
          top: -150,
          right: -100,
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.error.main} 30%, ${theme.palette.warning.main} 60%, ${theme.palette.success.main} 100%)`,
          filter: 'blur(50px)',
          zIndex: 0,
          pointerEvents: 'none'
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={8}>
          {/* Brand Column */}
          <Grid item xs={12} md={4}>
            <Box component={motion.div} variants={itemVariants} sx={{ mb: 3 }}>
              <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2 }}>
                <Box sx={{ 
                  p: 0.75, 
                  bgcolor: 'secondary.main', 
                  borderRadius: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.3)'
                }}>
                  <DescriptionIcon sx={{ color: 'white', fontSize: 20 }} />
                </Box>
                <Typography variant="h5" fontWeight={800} sx={{ letterSpacing: '-0.5px', color: 'secondary.light' }}>
                  Affinity Tax Services
                </Typography>
              </Stack>
              <Typography variant="body2" sx={{ color: alpha(theme.palette.primary.contrastText, 0.7), lineHeight: 1.7, maxWidth: 300 }}>
                Professional tax preparation and strategic financial planning services. Helping you navigate complex tax landscapes with confidence.
              </Typography>
            </Box>
            <Stack component={motion.div} variants={itemVariants} direction="row" spacing={1}>
              {[
                { icon: <FacebookIcon />, label: 'Facebook' },
                { icon: <XIcon />, label: 'X' },
                { icon: <LinkedInIcon />, label: 'LinkedIn' },
                { icon: <InstagramIcon />, label: 'Instagram' },
              ].map((social) => (
                <IconButton 
                  key={social.label} 
                  component={motion.button}
                  whileHover={{ scale: 1.1, backgroundColor: theme.palette.secondary.main }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                  size="small"
                  sx={{ 
                    color: alpha(theme.palette.primary.contrastText, 0.6),
                    bgcolor: alpha(theme.palette.common.white, 0.05),
                    transition: 'none', // Let framer-motion handle transition
                    '&:hover': { 
                      color: 'white', 
                    }
                  }}
                >
                  {social.icon}
                </IconButton>
              ))}
            </Stack>
          </Grid>

          {/* Link Columns */}
          {footerSections.map((section) => (
            <Grid item xs={6} md={2} key={section.title}>
              <Box component={motion.div} variants={itemVariants}>
                <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 3, color: 'white' }}>
                  {section.title}
                </Typography>
                <Stack spacing={2}>
                  {section.links.map((link) => (
                    <Link
                      key={link.name}
                      component={RouterLink}
                      to={link.path}
                      variant="body2"
                      sx={{ 
                        color: alpha(theme.palette.primary.contrastText, 0.6),
                        textDecoration: 'none',
                        display: 'inline-block',
                        transition: 'color 0.2s',
                        '&:hover': { color: 'secondary.main' }
                      }}
                    >
                      <motion.span
                        style={{ display: 'inline-block' }}
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {link.name}
                      </motion.span>
                    </Link>
                  ))}
                </Stack>
              </Box>
            </Grid>
          ))}
          
          {/* Contact Info */}
          <Grid item xs={12} md={4}>
            <Box component={motion.div} variants={itemVariants}>
               <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 3, color: 'white' }}>
                  Contact Us
                </Typography>
                <Stack spacing={3}>
                  <Box component={motion.div} whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 300 }}>
                    <Stack direction="row" spacing={2} alignItems="flex-start">
                      <LocationOnIcon sx={{ fontSize: 20, color: 'secondary.main', mt: 0.25 }} />
                      <Box>
                        <Typography variant="body2" fontWeight={600} sx={{ color: 'white' }}>
                          Headquarters
                        </Typography>
                        <Typography variant="body2" sx={{ color: alpha(theme.palette.primary.contrastText, 0.6) }}>
                          123 Main St, Boston, MA 02108
                        </Typography>
                      </Box>
                    </Stack>
                  </Box>
                  <Box component={motion.div} whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 300 }}>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <PhoneIcon sx={{ fontSize: 20, color: 'secondary.main' }} />
                      <Box>
                        <Typography variant="body2" fontWeight={600} sx={{ color: 'white' }}>
                          Phone
                        </Typography>
                        <Link href="tel:+15551234567" variant="body2" sx={{ color: alpha(theme.palette.primary.contrastText, 0.6), textDecoration: 'none', '&:hover': { color: 'white' } }}>
                          (555) 123-4567
                        </Link>
                      </Box>
                    </Stack>
                  </Box>
                  <Box component={motion.div} whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 300 }}>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <EmailIcon sx={{ fontSize: 20, color: 'secondary.main' }} />
                      <Box>
                        <Typography variant="body2" fontWeight={600} sx={{ color: 'white' }}>
                          Email
                        </Typography>
                        <Link href="mailto:info@affinitytaxservices.com" variant="body2" sx={{ color: alpha(theme.palette.primary.contrastText, 0.6), textDecoration: 'none', '&:hover': { color: 'white' } }}>
                          info@affinitytaxservices.com
                        </Link>
                      </Box>
                    </Stack>
                  </Box>
                </Stack>
            </Box>
          </Grid>
        </Grid>

        <Divider component={motion.hr} variants={itemVariants} sx={{ my: 6, borderColor: alpha(theme.palette.common.white, 0.1) }} />

        <Stack 
          component={motion.div}
          variants={itemVariants}
          direction="row"
          flexWrap="wrap"
          justifyContent="space-between" 
          alignItems="center" 
          spacing={2}
        >
          <Typography variant="body2" sx={{ color: alpha(theme.palette.primary.contrastText, 0.5) }}>
            © {currentYear} Affinity Tax Services. All rights reserved.
          </Typography>
          
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography variant="body2" sx={{ color: alpha(theme.palette.primary.contrastText, 0.5) }}>
              Created by Pc & ATS Squad
            </Typography>
            <Box
              component={motion.div}
              whileHover={{ y: -5, x: 5, rotate: 45 }}
              transition={{ type: "spring", stiffness: 300 }}
              sx={{ display: 'flex', alignItems: 'center', color: 'secondary.main' }}
            >
              <RocketLaunchIcon fontSize="small" />
            </Box>
            <IconButton 
              component={motion.button}
              whileHover={{ y: -3, backgroundColor: theme.palette.secondary.main, color: 'white' }}
              whileTap={{ scale: 0.9 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              size="small"
              sx={{ 
                color: alpha(theme.palette.primary.contrastText, 0.5),
                border: `1px solid ${alpha(theme.palette.common.white, 0.1)}`,
                transition: 'none',
                ml: 1
              }}
            >
              <ArrowUpwardIcon fontSize="small" />
            </IconButton>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
