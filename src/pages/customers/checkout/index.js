import { useState } from "react";
import { 
  Grid,
} from "@mui/material";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import {
  Customer,
  PaymentInfo,
  BillingAddress
} from './forms';

const Checkout = () => {
const [completedCustomerInfo, setCompletedCustomerInfo] = useState(false);
const [completedAddress, setCompletedAddress] = useState(false);
const [completedPayment, setCompletedPayment] = useState(false);
const [customer, setCustomer] = useState({});
const [billingAddress, setBillingAddress] = useState({});
const [payment, setPayment] = useState({});

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const markCustomerInfoComplete = (isCompleted) => setCompletedCustomerInfo(isCompleted);
const markAddressComplete = (isCompleted) => setCompletedAddress(isCompleted);
const markPaymentComplete = (isCompleted) => setCompletedPayment(isCompleted);

const placeOrder = () => {
  
}
  return (
    <Grid justifyContent='center' alignItems='center' mt={12} container>
      <Grid xs={6} item>
        <Customer 
          markCustomerInfoComplete={markCustomerInfoComplete} 
          setCustomer={setCustomer}
        />
        
        {completedCustomerInfo &&
          <BillingAddress 
            markAddressComplete={markAddressComplete} 
            setBillingAddress={setBillingAddress}
          />
        }

        {completedAddress &&
          <Elements stripe={stripePromise}>
            <PaymentInfo 
              completedCustomerInfo={completedCustomerInfo}
              completedAddress={completedAddress}
              placeOrder={placeOrder}
            />
          </Elements>
        }
      </Grid>
    </Grid>
  )
};

export { Checkout as default }