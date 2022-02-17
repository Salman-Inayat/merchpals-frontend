import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
// material
import {
  Link,
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel,
  Grid,
  Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import PhoneNumberInput from '../../phone-number-input';
import { login, clearError } from '../../../store/redux/actions/auth';
import { makeStyles } from '@mui/styles';

const useStyle = makeStyles(() => ({
  root: {
    color: '#FF4842',
  },
  errorMessage: {
    marginTop: '5px',
    color: '#FF4842',
    marginLeft: '14px',
    fontSize: '0.75rem',
  },
}));

const LoginForm = ({
  login = () => {},
  clearError = () => {},
  isLoggedIn = false,
  loginError = '',
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [phoneNo, setPhoneNo] = useState();
  const [password, setPassword] = useState('');
  const [phoneNoError, setPhoneNoError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const navigate = useNavigate();
  const classes = useStyle();

  useEffect(() => {
    if (isLoggedIn || localStorage.getItem('MERCHPAL_AUTH_TOKEN')) {
      navigate('/vendor', { replace: true });
    }
    console.log('loginError', loginError);
  }, [loginError, isLoggedIn]);

  const handleSubmit = () => {
    if (phoneNo && password) {
      setPhoneNoError('');
      login(phoneNo, password);
    } else {
      if (!phoneNo) {
        setPhoneNoError('Phone number is required');
      }
      if (!password) {
        setPasswordError('Password is required');
      }
    }
    // login(phoneNo, password);
  };

  const handleShowPassword = () => setShowPassword(!showPassword);

  return (
    <Grid>
      <Stack spacing={3}>
        <PhoneNumberInput
          phoneNo={phoneNo}
          setPhoneNo={val => setPhoneNo(val)}
          error={phoneNoError}
        />

        <TextField
          fullWidth
          autoComplete={+new Date()}
          type={showPassword ? 'text' : 'password'}
          label="Password"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleShowPassword} edge="end">
                  <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          onChange={e => {
            setPassword(e.target.value);
            setPasswordError('');
          }}
          value={password}
          helperText={passwordError}
          FormHelperTextProps={{
            classes: {
              root: classes.root,
            },
          }}
        />
      </Stack>

      <Stack
        className={classes.errorMessage}
        alignItems="center"
        justifyContent="space-between"
        sx={{ my: 2 }}
      >
        <Typography>{loginError}</Typography>
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <FormControlLabel control={<Checkbox checked={false} />} label="Remember me" />

        <Link component={RouterLink} variant="subtitle2" to="/forgot-password">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        onClick={handleSubmit}
        loading={false}
      >
        Login
      </LoadingButton>
    </Grid>
  );
};

const mapDispatch = dispatch => ({
  login: (phoneNo, password) => dispatch(login(phoneNo, password)),
  clearError: () => dispatch(clearError()),
});

const mapState = state => ({
  isLoggedIn: state.auth.isLoggedIn,
  loginError: state.auth.error,
});
export default connect(mapState, mapDispatch)(LoginForm);
