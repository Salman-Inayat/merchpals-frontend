import React, { useEffect, useState } from 'react';
import { Container, Grid, Avatar, Stepper, Step, StepLabel, IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import axios from 'axios';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Logo from '../../assets/images/Merchpals-logo.png';
import { makeStyles } from '@mui/styles';
import { Editor, Products, SignUp, StoreForm, Otp, WelcomeMessage } from './steps';
import { baseURL } from '../../configs/const';
import { connect } from 'react-redux';
import { useSelector } from 'react-redux';

const useStyle = makeStyles(() => ({
  fluid: {
    maxWidth: '100%',
    paddingLeft: '0px',
    paddingRight: '0px',
  },
  header: {
    backgroundColor: '#fff',
    maxWidth: '100%',
    boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
  },
  avatar: {
    width: '150px',
    height: '50px',
  },
  content: {
    marginTop: '16px',
  },
  root: {
    color: 'red',
  },
  backArrow: {
    position: 'absolute',
    left: '20px',
    backgroundColor: 'black',
    color: 'white',
    '&:hover': {
      backgroundColor: 'black',
      color: 'white',
    },
  },
  svg: {
    width: '0.5em',
    height: '0.5em',
  },
}));
const Home = () => {
  const designData = useSelector(state => state.design.design);
  const [step, setStep] = useState(0);
  const [showOtpBox, setShowOtpBox] = useState(false);
  const [registrationErrors, setRegistrationErrors] = useState({
    email: '',
    password: '',
    phoneNo: '',
  });
  const [products, setProducts] = useState([]);
  const [selectedVariants, setSelectedVariants] = useState([]);
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);
  const [createStoreError, setCreateStoreError] = useState(false);
  const [phoneNo, setPhoneNo] = useState('');
  const [storeURL, setStoreURL] = useState('');
  const classes = useStyle();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('MERCHPAL_AUTH_TOKEN')) {
      navigate('/vendor/store', { replace: true });
    } else {
      fetchProducts();
    }
  }, []);

  const fetchProducts = async () => {
    axios
      .get(`${baseURL}/products`)
      .then(response => {
        console.log({ response }, 'Calling products');
        setProducts(response.data.products);
      })
      .catch(err => {
        console.log({ err });
      });
  };
  const nextStep = () => {
    if (showOtpBox) {
      setShowOtpBox(false);
    }

    setStep(step + 1);
  };
  const prevStep = () => setStep(step - 1);

  const registerVendor = data => {
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/api/v1/auth/sign-up`, { data })
      .then(response => {
        console.log({ response });
        localStorage.setItem('MERCHPAL_AUTH_TOKEN', response.data.token);
        localStorage.setItem('phoneNoForOTP', data.phoneNo);
        // nextStep();
        setShowOtpBox(true);
        setPhoneNo(data.phoneNo);
      })
      .catch(error => {
        console.log({ error });
        let err = error.response.data.message;
        if (error.response.data.name === 'object') {
          err = JSON.parse(error.response.data.message);
        }
        if (typeof err === 'string') {
          setRegistrationErrors({ phoneNo: '', email: '', message: err });
        } else {
          setRegistrationErrors({
            phoneNo: err.phoneNo,
            email: err.email,
            message: '',
          });
        }
      });
  };

  const createStore = data => {
    let store = new FormData();
    store.append('name', data.name);
    store.append('facebook', data.facebook);
    store.append('instagram', data.instagram);
    store.append('twitter', data.twitter);
    store.append('logo', data.logo);
    store.append('coverAvatar', data.coverAvatar);
    store.append('design', JSON.stringify(designData));
    store.append('products', JSON.stringify([...selectedVariants]));
    store.append('themeColor', data.themeColor);

    axios
      .post(`${baseURL}/store`, store, {
        headers: {
          Authorization: localStorage.getItem('MERCHPAL_AUTH_TOKEN'),
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => {
        console.log({ createstore: response });
        localStorage.removeItem('design');
        localStorage.removeItem('selectedVariants');

        setStoreURL(response.data.store.slug);
        setShowWelcomeMessage(true);
      })
      .catch(err => {
        console.log('err', err);
        setCreateStoreError(true);
      });
  };

  const productSelectionCompleted = data => {
    setSelectedVariants(data);
    nextStep();
  };
  const yieldStep = () => {
    switch (step) {
      case 1:
        return (
          <Products
            products={products}
            design={localStorage.getItem('design')}
            productSelectionCompleted={productSelectionCompleted}
          />
        );
      case 2:
        if (showOtpBox) {
          return <Otp nextStep={nextStep} phoneNo={phoneNo} />;
        }
        return <SignUp registerVendor={registerVendor} registrationErrors={registrationErrors} />;
      case 3:
        if (showWelcomeMessage) {
          return <WelcomeMessage storeURL={storeURL} />;
        }
        return <StoreForm createStore={createStore} createStoreError={createStoreError} />;
      default:
        return <Editor nextStep={nextStep} design={designData} />;
    }
  };
  return (
    <Container className={classes.fluid}>
      <Grid className={classes.header} justifyContent="center" alignItems="center" container>
        {step > 0 && (
          <IconButton className={classes.backArrow} aria-label="back" onClick={prevStep}>
            <ArrowBackIosIcon className={classes.svg} />
          </IconButton>
        )}
        <Avatar src={Logo} className={classes.avatar} />
      </Grid>
      <Grid container className={classes.content}>
        <Grid container justifyContent="center" alignItems="center">
          <Grid item md={6} xs={12}>
            <Stepper activeStep={step}>
              {[1, 2, 3, 4].map(label => (
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
  );
};

export default connect()(Home);
