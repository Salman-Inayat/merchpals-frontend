import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Grid,
  Button,
  FormControl,
  MenuItem,
  FormHelperText,
  Select,
  Typography,
  Input,
  InputLabel,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import PhoneNumberInput from '../../../../components/phone-number-input';
import { cpf as CpfRegulator } from 'cpf-cnpj-validator'; 

const useStyles = makeStyles(theme => ({
  accordian: {
    backgroundColor: '#0A0A0A',
    color: '#fff',
    minHeight: '64px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: '0px 16px',
  },
  heading: {
    fontWeight: 'bold',
    fontSize: '16px',
    textTransform: 'uppercase',
  },
  box: {
    padding: '30px 20px',
  },
  textField: {
    border: '1px solid #ddd',
    height: '45px',
    width: '100%',
    padding: '8px 10px',
    marginTop: '5px',
    borderRadius: '4px',
    '&:after': {
      border: '1px solid #ddd',
    },
  },
  label: {
    marginLeft: '3px',
    fontWeight: 'bolder',
    color: 'black',
    textTransform: 'uppercase',
  },
  required: {
    color: 'red',
  },
  continueBtn: {
    width: '80%',
    color: 'black',
    backgroundColor: 'yellow',
    borderRadius: '20px',
    '&:hover': {
      color: 'black',
      backgroundColor: 'yellow',
    },
  },
  error: {
    color: 'red',
    fontWeight: 600,
  },
  fieldError: {
    color: 'red',
    fontWeight: 400,
    fontSize: '11px',
  },
}));

