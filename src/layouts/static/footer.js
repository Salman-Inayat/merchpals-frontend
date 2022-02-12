import * as React from 'react';
import { makeStyles } from '@mui/styles';
import { Button, Grid, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
const useStyles = makeStyles(theme => ({
  copyright: {
    fontWeight: 'bold',
    margin: '2rem 0 3rem',
  },
  visa_image: {
    width: '20%',
    [theme.breakpoints.down('sm')]: {
      width: '50%',
    },
  },
  link_buttons: {
    color: 'grey',
    textTransform: 'none',
    borderBottom: '2px solid transparent',
    borderRadius: '0px',
    padding: '8px 0px',
    height: '20px',
    marginBottom: '6px',
    transition: theme.transitions.create(['border-bottom'], {
      duration: 500,
    }),
    '&:hover': {
      textDecoration: 'none',
      backgroundColor: 'transparent',
      borderBottom: '2px solid black',
    },
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
        <img alt="bank_acoounts" src="/assets/img/visa.png" className={classes.visa_image} />
      </Stack>
      <Stack
        direction={{ xs: 'column', md: 'row', sm: 'row' }}
        spacing={{ xs: 1, sm: 2, md: 4 }}
        justifyContent="center"
        alignItems="center"
      >
        <Button
          classes={{
            root: classes.link_buttons,
          }}
          onClick={handleOrderClick}
          size="large"
        >
          Track Orders
        </Button>
        <Button
          classes={{
            root: classes.link_buttons,
          }}
          onClick={handlePrivacyPolicyClick}
          size="large"
          pb={0}
        >
          Privacy Policy
        </Button>
        <Button
          classes={{
            root: classes.link_buttons,
          }}
          onClick={handleTermsOfServicesClick}
          size="large"
        >
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
