import { useEffect, useState } from "react";
import * as Yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Grid,
  TextField,
  Stack,
  Typography,
} from '@mui/material';

const PaymentInfo = ({
  markPaymentComplete = () => {},
  setPayment = {}
}) => {
  const PaymentSchema = Yup.object().shape({
    firstName: Yup.string()
      .required("First name is required")
      .min(2, "Too Short!")
      .max(50, "Too Long!"),
    lastName: Yup.string()
      .required("Last name is required")
      .min(2, "Too Short!")
      .max(50, "Too Long!"),
    card: Yup.string()
      .required("Card number is required"),
    cvc: Yup.string()
      .required("CVC is required")
      .min(3, 'CVC must contain exactly 3 numbers')
      .max(3, 'CVC must contain exactly 3 numbers'),
    expiryMonth: Yup.string()
      .required("Expiry month is required")
      .max(12, 'Invalid month'),
    expiryYear: Yup.string()
      .required("Expiry year is required")
      .min(2022, 'Invalid Year')
      .max(2099, 'Invalid Year'),
  });
  
  const { register, trigger, watch, formState: { errors }, setError, clearErrors  } = useForm({ 
    resolver: yupResolver(PaymentSchema)
  });

  const [firstName, lastName, card, cvc, expiryMonth, expiryYear] = watch(['firstName', 'lastName', 'card', 'cvc', 'expiryMonth', 'expiryYear']);

  useEffect(() => {
    validateForm();
  }, [firstName, lastName, card, cvc, expiryMonth, expiryYear]);

  const validateForm = async () => {
    if (firstName, lastName, card, cvc, expiryMonth, expiryYear) {
      const isValid = await trigger();
    
      if (isValid) {
        markPaymentComplete(true);
      }
    } else {
      markPaymentComplete(false)
    }

    setPayment({
      firstName, lastName, card, cvc, expiryMonth, expiryYear  
    });
  }
  console.log('cvc', cvc);
  return (
    <form id='paymentForm'>
    <Stack spacing={3} mt={3}>
      <Grid direction='column' spacing={2} container>
      <Grid item>
          <Typography 
            style={{ fontSize: '24px', fontWeight: '600' }} 
            align='center'
          >
            Payment Information
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

        <Grid xs={12} spacing={3} direction='row' container item>
          <Grid xs={6} item>
            <TextField
              fullWidth
              label="CVC"
              {...register("cvc", {
                onChange: e => {
                  if (!/^[0-9]*$/.test(e.target.value)) {
                    setError('cvc', {
                      type: 'manual', 
                      message: 'Please input numbers only',
                    })
                  } else if(e.target.value?.length > 3){
                    setError('cvc', {
                      type: 'manual', 
                      message: 'CVC must contain exactly 3 numbers',
                    })
                  }else {
                    clearErrors('cvc')
                  }
                }
              })}
              error={Boolean(errors.cvc?.message)}
              helperText={errors.cvc?.message}
            />              
          </Grid>
          <Grid xs={6} item>
            <TextField
              fullWidth
              label="Card Number"
              {...register("card", {
                onChange: e => {
                  if (!/^[0-9]*$/.test(e.target.value)) {
                    setError('card', {
                      type: 'manual', 
                      message: 'Please input numbers only',
                    })
                  } else {
                    clearErrors('card')
                  }
                }
              })}
              error={Boolean(errors.card?.message)}
              helperText={errors.card?.message}
            />    
          </Grid>
        </Grid>  
        
        <Grid xs={12} spacing={3} direction='row' container item>
          <Grid xs={6} item>
            <TextField
              fullWidth
              label="Expiry month"
              {...register("expiryMonth", {
                onChange: e => {
                  if (!/^[0-9]*$/.test(e.target.value)) {
                    setError('expiryMonth', {
                      type: 'manual', 
                      message: 'Please input numbers only',
                    })
                  } else {
                    clearErrors('expiryMonth')
                  }
                }
              })}
              error={Boolean(errors.expiryMonth?.message)}
              helperText={errors.expiryMonth?.message}
            />
          </Grid>
          <Grid xs={6}  item>
            <TextField
              fullWidth
              label="Expiry year"
              {...register("expiryYear", {
                onChange: e => {
                  if (!/^[0-9]*$/.test(e.target.value)) {
                    setError('expiryYear', {
                      type: 'manual', 
                      message: 'Please input numbers only',
                    })
                  } else {
                    clearErrors('expiryYear')
                  }
                }
              })}
              error={Boolean(errors.expiryYear?.message)}
              helperText={errors.expiryYear?.message}
            />            
          </Grid>          
        </Grid>
      </Grid>
    </Stack>
  </form>  
  )
}

export { PaymentInfo as default }