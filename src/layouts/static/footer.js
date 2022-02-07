import * as React from 'react';
import { makeStyles } from '@mui/styles';
import { Button, Grid, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
const useStyles = makeStyles(theme => ({
  link_buttons: {
    color: 'grey',
  },
  copyright: {
    fontWeight: 'bold',
    margin: '2rem 0 3rem',
  },
}));

const Footer = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const handleOrderClick = () => {
    console.log('Track Order Button click');
  };
  const handlePrivacyPolicyClick = () => {
    navigate({
      pathname: `/privacy-policy`,
    });
  };
  const handleTermsOfServicesClick = () => {
    navigate({
      pathname: `/terms-of-services`,
    });
  };
  return (
    <>
      <Stack direction="row" spacing={3} justifyContent="center" alignItems="center">
        <img alt="bank_acoounts" src="/assets/img/visa.png" width="20%" />
      </Stack>
      <Stack
        direction={{ xs: 'column', md: 'row', sm: 'row' }}
        spacing={{ xs: 1, sm: 2, md: 4 }}
        justifyContent="center"
        alignItems="center"
        mt={3}
      >
        <Button className={classes.link_buttons} onClick={handleOrderClick} size="large">
          Track Orders
        </Button>
        <Button className={classes.link_buttons} onClick={handlePrivacyPolicyClick} size="large">
          Privacy Policy
        </Button>
        <Button className={classes.link_buttons} onClick={handleTermsOfServicesClick} size="large">
          Terms of Services
        </Button>
      </Stack>
      <Typography className={classes.copyright} variant="body1" align="center">
        {new Date().getFullYear()}
        {' MERCHPALS, ALL RIGHT RESERVED'}
      </Typography>
    </>
  );
};

export default Footer;
