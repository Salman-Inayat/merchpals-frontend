import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LoggedInVendor from '../../../layouts/LoggedInVendor';
import { baseURL } from '../../../configs/const';
import Payout from './payout';
import TransactionHistory from './transactionHistory';
import { Grid, Button, Alert as MuiAlert, Snackbar } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const PaymentOnboarding = () => {
  const [hasStripeAcc, setHasStripeAcc] = useState(false);
  const [snackBarToggle, setSnackBarToggle] = useState({
    visible: false,
    type: '',
    message: '',
  });

  const [vendor, setVendor] = useState({ balance: 0, transactions: [] });
  const [pendingBalance, setPendingBalance] = useState({
    pendingBalance: 0,
    numberOfTransactions: 0,
  });
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    getStripeAcc();
    getVendorTransactionHistory();
    getPendingBalance();
    getEscrowTransactions();
  }, []);

  const getStripeAcc = () => {
    handleToggle();
    axios
      .get(`${baseURL}/stripe/account`, {
        headers: {
          Authorization: localStorage.getItem('MERCHPAL_AUTH_TOKEN'),
        },
      })
      .then(response => {
        handleClose();

        if (response.data.account.id) {
          setHasStripeAcc(true);
        } else {
          setHasStripeAcc(false);
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
        setVendor(response.data.vendorHistory);
        setSnackBarToggle({
          visible: true,
          type: 'success',
          message: 'Payout processed successfully',
        });
      })
      .catch(error => {
        setSnackBarToggle({
          visible: true,
          type: 'error',
          message: 'Please complete your account setup by going to your stripe account',
        });
      });
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

  const getEscrowTransactions = () => {
    axios
      .get(`${baseURL}/stripe/escrow-transactions`, {
        headers: {
          Authorization: localStorage.getItem('MERCHPAL_AUTH_TOKEN'),
        },
      })
      .then(response => {
        setTransactionHistory(response.data.transactions);
      })
      .catch(error => console.log({ escrowError: error }));
  };

  const getPendingBalance = () => {
    axios
      .get(`${baseURL}/stripe/pending-balance`, {
        headers: {
          Authorization: localStorage.getItem('MERCHPAL_AUTH_TOKEN'),
        },
      })
      .then(response => {
        setPendingBalance({
          pendingBalance: response.data.balanceData.totalPendingBalance,
          numberOfTransactions: response.data.balanceData.numberOfTransactions,
        });
      })
      .catch(error => {
        console.log({ pendingBalanceError: error });
      });
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

  const handleViewStripeDashboard = () => {
    axios
      .get(`${baseURL}/stripe/account/dashboard`, {
        headers: {
          Authorization: localStorage.getItem('MERCHPAL_AUTH_TOKEN'),
        },
      })
      .then(response => {
        window.location = response.data.link.url;
      })
      .catch(error => {
        console.log({ error });
      });
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  const handleSnackBarClose = () => {
    setSnackBarToggle({
      visible: false,
      type: '',
      message: '',
    });
  };
  return (
    <LoggedInVendor>
      {hasStripeAcc ? (
        <TransactionHistory
          initiatePayout={initiatePayout}
          vendor={vendor}
          handleViewStripeDashboard={handleViewStripeDashboard}
          pendingBalance={pendingBalance}
          transactionHistory={transactionHistory}
        />
      ) : open ? (
        ''
      ) : (
        <Payout handleOnboarding={handleOnboarding} />
      )}

      <Snackbar open={snackBarToggle.visible} autoHideDuration={5000} onClose={handleSnackBarClose}>
        <Alert severity={snackBarToggle.type}>{snackBarToggle.message}</Alert>
      </Snackbar>
      <Backdrop
        sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </LoggedInVendor>
  );
};

export default PaymentOnboarding;
