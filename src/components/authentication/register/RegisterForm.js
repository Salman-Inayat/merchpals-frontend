import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import {
  Grid,
  Stack,
  TextField,
  IconButton,
  InputAdornment,
  Checkbox,
  Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import PhoneNumberInput from '../../phone-number-input';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const useStyles = makeStyles(theme => ({
  error: {
    marginTop: '5px',
    color: '#FF4842',
    marginLeft: '14px',
    fontSize: '0.75rem',
  },
  termsSpan: {
    // fontSize: '0.75rem',
    color: '#0043cb',
    cursor: 'pointer',
  },
}));
export default function RegisterForm({ registerVendor = () => {}, registrationErrors = {} }) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [phoneNo, setPhoneNo] = useState('');
  const [formErrors, setFormErrors] = useState({
    phoneNo: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const classes = useStyles();

  useEffect(() => {
    if (registrationErrors.email) {
      setError('email', {
        type: 'manual',
        message: registrationErrors.email,
      });
      setLoading(false);
    }

    if (registrationErrors.phoneNo) {
      setFormErrors({
        phoneNo: registrationErrors.phoneNo,
      });
      setLoading(false);
    }
  }, [registrationErrors]);

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string()
      .required('First name is required')
      .min(2, 'Too Short!')
      .max(50, 'Too Long!'),
    lastName: Yup.string()
      .required('Last name is required')
      .min(2, 'Too Short!')
      .max(50, 'Too Long!'),
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password is too short - should be 6 chars minimum.'),
    confirmPassword: Yup.string().test('passwords-match', 'Passwords must match', function (value) {
      return this.parent.password === value;
    }),
    hasAcceptedTerms: Yup.boolean(),
  });

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(RegisterSchema),
  });

  const password = watch('password');

  const onSubmit = data => {
    if (phoneNo.length < 5) {
      setFormErrors({ phoneNo: 'Please provide a valid phone number' });
      return;
    }

    const formattedPhoneNo = `+${phoneNo}`;
    registerVendor({ ...data, phoneNo: formattedPhoneNo });
    setLoading(true);
  };

  const onError = err => {
    if (!phoneNo || phoneNo.length < 5) {
      setFormErrors({ phoneNo: 'Please provide a valid phone number' });
      return;
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <Stack spacing={3}>
        <Stack direction={{ xs: 'row', sm: 'row' }} spacing={2}>
          <TextField
            fullWidth
            label="First name"
            autoComplete="firstName"
            {...register('firstName')}
            error={Boolean(errors.firstName?.message)}
            helperText={errors.firstName?.message}
          />

          <TextField
            fullWidth
            label="Last name"
            autoComplete="lastName"
            {...register('lastName')}
            error={Boolean(errors.lastName?.message)}
            helperText={errors.lastName?.message}
          />
        </Stack>

        <PhoneNumberInput
          phoneNo={phoneNo}
          setPhoneNo={value => {
            setFormErrors({ ...formErrors, phoneNo: '' });
            setPhoneNo(value);
          }}
          error={formErrors.phoneNo}
        />

        {phoneNo?.length > 2 && (
          <TextField
            fullWidth
            autoComplete="email"
            type="email"
            label="Email address"
            {...register('email')}
            onKeyUp={() => setFormErrors({ ...formErrors, email: '' })}
            error={Boolean(errors.email?.message)}
            helperText={errors.email?.message}
          />
        )}

        <TextField
          fullWidth
          autoComplete="new-password"
          type={showPassword ? 'text' : 'password'}
          label="Password"
          {...register('password')}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" onClick={() => setShowPassword(prev => !prev)}>
                  <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
        />

        {password?.length > 5 && (
          <TextField
            fullWidth
            autoComplete={+new Date()}
            type={showPassword ? 'text' : 'password'}
            label="Confirm Password"
            {...register('confirmPassword')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setShowPassword(prev => !prev)}>
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(errors.confirmPassword?.message)}
            helperText={errors.confirmPassword?.message}
          />
        )}

        <Stack
          spacing={1}
          alignItems="center"
          justifyContent="center"
          mb={2}
          direction="row"
          width="100%"
        >
          <Checkbox
            checked={watch('hasAcceptedTerms')}
            {...register('hasAcceptedTerms')}
            defaultChecked={true}
          />
          <Typography variant="body2" color="textSecondary">
            I agree to{' '}
            <span className={classes.termsSpan} onClick={() => navigate('/vendor/store')}>
              Terms
            </span>
            ,{' '}
            <span className={classes.termsSpan} onClick={() => navigate('/vendor/store')}>
              Privacy
            </span>
            , receiving SMS and email marketing communications{' '}
          </Typography>
        </Stack>

        {formErrors?.message && (
          <Grid className={classes.error} item>
            {formErrors?.message}
          </Grid>
        )}

        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={false}>
          Continue
        </LoadingButton>
      </Stack>
    </form>
  );
}
