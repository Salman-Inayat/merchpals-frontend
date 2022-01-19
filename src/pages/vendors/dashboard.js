import React, { useState } from 'react';
import { Grid, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Modal, Box, Alert as MuiAlert, Snackbar } from '@mui/material';
import ContactSupport from './contactSupport';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(theme => ({
  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    backgroundColor: 'white',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  },
}));

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Dashboard = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const [snackBarToggle, setSnackBarToggle] = useState({
    visible: false,
    type: 'success',
    message: 'Message sent successfully',
  });

  const toggleContactModal = () => {
    setOpen(!open);
  };

  const handleSnackbar = () => {
    console.log('snackbar');
    setSnackBarToggle({
      visible: true,
      type: 'success',
      message: 'Message sent successfully',
    });
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

  return (
    <Grid direction="column" container>
      <Button>Store Products</Button>
      <Button onClick={() => navigate('/vendor/designs')}>Store Designs</Button>
      <Button onClick={() => navigate('/vendor/orders')}>Store Orders</Button>
      <Button onClick={toggleContactModal}>Contact Support</Button>
      <Modal
        open={open}
        onClose={toggleContactModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={classes.modal}>
          <ContactSupport
            handleModalAndSnackbar={handleModalAndSnackbar}
            toggleContactModal={toggleContactModal}
          />
        </Box>
      </Modal>
      <Snackbar
        open={snackBarToggle.visible}
        autoHideDuration={3000}
        onClose={handleSnackBarClose}
      >
        <Alert severity={snackBarToggle.type}>{snackBarToggle.message}</Alert>
      </Snackbar>
    </Grid>
  );
};

export default Dashboard;
