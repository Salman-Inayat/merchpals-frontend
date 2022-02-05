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
    cursor: 'pointer',
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
      height: '60px',
      width: '60px',
    },
  },
  poster: {
    height: '140px',
    width: '140px',
    borderRadius: '5px',
    [theme.breakpoints.down('sm')]: {
      height: '90px',
      width: '90px',
    },
  },
  phoneCase: {
    height: '80px',
    width: '80px',
    [theme.breakpoints.down('sm')]: {
      height: '50px',
      width: '50px',
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
}));

const StoreProductCard = ({ product, storeUrl }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const exploreProduct = () => {
    navigate({
      pathname: `/store/${storeUrl}/products/${product.vendorProductId}`,
    });
  };

  return (
    <Box className={classes.container} onClick={exploreProduct}>
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
      {/* <Button
        size="medium"
        variant="contained"
        onClick={exploreProduct}
        className={classes.button}
      >
        Explore
      </Button> */}
    </Box>
  );
};

export { StoreProductCard as default };
