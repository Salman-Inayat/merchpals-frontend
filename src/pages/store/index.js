import React, { useEffect, useState } from 'react';
import { Container, Grid, Box, Typography } from '@mui/material';
import axios from 'axios';
import Logo from '../../assets/images/logo.png';
import { makeStyles } from '@mui/styles';
import { baseURL } from '../../configs/const';
import StoreProductCard from '../../components/storeProductCard';

const useStyle = makeStyles(() => ({
  fluid: {
    maxWidth: '100%',
    paddingLeft: '0px',
    paddingRight: '0px',
  },
  header: {
    backgroundColor: '#babdb3',
    maxWidth: '100%',
  },
  avatar: {
    width: '75px',
    height: '75px',
  },
  content: {
    marginTop: '100px',
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
}));

const Store = () => {
  const [products, setProducts] = useState([]);
  const [storeCoverAvatar, setStoreCoverAvatar] = useState();
  const [storeLogo, setStoreLogo] = useState();
  const classes = useStyle();

  const [store, setStore] = useState({
    name: '',
    coverAvatar: '',
    logo: '',
    products: [],
  });

  useEffect(() => {
    fetchStore();
  }, []);

  const fetchStore = () => {
    axios
      .get(`${baseURL}/store/61ceb5291b1b68fe90827f64`)
      .then(response => {
        console.log(response.data.store);
        const store = response.data.store;
        setStore({
          name: store.name,
          coverAvatar: store.coverAvatar,
          logo: store.logo,
          products: store.products,
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
          src={store.coverAvatar}
          alt="image"
          className={classes.coverImage}
        />
        <Typography variant="h1" className={classes.storeName}>
          {store.name}
        </Typography>

        <img src={store.logo} className={classes.logo} />
      </Grid>
      <Grid item md={12} sm={12} xs={12}>
        <Grid container spacing={5} p={5} pt={10}>
          {store.products.map(product => {
            return (
              <Grid item md={4} p={4}>
                <StoreProductCard product={product} />
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </Grid>
  );
};

export { Store as default };
