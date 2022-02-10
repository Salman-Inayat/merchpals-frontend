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
  card: {
    borderRadius: '0px',
    backgroundColor: '#F6F0ED',
    boxShadow: '0 0 18px #BDBCBC',
  },
  button: {
    backgroundColor: '#116DFF',
    marginTop: '20px',
  },
  productName: {
    // color: '#0097a7',
    margin: '7px auto 0 auto',
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

const StoreProductCard = ({ product, storeUrl, storeName }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [color, setColor] = useState();
  const exploreProduct = () => {
    navigate({
      pathname: `/store/${storeUrl}/products/${product.vendorProductId}`,
    });
  };
  console.log('data ', product);
  useEffect(() => {
    if (product) {
      const colorsArr = product.productMappings.map(c => c.color);

      const formattedProduct = {
        colors: [...new Map(colorsArr.map(item => [item['id'], item])).values()],
      };
      setColor(formattedProduct.colors.length);
    }
  }, [product]);
  console.log('color', color);
  return (
    <Box className={classes.container} onClick={exploreProduct}>
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
      <Grid className={classes.productName}>
        <Typography
          gutterBottom
          align="center"
          variant="h5"
          component="div"
          className={classes.productTextcolor}
        >
          {`${product.name} // ${storeName}`}
        </Typography>
        <Typography
          gutterBottom
          align="center"
          variant="h5"
          component="div"
          className={classes.productTextcolor}
        >
          {`${color} Colors`}
        </Typography>
        <Typography gutterBottom align="center" variant="h5" component="div">
          {`$${product.price}`}
        </Typography>
      </Grid>
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
