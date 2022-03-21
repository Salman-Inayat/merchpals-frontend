import React, { useEffect, useState } from 'react';
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
  Modal,
  Alert as MuiAlert,
  Snackbar,
  Card,
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { clearLogoutFlag, logout, getLoggedInUserInfo } from '../../store/redux/actions/auth';
import { useNavigate } from 'react-router-dom';
import ContactSupport from '../../pages/vendors/contactSupport';
import { makeStyles } from '@mui/styles';
import { useMediaQuery } from 'react-responsive';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const useStyles = makeStyles(theme => ({
  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    backgroundColor: 'white',
    boxShadow: 24,
    borderRadius: '5px',
    p: 4,
    [theme.breakpoints.down('sm')]: {
      width: '90%',
    },
  },
}));

const LoggedInVendor = ({
  clearLogoutFlag = () => {},
  logout = () => {},
  getLoggedInUserInfo = () => {},
  isLoggedOut = false,
  user = null,
  children,
}) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [modalOpen, setModalOpen] = useState(false);
  const [snackBarToggle, setSnackBarToggle] = useState({
    visible: false,
    type: 'success',
    message: 'Message sent successfully',
  });
  let isMobile = useMediaQuery({ maxWidth: 767 });

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

  const toggleContactModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleModalAndSnackbar = () => {
    setModalOpen(!modalOpen);
    setSnackBarToggle({
      visible: true,
      type: 'success',
      message: 'Message sent successfully',
    });
  };

  const handleSnackBarClose = () =>
    setSnackBarToggle({
      ...snackBarToggle,
      visible: false,
    });

  return (
    <Grid container>
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
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1, cursor: 'pointer' }}
                onClick={() => navigate('/vendor')}
              >
                Merchpals
              </Typography>
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
                <MenuItem onClick={toggleContactModal}>
                  <ListItemIcon>
                    <SettingsIcon fontSize="small" />
                  </ListItemIcon>
                  Contact Support
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
      {/* TODO: padding issue  p={isMobile ? 1 : 4}*/}
      <Grid xs={12} container item>
        {children}
      </Grid>
      <Modal
        open={modalOpen}
        onClose={toggleContactModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card className={classes.modal}>
          <ContactSupport
            handleModalAndSnackbar={handleModalAndSnackbar}
            toggleContactModal={toggleContactModal}
            email_from={process.env.REACT_APP_CREATER_EMAIL}
          />
        </Card>
      </Modal>
      <Snackbar open={snackBarToggle.visible} autoHideDuration={2000} onClose={handleSnackBarClose}>
        <Alert severity={snackBarToggle.type}>{snackBarToggle.message}</Alert>
      </Snackbar>
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
