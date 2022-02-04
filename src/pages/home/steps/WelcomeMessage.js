import './welcome.css';
import { useState, useEffect } from 'react';
import FlowComplete from './FlowComplete';
import { Grid, Button, Typography } from '@mui/material';
import MerchPalsLogo from '../../../assets/images/Merchpals-logo.png';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(theme => ({
  welcome_container: {
    width: '20%',
  },
  logo: {
    width: '100%',
    height: 'auto',
  },
}));

const WelcomeMessage = ({ storeURL }) => {
  const [toggleFlowComplete, setToggleFlowComplete] = useState(false);
  const classes = useStyles();

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

    <div className="welcome">
      {toggleFlowComplete ? (
        <FlowComplete storeURL={storeURL} />
      ) : (
        <Grid className={classes.welcome_container}>
          <img src={MerchPalsLogo} className={classes.logo}></img>
          <Typography variant="h4">Loading ...</Typography>
        </Grid>
      )}
    </div>
  );
};

export { WelcomeMessage as default };
