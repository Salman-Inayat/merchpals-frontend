import * as React from 'react';

import { makeStyles } from '@mui/styles';
import { Box, Typography, Button, Grid, Stack, Modal } from '@mui/material';
import Footer from '../../layouts/static/footer';
import { useLocation } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  container: {
    padding: theme.spacing(4),
  },
  heading: {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: theme.spacing(2),
  },
  labelText: {
    fontSize: '0.9rem',
    fontWeight: 'bold',
    marginBottom: theme.spacing(1),
    textTransform: 'uppercase',
  },
  resultText: {
    fontSize: '0.9rem',
    marginBottom: theme.spacing(1),
    color: 'red',
    fontWeight: 'bold',
  },
  noteNext: {
    fontSize: '0.8rem',
    marginBottom: theme.spacing(1),
    color: '#000',
    width: '50%',
    fontWeight: 'bold',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
}));

export default function TrackOrderModal() {
  const classes = useStyles();
  const { state } = useLocation();
  const order = state.orderData.order;

  return (
    <Grid container rowSpacing={6} className={classes.container}>
      <Grid item md={12} xs={12}>
        <Typography align="center" className={classes.heading}>
          Track Order
        </Typography>
      </Grid>
      <Grid item md={12} xs={12}>
        <Grid container spacing={3}>
          <Grid item md={12} xs={12}>
            <Grid container spacing={1}>
              <Grid item md={6} xs={6}>
                <Typography align="right" className={classes.labelText}>
                  Order Number:
                </Typography>
              </Grid>
              <Grid item md={6} xs={6}>
                <Typography className={classes.resultText}>
                  {order.printfulOrderMetadata.id}
                </Typography>
              </Grid>
              <Grid item md={6} xs={6}>
                <Typography align="right" className={classes.labelText}>
                  Order Status:
                </Typography>
              </Grid>
              <Grid item md={6} xs={6}>
                <Typography className={classes.resultText}>{order.status}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={12} xs={12}>
            <Grid container spacing={1}>
              <Grid item md={6} xs={6}>
                <Typography align="right" className={classes.labelText}>
                  Tracking Number:
                </Typography>
              </Grid>
              <Grid item md={6} xs={6}>
                <Typography className={classes.resultText}>21312312312</Typography>
              </Grid>
              <Grid item md={6} xs={6}>
                <Typography align="right" className={classes.labelText}>
                  Tracking Link:
                </Typography>
              </Grid>
              <Grid item md={6} xs={6}>
                <Typography className={classes.resultText}>Processed</Typography>
              </Grid>
              <Grid item md={6} xs={6}>
                <Typography align="right" className={classes.labelText}>
                  Carrier:
                </Typography>
              </Grid>
              <Grid item md={6} xs={6}>
                <Typography className={classes.resultText}>Processed</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item md={12} xs={12} display="flex" justifyContent="center">
        <Typography align="center" className={classes.noteNext}>
          Note that it can take upto 48 hours for tracking information to show up in the
          carrier&#39;s tracking system. International shipment tracking may take a few days to
          display any updates
        </Typography>
      </Grid>
      <Grid item md={12} xs={12}>
        <Footer />
      </Grid>
    </Grid>
  );
}
