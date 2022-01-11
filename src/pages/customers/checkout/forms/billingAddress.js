import { useEffect, useState } from "react";
import * as Yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Grid,
  Button, 
  AccordionSummary, 
  Typography,
  Input,
  InputLabel
} from '@mui/material';
import { Country, State, City }  from 'country-state-city';
import { makeStyles } from '@mui/styles';

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
  textField: {
    border: '1px solid #ddd',
    height: '45px',
    width: '100%',
    padding: '8px 10px',
    marginTop: '5px',
    borderRadius: '4px',
    '&:after': {
      border: '1px solid #ddd',
    }
  },
  label: {
    marginLeft: '3px',
    fontWeight: 'bolder',
    color: 'black',
    textTransform: 'uppercase'
  },
  required: {
    color: 'red'
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
  }
}));

const BillingAddress = ({
  markAddressComplete = () => {},
  setBillingAddress = () => {},
  taxError = '',
  shippingError = ''
}) => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const classes = useStyles();
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
    <Grid item>
      <Grid className={classes.accordian}>
          <Typography className={classes.heading}>1. Shipping</Typography>
      </Grid>
      <Grid direction='row' className={classes.box} container>
        <Grid justifyContent='space-between' mt={3} container>
          <Grid direction='column' container item xs={6}>
            <InputLabel className={classes.label}>First Name <span className={classes.required}>*</span></InputLabel>
            <Input className={classes.textField} placeholder='First name' />
          </Grid>
          <Grid direction='column' container item xs={5}>
            <InputLabel className={classes.label}>Last Name<span className={classes.required}>*</span></InputLabel>
            <Input className={classes.textField} placeholder='Last name' />
          </Grid>
        </Grid>    

        <Grid justifyContent='space-between' mt={3} container>
          <Grid direction='column' container item xs={6}>
            <InputLabel className={classes.label}>Street Address<span className={classes.required}>*</span></InputLabel>
            <Input className={classes.textField} placeholder='Street Address' />
          </Grid>
          <Grid direction='column' container item xs={5}>
            <InputLabel className={classes.label}>APT. / Suite</InputLabel>
            <Input className={classes.textField} placeholder='APT.' />
          </Grid>
        </Grid>    
        
        <Grid justifyContent='space-between' mt={3} container>
          <Grid direction='column' container item xs={6}>
            <InputLabel className={classes.label}>City<span className={classes.required}>*</span></InputLabel>
            <Input className={classes.textField} placeholder='City' />
          </Grid>
          <Grid direction='column' container item xs={5}>
            <InputLabel className={classes.label}>Postal Code<span className={classes.required}>*</span></InputLabel>
            <Input className={classes.textField} placeholder='Zip' />
          </Grid>
        </Grid> 

        <Grid justifyContent='space-between' mt={3} container>
          <Grid direction='column' container item xs={6}>
            <InputLabel className={classes.label}>State<span className={classes.required}>*</span></InputLabel>
            <Input className={classes.textField} placeholder='State' />
          </Grid>
          <Grid direction='column' container item xs={5}>
            <InputLabel className={classes.label}>Country<span className={classes.required}>*</span></InputLabel>
            <Input className={classes.textField} placeholder='country' />
          </Grid>
        </Grid>
        
        <Grid justifyContent='center' mt={3} container>
          <Button className={classes.continueBtn}> Continue </Button>
        </Grid>
        
      </Grid>
    </Grid>
  )
}

export { BillingAddress as default }