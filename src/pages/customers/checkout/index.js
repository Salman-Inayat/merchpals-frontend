import { useState } from "react";
import { 
  Grid,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
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
const [loading, setLoading] = useState(false);

const markCustomerInfoComplete = (isCompleted) => setCompletedCustomerInfo(isCompleted);
const markAddressComplete = (isCompleted) => setCompletedAddress(isCompleted);
const markPaymentComplete = (isCompleted) => setCompletedPayment(isCompleted);

  return (
    <Grid justifyContent='center' alignItems='center' mt={12} container>
      <Grid xs={6} item>
        <Customer 
          markCustomerInfoComplete={markCustomerInfoComplete} 
          setCustomer={setCustomer}
        />
        
        {completedCustomerInfo && (
          <BillingAddress 
            markAddressComplete={markAddressComplete} 
            setBillingAddress={setBillingAddress}
          />
        )}

        {completedAddress && (
          <PaymentInfo 
            markPaymentComplete={markPaymentComplete} 
            setPayment={setPayment}
          />
        )}
        
        <Grid mt={3} item>
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            disabled={!completedCustomerInfo || !completedAddress || !completedPayment}
            loading={loading}
          >
            Register
          </LoadingButton>

        </Grid>
      </Grid>
    </Grid>
  )
};

export { Checkout as default }