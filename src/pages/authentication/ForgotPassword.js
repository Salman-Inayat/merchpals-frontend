import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Page from "../../components/Page";
import { makeStyles } from "@mui/styles";
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
} from "@mui/material";
import PhoneNumberInput from "../../components/phone-number-input";
import { sendOTPForResetPassword, clearError } from '../../store/redux/actions/auth';

const useStyles = makeStyles((theme) => ({
  grid: {
    backgroundColor: "grey",
    height: "50vh",
    textAlign: "center",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  error: {
    marginTop: '5px',
    color: 'red'
  },
  message: {
    marginTop: '5px',
    color: 'green'
  }
}));

const ForgotPassword = ({
  sendOTPForResetPassword = () => {},
  clearError = () => {},
  otpSent = false,
  sendingError = '',
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const [phoneNo, setPhoneNo] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if(otpSent){
      navigate("/otp-verification-for-reset", { replace: true });
    } else if(sendingError) {
      setError(sendingError);
      clearError()
    }
  }, [otpSent, sendingError])

  const handleSubmit = () =>  {
    const formattedPhoneNo = `+${phoneNo}`
    localStorage.setItem('phoneNoForOTP', formattedPhoneNo)
    sendOTPForResetPassword(formattedPhoneNo);
  }

  return (
    <Page title="Verify Otp">
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <div className={classes.paper}>
          <Grid
            container
            style={{ backgroundColor: "white" }}
            className={classes.grid}
            justify="center"
            alignItems="center"
            spacing={3}
          >
            <Grid item container justify="center">
              <Grid item container alignItems="center" direction="column">
                <Grid item>
                  <Typography component="h1" variant="h5">
                    Enter your phone number
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              container
              justify="center"
              alignItems="center"
              direction="column"
            >
              <Grid item spacing={3} justify="center">
              <PhoneNumberInput phoneNo={phoneNo} setPhoneNo={setPhoneNo}/>
              </Grid>
              {error && 
                <Grid className={classes.error} item>
                  {error}
                </Grid>
              }

              <Grid container item xs={12} justifyContent="center">
                <Grid item xs={4}>
                  <Button
                    fullWidth
                    onClick={handleSubmit}
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    Send OTP
                  </Button>
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
  sendOTPForResetPassword: (phoneNumber) => dispatch(sendOTPForResetPassword(phoneNumber)),
  clearError: () => dispatch(clearError())
});

const mapState = state => ({
  otpSent: state.auth.otpSent,
  sendingError: state.auth.sendingError
})

export default connect(mapState, mapDispatch)(ForgotPassword);
