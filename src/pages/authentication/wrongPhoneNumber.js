import * as React from 'react';
import {
  Dialog,
  Button,
  Box,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import PhoneNumberInput from '../../components/phone-number-input';

const WrongPhoneNumber = ({ open, handleClose, error, handleCloseWithoutPhoneNo }) => {
  const [phoneNo, setPhoneNo] = React.useState();

  const closeDialog = async () => {
    await handleClose(phoneNo);
    setPhoneNo('');
  };

  return (
    <React.Fragment>
      <Dialog maxWidth="sm" open={open} onClose={handleClose}>
        <DialogTitle>Enter a new phone number to send OTP</DialogTitle>
        <DialogContent>
          <PhoneNumberInput phoneNo={phoneNo} setPhoneNo={val => setPhoneNo(val)} error={error} />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Send OTP</Button>
          <Button onClick={handleCloseWithoutPhoneNo}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default WrongPhoneNumber;
