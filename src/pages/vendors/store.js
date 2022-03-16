import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  Box,
  Typography,
  TextField,
  Avatar,
  Button,
  Alert as MuiAlert,
  Snackbar,
  Stack,
  CircularProgress,
  Backdrop,
} from '@mui/material';
import axios from 'axios';
import Logo from '../../assets/images/logo.png';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';
import { baseURL } from '../../configs/const';
import VendorStoreProductCard from '../../components/vendorStoreProductCard';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useMediaQuery } from 'react-responsive';
import LoggedInVendor from '../../layouts/LoggedInVendor';
import {
  ThemeCustomise,
  ThemeColorCustomise,
  themeStyles,
} from '../../components/themeCustomize/themeStyle';
import { useDispatch, useSelector } from 'react-redux';
import { saveThemeColor } from '../../store/redux/actions/design';
import StoreForm from '../home/steps/StoreForm';
import { stubFalse } from 'lodash';
const useStyle = makeStyles(theme => ({
  coverContainer: {
    position: 'relative',
    height: '50vh',
    [theme.breakpoints.down('sm')]: {
      height: '30vh',
    },
  },
  coverImage: {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    [theme.breakpoints.down('sm')]: {
      height: '30vh',
    },
  },
  logo: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '120px',
    height: '120px',
    borderRadius: '100px',
  },
  storeName: {
    fontSize: '2rem',
    fontWeight: '600',
    textTransform: 'uppercase',
    textDecoration: 'underline',
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1rem',
    },
  },
  productsContainer: {
    padding: '1rem 8rem',
    [theme.breakpoints.down('sm')]: {
      padding: '1rem',
      spacing: '5',
    },
  },
  copyLinkText: {
    width: '50%',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
}));

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const VendorStore = () => {
  const classes = useStyle();
  const dispatch = useDispatch();
  const [store, setStore] = useState({
    name: '',
    coverAvatar: '',
    logo: '',
    products: [],
  });

  const [storeURL, setStoreURL] = useState();
  const [themeClass, setThemeClass] = useState('');
  const [themeColorClass, setThemeColorClass] = useState('');
  const [storeStatus, setStoreStatus] = useState(false);
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const themeClasses = themeStyles();
  const navigate = useNavigate();
  const [snackBarToggle, setSnackBarToggle] = useState({
    visible: false,
    type: 'success',
    message: 'Copied to clipboard',
  });

  useEffect(() => {
    fetchStore();
  }, []);

  const fetchStore = () => {
    handleToggle();
    axios
      .get(`${baseURL}/store`, {
        headers: {
          Authorization: localStorage.getItem('MERCHPAL_AUTH_TOKEN'),
        },
      })
      .then(response => {
        handleClose();
        const store = response.data.store;
        if (store.name) {
          setStoreURL(`${process.env.REACT_APP_URL}/${store.slug}`);
          setStore(store);
          dispatch(saveThemeColor({ themeColor: store.themeColor }));
        }
      })
      .catch(err => {
        handleClose();
        console.log({ err });
      });
  };

  const copyToClipboard = storeURL => {
    const el = document.createElement('textarea');
    el.value = storeURL;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    setSnackBarToggle({
      visible: true,
      type: 'success',
      message: 'Copied to clipboard',
    });
  };

  const handleSnackBarClose = () =>
    setSnackBarToggle({
      ...snackBarToggle,
      visible: false,
    });

  useEffect(() => {
    if (store) {
      const tmpthemeClass = ThemeCustomise(themeClasses, store.themeColor);
      const tmpthemeColorClass = ThemeColorCustomise(themeClasses, store.themeColor);
      setThemeClass(tmpthemeClass);
      setThemeColorClass(tmpthemeColorClass);
    }
  }, [store]);
  const [createStoreError, setCreateStoreError] = useState(false);
  const postDataToURL = (url, data) => {
    axios
      .put(url, data, {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      })
      .then(response => {
        console.log('response post url', response);
      })
      .catch(error => {
        console.log(error);
      });
  };
  const createStore = data => {
    const storeData = {
      name: data.name,
      tiktok: data.Tiktok,
      instagram: data.instagram,
      twitch: data.twitch,
      youtube: data.youtube,
      themeColor: data.themeColor,
    };
    console.log('store dtaa front endn', storeData);
    axios
      .post(`${baseURL}/store/add-store-after`, storeData, {
        headers: {
          Authorization: localStorage.getItem('MERCHPAL_AUTH_TOKEN'),
          'Content-Type': 'application/json',
        },
      })
      .then(async response => {
        console.log('response', response.data.data.store);

        const urls = response.data.data.urls;
        const storeLogo = urls[0].imageUrl;
        const storeCoverAvatar = urls[1].imageUrl;
        postDataToURL(storeLogo, data.logo);
        postDataToURL(storeCoverAvatar, data.coverAvatar);
        navigate('/vendor/create-design');
      })
      .catch(err => {
        setCreateStoreError(true);
      });
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };
  console.log('vendor id', store.vendorProductIds);
  return store ? (
    <LoggedInVendor>
      {store.name ? (
        <Grid container spacing={3} style={{ margin: '0px' }} className={themeClass}>
          <Grid item md={12} xs={12} className={classes.coverContainer}>
            <img src={store.coverAvatar} alt="image" className={classes.coverImage} />
            <img src={store.logo} className={classes.logo} />
          </Grid>
          <Grid item md={12} sm={12} xs={12}>
            <Grid item md={12} display="flex" justifyContent="center">
              <Typography variant="h1" className={classes.storeName}>
                {store.name}&#39;S MERCH STORE
              </Typography>
            </Grid>
            <Grid
              container
              spacing={isMobile ? 2 : 10}
              mt={1}
              className={classes.productsContainer}
            >
              {store.vendorProductIds.length > 0 ? (
                store.vendorProductIds?.map((product, i) => {
                  return (
                    <Grid item md={4} xs={6} key={`VendorStoreProductCard-${i}`}>
                      <VendorStoreProductCard
                        product={product}
                        design={store.design}
                        vendorName={store.name}
                      />
                    </Grid>
                  );
                })
              ) : (
                <Grid
                  item
                  md={12}
                  xs={12}
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  height="30vh"
                >
                  <Typography variant="h3" sx={{ textAlign: 'center' }} mb={4}>
                    Please Create a Product Design
                  </Typography>
                  <Button variant="contained" onClick={() => navigate('/vendor/create-design')}>
                    Create Design
                  </Button>
                </Grid>
              )}
            </Grid>
          </Grid>
          <Grid
            item
            md={12}
            sm={12}
            xs={12}
            m={10}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <TextField
              id="outlined-read-only-input"
              label={!storeURL && 'Copy Store Link'}
              value={storeURL}
              InputProps={{
                readOnly: true,
                endAdornment: (
                  <Button onClick={() => copyToClipboard(storeURL)}>
                    <ContentCopyIcon className={themeColorClass} />
                  </Button>
                ),
                className: themeColorClass,
              }}
              className={classes.copyLinkText}
            />
          </Grid>
          <Snackbar
            open={snackBarToggle.visible}
            autoHideDuration={1000}
            onClose={handleSnackBarClose}
          >
            <Alert severity={snackBarToggle.type}>{snackBarToggle.message}</Alert>
          </Snackbar>
        </Grid>
      ) : open ? (
        ''
      ) : (
        <Grid item md={12} sm={12} xs={12} sx={{ backgroundColor: '#EAE9E5' }}>
          <Typography variant="h4" sx={{ textAlign: 'center' }}>
            Please First Setup Your Store
          </Typography>
          <StoreForm createStore={createStore} createStoreError={createStoreError} />
        </Grid>
      )}
      <Backdrop
        sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </LoggedInVendor>
  ) : null;
};

export { VendorStore as default };