import React from 'react';
import { makeStyles } from '@mui/styles';
import { Grid, Typography, Stack, Button, Avatar } from '@mui/material';
import Tick from '../../../assets/images/tick.png';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const useStyles = makeStyles(theme => ({
  container: {
    width: '100%',
    padding: theme.spacing(4),
    display: 'flex',

    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#d7d3d5',
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1),
    },
  },
  contentContainer: {
    borderRadius: theme.spacing(2),
    backgroundColor: '#ffffff',
    padding: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1),
    },
  },
  tickImage: {
    width: '3.5rem',
    height: '3.5rem',
  },
  confirmationContainer: {
    padding: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottom: `1px solid ${theme.palette.divider}`,
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1),
    },
  },
  outlinedContainer: {
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(2),
  },
  button: {
    padding: `${theme.spacing(1)} ${theme.spacing(6)}`,
    marginTop: theme.spacing(2),
    backgroundColor: '#000000',
    borderRadius: '25px',
    '&:hover': {
      backgroundColor: '#000000',
    },
  },
  smallText: {
    fontSize: '0.8rem',
  },
  mediumText: {
    fontSize: '1.2rem',
  },
  largeText: {
    fontSize: '1.4rem',
    fontWeight: 'bold',
  },
  emailText: {
    fontSize: '0.9rem',
    fontWeight: '600',
  },
}));

function CheckoutComplete() {
  const orderId = useSelector(state => state.order.orderId);
  const classes = useStyles();
  const { state } = useLocation();
  const navigate = useNavigate();

  return (
    <Grid container className={classes.container}>
      <Grid item md={5} xs={12}>
        <Grid container spacing={4} className={classes.contentContainer}>
          <Grid item md={12} xs={12}>
            <Grid container display="flex" alignItems="center">
              <Grid item md={2}>
                <Avatar src={Tick} className={classes.tickImage}></Avatar>
              </Grid>
              <Grid item md={10}>
                <Stack>
                  <Typography className={classes.smallText}>Order No # {orderId}</Typography>
                  <Typography className={classes.mediumText}>
                    Thank you {state.customer.firstName} {state.customer.lastName}
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={12} xs={12}>
            <Grid container spacing={3} className={classes.outlinedContainer}>
              <Grid item md={12} xs={12} className={classes.confirmationContainer}>
                <Stack>
                  <Typography className={classes.largeText}>Order confirmation number</Typography>
                  <Typography align="center" className={classes.largeText}>
                    #{orderId}
                  </Typography>
                </Stack>
              </Grid>
              <Grid item md={12} xs={12}>
                <Stack>
                  <Typography className={classes.mediumText}>Your order is confirmed</Typography>
                  <Typography className={classes.smallText}>
                    You will receive a confimation email with your order number shortly
                  </Typography>
                  <Typography className={classes.emailText}>
                    Customer email: {state.customer.email}
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={12} xs={12} display="flex" justifyContent="center" alignItems="center">
            <Button
              variant="contained"
              size="large"
              className={classes.button}
              onClick={() => navigate(`/${state.storeUrl}`)}
            >
              Back to store
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default CheckoutComplete;
