import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import MenuIcon from '@mui/icons-material/Menu';
import {
  Button,
  Grid,
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  Avatar,
  Tooltip,
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import {
  clearLogoutFlag,
  logout,
  getLoggedInUserInfo,
} from '../../store/redux/actions/auth';
import { useNavigate } from 'react-router-dom';

const LoggedInVendor = ({
  clearLogoutFlag = () => {},
  logout = () => {},
  getLoggedInUserInfo = () => {},
  isLoggedOut = false,
  user = null,
  children,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (isLoggedOut || !localStorage.getItem('MERCHPAL_AUTH_TOKEN')) {
      clearLogoutFlag();
      navigate('/login', { replace: true });
    }
  }, [isLoggedOut]);

  const navigate = useNavigate();

  useEffect(() => {
    getLoggedInUserInfo();
  }, []);

  const handleStoreSettingsButton = () => {
    navigate('/vendor/store-settings');
  };

  const handleProfileSettingsButton = () => {
    navigate('/vendor/profile-settings');
  };

  return (
    <Grid direction="column" container>
      <Grid xs={12} item>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Merchpals
              </Typography>
              {/* <IconButton aria-label="delete" onClick={handleSettingsButton}>
                <SettingsIcon />
              </IconButton>
              <Button color="inherit" onClick={() => logout()}>
                Logout
              </Button> */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  textAlign: 'center',
                }}
              >
                <Tooltip title="Account settings">
                  <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                  >
                    <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
                  </IconButton>
                </Tooltip>
              </Box>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
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
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <MenuItem onClick={handleProfileSettingsButton}>
                  <ListItemIcon>
                    <SettingsIcon fontSize="small" />
                  </ListItemIcon>
                  Profile Settings
                </MenuItem>
                <MenuItem onClick={handleStoreSettingsButton}>
                  <ListItemIcon>
                    <SettingsIcon fontSize="small" />
                  </ListItemIcon>
                  Store Settings
                </MenuItem>
                <MenuItem onClick={() => logout()}>
                  <ListItemIcon>
                    <LogoutIcon fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </Toolbar>
          </AppBar>
        </Box>
      </Grid>
      <Grid xs={12} container p={4} item>
        {children}
      </Grid>
    </Grid>
  );
};

const mapDispatch = dispatch => ({
  logout: () => dispatch(logout()),
  clearLogoutFlag: () => dispatch(clearLogoutFlag()),
  getLoggedInUserInfo: () => dispatch(getLoggedInUserInfo()),
});

const mapState = state => ({
  isLoggedOut: state.auth.isLoggedOut,
  user: state.auth.user,
});

export default connect(mapState, mapDispatch)(LoggedInVendor);
