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
  productImage: {
    height: '100%',
  },
  container: {
    padding: '30px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      padding: '10px',
    },
  },
  button: {
    backgroundColor: '#116DFF',
    marginTop: '20px',
  },
  productName: {
    color: '#0097a7',
    width: '90%',
    margin: 'auto',
    fontWeight: '500',
  },
}));

const StoreProductCard = ({ product, storeUrl }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const exploreProduct = () => {
    navigate({ pathname: `/store/${storeUrl}/products/${product.productId}` });
  };

  return (
    <Box className={classes.container}>
      <Typography
        gutterBottom
        variant="h4"
        component="div"
        align="center"
        className={classes.productName}
      >
        {product.name}
      </Typography>
      <Card variant="outlined" className={classes.card}>
        <CardMedia
          component="img"
          image={`${product.image}`}
          alt="green iguana"
          className={classes.productImage}
        />
      </Card>
      <Button
        size="medium"
        variant="contained"
        onClick={exploreProduct}
        className={classes.button}
      >
        Explore
      </Button>
    </Box>
  );
};

export { StoreProductCard as default };
