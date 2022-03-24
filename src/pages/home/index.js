import React, { useEffect, useState } from 'react';
import { Container, Grid, Avatar, Stepper, Step, StepLabel, IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import axios from 'axios';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Logo from '../../assets/images/Merchpals-logo.png';
import { makeStyles } from '@mui/styles';
import { Editor, Products, SignUp, StoreForm, Otp, WelcomeMessage } from './steps';
import { baseURL, dataURLtoFile } from '../../configs/const';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../../store/redux/actions/product';
import { registerVendor } from '../../store/redux/actions/auth';
import { clearDesign } from '../../store/redux/actions/design';
import { clearCanvas } from '../../store/redux/actions/canvas';
import Tick from '../../assets/images/tick.png';
import store from '../../store';

const useStyle = makeStyles(theme => ({
  fluid: {
    maxWidth: '100%',
    backgroundColor: '#e7e9eb',
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
    backgroundColor: '#e7e9eb',
    minHeight: '95vh',
    paddingBottom: '2rem',
    // marginTop: '16px',
  },
  root: {
    color: 'red',
  },
  backArrow: {
    // position: 'absolute',
    // left: '20px',
    marginLeft: '10%',
    [theme.breakpoints.down('sm')]: {
      marginLeft: '15%',
    },
  },
  svg: {
    width: '0.7em',
    height: '0.7em',
    color: '#116DFF',
  },
  logo: {
    display: 'flex',
    justifyContent: 'flex-start',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
    },
  },
  muistep: {
    [theme.breakpoints.down('sm')]: {
      paddingLeft: '0px !important',
    },
  },
}));
const Home = () => {
  const designData = useSelector(state => state.design.design);
  const [step, setStep] = useState(0);
  const [showOtpBox, setShowOtpBox] = useState(false);
  const [selectedVariants, setSelectedVariants] = useState([]);
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);
  const [createStoreError, setCreateStoreError] = useState(false);
  // const [phoneNo, setPhoneNo] = useState('');
  const [storeURL, setStoreURL] = useState('');
  // const [canvasJSON, setCanvasJSON] = useState('');

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

    // In advance versions  of browsers instead of our provided message a default message from browsers
    // will be displayed as alert saying 'Changes that you made may not be saved.'

    // if (process.env.REACT_APP_ENV !== 'development') {
    window.onbeforeunload = showAlert;
    // }
  }, []);

  const showAlert = () => 'Are you sure you want to leave?';

  // useEffect(() => {
  //   setCanvasJSON(designJSON.json);
  // }, [designJSON]);

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

  const handleEmptyLogo = data => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    var img = new Image();
    img.src = Tick;
    img.onload = function () {
      ctx.drawImage(img, 0, 0);
    };

    new Promise(resolve => {
      canvas.toBlob(
        blob => {
          blob.name = 'image.jpg';
          data.logo = blob;
          resolve(data);
        },
        'image/jpeg',
        1,
      );

      canvas.remove();
    });

    return data;
  };

  const handleEmptyCoverAvatar = data => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    var img = new Image();
    img.src = Tick;
    img.onload = function () {
      ctx.drawImage(img, 0, 0);
    };

    canvas.toBlob(
      blob => {
        blob.name = 'image.jpg';
        data.coverAvatar = blob;
      },
      'image/jpeg',
      1,
    );

    console.log('Cover Avatar: ', data);

    canvas.remove();
    return data;
  };

  const postDataToURL = async (url, data) => {
    axios
      .put(url, data, {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const createStore = data => {
    if (data.logo === '') {
      data = handleEmptyLogo(data);
    }

    if (data.coverAvatar === '') {
      data = handleEmptyCoverAvatar(data);
    }

    const storeData = {
      name: data.name,
      facebook: data.facebook,
      instagram: data.instagram,
      twitter: data.twitter,
      products: JSON.stringify([...selectedVariants]),
      themeColor: data.themeColor,
      designName: designData?.front?.designName || designData?.back?.designName,
      canvasModes: {
        front: designData?.front != null ? true : false,
        back: designData?.back != null ? true : false,
      },
      shapes: {
        front: store.getState().canvas.frontShape,
        back: store.getState().canvas.backShape,
      },
      mobileBackgroundImage: {
        front: store.getState().canvas?.frontMobileBackgroundImage,
        back: store.getState().canvas?.backMobileBackgroundImage,
      },
    };

    const frontJSONBlob = new Blob([JSON.stringify(designData?.front?.designJson || '')], {
      type: 'application/json',
    });

    const backJSONBlob = new Blob([JSON.stringify(designData?.back?.designJson || '')], {
      type: 'application/json',
    });
    console.log('store data', storeData);
    axios
      .post(`${baseURL}/store`, storeData, {
        headers: {
          Authorization: localStorage.getItem('MERCHPAL_AUTH_TOKEN'),
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        localStorage.removeItem('design');
        localStorage.removeItem('selectedVariants');

        setStoreURL(response.data.data.store.slug);

        const urls = response.data.data.urls;

        const storeLogo = urls[0].imageUrl;
        const storeCoverAvatar = urls[1].imageUrl;
        postDataToURL(storeLogo, data.logo);
        postDataToURL(storeCoverAvatar, data.coverAvatar);
        console.log('mode', designData.front, designData);
        if (designData?.front != null && designData?.back != null) {
          console.log('front call');
          const frontDesignVariant1 = urls[2].imageUrl;
          const frontDesignVariant2 = urls[3].imageUrl;
          const frontDesignVariant3 = urls[4].imageUrl;
          const frontDesignVariant4 = urls[5].imageUrl;
          const frontDesignVariant5 = urls[6].imageUrl;
          const frontDesignJson = urls[7].imageUrl;
          const backDesignVariant1 = urls[8].imageUrl;
          const backDesignVariant2 = urls[9].imageUrl;
          const backDesignJson = urls[10].imageUrl;
          postDataToURL(
            frontDesignVariant1,
            dataURLtoFile(
              designData?.front?.designImages[0]?.data || '',
              `${designData?.front?.designImages[0]?.name || ''}.png`,
            ),
          );
          postDataToURL(
            frontDesignVariant2,
            dataURLtoFile(
              designData?.front?.designImages[1]?.data || '',
              `${designData?.front?.designImages[1]?.name || ''}.png`,
            ),
          );
          postDataToURL(
            frontDesignVariant3,
            dataURLtoFile(
              designData?.front?.designImages[2]?.data || '',
              `${designData?.front?.designImages[2]?.name || ''}.png`,
            ),
          );
          postDataToURL(
            frontDesignVariant4,
            dataURLtoFile(
              designData?.front?.designImages[3]?.data || '',
              `${designData?.front?.designImages[3]?.name || ''}.png`,
            ),
          );
          postDataToURL(
            frontDesignVariant5,
            dataURLtoFile(
              designData?.front?.designImages[4]?.data || '',
              `${designData?.front?.designImages[4]?.name || ''}.png`,
            ),
          );
          postDataToURL(
            backDesignVariant1,
            dataURLtoFile(
              designData?.back?.designImages[1]?.data || '',
              `${designData?.back?.designImages[1]?.name || ''}.png`,
            ),
          );

          postDataToURL(
            backDesignVariant2,
            dataURLtoFile(
              designData?.back?.designImages[4]?.data || '',
              `${designData?.back?.designImages[4]?.name || ''}.png`,
            ),
          );

          postDataToURL(frontDesignJson, frontJSONBlob);
          postDataToURL(backDesignJson, backJSONBlob);
        } else if (designData?.back != null && designData?.front == null) {
          const frontDesignVariant1 = urls[2].imageUrl;
          const frontDesignVariant2 = urls[3].imageUrl;
          const frontDesignVariant3 = urls[4].imageUrl;

          const backDesignVariant1 = urls[5].imageUrl;
          const backDesignVariant2 = urls[6].imageUrl;
          const backDesignJson = urls[7].imageUrl;

          postDataToURL(
            frontDesignVariant1,
            dataURLtoFile(
              designData?.back?.designImages[0]?.data || '',
              `${designData?.back?.designImages[0]?.name || ''}.png`,
            ),
          );

          postDataToURL(
            frontDesignVariant2,
            dataURLtoFile(
              designData?.back?.designImages[2]?.data || '',
              `${designData?.back?.designImages[2]?.name || ''}.png`,
            ),
          );
          postDataToURL(
            frontDesignVariant3,
            dataURLtoFile(
              designData?.back?.designImages[3]?.data || '',
              `${designData?.back?.designImages[3]?.name || ''}.png`,
            ),
          );

          postDataToURL(
            backDesignVariant1,
            dataURLtoFile(
              designData?.back?.designImages[1]?.data || '',
              `${designData?.back?.designImages[1]?.name || ''}.png`,
            ),
          );

          postDataToURL(
            backDesignVariant2,
            dataURLtoFile(
              designData?.back?.designImages[4]?.data || '',
              `${designData?.back?.designImages[4]?.name || ''}.png`,
            ),
          );

          postDataToURL(backDesignJson, backJSONBlob);
        } else {
          const frontDesignVariant1 = urls[2].imageUrl;
          const frontDesignVariant2 = urls[3].imageUrl;
          const frontDesignVariant3 = urls[4].imageUrl;
          const frontDesignVariant4 = urls[5].imageUrl;
          const frontDesignVariant5 = urls[6].imageUrl;
          const frontDesignJson = urls[7].imageUrl;

          postDataToURL(
            frontDesignVariant1,
            dataURLtoFile(
              designData?.front?.designImages[0]?.data || '',
              `${designData?.front?.designImages[0]?.name || ''}.png`,
            ),
          );
          postDataToURL(
            frontDesignVariant2,
            dataURLtoFile(
              designData?.front?.designImages[1]?.data || '',
              `${designData?.front?.designImages[1]?.name || ''}.png`,
            ),
          );
          postDataToURL(
            frontDesignVariant3,
            dataURLtoFile(
              designData?.front?.designImages[2]?.data || '',
              `${designData?.front?.designImages[2]?.name || ''}.png`,
            ),
          );
          postDataToURL(
            frontDesignVariant4,
            dataURLtoFile(
              designData?.front?.designImages[3]?.data || '',
              `${designData?.front?.designImages[3]?.name || ''}.png`,
            ),
          );
          postDataToURL(
            frontDesignVariant5,
            dataURLtoFile(
              designData?.front?.designImages[4]?.data || '',
              `${designData?.front?.designImages[4]?.name || ''}.png`,
            ),
          );
          postDataToURL(frontDesignJson, frontJSONBlob);
        }

        nextStep();
        setShowWelcomeMessage(true);
        dispatch(clearDesign());
        dispatch(clearCanvas());
      })
      .catch(err => {
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
        return <StoreForm createStore={createStore} createStoreError={createStoreError} />;
      default:
        if (showWelcomeMessage) {
          return <WelcomeMessage storeURL={storeURL} />;
        }
        return <Editor nextStep={nextStep} design={designData} />;
    }
  };
  return (
    <Container className={classes.fluid}>
      {step < 4 && (
        <Grid
          className={classes.header}
          justifyContent="space-between"
          alignItems="center"
          container
        >
          <Grid xs={1} md={1} sm={1} item alignItems="center">
            {step > 0 && step < 3 && (
              <IconButton className={classes.backArrow} aria-label="back" onClick={prevStep}>
                <ArrowBackIosIcon className={classes.svg} />
              </IconButton>
            )}
          </Grid>
          <Grid xs={6} md={7} sm={6} item className={classes.logo}>
            {/* <Grid justifyContent="center" alignItems="center" container> */}
            <Avatar src={Logo} className={classes.avatar} />
            {/* </Grid> */}
          </Grid>

          <Grid item xs={5} md={4} sm={5}>
            <Stepper activeStep={step}>
              {[1, 2, 3, 4].map(label => (
                <Step key={label} className={classes.muistep}>
                  <StepLabel />
                </Step>
              ))}
            </Stepper>
          </Grid>
        </Grid>
      )}
      <Grid container className={classes.content}>
        {yieldStep()}
      </Grid>
    </Container>
  );
};

export default Home;
