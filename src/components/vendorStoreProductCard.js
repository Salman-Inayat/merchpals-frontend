import { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Avatar,
  Typography,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Button,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  card: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productName: {
    // color: '#0097a7',
    width: '90%',
    margin: 'auto',
    fontWeight: '500',
  },
  design: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    height: '100px',
    width: '100px',
    [theme.breakpoints.down('sm')]: {
      height: '70px',
      width: '70px',
    },
  },
  poster: {
    height: '190px',
    width: '190px',
    borderRadius: '5px',
    [theme.breakpoints.down('sm')]: {
      height: '130px',
      width: '130px',
    },
  },
  phoneCase: {
    height: '80px',
    width: '80px',
    [theme.breakpoints.down('sm')]: {
      height: '60px',
      width: '60px',
      top: '52%',
    },
  },
  mug: {
    height: '90px',
    width: '90px',
    top: '55%',
    left: '52%',
    [theme.breakpoints.down('sm')]: {
      height: '60px',
      width: '60px',
    },
  },
  productImage: {
    height: '100%',
  },
}));

const VendorStoreProductCard = ({ product, design }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  console.log({ design });

  return (
    <>
      <Typography
        gutterBottom
        align="center"
        variant="h4"
        component="div"
        className={classes.productName}
      >
        {product.name}
      </Typography>
      <Card variant="outlined" className={classes.card}>
        <CardMedia
          component="img"
          image={`${product.image}`}
          className={classes.productImage}
          alt="green iguana"
        />
        {product?.designId && (
          <img
            src={product.designId.url}
            className={[
              classes.design,
              product.name === 'Poster'
                ? classes.poster
                : product.name === 'Phone Case'
                ? classes.phoneCase
                : product.name === 'Mug'
                ? classes.mug
                : '',
            ].join(' ')}
          />
        )}
      </Card>
    </>
  );
};

export { VendorStoreProductCard as default };
