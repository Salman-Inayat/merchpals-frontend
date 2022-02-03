import React, { useEffect, useState } from 'react';
import { Container, Grid, Box, Typography } from '@mui/material';
import axios from 'axios';
import Logo from '../../../assets/images/logo.png';
import { makeStyles } from '@mui/styles';
import { baseURL } from '../../../configs/const';
import StoreProductCard from '../../../components/storeProductCard';
import { useMediaQuery } from 'react-responsive';
import { useParams } from 'react-router-dom';
import { ThemeCustomise } from '../../../components/themeCustomize/themeStyle';
import { useSelector } from 'react-redux';

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
  },
  logo: {
    position: 'absolute',
    top: '250px',
    left: '10%',
    width: '120px',
    height: '120px',
    borderRadius: '100px',
    [theme.breakpoints.down('sm')]: {
      top: '85%',
      left: '10%',
      width: '90px',
      height: '90px',
    },
  },
  storeName: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: '3rem',
    fontWeight: '500',
    textTransform: 'uppercase',
    [theme.breakpoints.down('sm')]: {
      fontSize: '2rem',
    },
  },
  productsContainer: {
    padding: '2rem 8rem',
    [theme.breakpoints.down('sm')]: {
      padding: '1rem',
      spacing: '5',
    },
  },
}));

const Store = () => {
  let themeColor, theme;
  const classes = useStyle();

  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [store, setStore] = useState({
    name: '',
    coverAvatar: '',
    logo: '',
    products: [],
  });
  const { storeUrl } = useParams();

  useEffect(() => {
    fetchStore();
  }, []);

  const fetchStore = () => {
    axios
      .get(`${baseURL}/store/${storeUrl}`)
      .then(response => {
        console.log(response.data.store);
        const store = response.data.store;
        setStore(store);
      })
      .catch(err => {
        console.log({ err });
      });
  };
  theme = useSelector(state => state.design);
  if (theme.themeColor) {
    themeColor = theme.themeColor;
  } else {
    themeColor = store.themeColor;
  }
  const themeClass = ThemeCustomise(themeColor);
  console.log(themeClass);
  return (
    <Grid container spacing={3} className={themeClass}>
      <Grid item md={12} xs={12} className={classes.coverContainer}>
        <img
          src={store.coverAvatar}
          alt="image"
          className={classes.coverImage}
        />
        <Typography variant="h1" className={classes.storeName} align="center">
          {store.name}
        </Typography>

        <img src={store.logo} className={classes.logo} />
      </Grid>
      <Grid item md={12} sm={12} xs={12}>
        <Grid
          container
          spacing={isMobile ? 1 : 10}
          className={`${themeClass} ${classes.productsContainer}`}
        >
          {store.vendorProductIds?.map(product => {
            return (
              <Grid item md={4} xs={6}>
                <StoreProductCard product={product} storeUrl={storeUrl} />
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </Grid>
  );
};

export { Store as default };
