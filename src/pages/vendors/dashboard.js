import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Modal,
  Box,
  Alert as MuiAlert,
  Snackbar,
  TextField,
  Grid,
  Button,
  Card,
  Typography,
} from '@mui/material';
import ContactSupport from './contactSupport';
import { makeStyles } from '@mui/styles';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import axios from 'axios';
import { baseURL } from '../../configs/const';
const useStyles = makeStyles(theme => ({
  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    backgroundColor: 'white',
    borderRadius: '5px',
    boxShadow: 24,
    p: 4,
    [theme.breakpoints.down('sm')]: {
      width: '90%',
    },
  },
  copyContent: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'fixed',
    left: '50%',
    bottom: '20px',
    transform: 'translate(-50%, -50%)',
    margin: '0 auto',
    width: '100%',
  },
  copyLinkText: {
    width: '400px',
    [theme.breakpoints.down('sm')]: {
      width: '80%',
    },
  },
}));

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Dashboard = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const [storeURL, setStoreURL] = useState('');
  const [snackBarToggle, setSnackBarToggle] = useState({
    visible: false,
    type: 'success',
    message: 'Message sent successfully',
  });

  useEffect(() => {
    fetchStore();
  }, []);

  const fetchStore = () => {
    axios
      .get(`${baseURL}/store`, {
        headers: {
          Authorization: localStorage.getItem('MERCHPAL_AUTH_TOKEN'),
        },
      })
      .then(response => {
        console.log({ store: response.data.store });
        const store = response.data.store;
        setStoreURL(`${process.env.REACT_APP_URL}/store/${store.slug}`);
        setStore(store);
      })
      .catch(err => {
        console.log({ err });
      });
  };

  const toggleContactModal = () => {
    setOpen(!open);
  };

  const handleModalAndSnackbar = () => {
    setOpen(!open);
    setSnackBarToggle({
      visible: true,
      type: 'success',
      message: 'Message sent successfully',
    });
  };

  const handleSnackBarClose = () =>
    setSnackBarToggle({
      ...snackBarToggle,
      visible: false,
    });

  const copyToClipboard = storeURL => {
    const el = document.createElement('textarea');
    el.value = storeURL;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    setSnackBarToggle({
      visible: true,
      type: 'success',
      message: 'Copied to clipboard',
    });
  };

  return (
    <Grid container>
      <Grid
        item
        md={12}
        xs={12}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Button onClick={() => navigate('/vendor/store')}>My Store</Button>
        <Button onClick={() => navigate('/vendor/designs')}>
          Store Designs
        </Button>
        <Button onClick={() => navigate('/vendor/orders')}>Store Orders</Button>
        <Button onClick={() => navigate('/vendor/payment/onboarding')}>
          Transaction History
        </Button>
        <Button onClick={toggleContactModal}>Contact Support</Button>
      </Grid>

      <Grid item md={12} sm={12} xs={12} m={10} className={classes.copyContent}>
        <TextField
          id="outlined-read-only-input"
          label={!storeURL && 'Copy Store Link'}
          value={storeURL}
          InputProps={{
            readOnly: true,
            endAdornment: (
              <Box>
                <Button onClick={() => copyToClipboard(storeURL)}>
                  Copy
                  <ContentCopyIcon color="secondary" />
                </Button>{' '}
              </Box>
            ),
          }}
          fullWidth
          className={classes.copyLinkText}
        />
      </Grid>
      <Modal
        open={open}
        onClose={toggleContactModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card className={classes.modal}>
          <ContactSupport
            handleModalAndSnackbar={handleModalAndSnackbar}
            toggleContactModal={toggleContactModal}
          />
        </Card>
      </Modal>
      <Snackbar
        open={snackBarToggle.visible}
        autoHideDuration={2000}
        onClose={handleSnackBarClose}
      >
        <Alert severity={snackBarToggle.type}>{snackBarToggle.message}</Alert>
      </Snackbar>
    </Grid>
  );
};

export default Dashboard;
