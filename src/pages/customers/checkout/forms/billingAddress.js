import { useEffect, useState } from "react";
import * as Yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Grid,
  TextField,
  Stack,
  Typography,
  FormControl,
  InputLabel,
  FormHelperText,
  Select,
  MenuItem,
} from '@mui/material';
import { Country, State, City }  from 'country-state-city';

const BillingAddress = ({
  markAddressComplete = () => {},
  setBillingAddress = () => {},
  taxError = '',
  shippingError = ''
}) => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);

  const CustomerSchema = Yup.object().shape({
    aptNo: Yup.string()
      .required("Apartment Number is required"),
    zip: Yup.string()
      .required("Zip Code is required"),
    street: Yup.string()
      .required("Street Address is required"),
    city: Yup.string()
      .required("City name is required"),
    country: Yup.string()
      .required("Country Name is required"),
  });
  
  const { register, trigger,watch, formState: { errors }  } = useForm({ 
    resolver: yupResolver(CustomerSchema)
  });

  const [aptNo, zip, street, city, state, country] = watch(['aptNo', 'zip', 'street', 'city', 'state', 'country']);
  
  useEffect(() => {
    setCountries(Country.getAllCountries())
  }, [])
  
  useEffect(() => {
    setStates(State.getStatesOfCountry(country))
  }, [country])

  useEffect(() => {
    validateForm();
  }, [aptNo, zip, street, city, state, country]);

  const validateForm = async () => {
    if (aptNo, street, city, state, country) {
      const isValid = await trigger();
      if (isValid) {
        markAddressComplete(true); 
      }
    } else {
      markAddressComplete(false)
    }

    setBillingAddress({
      aptNo, zip, street, city, state, country
    })
  }
console.log({
  aptNo, zip, street, city, state, country
});

console.log({states});
  return (
    <form id='billingForm'>
      <Stack spacing={3} mt={3}>
        <Grid direction='column' spacing={2} container>
        <Grid item>
          <Typography 
            style={{ fontSize: '24px', fontWeight: '600' }} 
            align='center'
          >
            Billing Address
          </Typography>
        </Grid>
        <Grid item>
          <Typography 
            style={{ fontSize: '14px', fontWeight: '500', color: 'red' }} 
            align='center'
          >
            {taxError}
          </Typography>
          <Typography 
            style={{ fontSize: '14px', fontWeight: '500', color: 'red' }} 
            align='center'
          >
            {shippingError}
          </Typography>
        </Grid>        
          <Grid xs={12} spacing={3} direction='row' container item>
            <Grid xs={6} item>
              <TextField
                fullWidth
                label="Apartment No"
                {...register("aptNo")}
                error={Boolean(errors.aptNo?.message)}
                helperText={errors.aptNo?.message}
              />              
            </Grid>
            <Grid xs={6} item>
              <TextField
                fullWidth
                label="Zip code"
                {...register("zip")}
                error={Boolean(errors.zip?.message)}
                helperText={errors.zip?.message}
              />
            </Grid>
          </Grid>  

          <Grid item>
            <TextField
              fullWidth
              label="Street"
              {...register("street")}
              error={Boolean(errors.street?.message)}
              helperText={errors.street?.message}
            />            
          </Grid>
          <Grid item>
            <FormControl fullWidth error={Boolean(errors.country?.message)}>
              <InputLabel id="country">Country</InputLabel>
              <Select
                labelId="country"
                id="country"
                {...register('country')}
              >
                {countries.map(country => <MenuItem value={country.isoCode}>{country.name}</MenuItem>)}
              </Select>
              <FormHelperText>
              {errors.country?.message}
              </FormHelperText>
            </FormControl>
          </Grid>          
          <Grid xs={12} spacing={3} direction='row' container item>
            <Grid xs={6} item>
              <TextField
                fullWidth
                label="city"
                {...register("city")}
                error={Boolean(errors.city?.message)}
                helperText={errors.city?.message}
              />              
            </Grid>
            <Grid xs={6} item>
            
            <FormControl fullWidth error={Boolean(errors.state?.message)}>
              <InputLabel id="state">State</InputLabel>
              <Select
                labelId="state"
                id="state"
                {...register('state')}
              >
                {states.map(state => <MenuItem value={state.isoCode}>{state.name}</MenuItem>)}
              </Select>
              <FormHelperText>
              {errors.country?.message}
              </FormHelperText>
            </FormControl>
          
            </Grid>
          </Grid>  
        </Grid>
      </Stack>
    </form>  
  )
}

export { BillingAddress as default }