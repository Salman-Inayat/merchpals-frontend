import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LoggedInVendor from '../../../layouts/LoggedInVendor';
import { baseURL } from '../../../configs/const';
import Payout from './payout';
import TransactionHistory from './transactionHistory';
import { Grid, Button, Alert as MuiAlert, Snackbar } from '@mui/material';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const PaymentOnboarding = () => {
  const [hasStripeAcc, setHasStripeAcc] = useState(false);
  const [snackBarToggle, setSnackBarToggle] = useState({
    visible: false,
    type: 'success',
    message: 'Payout processed successfully',
  });

  const [vendor, setVendor] = useState({ transactions: [] });

  useEffect(() => {
    getStripeAcc();
    getVendorTransactionHistory();
  }, []);

  const getStripeAcc = () => {
    axios
      .get(`${baseURL}/stripe/account`, {
        headers: {
          Authorization: localStorage.getItem('MERCHPAL_AUTH_TOKEN'),
        },
      })
      .then(response => {
        console.log(response.data.account.id);
        if (response.data.account.id) {
          setHasStripeAcc(true);
        }
      })
      .catch(error => {
        console.log({ error });
      });
  };

  const initiatePayout = () => {
    axios
      .post(
        `${baseURL}/stripe/payout`,
        {},
        {
          headers: {
            Authorization: localStorage.getItem('MERCHPAL_AUTH_TOKEN'),
          },
        },
      )
      .then(response => {
        setSnackBarToggle({
          visible: true,
          type: 'success',
          message: 'Payout processed successfully',
        });
        console.log({ payoutResponse: response });
      })
      .catch(error => console.log({ payoutError: error }));
  };

  const getVendorTransactionHistory = () => {
    axios
      .get(`${baseURL}/stripe/history`, {
        headers: {
          Authorization: localStorage.getItem('MERCHPAL_AUTH_TOKEN'),
        },
      })
      .then(response => {
        setVendor(response.data.vendorHistory);
      })
      .catch(error => console.log({ historyError: error }));
  };

  const handleOnboarding = () => {
    const data = {};
    axios
      .post(`${baseURL}/stripe/account`, data, {
        headers: {
          Authorization: localStorage.getItem('MERCHPAL_AUTH_TOKEN'),
        },
      })
      .then(response => {
        window.location = response.data.url;
      })
      .catch(error => {
        console.log({ error });
      });
  };

  const handleSnackBarClose = () => {
    setSnackBarToggle({
      visible: false,
    });
  };
  return (
    <LoggedInVendor>
      {hasStripeAcc ? (
        <TransactionHistory initiatePayout={initiatePayout} vendor={vendor} />
      ) : (
        <Payout handleOnboarding={handleOnboarding} />
      )}
      <Snackbar
        open={snackBarToggle.visible}
        autoHideDuration={3000}
        onClose={handleSnackBarClose}
      >
        <Alert severity={snackBarToggle.type}>{snackBarToggle.message}</Alert>
      </Snackbar>
    </LoggedInVendor>
  );
};

export default PaymentOnboarding;
