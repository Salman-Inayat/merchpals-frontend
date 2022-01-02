import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  Box,
  Typography,
  TextField,
  Button,
} from '@mui/material';
import axios from 'axios';
import Logo from '../../assets/images/logo.png';
import { makeStyles } from '@mui/styles';
import { baseURL } from '../../configs/const';
import VendorStoreProductCard from '../../components/vendorStoreProductCard';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const useStyle = makeStyles(() => ({
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

const VendorStore = () => {
  const classes = useStyle();

  const [store, setStore] = useState({
    name: '',
    coverAvatar: '',
    logo: '',
    products: [],
  });

  const [storeURL, setStoreURL] = useState(
    'http://localhost:3000/store/61ceb5291b1b68fe90827f64',
  );

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
                <VendorStoreProductCard product={product} />
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
          label="Copy Store Link"
          defaultValue={storeURL}
          InputProps={{
            readOnly: true,
            endAdornment: (
              <Button onClick={() => navigator.clipboard.writeText(storeURL)}>
                <ContentCopyIcon color="secondary" />
              </Button>
            ),
          }}
          style={{ width: '50%' }}
        />
      </Grid>
    </Grid>
  );
};

export { VendorStore as default };
