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
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
  Container,
  Stack,
  Avatar,
  Menu,
  MenuItem,
  Divider,
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

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { currentUser, logout, isAuthenticated } = useAuth();
  
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
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
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: 'background.default' }}>
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <LogoComponent variant="medium" />
        <IconButton onClick={handleDrawerToggle}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />
      <List sx={{ flexGrow: 1, px: 2, py: 3 }}>
        {navLinks.map((link) => (
          <ListItem key={link.name} disablePadding sx={{ mb: 1 }}>
            <ListItemButton
              component={RouterLink}
              to={link.path}
              onClick={handleDrawerToggle}
              selected={location.pathname === link.path}
              sx={{
                borderRadius: 2,
                '&.Mui-selected': {
                  bgcolor: 'primary.main',
                  color: 'primary.contrastText',
                  '&:hover': {
                    bgcolor: 'primary.dark',
                  },
                },
              }}
            >
              <ListItemText 
                primary={link.name} 
                primaryTypographyProps={{ fontWeight: 600 }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Box sx={{ p: 2 }}>
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
            sx={{ mb: 1 }}
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
              className="cta-link"
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
        color="inherit"
        elevation={scrolled ? 4 : 0}
        sx={{
          transition: 'all 0.3s ease',
          bgcolor: scrolled ? 'rgba(255, 255, 255, 0.9)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? `1px solid ${theme.palette.divider}` : 'none',
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ height: 80 }}>
            {/* Logo */}
            <Box sx={{ flexGrow: 0, mr: 4, display: 'flex', cursor: 'pointer' }} onClick={() => navigate('/')}>
              <LogoComponent variant="medium" />
            </Box>

            {/* Desktop Nav */}
            {!isMobile && (
              <Box sx={{ flexGrow: 1, display: 'flex', gap: 1 }}>
                {navLinks.map((link) => (
                  <Button
                    key={link.name}
                    component={RouterLink}
                    to={link.path}
                    sx={{
                      color: location.pathname === link.path ? 'primary.main' : 'text.secondary',
                      fontWeight: location.pathname === link.path ? 600 : 500,
                      '&:hover': {
                        color: 'primary.main',
                        bgcolor: 'rgba(15, 23, 42, 0.04)',
                      },
                    }}
                  >
                    {link.name}
                  </Button>
                ))}
              </Box>
            )}

            {/* Desktop Auth Actions */}
            {!isMobile && (
              <Box sx={{ flexGrow: 0 }}>
                {isAuthenticated ? (
                  <>
                    <Button
                      onClick={handleMenuOpen}
                      startIcon={<Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>{currentUser?.name?.[0] || 'U'}</Avatar>}
                      endIcon={<MenuIcon />}
                      sx={{ 
                        textTransform: 'none',
                        color: 'text.primary',
                        border: `1px solid ${theme.palette.divider}`,
                        borderRadius: 50,
                        px: 2,
                        py: 0.5,
                      }}
                    >
                      Account
                    </Button>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleMenuClose}
                      PaperProps={{
                        elevation: 0,
                        sx: {
                          overflow: 'visible',
                          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                          mt: 1.5,
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
                      variant="text" 
                      component={RouterLink} 
                      to="/login"
                      sx={{ color: 'text.primary', fontWeight: 600 }}
                    >
                      Log In
                    </Button>
                    <Button 
                      variant="contained" 
                      component={RouterLink} 
                      to="/register"
                      endIcon={<ArrowForwardIcon />}
                      className="cta-link"
                    >
                      Get Started
                    </Button>
                  </Stack>
                )}
              </Box>
            )}

            {/* Mobile Menu Button */}
            {isMobile && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="end"
                onClick={handleDrawerToggle}
                sx={{ ml: 'auto' }}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      
      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        PaperProps={{ sx: { width: '85%', maxWidth: 360 } }}
      >
        {drawer}
      </Drawer>
      
      {/* Spacer for fixed AppBar */}
      <Toolbar sx={{ height: 80 }} /> 
    </>
  );
};

export default Navbar;
