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
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    transform: 'translateY(-2px)'
  },
  borderRadius: 2,
  px: 2,
  py: 1,
  mx: 0.5,
  transition: 'all 0.3s ease',
  fontWeight: 500
};

// Mobile drawer item style
const drawerItemStyle = {
  py: 1.5,
  borderRadius: 1,
  my: 0.5,
  mx: 1,
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    transform: 'translateX(5px)'
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
                    background: 'linear-gradient(90deg, #1E3A8A 0%, #10B981 100%)',
                    color: '#ffffff',
                    padding: '10px 20px',
                    borderRadius: '8px',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 15px rgba(16, 185, 129, 0.2)',
                    '&:hover': {
                      transform: 'translateY(-3px)',
                      boxShadow: '0 8px 25px rgba(16, 185, 129, 0.35)',
                      background: 'linear-gradient(90deg, #10B981 0%, #1E3A8A 100%)',
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
                    ml: 2,
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(5px)',
                    color: '#ffffff',
                    padding: '10px 20px',
                    borderRadius: '8px',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      transform: 'translateY(-3px)'
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
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true // Better open performance on mobile
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { 
            width: 280,
            boxSizing: 'border-box',
            boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)'
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
}

export default Navbar;