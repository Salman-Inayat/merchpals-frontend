import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Page from '../../components/Page';
import { makeStyles } from '@mui/styles';
import {
  Avatar,
  Button,
  Container,
  CssBaseline,
  Grid,
  Link,
  Paper,
  Typography,
  useTheme,
  Stack,
  CircularProgress,
} from '@mui/material';
import { OtpVerifyInput } from '../../components/authentication/otp-verify-input';
import { LockOutlined } from '@mui/icons-material';
import { verifyOTP, sendOTP, clearError } from '../../store/redux/actions/auth';
import WrongPhoneNumber from './wrongPhoneNumber';
import axios from 'axios';
import { baseURL } from '../../configs/const';

const useStyles = makeStyles(theme => ({
  grid: {
    backgroundColor: 'grey',
    height: '50vh',

    textAlign: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  paper: {
    // marginTop: theme.spacing(8),
    // display: 'flex',
    // flexDirection: 'column',
    // alignItems: 'center',
  },
  error: {
    marginTop: '5px',
    color: 'red',
  },
  message: {
    marginTop: '5px',
    color: 'green',
  },
  resendOtp: {
    cursor: 'pointer',
  },
}));

const OtpVerification = ({
  verifyOTP = () => {},
  sendOTP = () => {},
  nextStep = () => {},
  fireNextStep = false,
  otpVerified = false,
  otpSent = false,
  verificationError = '',
  sendingError = '',
  phoneNo,
}) => {
  const classes = useStyles();
  const theme = useTheme();

  const [otp, setOtp] = useState();
  const [countOtp, setCountOtp] = useState(0);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [toggleWrongPhoneNo, setToggleWrongPhoneNo] = useState(false);
  const [oldPhoneNo, setOldPhoneNo] = useState(`+${phoneNo}  `);
  const [phoneNumber, setPhoneNumber] = useState();
  const [phoneError, setPhoneError] = useState();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setOldPhoneNo(`${phoneNo}`);
  }, [phoneNo]);

  useEffect(() => {
    if (otpVerified) {
      localStorage.removeItem('phoneNoForOTP');
      if (fireNextStep) {
        nextStep();
      } else {
        navigate('/login', { replace: true });
      }
    } else if (verificationError) {
      setError(verificationError);
      clearError();
    }
  }, [otpVerified, verificationError]);

  useEffect(() => {
    if (otpSent) {
      setError('');
      setMessage('OTP has been sent!');
      setTimeout(() => {
        setMessage('');
      }, 10000);
    } else if (sendingError) {
      setError(sendingError);
      clearError();
    }
  }, [otpSent, sendingError]);

  useEffect(() => {
    if (otp) {
      if (otp.length === 4) {
        handleSubmit();
      }
    }
  }, [otp]);

  const handleSubmit = () => {
    setLoading(true);
    const phoneNo = localStorage.getItem('phoneNoForOTP');
    verifyOTP(phoneNo, otp);
  };

  const resentOTP = () => {
    const phoneNo = localStorage.getItem('phoneNoForOTP');
    sendOTP(phoneNo);
  };

  const handleWrongPhoneNo = () => {
    setError();
    setToggleWrongPhoneNo(true);
  };

  const handleCloseWithoutPhoneNo = () => {
    setToggleWrongPhoneNo(false);
  };

  const handleClose = phoneNo => {
    setPhoneNumber(`+${phoneNo}`);

    const data = {
      oldPhoneNo: oldPhoneNo,
      newPhoneNo: `+${phoneNo}`,
    };

    localStorage.setItem('phoneNoForOTP', `+${phoneNo}`);

    if (phoneNo === '') {
      setPhoneError('Phone number cannot be empty');
      return;
    }

    if (phoneNo.length < 6) {
      setPhoneError('Phone number must be at least 6 digits');
      return;
    }

    if (phoneNo.length >= 6 && phoneNo !== '') {
      axios
        .post(`${baseURL}/auth/send-otp-with-new-phone-no`, data)
        .then(res => {
          setToggleWrongPhoneNo(false);
          setPhoneError('');
          setOldPhoneNo(`+${phoneNo}`);
        })
        .catch(err => {
          setPhoneError(err.response.data.message);
        });
    }
  };

  return (
    <Page title="Verify Otp">
      <Container>
        <CssBaseline />
        <div className={classes.paper}>
          <Grid
            container
            style={{ backgroundColor: 'white' }}
            className={classes.grid}
            justify="center"
            alignItems="center"
            // spacing={3}
          >
            <Grid item md={12} xs={12}>
              <Grid container alignItems="center" direction="column" display="flex">
                <Grid item>
                  <Avatar className={classes.avatar}>
                    <LockOutlined />
                  </Avatar>
                </Grid>
                <Grid item>
                  <Typography component="h1" variant="h5" align="left">
                    Verification Code
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} textAlign="center">
              <Paper elevation={0}>
                <Typography variant="body">
                  Enter the code we sent to ({phoneNumber ? phoneNumber : phoneNo})
                </Typography>
              </Paper>
              <Stack spacing={1} direction="row" justifyContent="center" alignItems="center">
                <Typography variant="body"> Didn&#39;t receive the code? </Typography>
                <Link className={classes.resendOtp} color="secondary" onClick={resentOTP}>
                  Resend
                </Link>
              </Stack>
            </Grid>
            <Grid
              item
              xs={12}
              justify="center"
              alignItems="center"
              display="flex"
              direction="column"
            >
              <Grid item spacing={3} justify="center">
                <OtpVerifyInput otp={otp} setOtp={setOtp} />
              </Grid>
              {error && (
                <Grid className={classes.error} item>
                  {error}
                </Grid>
              )}

              {message && (
                <Grid className={classes.message} item>
                  {message}
                </Grid>
              )}

              <Grid container item xs={12} justifyContent="center">
                <Grid item xs={4}>
                  <Button
                    fullWidth
                    onClick={handleSubmit}
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    {loading ? <CircularProgress color="inherit" /> : 'Verify'}
                  </Button>
                </Grid>
                <Grid xs={12} item>
                  <Button onClick={handleWrongPhoneNo} color="secondary">
                    Wrong number ?
                  </Button>
                  <WrongPhoneNumber
                    open={toggleWrongPhoneNo}
                    handleClose={handleClose}
                    error={phoneError}
                    handleCloseWithoutPhoneNo={handleCloseWithoutPhoneNo}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </Container>
    </Page>
  );
};

const mapDispatch = dispatch => ({
  verifyOTP: (phoneNumber, code) => dispatch(verifyOTP(phoneNumber, code)),
  sendOTP: phoneNumber => dispatch(sendOTP(phoneNumber)),
  clearError: () => dispatch(clearError()),
});

const mapState = state => ({
  otpVerified: state.auth.otpVerified,
  otpSent: state.auth.otpSent,
  verificationError: state.auth.verificationError,
  sendingError: state.auth.sendingError,
});

export default connect(mapState, mapDispatch)(OtpVerification);
