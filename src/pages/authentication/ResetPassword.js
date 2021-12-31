import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Page from "../../components/Page";
import { makeStyles } from "@mui/styles";
import eyeFill from "@iconify/icons-eva/eye-fill";
import eyeOffFill from "@iconify/icons-eva/eye-off-fill";
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
  TextField, IconButton, InputAdornment
} from "@mui/material";
import { Icon } from "@iconify/react";
import PhoneNumberInput from "../../components/phone-number-input";
import { updatePassword, clearError } from '../../store/redux/actions/auth';

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
  fieldMargin: {
    marginTop: '20px'
  }
}));

const ForgotPassword = ({
  updatePassword = () => {},
  clearError = () => {},
  passwordUpdated = false,
  error = '',
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const [errors, setErrors] = useState({
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('')
  const [password, setPassword] = useState('')
  
  const navigate = useNavigate();

  useEffect(() => {
    if (passwordUpdated) {
      clearError();
      navigate('/login', { replace: true });
    }
  }, [passwordUpdated, error])
  const handleSubmit = () =>  {
    if(password.length < 8){
      setErrors({password: 'Minimum length for password is 8'});
      return
    } else if(confirmPassword.length < 8){
      setErrors({confirmPassword: 'Minimum length for confirm password is 8'});
      return
    } else if (password !== confirmPassword) {
      setErrors({
        password: 'Paswords does not match',
        confirmPassword: 'Paswords does not match'
      });
      return
    }
    const phoneNo = localStorage.getItem('phoneNoForOTP');
    updatePassword(password, phoneNo)
  }

  const resetErrors = () => setErrors({
    password: '',
    confirmPassword: ''
  });

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
              <TextField
            fullWidth
            autoComplete="password"
            type={showPassword ? "text" : "password"}
            label="Password"
            value={password}
            onChange={(e) => {
              resetErrors();
              setPassword(e.target.value)
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(errors.password)}
            helperText={errors.password}
          />

          <TextField
            fullWidth
            autoComplete={+new Date()}
            type={showPassword ? "text" : "password"}
            label="Confirm Password"
            value={confirmPassword}
            onChange={(e) => {
              resetErrors();
              setConfirmPassword(e.target.value)
            }}
            className={classes.fieldMargin}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(errors.confirmPassword)}
            helperText={errors.confirmPassword}
          />
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
                    Reset Password
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
  updatePassword: (password, phoneNumber) => dispatch(updatePassword(password, phoneNumber)),
  clearError: () => dispatch(clearError())
});

const mapState = state => ({
  passwordUpdated: state.auth.passwordUpdated,
  error: state.auth.error
})

export default connect(mapState, mapDispatch)(ForgotPassword);
