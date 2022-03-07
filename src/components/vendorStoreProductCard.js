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
    borderRadius: '0px',
    backgroundColor: '#F6F0ED',
    boxShadow: '0 0 18px #BDBCBC',
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
      height: '70px',
      width: '70px',
    },
  },
  poster: {
    height: '190px',
    width: '190px',
    borderRadius: '5px',
    top: '53%',
    [theme.breakpoints.down('sm')]: {
      height: '120px',
      width: '120px',
      top: '56%',
    },
  },
  phoneCase: {
    height: '100px',
    width: '100px',
    top: '52%',
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

const VendorStoreProductCard = ({ product, design, vendorName }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [color, setColor] = useState();

  useEffect(() => {
    if (product) {
      const colorsArr = product.productMappings.map(c => c.color);
      const formattedProduct = {
        colors: [...new Map(colorsArr.map(item => [item['value'], item])).values()],
      };
      setColor(formattedProduct.colors.length);
    }
  }, [product]);

  return (
    <>
      <Card variant="outlined" className={classes.card}>
        <CardMedia
          component="img"
          image={`${product.image}`}
          className={classes.productImage}
          alt="green iguana"
        />
        {product?.designId && (
          <img
            src={product.designId.designImages[4].imageUrl}
            className={[
              classes.design,
              product.name === 'Poster'
                ? classes.poster
                : product.name === 'Case'
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
          {`${product.name} // ${vendorName}`}
        </Typography>
        <Typography
          gutterBottom
          align="center"
          variant="h5"
          component="div"
          className={classes.productTextcolor}
        >
          {color > 1 ? `${color} colors` : `${color} color`}
        </Typography>
        <Typography gutterBottom align="center" variant="h5" component="div">
          {`$${product.price}`}
        </Typography>
      </Grid>
    </>
  );
};

export { VendorStoreProductCard as default };
