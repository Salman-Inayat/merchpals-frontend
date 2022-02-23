import './welcome.css';
import { useState, useEffect } from 'react';
import FlowComplete from './FlowComplete';
import { Grid, Button, Typography, Stack, CircularProgress } from '@mui/material';
import MerchPalsLogo from '../../../assets/images/Merchpals-logo.png';
import { makeStyles } from '@mui/styles';
import LoggedInVendor from '../../../layouts/LoggedInVendor';
import { useLocation } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  welcome_container: {
    width: '20%',
  },
  logo: {
    width: '100%',
    height: 'auto',
  },
}));

const WelcomeMessage = () => {
  const [toggleFlowComplete, setToggleFlowComplete] = useState(false);
  const classes = useStyles();
  const location = useLocation();
  console.log('location', location);
  const storeURL = location.state.storeURL;
  console.log(storeURL);

  useEffect(() => {
    setInterval(() => {
      setToggleFlowComplete(true);
    }, 3500);
  }, []);

  return (
    // <div className="welcome">
    //   {toggleFlowComplete ? (
    //     <FlowComplete storeURL={storeURL} />
    //   ) : (
    //     <div className="message">
    //       <img src={MerchPalsLogo} className={classes.logo}></img>
    //       <Typography variant="h4">Loading ...</Typography>
    //     </div>
    //   )}
    // </div>
    <LoggedInVendor>
      <Grid className="welcome">
        {toggleFlowComplete ? (
          <FlowComplete storeURL={storeURL} />
        ) : (
          <Grid className={classes.welcome_container}>
            <img src={MerchPalsLogo} className={classes.logo}></img>
            <Stack flexDirection="row" justifyContent="center">
              <CircularProgress size="2rem" />
            </Stack>
          </Grid>
        )}
      </Grid>
    </LoggedInVendor>
  );
};

export { WelcomeMessage as default };
