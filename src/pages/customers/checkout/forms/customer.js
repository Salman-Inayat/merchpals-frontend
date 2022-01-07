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
import PhoneNumberInput from '../../../../components/phone-number-input';

const Customer = ({
  markCustomerInfoComplete = () => {},
  setCustomer = {}
}) => {
  const [phoneNo, setPhoneNo] = useState('');
  const [formErrors, setFormErrors] = useState({
    phoneNo: '',
    message: ''
  });

  const CustomerSchema = Yup.object().shape({
    firstName: Yup.string()
      .required("First name is required")
      .min(2, "Too Short!")
      .max(50, "Too Long!"),
    lastName: Yup.string()
      .required("Last name is required")
      .min(2, "Too Short!")
      .max(50, "Too Long!"),
    email: Yup.string()
      .required("Email is required")
      .email("Email must be a valid email address"),
  });
  
  const { register, trigger, watch, formState: { errors }  } = useForm({ 
    resolver: yupResolver(CustomerSchema)
  });

  const onSubmit = (data) => {
    if (phoneNo.length < 5) {
      setFormErrors({phoneNo: 'Please provide a valid phone number'})
      return;
    }

  };

  const [firstName, lastName, email] = watch(['firstName', 'lastName', 'email']);
  
  useEffect(()=> {
    validateForm()
  }, [firstName, lastName, email, phoneNo]);

  const validateForm = async () => {
    if (firstName, lastName, email) {
      let isvalid = await trigger()
      if (!phoneNo) {
        setFormErrors({phoneNo: 'Phone number is required' });
      }
      if (isvalid && phoneNo) {
        markCustomerInfoComplete(true);
      }
    } else {
      markCustomerInfoComplete(false)
    }
    setCustomer({
      firstName, lastName, email, phoneNo
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
          {(firstName || lastName) &&<Grid item>
            <PhoneNumberInput 
              phoneNo={phoneNo} 
              setPhoneNo={(value) => {
                  setFormErrors({...formErrors, phoneNo: ''});
                  setPhoneNo(value)
                }
              } 
              error={formErrors.phoneNo} 
            />
          </Grid>}

          <Grid item>
          {phoneNo?.length > 2 && (
            <TextField
              fullWidth
              autoComplete="email"
              type="email"
              label="Email address"
              {...register("email")}
              onKeyUp={() => setFormErrors({...formErrors, email: ''})}
              error={Boolean(errors.email?.message)}
              helperText={(errors.email?.message)}
            />
          )}
          </Grid>          
        </Grid>
      </Stack>
    </form>
  )
}

export { Customer as default }