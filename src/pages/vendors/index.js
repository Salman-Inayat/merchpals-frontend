import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Button, Grid } from "@mui/material";
import { 
  clearLogoutFlag, 
  logout,
  getLoggedInUserInfo 
} from '../../store/redux/actions/auth';
import { useNavigate } from 'react-router-dom';

const Dashboard = ({
  clearLogoutFlag = () => {}, 
  logout = () => {},
  getLoggedInUserInfo = () => {},
  isLoggedOut = false,
  user = null
}) => {
  const navigate = useNavigate();
  
  useEffect(() => {
    getLoggedInUserInfo()
  }, [])

  useEffect(() => {
    if (isLoggedOut || !localStorage.getItem('MERCHPAL_AUTH_TOKEN')) {
      clearLogoutFlag();
      navigate('/login', { replace: true })
    }
  }, [isLoggedOut]);

  return <Grid container justifyContent="center">
    <Grid item xs={4}>
      <Button
        fullWidth
        onClick={logout}
        variant="contained"
        color="primary"
      >
        Logout
      </Button>
    </Grid>
  </Grid>
}

const mapDispatch = dispatch => ({
  logout: () => dispatch(logout()),
  clearLogoutFlag: () => dispatch(clearLogoutFlag()),
  getLoggedInUserInfo: () => dispatch(getLoggedInUserInfo())
})

const mapState = state => ({
  isLoggedOut: state.auth.isLoggedOut,
  user: state.auth.user
})

export default connect(mapState, mapDispatch)(Dashboard);