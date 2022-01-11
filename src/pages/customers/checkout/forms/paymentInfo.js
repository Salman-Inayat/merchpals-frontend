import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { 
  Avatar,
  Grid,
  Typography,
  Button
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import './stripeElement.css';
import PhoneNumberInput from '../../../../components/phone-number-input';
import { makeStyles } from '@mui/styles';
import CardsLogos from '../../../../assets/images/icons/credita.png'
const useStyles = makeStyles(theme => ({
  accordian: {
    backgroundColor: '#0A0A0A',
    color: '#fff',
    minHeight: '64px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: '0px 16px'
  },
  heading: {
    fontWeight: 'bold',
    fontSize: '16px',
    textTransform: 'uppercase'
  },
  box: {
    padding: '30px 20px',
  },
  continueBtn: {
    width: '80%',
    color: 'black',
    backgroundColor: 'yellow',
    borderRadius: '20px',
    '&:hover': {
      color: 'black',
      backgroundColor: 'yellow',
    }
  },
  banner: {
    width: '500px'
  }
}));

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
  const classes = useStyles();

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
        width: '500px'
      }
    },
    hidePostalCode: true
  }

  return (
    <Grid item>
    <Grid className={classes.accordian}>
        <Typography className={classes.heading}>1. Payment</Typography>
    </Grid>
    <Grid direction='row' justifyContent='center' className={classes.box} container>
      <Grid item container justifyContent='center' xs={10} mt={3}>
        <Avatar src={CardsLogos} className={classes.banner} />
      </Grid>
      <Grid item container justifyContent='center' xs={10} mt={3}>
        <Grid item xs={12} mt={3}>
          <CardElement options={cardOptions} />
        </Grid>
      </Grid>
      <Grid justifyContent='center' mt={3} container>
          <Button className={classes.continueBtn}> Place your order </Button>
        </Grid>      
    </Grid>  
    </Grid>  
  )
}

export { PaymentInfo as default }