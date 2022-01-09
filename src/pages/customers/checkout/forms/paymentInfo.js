import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { 
  Grid,
  TextField
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import './stripeElement.css';
import PhoneNumberInput from '../../../../components/phone-number-input';

const PaymentInfo = ({
  placeOrder = () => {},
  setPhoneNo,
  setEmail,
  setFormErrors,
  phoneNo,
  email,
  formErrors = {},
  completedCustomerInfo = false,
  completedAddress = false,
  loading,
  setLoading
}) => {

  const stripe = useStripe();
  const elements = useElements();

  const createToken = async (e) => {
    if (!stripe || !elements) {
      return;
    }
    setLoading(true)
    const cardElement = elements.getElement(CardElement);
    const { error, token } = await stripe.createToken(cardElement);
    console.log({token});
    placeOrder(token);
    if (!error) {
      setLoading(false)
    } else {
      console.log(error);
      setLoading(false)
    }
  };

  const cardOptions = {
    style: {
      base: {
        fontSize: '18px',
      }
    },
    hidePostalCode: true
  }

  return (
    <Grid xs={12} direction='column' container mt={3} item>
          <Grid item mt={3} >
            <PhoneNumberInput 
              phoneNo={phoneNo} 
              setPhoneNo={(value) => {
                  setFormErrors({...formErrors, phoneNo: ''});
                  setPhoneNo(value)
                }
              } 
              error={formErrors.phoneNo} 
            />
          </Grid>

          <Grid item mt={3} >
          {phoneNo?.length > 2 && (
            <TextField
              fullWidth
              autoComplete="email"
              type="email"
              label="Email address"
              name='email'
              onChange={e => setEmail(e.target.value)}
              onKeyUp={() => setFormErrors({...formErrors, email: ''})}
              error={Boolean(formErrors.email)}
              helperText={(formErrors.email)}
            />
          )}
          </Grid>   
          <Grid item mt={3} >
            <CardElement options={cardOptions} />
          </Grid>
      
      <Grid mt={3} item>
        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          disabled={!completedCustomerInfo || !completedAddress}
          loading={loading}
          onClick={createToken}
        >
          Place order
        </LoadingButton>
      </Grid>  
    </Grid>  
  )
}

export { PaymentInfo as default }