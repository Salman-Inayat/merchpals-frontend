import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { 
  Grid,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import './stripeElement.css';

const PaymentInfo = ({
  placeOrder = () => {},
  completedCustomerInfo = false,
  completedAddress = false,
}) => {
  const [loading, setLoading] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  const createToken = async (e) => {
    if (!stripe || !elements) {
      return;
    }
    setLoading(true)
    const cardElement = elements.getElement(CardElement);
    const { error, token } = await stripe.createToken(cardElement);
    console.log({ token });
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
      <CardElement options={cardOptions} />
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