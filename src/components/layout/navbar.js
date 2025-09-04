import React from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
  Slide,
  Fade,
  Tooltip
} from '@mui/material';
import { useNavigate, Link as RouterLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import InfoIcon from '@mui/icons-material/Info';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

import LogoutIcon from '@mui/icons-material/Logout';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LogoComponent from '../common/LogoComponent';

// Common button style
const commonButtonStyle = {
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    transform: 'translateY(-2px) scale(1.02)'
  },
  '&:active': {
    transform: 'translateY(-1px) scale(1.01)'
  },
  borderRadius: 3,
  px: 2.5,
  py: 1.2,
  mx: 0.5,
  minHeight: '40px',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  fontWeight: 600,
  textTransform: 'none',
  fontSize: '0.95rem',
  backdropFilter: 'blur(8px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(255, 255, 255, 0.05)',
    opacity: 0,
    transition: 'opacity 0.2s ease',
  },
  '&:hover::before': {
    opacity: 1,
  }
};

// Mobile drawer item style
const drawerItemStyle = {
  py: 2,
  borderRadius: 2,
  my: 0.5,
  mx: 1,
  minHeight: '56px',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    transform: 'translateX(5px)'
  },
  '& .MuiListItemIcon-root': {
    minWidth: '48px'
  },
  '& .MuiListItemText-primary': {
    fontSize: '1.1rem',
    fontWeight: 500
  }
};

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [resourcesAnchorEl, setResourcesAnchorEl] = React.useState(null);
  const { isAuthenticated, isAdmin, logout } = useAuth();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleResourcesMenu = (event) => {
    setResourcesAnchorEl(event.currentTarget);
  };

  const handleResourcesClose = () => {
    setResourcesAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    handleClose();
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setMobileOpen(false);
    handleResourcesClose();
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  // Mobile drawer content
  const drawer = (
    <Box 
      onClick={handleDrawerToggle} 
      sx={{ 
        textAlign: 'center', 
        py: 3,
        height: '100%',
        background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.98) 0%, rgba(30, 58, 138, 0.95) 100%)',
        color: '#ffffff'
      }}
    >
      <Box
        component={RouterLink}
        to="/"
        sx={{
          textDecoration: 'none',
          color: 'inherit',
          mb: 4,
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <LogoComponent variant="medium" showText={true} />
      </Box>
      <List sx={{ px: 2 }}>
        <ListItem 
          button 
          onClick={() => handleNavigation('/tax-information')} 
          sx={{
            ...drawerItemStyle,
            backgroundColor: isActive('/tax-information') ? 'rgba(16, 185, 129, 0.15)' : 'transparent',
          }}
        >
          <ListItemIcon><InfoIcon sx={{ color: '#10B981' }} /></ListItemIcon>
          <ListItemText 
            primary="Tax Resources" 
            sx={{ 
              '& .MuiListItemText-primary': { 
                color: '#ffffff', 
                fontWeight: isActive('/tax-information') ? 600 : 400,
                fontFamily: '"Montserrat", sans-serif',
              } 
            }} 
          />
        </ListItem>
        
        {isAuthenticated ? (
          <>
            <ListItem 
              button 
              onClick={() => {
                if (isAdmin) {
                  handleNavigation('/admin');
                } else {
                  handleNavigation('/client-dashboard');
                }
              }} 
              sx={{
                ...drawerItemStyle,
                backgroundColor: isActive('/admin') || isActive('/client-dashboard') 
                  ? 'rgba(16, 185, 129, 0.15)' 
                  : 'transparent',
              }}
            >
              <ListItemIcon><DashboardIcon sx={{ color: '#10B981' }} /></ListItemIcon>
              <ListItemText 
                primary="Dashboard" 
                sx={{ 
                  '& .MuiListItemText-primary': { 
                    color: '#ffffff', 
                    fontWeight: isActive('/admin') || isActive('/client-dashboard') ? 600 : 400,
                    fontFamily: '"Montserrat", sans-serif',
                  } 
                }} 
              />
            </ListItem>
            <ListItem 
              button 
              onClick={() => handleNavigation('/documents')} 
              sx={{
                ...drawerItemStyle,
                backgroundColor: isActive('/documents') ? 'rgba(16, 185, 129, 0.15)' : 'transparent',
              }}
            >
              <ListItemIcon><UploadFileIcon sx={{ color: '#10B981' }} /></ListItemIcon>
              <ListItemText 
                primary="Documents" 
                sx={{ 
                  '& .MuiListItemText-primary': { 
                    color: '#ffffff', 
                    fontWeight: isActive('/documents') ? 600 : 400,
                    fontFamily: '"Montserrat", sans-serif',
                  } 
                }} 
              />
            </ListItem>
            <ListItem 
              button 
              onClick={handleLogout} 
              sx={drawerItemStyle}
            >
              <ListItemIcon><LogoutIcon sx={{ color: '#F59E0B' }} /></ListItemIcon>
              <ListItemText 
                primary="Logout" 
                sx={{ 
                  '& .MuiListItemText-primary': { 
                    color: '#ffffff', 
                    fontFamily: '"Montserrat", sans-serif',
                  } 
                }} 
              />
            </ListItem>
          </>
        ) : (
          <>
            <ListItem 
              button 
              onClick={() => handleNavigation('/login')} 
              sx={{
                ...drawerItemStyle,
                backgroundColor: isActive('/login') ? 'rgba(16, 185, 129, 0.15)' : 'transparent',
              }}
            >
              <ListItemIcon><LoginIcon sx={{ color: '#10B981' }} /></ListItemIcon>
              <ListItemText 
                primary="Login" 
                sx={{ 
                  '& .MuiListItemText-primary': { 
                    color: '#ffffff', 
                    fontWeight: isActive('/login') ? 600 : 400,
                    fontFamily: '"Montserrat", sans-serif',
                  } 
                }} 
              />
            </ListItem>
            <ListItem 
              button 
              onClick={() => handleNavigation('/register')} 
              sx={{
                ...drawerItemStyle,
                backgroundColor: isActive('/register') ? 'rgba(16, 185, 129, 0.15)' : 'transparent',
              }}
            >
              <ListItemIcon><PersonAddIcon sx={{ color: '#10B981' }} /></ListItemIcon>
              <ListItemText 
                primary="Register" 
                sx={{ 
                  '& .MuiListItemText-primary': { 
                    color: '#ffffff', 
                    fontWeight: isActive('/register') ? 600 : 400,
                    fontFamily: '"Montserrat", sans-serif',
                  } 
                }} 
              />
            </ListItem>
            {/* Contact Us, Privacy Policy, and Terms links removed from mobile drawer */}
          </>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <Slide appear={false} direction="down" in={!isMobile || true}>
        <AppBar 
          position="sticky" 
          elevation={0}
          sx={{
            background: 'rgba(15, 23, 42, 0.85)',
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <Toolbar sx={{ py: 1 }}>
            {isMobile && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ 
                  mr: 2,
                  color: '#ffffff',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    transform: 'rotate(180deg)',
                    transition: 'transform 0.3s ease'
                  }
                }}
              >
                <MenuIcon />
              </IconButton>
            )}
            
            <Box
              component={RouterLink}
              to="/"
              sx={{
                flexGrow: 1,
                textDecoration: 'none',
                color: 'inherit',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <LogoComponent variant={isMobile ? 'small' : 'medium'} showText={true} />
            </Box>

            {!isMobile && (
              <Box sx={{ flexGrow: 1, display: 'flex', ml: 4 }}>
                <Button
                  color="inherit"
                  endIcon={<KeyboardArrowDownIcon />}
                  onClick={handleResourcesMenu}
                  sx={{
                    ...commonButtonStyle,
                    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(16, 185, 129, 0.1))',
                    border: '1px solid rgba(59, 130, 246, 0.2)',
                    borderRadius: '12px',
                    color: '#1E40AF',
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    px: 3,
                    py: 1.2,
                    borderBottom: Boolean(resourcesAnchorEl) || isActive('/tax-information') || isActive('/individual-tax') || isActive('/business-tax')
                      ? '3px solid #3B82F6'
                      : '3px solid transparent',
                    '&:hover': {
                      background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(16, 185, 129, 0.15))',
                      borderColor: 'rgba(59, 130, 246, 0.4)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 25px rgba(59, 130, 246, 0.2)',
                      borderBottom: '3px solid #3B82F6'
                    }
                  }}
                >
                  📊 Tax Hub
                </Button>
                {/* Contact Us, Privacy Policy, and Terms links removed from header */}
                <Menu
                  anchorEl={resourcesAnchorEl}
                  open={Boolean(resourcesAnchorEl)}
                  onClose={handleResourcesClose}
                  TransitionComponent={Fade}
                  PaperProps={{
                    elevation: 8,
                    sx: {
                      mt: 1.5,
                      overflow: 'visible',
                      filter: 'drop-shadow(0px 8px 32px rgba(59, 130, 246, 0.15))',
                      borderRadius: 3,
                      minWidth: 220,
                      border: '1px solid rgba(59, 130, 246, 0.1)',
                      '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        left: 20,
                        width: 12,
                        height: 12,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                        border: '1px solid rgba(59, 130, 246, 0.1)',
                        borderBottom: 'none',
                        borderRight: 'none',
                      },
                      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.98), rgba(248, 250, 252, 0.95))',
                      backdropFilter: 'blur(20px)',
                    },
                  }}
                >
                  <MenuItem 
                    onClick={() => handleNavigation('/tax-information')} 
                    sx={{ 
                      py: 2, 
                      px: 2.5,
                      borderRadius: 2,
                      mx: 1,
                      my: 0.5,
                      borderLeft: isActive('/tax-information') ? '4px solid #3B82F6' : '4px solid transparent',
                      background: isActive('/tax-information') ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.08), rgba(16, 185, 129, 0.05))' : 'transparent',
                      '&:hover': { 
                        backgroundColor: 'rgba(59, 130, 246, 0.08)',
                        transform: 'translateX(4px)',
                        transition: 'all 0.2s ease'
                      }
                    }}
                  >
                    <ListItemIcon>
                      <InfoIcon fontSize="medium" sx={{ color: '#3B82F6', mr: 1 }} />
                    </ListItemIcon>
                    📋 Tax Information
                  </MenuItem>
                  <MenuItem 
                    onClick={() => handleNavigation('/individual-tax')} 
                    sx={{ 
                      py: 2, 
                      px: 2.5,
                      borderRadius: 2,
                      mx: 1,
                      my: 0.5,
                      borderLeft: isActive('/individual-tax') ? '4px solid #3B82F6' : '4px solid transparent',
                      background: isActive('/individual-tax') ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.08), rgba(16, 185, 129, 0.05))' : 'transparent',
                      '&:hover': { 
                        backgroundColor: 'rgba(59, 130, 246, 0.08)',
                        transform: 'translateX(4px)',
                        transition: 'all 0.2s ease'
                      }
                    }}
                  >
                    <ListItemIcon>
                      <PersonAddIcon fontSize="medium" sx={{ color: '#10B981', mr: 1 }} />
                    </ListItemIcon>
                    👤 Individual Tax
                  </MenuItem>
                  <MenuItem 
                    onClick={() => handleNavigation('/business-tax')} 
                    sx={{ 
                      py: 2, 
                      px: 2.5,
                      borderRadius: 2,
                      mx: 1,
                      my: 0.5,
                      borderLeft: isActive('/business-tax') ? '4px solid #3B82F6' : '4px solid transparent',
                      background: isActive('/business-tax') ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.08), rgba(16, 185, 129, 0.05))' : 'transparent',
                      '&:hover': { 
                        backgroundColor: 'rgba(59, 130, 246, 0.08)',
                        transform: 'translateX(4px)',
                        transition: 'all 0.2s ease'
                      }
                    }}
                  >
                    <ListItemIcon>
                      <DashboardIcon fontSize="medium" sx={{ color: '#8B5CF6', mr: 1 }} />
                    </ListItemIcon>
                    🏢 Business Tax
                  </MenuItem>
                </Menu>
              </Box>
            )}

            {isAuthenticated ? (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Tooltip title="Dashboard" arrow>
                  <Button
                    color="inherit"
                    startIcon={<DashboardIcon />}
                    component={RouterLink}
                    to={isAdmin ? '/admin' : '/client-dashboard'}
                    sx={{
                      ...commonButtonStyle,
                      borderBottom: isActive('/admin') || isActive('/client-dashboard') 
                        ? '2px solid #10B981' 
                        : '2px solid transparent',
                      '&:hover': {
                        ...commonButtonStyle['&:hover'],
                        borderBottom: '2px solid #10B981'
                      }
                    }}
                  >
                    Dashboard
                  </Button>
                </Tooltip>
                <Tooltip title="Documents" arrow>
                  <Button
                    color="inherit"
                    startIcon={<UploadFileIcon />}
                    component={RouterLink}
                    to="/documents"
                    sx={{
                      ...commonButtonStyle,
                      borderBottom: isActive('/documents') ? '2px solid #10B981' : '2px solid transparent',
                      '&:hover': {
                        ...commonButtonStyle['&:hover'],
                        borderBottom: '2px solid #10B981'
                      }
                    }}
                  >
                    Documents
                  </Button>
                </Tooltip>
                {isAdmin && (
                  <Tooltip title="Admin Panel" arrow>
                    <Button
                      color="inherit"
                      component={RouterLink}
                      to="/admin"
                      sx={{
                        ...commonButtonStyle,
                        borderBottom: isActive('/admin') ? '2px solid #10B981' : '2px solid transparent',
                        '&:hover': {
                          ...commonButtonStyle['&:hover'],
                          borderBottom: '2px solid #10B981'
                        }
                      }}
                    >
                      Admin
                    </Button>
                  </Tooltip>
                )}
                <Tooltip title="Account" arrow>
                  <IconButton
                    size="large"
                    onClick={handleMenu}
                    color="inherit"
                    sx={{
                      ml: 1,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        transform: 'translateY(-2px)'
                      }
                    }}
                  >
                    <AccountCircle />
                  </IconButton>
                </Tooltip>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  TransitionComponent={Fade}
                  PaperProps={{
                    elevation: 3,
                    sx: {
                      mt: 1.5,
                      overflow: 'visible',
                      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.15))',
                      borderRadius: 2,
                      minWidth: 180,
                      '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                      },
                      background: 'rgba(255, 255, 255, 0.95)',
                      backdropFilter: 'blur(10px)',
                    },
                  }}
                >
                  <MenuItem 
                    onClick={handleLogout}
                    sx={{ 
                      py: 1.5, 
                      '&:hover': { backgroundColor: 'rgba(239, 68, 68, 0.1)' }
                    }}
                  >
                    <ListItemIcon>
                      <LogoutIcon fontSize="small" sx={{ color: '#EF4444' }} />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                </Menu>
              </Box>
            ) : (
              <Box>
                <Button 
                  color="inherit" 
                  component={RouterLink} 
                  to="/login"
                  startIcon={<LoginIcon />}
                  sx={{
                    background: 'linear-gradient(135deg, #1E3A8A 0%, #10B981 50%, #0EA5E9 100%)',
                    color: '#ffffff',
                    padding: { xs: '12px 20px', md: '14px 28px' },
                    borderRadius: '12px',
                    fontWeight: 600,
                    fontSize: { xs: '0.9rem', md: '1rem' },
                    textTransform: 'none',
                    minHeight: '44px',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: '0 4px 20px rgba(16, 185, 129, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1) inset',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: '-100%',
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
                      transition: 'left 0.6s ease',
                    },
                    '&:hover': {
                      transform: 'translateY(-2px) scale(1.02)',
                      boxShadow: '0 8px 30px rgba(16, 185, 129, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.2) inset',
                      background: 'linear-gradient(135deg, #10B981 0%, #0EA5E9 50%, #1E3A8A 100%)',
                      '&::before': {
                        left: '100%',
                      },
                    },
                    '&:active': {
                      transform: 'translateY(-1px) scale(1.01)',
                    }
                  }}
                >
                  Login
                </Button>
                <Button 
                  color="inherit" 
                  component={RouterLink} 
                  to="/register"
                  startIcon={<PersonAddIcon />}
                  sx={{ 
                    ml: { xs: 1, md: 2 },
                    background: 'rgba(255, 255, 255, 0.08)',
                    backdropFilter: 'blur(12px)',
                    color: '#ffffff',
                    padding: { xs: '12px 20px', md: '14px 28px' },
                    borderRadius: '12px',
                    fontWeight: 600,
                    fontSize: { xs: '0.9rem', md: '1rem' },
                    textTransform: 'none',
                    minHeight: '44px',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'linear-gradient(45deg, rgba(16, 185, 129, 0.1), rgba(14, 165, 233, 0.1))',
                      opacity: 0,
                      transition: 'opacity 0.3s ease',
                    },
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.15)',
                      transform: 'translateY(-2px) scale(1.02)',
                      border: '1px solid rgba(255, 255, 255, 0.25)',
                      boxShadow: '0 8px 25px rgba(255, 255, 255, 0.1)',
                      '&::before': {
                        opacity: 1,
                      },
                    },
                    '&:active': {
                      transform: 'translateY(-1px) scale(1.01)',
                    }
                  }}
                >
                  Register
                </Button>
              </Box>
            )}
          </Toolbar>
        </AppBar>
      </Slide>
      
      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: { xs: '85vw', sm: 320 },
            maxWidth: 320,
            background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 58, 138, 0.9) 100%)',
            backdropFilter: 'blur(10px)',
            border: 'none',
            borderRadius: '0 16px 16px 0',
            overflow: 'hidden'
          },
          '& .MuiBackdrop-root': {
            backgroundColor: 'rgba(0, 0, 0, 0.7)'
          }
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
}

export default Navbar;