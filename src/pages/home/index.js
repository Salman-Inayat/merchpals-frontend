import React, { useEffect, useState } from 'react';
import { 
  Container, 
  Grid, 
  Avatar, 
  Stepper, 
  Step,
  StepLabel,
  IconButton,
} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import axios from 'axios';
import { Link as RouterLink } from 'react-router-dom';
import Logo from '../../assets/images/logo.png';
import { makeStyles } from '@mui/styles';
import {
  Editor,
  Products,
  SignUp,
  StoreForm,Otp
} from './steps';
import { baseURL } from '../../configs/const';

const useStyle = makeStyles(() => ({
  fluid: {
    maxWidth: '100%',
    paddingLeft: '0px',
    paddingRight: '0px'
  },
  header: {
    backgroundColor: '#babdb3',
    maxWidth: '100%'
  },
  avatar: {
    width: '75px',
    height: '75px'
  },
  content: {
    marginTop: '100px'
  },
  root: {
    color: 'red'
  },
  backArrow: {
    position: 'absolute',
    left: '20px',
    backgroundColor: 'black',
    color: 'white',
    '&:hover': {
      backgroundColor: 'black',
      color: 'white',      
    }
  },
  svg: {
    width: '0.5em',
    height: '0.5em'
  }
}))
const Home = () => {
  const [step, setStep] = useState(0)
  const [showOtpBox, setShowOtpBox] = useState(false)
  const [registrationErrors, setRegistrationErrors] = useState({
    email: '',
    password: '',
    phoneNo: '',
  })
  const [products, setProducts] = useState([])
  const [initialDesign, setInitialDesign] = useState('')
  const classes = useStyle();

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    axios.get(`${baseURL}/products`)
      .then(response => {
        console.log({ response });
        setProducts(response.data.products)
      })
      .catch(err => {
        console.log({ err });
      })
  };
  const nextStep = () => {
    if (showOtpBox) {
      setShowOtpBox(false)
    }

    setStep( step + 1 );
  }
  const prevStep = () => setStep( step - 1);
  
  const registerVendor = (data) => {
    console.log({ data });
    axios.post(`${process.env.REACT_APP_SERVER_URL}/api/v1/auth/sign-up`, { data }).then(response => {
      localStorage.setItem('phoneNoForOTP', data.phoneNo);
      setShowOtpBox(true)
    }).catch(error => {
      console.log({error});
      let err = error.response.data.message;
      if (error.response.data.name === 'object') {
        err = JSON.parse(error.response.data.message);
      }
      if(typeof err === 'string'){
        setRegistrationErrors({ phoneNo: '', email: '', message: err })
      } else {
        setRegistrationErrors({phoneNo: err.phoneNo, email: err.email , message: '' })
      }
    })
  }

  const exportBase64File = (file) => {
    setInitialDesign(file)
    localStorage.setItem('initialDesign', file)
  }

  const createStore = (data) => {
    console.log({ data });

    axios.post(`${baseURL}/store`, { data })
      .then(response => {
        console.log({ response });
      })
      .catch(err => {
        console.log('err', err);
      })
  }

  const productSelectionCompleted = selectedVariants => {
    console.log({selectedVariants});
  }
  const yieldStep = () => {
    switch (step) {
      case 1:
        return (
          <Products 
            products={products} 
            initialDesign={initialDesign} 
            productSelectionCompleted={productSelectionCompleted}
          />
        )
      case 2: 
      if (showOtpBox) {
        return <Otp nextStep={nextStep}  />
      }
        return <SignUp registerVendor={registerVendor} registrationErrors={registrationErrors} />
      case 3:
        return <StoreForm createStore={createStore} />
      default:
        return <Editor nextStep={nextStep} exportBase64={exportBase64File}/>
    }
  }
  return (
    <Container className={classes.fluid}>
      <Grid className={classes.header} justifyContent='center' alignItems='center' container>
        {step > 0  && <IconButton className={classes.backArrow}  aria-label='back' onClick={prevStep}>
          <ArrowBackIosIcon className={classes.svg} />
        </IconButton>}
        <Avatar src={Logo} className={classes.avatar} />
      </Grid>
      <Grid container className={classes.content}>
        <Grid container  justifyContent='center' alignItems='center'>
          <Grid item xs={6}>
            <Stepper activeStep={step}>
              {[1, 2, 3, 4].map((label) => (
                <Step key={label}>
                    <StepLabel />
                </Step>
              ))}
            </Stepper>
          </Grid>
        </Grid>
        {yieldStep()}

      </Grid>
    </Container>
  )
}

export { Home as default }