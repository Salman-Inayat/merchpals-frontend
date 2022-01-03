import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  Box,
  Typography,
  TextField,
  Avatar,
  Button,
} from '@mui/material';
import axios from 'axios';
import Logo from '../../assets/images/logo.png';
import { makeStyles } from '@mui/styles';
import { baseURL } from '../../configs/const';
import VendorStoreProductCard from '../../components/vendorStoreProductCard';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useMediaQuery } from 'react-responsive';

const useStyle = makeStyles(theme => ({
  coverContainer: {
    position: 'relative',
    height: '50vh',
  },
  coverImage: {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  logo: {
    position: 'absolute',
    top: '250px',
    left: '10%',
    width: '120px',
    height: '120px',
    borderRadius: '100px',
  },
  storeName: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: '3rem',
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  productsContainer: {
    padding: '2rem 8rem',
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

const VendorStore = () => {
  const classes = useStyle();

  const [store, setStore] = useState({
    name: '',
    coverAvatar: '',
    logo: '',
    products: [],
  });

  const [storeURL, setStoreURL] = useState();

  const isDesktop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });

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
        console.log({ store: response.data.store });
        const store = response.data.store;
        setStoreURL(`${process.env.REACT_APP_URL}/store/${store.slug}`);
        setStore({
          name: store.name,
          coverAvatar: store.coverAvatar,
          logo: store.logo,
          products: store.products,
          design:
            store.designs && store.designs[0]?.url ? store.designs[0].url : '',
        });
      })
      .catch(err => {
        console.log({ err });
      });
  };

  return (
    <Grid container spacing={3}>
      <Grid item md={12} xs={12} className={classes.coverContainer}>
        <img
          src="https://picsum.photos/seed/picsum/900/400"
          alt="image"
          className={classes.coverImage}
        />
        <Typography variant="h1" className={classes.storeName}>
          {store.name}
        </Typography>

        <img
          src="https://picsum.photos/seed/picsum/400/400"
          className={classes.logo}
        />
      </Grid>
      <Grid item md={12} sm={12} xs={12}>
        <Grid
          container
          spacing={isMobile ? 2 : 10}
          mt={1}
          className={classes.productsContainer}
        >
          {store.products.map(product => {
            return (
              <Grid item md={4} xs={6}>
                <VendorStoreProductCard
                  product={product}
                  design={store.design}
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
              <Button onClick={() => navigator.clipboard.writeText(storeURL)}>
                <ContentCopyIcon color="secondary" />
              </Button>
            ),
          }}
          className={classes.copyLinkText}
        />
      </Grid>
    </Grid>
  );
};

export { VendorStore as default };
