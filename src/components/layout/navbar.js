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
  Divider,
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
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SecurityIcon from '@mui/icons-material/Security';
import WorkIcon from '@mui/icons-material/Work';
import LogoutIcon from '@mui/icons-material/Logout';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LogoComponent from '../common/LogoComponent';

// Clean minimalist button style
const commonButtonStyle = {
  '&:hover': {
    backgroundColor: 'rgba(59, 130, 246, 0.06)',
    transform: 'translateY(-1px)',
    color: '#3B82F6'
  },
  '&:active': {
    transform: 'translateY(0px)',
    color: '#2563EB'
  },
  borderRadius: '8px',
  px: 3,
  py: 1.5,
  mx: 1,
  minHeight: '42px',
  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  fontWeight: 500,
  textTransform: 'none',
  fontSize: '0.95rem',
  color: '#64748B',
  border: 'none',
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: '50%',
    width: 0,
    height: '2px',
    backgroundColor: '#3B82F6',
    transition: 'all 0.3s ease',
    transform: 'translateX(-50%)',
  },
  '&:hover::after': {
    width: '80%',
  }
};

// Clean minimalist mobile drawer item style
const drawerItemStyle = {
  py: 1.5,
  borderRadius: '8px',
  my: 0.5,
  mx: 2,
  minHeight: '48px',
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: 'rgba(59, 130, 246, 0.08)',
    transform: 'translateX(4px)'
  },
  '& .MuiListItemIcon-root': {
    minWidth: '44px'
  },
  '& .MuiListItemText-primary': {
    fontSize: '1rem',
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
          onClick={() => handleNavigation('/about')} 
          sx={{
            ...drawerItemStyle,
            backgroundColor: isActive('/about') ? 'rgba(16, 185, 129, 0.15)' : 'transparent',
          }}
        >
          <ListItemIcon><SecurityIcon sx={{ color: '#10B981' }} /></ListItemIcon>
          <ListItemText 
            primary="About Us" 
            sx={{ 
              '& .MuiListItemText-primary': { 
                color: '#ffffff', 
                fontWeight: isActive('/about') ? 600 : 400,
                fontFamily: '"Montserrat", sans-serif',
              } 
            }} 
          />
        </ListItem>
        <ListItem 
          button 
          onClick={() => handleNavigation('/tax-planning')} 
          sx={{
            ...drawerItemStyle,
            backgroundColor: isActive('/tax-planning') ? 'rgba(16, 185, 129, 0.15)' : 'transparent',
          }}
        >
          <ListItemIcon><TrendingUpIcon sx={{ color: '#10B981' }} /></ListItemIcon>
          <ListItemText 
            primary="Tax Planning" 
            sx={{ 
              '& .MuiListItemText-primary': { 
                color: '#ffffff', 
                fontWeight: isActive('/tax-planning') ? 600 : 400,
                fontFamily: '"Montserrat", sans-serif',
              } 
            }} 
          />
        </ListItem>


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
            <Divider sx={{ my: 2, backgroundColor: 'rgba(255, 255, 255, 0.1)' }} />
            <ListItem 
              button 
              onClick={() => handleNavigation('/employee-login')} 
              sx={{
                ...drawerItemStyle,
                backgroundColor: isActive('/employee-login') ? 'rgba(124, 58, 237, 0.15)' : 'transparent',
              }}
            >
              <ListItemIcon><WorkIcon sx={{ color: '#7C3AED' }} /></ListItemIcon>
              <ListItemText 
                primary="Employee Login" 
                sx={{ 
                  '& .MuiListItemText-primary': { 
                    color: '#ffffff', 
                    fontWeight: isActive('/employee-login') ? 600 : 400,
                    fontFamily: '"Montserrat", sans-serif',
                  } 
                }} 
              />
            </ListItem>
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
                primary="Client Login" 
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
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(229, 231, 235, 0.8)',
            boxShadow: 'none',
            color: '#374151',
          }}
        >
          <Toolbar sx={{ py: 1.5, px: { xs: 2, md: 4 } }}>
            {isMobile && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ 
                  mr: 2,
                  color: '#6B7280',
                  '&:hover': {
                    backgroundColor: 'rgba(59, 130, 246, 0.08)',
                    color: '#3B82F6'
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
                alignItems: 'center',
                py: 0.5
              }}
            >
              <LogoComponent variant={isMobile ? 'medium' : 'large'} showText={true} />
            </Box>

            {!isMobile && (
              <Box sx={{ flexGrow: 1, display: 'flex', ml: 4 }}>
                <Button
                  color="inherit"
                  endIcon={<KeyboardArrowDownIcon />}
                  onClick={handleResourcesMenu}
                  sx={{
                    ...commonButtonStyle,
                    borderBottom: Boolean(resourcesAnchorEl) || isActive('/tax-information') || isActive('/individual-tax') || isActive('/business-tax')
                      ? '2px solid #3B82F6'
                      : '2px solid transparent',
                  }}
                >
                  Tax Hub
                </Button>
                <Button
                  color="inherit"
                  component={RouterLink}
                  to="/about"
                  sx={{
                    ...commonButtonStyle,
                    borderBottom: isActive('/about') ? '2px solid #3B82F6' : '2px solid transparent',
                  }}
                >
                  About Us
                </Button>
                <Button
                   color="inherit"
                   component={RouterLink}
                   to="/tax-planning"
                   sx={{
                     ...commonButtonStyle,
                     borderBottom: isActive('/tax-planning') ? '2px solid #3B82F6' : '2px solid transparent',
                   }}
                 >
                   Tax Planning
                 </Button>


                {/* Contact Us, Privacy Policy, and Terms links removed from header */}
                <Menu
                  anchorEl={resourcesAnchorEl}
                  open={Boolean(resourcesAnchorEl)}
                  onClose={handleResourcesClose}
                  TransitionComponent={Fade}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      mt: 1.5,
                      overflow: 'visible',
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                      borderRadius: '12px',
                      minWidth: 200,
                      border: '1px solid rgba(229, 231, 235, 0.8)',
                      '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        left: 20,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                        border: '1px solid rgba(229, 231, 235, 0.8)',
                        borderBottom: 'none',
                        borderRight: 'none',
                      },
                      background: 'rgba(255, 255, 255, 0.98)',
                      backdropFilter: 'blur(20px)',
                    },
                  }}
                >
                  <MenuItem 
                    onClick={() => handleNavigation('/tax-information')} 
                    sx={{ 
                      py: 1.5, 
                      px: 2,
                      borderRadius: '8px',
                      mx: 1,
                      my: 0.5,
                      borderLeft: isActive('/tax-information') ? '3px solid #3B82F6' : '3px solid transparent',
                      background: isActive('/tax-information') ? 'rgba(59, 130, 246, 0.06)' : 'transparent',
                      '&:hover': { 
                        backgroundColor: 'rgba(59, 130, 246, 0.06)',
                        transform: 'translateX(2px)',
                        transition: 'all 0.2s ease'
                      }
                    }}
                  >
                    <ListItemIcon>
                      <InfoIcon fontSize="small" sx={{ color: '#3B82F6', mr: 1 }} />
                    </ListItemIcon>
                    Tax Information
                  </MenuItem>
                  <MenuItem 
                    onClick={() => handleNavigation('/individual-tax')} 
                    sx={{ 
                      py: 1.5, 
                      px: 2,
                      borderRadius: '8px',
                      mx: 1,
                      my: 0.5,
                      borderLeft: isActive('/individual-tax') ? '3px solid #3B82F6' : '3px solid transparent',
                      background: isActive('/individual-tax') ? 'rgba(59, 130, 246, 0.06)' : 'transparent',
                      '&:hover': { 
                        backgroundColor: 'rgba(59, 130, 246, 0.06)',
                        transform: 'translateX(2px)',
                        transition: 'all 0.2s ease'
                      }
                    }}
                  >
                    <ListItemIcon>
                      <PersonAddIcon fontSize="small" sx={{ color: '#6B7280', mr: 1 }} />
                    </ListItemIcon>
                    Individual Tax
                  </MenuItem>
                  <MenuItem 
                    onClick={() => handleNavigation('/business-tax')} 
                    sx={{ 
                      py: 1.5, 
                      px: 2,
                      borderRadius: '8px',
                      mx: 1,
                      my: 0.5,
                      borderLeft: isActive('/business-tax') ? '3px solid #3B82F6' : '3px solid transparent',
                      background: isActive('/business-tax') ? 'rgba(59, 130, 246, 0.06)' : 'transparent',
                      '&:hover': { 
                        backgroundColor: 'rgba(59, 130, 246, 0.06)',
                        transform: 'translateX(2px)',
                        transition: 'all 0.2s ease'
                      }
                    }}
                  >
                    <ListItemIcon>
                      <WorkIcon fontSize="small" sx={{ color: '#6B7280', mr: 1 }} />
                    </ListItemIcon>
                    Business Tax
                  </MenuItem>

                </Menu>
              </Box>
            )}

            {isAuthenticated ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Button
                  color="inherit"
                  component={RouterLink}
                  to={isAdmin ? '/admin' : '/client-dashboard'}
                  sx={{
                    ...commonButtonStyle,
                    borderBottom: (isActive('/admin') || isActive('/client-dashboard')) ? '2px solid #3B82F6' : '2px solid transparent',
                  }}
                >
                  Dashboard
                </Button>
                <Button
                  color="inherit"
                  component={RouterLink}
                  to="/documents"
                  sx={{
                    ...commonButtonStyle,
                    borderBottom: isActive('/documents') ? '2px solid #3B82F6' : '2px solid transparent',
                  }}
                >
                  Documents
                </Button>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                  sx={{
                    ml: 1,
                    color: '#6B7280',
                    '&:hover': {
                      backgroundColor: 'rgba(59, 130, 246, 0.08)',
                      color: '#3B82F6'
                    }
                  }}
                >
                  <AccountCircle />
                </IconButton>
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
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Button
                  color="inherit"
                  component={RouterLink}
                  to="/employee-login"
                  sx={{
                    ...commonButtonStyle,
                    borderBottom: isActive('/employee-login') ? '2px solid #3B82F6' : '2px solid transparent',
                  }}
                >
                  Employee
                </Button>
                <Button
                  color="inherit"
                  component={RouterLink}
                  to="/login"
                  sx={{
                    ...commonButtonStyle,
                    borderBottom: isActive('/login') ? '2px solid #3B82F6' : '2px solid transparent',
                  }}
                >
                  Login
                </Button>
                <Button
                  color="inherit"
                  component={RouterLink}
                  to="/register"
                  sx={{
                    ...commonButtonStyle,
                    borderBottom: isActive('/register') ? '2px solid #3B82F6' : '2px solid transparent',
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