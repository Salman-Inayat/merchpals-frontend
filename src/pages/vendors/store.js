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
} from '@mui/material';
import axios from 'axios';
import Logo from '../../assets/images/logo.png';
import { makeStyles } from '@mui/styles';
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
    fontWeight: '500',
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
  const isDesktop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const themeClasses = themeStyles();

  const [snackBarToggle, setSnackBarToggle] = useState({
    visible: false,
    type: 'success',
    message: 'Copied to clipboard',
  });

  useEffect(() => {
    fetchStore();
  }, []);

  const fetchStore = () => {
    axios
      .get(`${baseURL}/store`, {
        headers: {
          Authorization: localStorage.getItem('MERCHPAL_AUTH_TOKEN'),
        },
      })
      .then(response => {
        // console.log('sotre ', { store: response.data.store });
        const store = response.data.store;
        setStoreURL(`${process.env.REACT_APP_URL}/${store.slug}`);
        setStore(store);
        dispatch(saveThemeColor({ themeColor: store.themeColor }));
      })
      .catch(err => {
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
  return store ? (
    <LoggedInVendor>
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
          <Grid container spacing={isMobile ? 2 : 10} mt={1} className={classes.productsContainer}>
            {store.vendorProductIds?.map((product, i) => {
              return (
                <Grid item md={4} xs={6} key={`VendorStoreProductCard-${i}`}>
                  <VendorStoreProductCard
                    product={product}
                    design={store.design}
                    vendorName={store.name}
                  />
                </Grid>
              );
            })}
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
    </LoggedInVendor>
  ) : null;
};

export { VendorStore as default };
