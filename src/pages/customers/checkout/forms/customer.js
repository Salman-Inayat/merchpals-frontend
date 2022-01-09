import { useEffect, useState } from "react";
import * as Yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Grid,
  TextField,
  Stack,
  Typography
} from '@mui/material';

const Customer = ({
  markCustomerInfoComplete = () => {},
  setCustomer = {}
}) => {

  const CustomerSchema = Yup.object().shape({
    firstName: Yup.string()
      .required("First name is required")
      .min(2, "Too Short!")
      .max(50, "Too Long!"),
    lastName: Yup.string()
      .required("Last name is required")
      .min(2, "Too Short!")
      .max(50, "Too Long!"),
  });
  
  const { register, trigger, watch, formState: { errors }  } = useForm({ 
    resolver: yupResolver(CustomerSchema)
  });

  const [firstName, lastName] = watch(['firstName', 'lastName']);
  
  useEffect(()=> {
    validateForm()
  }, [firstName, lastName]);

  const validateForm = async () => {
    if (firstName, lastName) {
      let isvalid = await trigger()

      if (isvalid) {
        markCustomerInfoComplete(true);
      }
    } else {
      markCustomerInfoComplete(false)
    }
    setCustomer({
      firstName, lastName
    })
  }
  return (
    <form>
      <Stack spacing={3}>
        <Grid direction='column' spacing={2} container>
        <Grid item>
          <Typography 
            style={{ fontSize: '24px', fontWeight: '600' }} 
            align='center'
          >
            Customer Information
          </Typography>
        </Grid>          
          <Grid xs={12} spacing={3} direction='row' container item>
            <Grid xs={6} item>
              <TextField
                fullWidth
                label="First name"
                {...register("firstName")}
                error={Boolean(errors.firstName?.message)}
                helperText={errors.firstName?.message}
              />              
            </Grid>
            <Grid xs={6} item>
              <TextField
                fullWidth
                label="Last name"
                {...register("lastName")}
                error={Boolean(errors.lastName?.message)}
                helperText={errors.lastName?.message}
              />
            </Grid>
          </Grid>       
        </Grid>
      </Stack>
    </form>
  )
}

export { Customer as default }