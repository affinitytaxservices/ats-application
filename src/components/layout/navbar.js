import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  useTheme,
  Container,
  Stack,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  alpha
} from '@mui/material';
import { useNavigate, Link as RouterLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import LogoComponent from '../common/LogoComponent';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { layout } from '../../styles/designTokens';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { currentUser, logout, isAuthenticated } = useAuth();
  
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    handleMenuClose();
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Contact Us', path: '/contact' },
  ];

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: `1px solid ${theme.palette.divider}` }}>
        <LogoComponent variant="medium" />
        <IconButton onClick={handleDrawerToggle}>
          <CloseIcon />
        </IconButton>
      </Box>
      <List sx={{ flexGrow: 1, px: 2, py: 3 }}>
        {navLinks.map((link) => (
          <ListItem key={link.name} disablePadding sx={{ mb: 1 }}>
            <ListItemButton
              component={RouterLink}
              to={link.path}
              onClick={handleDrawerToggle}
              selected={location.pathname === link.path}
            >
              <ListItemText 
                primary={link.name} 
                primaryTypographyProps={{ fontWeight: 600 }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Box sx={{ p: 2, borderTop: `1px solid ${theme.palette.divider}` }}>
        {isAuthenticated ? (
          <Button
            fullWidth
            variant="contained"
            color="primary"
            startIcon={<DashboardIcon />}
            onClick={() => {
              navigate('/dashboard');
              handleDrawerToggle();
            }}
          >
            Dashboard
          </Button>
        ) : (
          <Stack spacing={2}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<LoginIcon />}
              component={RouterLink}
              to="/login"
              onClick={handleDrawerToggle}
            >
              Log In
            </Button>
            <Button
              fullWidth
              variant="contained"
              endIcon={<ArrowForwardIcon />}
              component={RouterLink}
              to="/register"
              onClick={handleDrawerToggle}
            >
              Get Started
            </Button>
          </Stack>
        )}
      </Box>
    </Box>
  );

  return (
    <>
      <AppBar 
        position="fixed" 
        elevation={scrolled ? 4 : 0}
        sx={{
          backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? `1px solid ${theme.palette.divider}` : 'none',
          transition: 'all 0.3s ease',
          height: scrolled ? layout.headerHeight.mobile : layout.headerHeight.desktop,
          justifyContent: 'center',
          boxShadow: scrolled ? theme.shadows[1] : 'none',
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ minHeight: '100% !important', justifyContent: 'space-between' }}>
            {/* Logo Area */}
            <Box 
              component="a"
              onClick={() => navigate('/')}
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                cursor: 'pointer', 
                textDecoration: 'none',
                mr: 4
              }}
            >
              <LogoComponent variant="medium" />
            </Box>

            {/* Desktop Navigation */}
            {!isMobile && (
              <Stack direction="row" spacing={1} alignItems="center">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <Button
                      key={link.name}
                      component={RouterLink}
                      to={link.path}
                      sx={{
                        color: isActive ? 'primary.main' : 'text.secondary',
                        fontWeight: isActive ? 600 : 500,
                        position: 'relative',
                        '&:hover': {
                          color: 'primary.main',
                          backgroundColor: alpha(theme.palette.primary.main, 0.04),
                        },
                        '&::after': isActive ? {
                          content: '""',
                          position: 'absolute',
                          bottom: 6,
                          left: 12,
                          right: 12,
                          height: 2,
                          backgroundColor: 'primary.main',
                          borderRadius: 1,
                        } : {},
                      }}
                    >
                      {link.name}
                    </Button>
                  );
                })}
              </Stack>
            )}

            {/* Actions Area */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {isMobile ? (
                <IconButton 
                  color="primary" 
                  onClick={handleDrawerToggle}
                  edge="end"
                >
                  <MenuIcon />
                </IconButton>
              ) : (
                <>
                  {isAuthenticated ? (
                    <>
                      <Button
                        onClick={handleMenuOpen}
                        startIcon={
                          <Avatar 
                            sx={{ 
                              width: 28, 
                              height: 28, 
                              bgcolor: 'primary.main', 
                              fontSize: '0.875rem' 
                            }}
                          >
                            {currentUser?.name?.[0] || 'U'}
                          </Avatar>
                        }
                        endIcon={<MenuIcon sx={{ fontSize: 20 }} />}
                        variant="outlined"
                        sx={{ 
                          borderColor: theme.palette.divider,
                          borderRadius: 20,
                          px: 2,
                          color: 'text.primary',
                          '&:hover': {
                            borderColor: 'primary.main',
                            backgroundColor: 'background.paper',
                          }
                        }}
                      >
                        Account
                      </Button>
                      <Menu
                        id="account-menu"
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                        PaperProps={{
                          elevation: 3,
                          sx: {
                            mt: 1.5,
                            minWidth: 180,
                            borderRadius: 2,
                          },
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                      >
                        <MenuItem onClick={() => { navigate('/dashboard'); handleMenuClose(); }}>
                          <ListItemIcon><DashboardIcon fontSize="small" /></ListItemIcon>
                          Dashboard
                        </MenuItem>
                        <Divider />
                        <MenuItem onClick={handleLogout}>
                          <ListItemIcon><LogoutIcon fontSize="small" /></ListItemIcon>
                          Logout
                        </MenuItem>
                      </Menu>
                    </>
                  ) : (
                    <Stack direction="row" spacing={2}>
                      <Button 
                        component={RouterLink} 
                        to="/login"
                        color="inherit"
                        sx={{ color: 'text.primary', fontWeight: 600 }}
                      >
                        Log In
                      </Button>
                      <Button
                        variant="contained"
                        component={RouterLink}
                        to="/register"
                        endIcon={<ArrowForwardIcon />}
                      >
                        Get Started
                      </Button>
                    </Stack>
                  )}
                </>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 280 },
        }}
      >
        {drawer}
      </Drawer>
      
      {/* Spacer to prevent content overlap */}
      <Toolbar sx={{ height: layout.headerHeight.desktop }} />
    </>
  );
};

export default Navbar;