const BillingAddress = ({
  markAddressComplete = () => {},
  setBillingAddress = () => {},
  updateTaxAndShipping = () => {},
  getStatesOfCountry = () => {},
  getRegionOfCountry = () => {},  
  taxError = '',
  shippingError = '',
  setPhoneNo,
  setEmail,
  setFormErrors,
  phoneNo,
  email,
  formErrors = {},
  setCustomer,
  countries,
  states,
}) => {
  const [phoneErr, setPhoneErr] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [cpf, setCPF] = useState('');
  const [cpfErr, setCpfErr] = useState('');

  const classes = useStyles();
  const CustomerSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    aptNo: Yup.string().required('Apartment Number is required'),
    zip: Yup.string()
      .required('Postal Code is required')
      .min('5', 'Postal code should be 5 digits'),
    street: Yup.string().required('Street Address is required'),
    city: Yup.string().required('City name is required'),
    state: Yup.string().required('State name is required'),
    country: Yup.string().required('Country Name is required'),
  });

  const {
    register,
    trigger,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: yupResolver(CustomerSchema),
  });

  const [firstName, lastName, aptNo, zip, street, city, state, country] = watch([
    'firstName',
    'lastName',
    'aptNo',
    'zip',
    'street',
    'city',
    'state',
    'country',
  ]);

  useEffect(() => {
    if (country) {
      getStatesOfCountry(country);
      getRegionOfCountry(country);
    }
  }, [country]);

  useEffect(() => {
    setValue('country', 'US');
    setValue('state', 'NY');
    setValue('zip', '10001');
  }, []);

  // console.log({ country });
  useEffect(() => {
    setBillingAddress({
      firstName,
      lastName,
      aptNo,
      zip,
      street,
      city,
      state,
      country,
      tax_number: cpf,
    });
    setCustomer({
      firstName,
      lastName,
    });

    updateTaxAndShipping();
  }, [firstName, lastName, aptNo, zip, street, city, state, country, cpf]);

  const validateAndContinue = async () => {
    if (!phoneNo) {
      setPhoneErr('Please provide a valid phone number');
      return;
    }

    if (!email) {
      setEmailErr('Please provide a valid email address');
      return;
    }

    if (!cpf) {
      setCpfErr('CPF number is required!');
    } else if (!CpfRegulator.isValid(cpf)) {
      setCpfErr('Please provide a valid CPF number!');
    }
    const isValid = await trigger();
    if (isValid) {
      markAddressComplete(true);
    } else {
      markAddressComplete(false);
    }
  };

  return (
    <Grid item>
      <Grid className={classes.accordian}>
        <Typography className={classes.heading}>1. Shipping</Typography>
      </Grid>
      <Grid direction="row" className={classes.box} container>
        <Grid justifyContent="space-between" mt={3} container spacing={2}>
          <Grid item md={6} xs={12}>
            <InputLabel className={classes.label}>
              First Name <span className={classes.required}>*</span>
            </InputLabel>
            <Input
              {...register('firstName', {
                onChange: e => {
                  if (errors.firstName) {
                    trigger('firstName');
                  }
                },
              })}
              className={classes.textField}
              placeholder="First name"
            />
            <span className={classes.fieldError}>{errors?.firstName?.message}</span>
          </Grid>
          <Grid item md={6} xs={12}>
            <InputLabel className={classes.label}>
              Last Name<span className={classes.required}>*</span>
            </InputLabel>
            <Input
              {...register('lastName', {
                onChange: e => {
                  if (errors.lastName) {
                    trigger('lastName');
                  }
                },
              })}
              className={classes.textField}
              placeholder="Last name"
            />
            <span className={classes.fieldError}>{errors?.lastName?.message}</span>
          </Grid>
        </Grid>

        <Grid justifyContent="space-between" mt={3} container spacing={2}>
          <Grid item md={6} xs={12}>
            <InputLabel className={classes.label}>
              Street Address<span className={classes.required}>*</span>
            </InputLabel>
            <Input
              {...register('street', {
                onChange: e => {
                  if (errors.street) {
                    trigger('street');
                  }
                },
              })}
              className={classes.textField}
              placeholder="Street Address"
            />
            <span className={classes.fieldError}>{errors?.street?.message}</span>
          </Grid>
          <Grid item md={6} xs={12}>
            <InputLabel className={classes.label}>APT. / Suite</InputLabel>
            <Input
              {...register('aptNo', {
                onChange: e => {
                  if (errors.aptNo) {
                    trigger('aptNo');
                  }
                },
              })}
              className={classes.textField}
              placeholder="APT."
            />
            <span className={classes.fieldError}>{errors?.aptNo?.message}</span>
          </Grid>
        </Grid>

        <Grid justifyContent="space-between" mt={3} container spacing={2}>
          <Grid item md={6} xs={12}>
            <InputLabel className={classes.label}>
              City<span className={classes.required}>*</span>
            </InputLabel>
            <Input
              {...register('city', {
                onChange: e => {
                  if (errors.city) {
                    trigger('city');
                  }
                },
              })}
              className={classes.textField}
              placeholder="City"
            />
            <span className={classes.fieldError}>{errors?.city?.message}</span>
          </Grid>
          <Grid item md={6} xs={12}>
            <InputLabel className={classes.label}>
              Postal Code<span className={classes.required}>*</span>
            </InputLabel>
            <Input
              {...register('zip', {
                onChange: e => {
                  if (errors.zip) {
                    trigger('zip');
                  }
                },
              })}
              className={classes.textField}
              placeholder="Zip"
            />
            <span className={classes.fieldError}>{errors?.zip?.message}</span>
          </Grid>
        </Grid>

        <Grid justifyContent="space-between" mt={3} container spacing={2}>
          <Grid item md={6} xs={12}>
            <InputLabel className={classes.label}>
              Country<span className={classes.required}>*</span>
            </InputLabel>
            <Select
              fullWidth
              style={{ height: '45px' }}
              {...register('country', {
                onChange: () => {
                  if (errors.country) {
                    trigger(country);
                  }
                },
              })}
            >
              {countries.map((country, i) => (
                <MenuItem value={country.iso2} key={`country-${i}`}>
                  {country.name}
                </MenuItem>
              ))}
            </Select>
            <span className={classes.fieldError}>{errors?.country?.message}</span>
          </Grid>
          <Grid item md={6} xs={12}>
            <InputLabel className={classes.label}>
              State<span className={classes.required}>*</span>
            </InputLabel>
            <Select
              fullWidth
              style={{ height: '45px' }}
              {...register('state', {
                onChange: () => {
                  if (errors.state) {
                    trigger(state);
                  }
                },
              })}
            >
              {states.map((state, i) => (
                <MenuItem value={state.iso2} key={`state-${i}`}>
                  {state.name}
                </MenuItem>
              ))}
            </Select>
            <span className={classes.fieldError}>{errors?.state?.message}</span>
          </Grid>
        </Grid>
        {
          (firstName,
          lastName,
          aptNo,
          zip,
          street,
          city,
          state,
          country && (
            <Grid mt={3} justifyContent="space-between" container spacing={2}>
              <Grid item md={6} xs={12}>
                <InputLabel className={classes.label}>
                  Phone Number<span className={classes.required}>*</span>
                </InputLabel>
                <PhoneNumberInput
                  inputStyle={{ height: '45px', paddingLeft: '55px' }}
                  phoneNo={phoneNo}
                  setPhoneNo={value => {
                    setFormErrors({ ...formErrors, phoneNo: '' });
                    setPhoneNo(value);
                    setPhoneErr('');
                  }}
                  error={formErrors.phoneNo || phoneErr}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <InputLabel className={classes.label}>Email</InputLabel>
                <Input
                  value={email}
                  onChange={e => {
                    setEmailErr('');
                    setEmail(e.target.value);
                  }}
                  onKeyUp={() => setFormErrors({ ...formErrors, email: '' })}
                  className={classes.textField}
                  placeholder="Email"
                />
                <span className={classes.fieldError}>{formErrors.email || emailErr}</span>
              </Grid>
              {country === 'BR' && (
                <Grid item md={6} xs={12}>
                  <InputLabel className={classes.label}>CPF</InputLabel>
                  <Input
                    value={cpf}
                    onChange={e => {
                      setCpfErr('');
                      setCPF(e.target.value);
                    }}
                    onKeyUp={() => setFormErrors({ cpf: '' })}
                    className={classes.textField}
                    placeholder="CPF"
                  />
                  <span className={classes.fieldError}>{cpfErr}</span>
                </Grid>
              )}
            </Grid>
          ))
        }
        <Grid justifyContent="center" mt={3} container>
          {taxError && <Typography className={classes.error}>{taxError}</Typography>}
          {shippingError && <Typography className={classes.error}>{shippingError}</Typography>}
        </Grid>
        <Grid justifyContent="center" mt={3} container>
          <Button onClick={validateAndContinue} className={classes.continueBtn}>
            {' '}
            Continue{' '}
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export { BillingAddress as default };
