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

const useStyles = makeStyles(() => ({
  card: {
    padding: '30px',
  },
  productName: {
    fontWeight: '500',
    fontSize: '1.4rem',
  },
  cardContent: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  design: {
    position: 'absolute'
  }
}));

const VendorStoreProductCard = ({ product, design }) => {
  const classes = useStyles();
  const navigate = useNavigate();
console.log({design});
  const exploreProduct = () => {
    navigate({ pathname: `/products/${product._id}` });
  };

  return (
    <Card variant="outlined" className={classes.card}>
      <CardContent className={classes.cardContent}>
        <CardMedia
          component="img"
          height="250"
          image={`${product.image}`}
          alt="green iguana"
        />
        {design && <Avatar src={design} className={classes.design}/>}
      </CardContent>
      <Typography
        gutterBottom
        variant="h4"
        component="div"
        className={classes.productName}
      >
        {product.name}
      </Typography>
    </Card>
  );
};

export { VendorStoreProductCard as default };
