import { useEffect } from 'react';
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
} from '@mui/material';

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
  console.log({ isLoggedOut });
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
              <Button color="inherit">Logout</Button>
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
