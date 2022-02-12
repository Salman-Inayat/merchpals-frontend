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
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Logo from '../../assets/images/Merchpals-logo.png';
import { makeStyles } from '@mui/styles';
import {
  Editor,
  Products,
  SignUp,
  StoreForm,
  Otp,
  WelcomeMessage,
} from './steps';
import { baseURL } from '../../configs/const';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../../store/redux/actions/product';
import { registerVendor } from '../../store/redux/actions/auth';

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
  const [step, setStep] = useState(0);
  const [showOtpBox, setShowOtpBox] = useState(false);
  const [canvasJSON, setCanvasJSON] = useState('');
  const [selectedVariants, setSelectedVariants] = useState([]);
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);
  const [createStoreError, setCreateStoreError] = useState(false);

  const classes = useStyle();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const designJSON = useSelector(state => state.design);
  const { products } = useSelector(state => state.product);
  const { phoneNo, vendorCreated, registrationErrors } = useSelector(state => state.auth);

  useEffect(() => {
    if (localStorage.getItem('MERCHPAL_AUTH_TOKEN')) {
      navigate('/vendor/store', { replace: true });
    } else {
      dispatch(fetchProducts());
    }
  }, []);

  useEffect(() => {
    setCanvasJSON(designJSON.json);
  }, [designJSON]);

  useEffect(() => {
    if (vendorCreated) {
      setShowOtpBox(true);
    }
  }, [vendorCreated]);

  const nextStep = () => {
    if (showOtpBox) {
      setShowOtpBox(false);
    }

    setStep(step + 1);
  };
  const prevStep = () => setStep(step - 1);

  const createStore = storeData => {
    const designData = {
      base64Image: localStorage.getItem('design'),
      name: 'default',
      canvasJson: canvasJSON,
    };
    const data = {
      storeInfo: {
        name: storeData.name,
        slug: storeData.slug.split(' ').join('-'),
        facebook: storeData.facebook,
        instagram: storeData.instagram,
        twitter: storeData.twitter,
        logo: storeData.logo,
        coverAvatar: storeData.coverAvatar,
        design: JSON.stringify(designData),
        products: JSON.stringify([...selectedVariants]),
        themeColor: storeData.themeColor,
      },
    };

    axios
      .post(`${baseURL}/store`, data, {
        headers: {
          Authorization: localStorage.getItem('MERCHPAL_AUTH_TOKEN'),
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        console.log({ createstore: response });
        localStorage.removeItem('design');
        localStorage.removeItem('selectedVariants');

        setShowWelcomeMessage(true);
        setTimeout(() => {
          setShowWelcomeMessage(false);
          navigate('/vendor/store', { replace: true });
        }, 3500);
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
        return (
          <SignUp
            registerVendor={data => dispatch(registerVendor(data))}
            registrationErrors={registrationErrors}
          />
        );
      case 3:
        if (showWelcomeMessage) {
          return <WelcomeMessage />;
        }
        return <StoreForm createStore={createStore} createStoreError={createStoreError} />;
      default:
        return <Editor nextStep={nextStep} />;
    }
  };
  return (
    <Container className={classes.fluid}>
      <Grid className={classes.header} justifyContent="space-between" alignItems="center" container>
        <Grid xs={4} item>
          <Grid alignItems="center" container>
            {step > 0 && (
              <IconButton className={classes.backArrow} aria-label="back" onClick={prevStep}>
                <ArrowBackIosIcon className={classes.svg} />
              </IconButton>
            )}
          </Grid>
        </Grid>
        <Grid xs={4} item>
          <Grid justifyContent="center" alignItems="center" container>
            <Avatar src={Logo} className={classes.avatar} />
          </Grid>
        </Grid>

        <Grid item xs={4}>
          <Stepper activeStep={step}>
            {[1, 2, 3, 4].map(label => (
              <Step key={label}>
                <StepLabel />
              </Step>
            ))}
          </Stepper>
        </Grid>
      </Grid>
      <Grid container className={classes.content}>
        {yieldStep()}
      </Grid>
    </Container>
  );
};

export default Home;
