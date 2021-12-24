import * as Yup from 'yup';
import { useState } from 'react';
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
  Grid
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { PhoneNumberInput } from '../../phone-number-input';
import { login } from '../../../store/redux/actions/auth';

// ----------------------------------------------------------------------

const LoginForm = ({
  login = () => {},
  isLoggedIn = false,
  error = '',
}) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [phoneNo, setPhoneNo] = useState();
  const [password, settPassword] = useState('');
  const [errors, setErrors] = useState({
    password: '',
    phoneNo: ''
  });

    const handleSubmit = () => {
      login(phoneNo, password);
    };

  const handleShowPassword = () => setShowPassword(!showPassword);

  return (
      <Grid>
        <Stack spacing={3}>
          <PhoneNumberInput 
            phoneNo={phoneNo} 
            setPhoneNo={val => {
              setPhoneNo(val);
              setErrors({...errors, phoneNo: ''})
            }} 
            error={errors.phoneNo} 
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
              )
            }}
            onChange={e => {
              setErrors({...errors, password: ''})
              setPassword(e.target.value)
            }}
            value={password}
            error={Boolean(errors.password)}
            helperText={errors.password}
          />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <FormControlLabel
            control={<Checkbox checked={false} />}
            label="Remember me"
          />

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
}

const mapDispatch = dispatch => ({
  login: (phoneNo, password) => dispatch(login(phoneNo, password))
});

const mapState = state => ({
  isLoggedIn: state.auth.isLoggedIn,
  error: state.auth.error
})
export default connect(mapState, mapDispatch)(LoginForm);