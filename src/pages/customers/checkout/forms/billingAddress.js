import { useEffect } from "react";
import * as Yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Grid,
  TextField,
  Stack,
  Typography
} from '@mui/material';

const BillingAddress = ({
  markAddressComplete = () => {},
  setBillingAddress = () => {}
}) => {
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
              <TextField
                fullWidth
                label="state"
                {...register("state")}
                error={Boolean(errors.state?.message)}
                helperText={errors.state?.message}
              />
            </Grid>
          </Grid>  

          <Grid item>
            <TextField
              fullWidth
              label="Country"
              {...register("country")}
              error={Boolean(errors.country?.message)}
              helperText={errors.country?.message}
            />            
          </Grid>
        </Grid>
      </Stack>
    </form>  
  )
}

export { BillingAddress as default }