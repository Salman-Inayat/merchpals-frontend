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
import BackLong from '../assets/images/back-long.png';
import BackTee from '../assets/images/back-tee.png';
import BackHoodie from '../assets/images/Back-hoodie.png';

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
  const backDesign = product?.designId?.backDesign?.designImages[1]?.imageUrl;
  const frontDesign =
    product?.designId?.frontDesign?.designImages[4]?.imageUrl ||
    product?.designId?.backDesign?.designImages[1]?.imageUrl;

  const [designImage, setDesignImage] = useState(frontDesign);
  const [backDesignImage, setBackDesignImage] = useState(backDesign);
  const [frontChange, setFrontChange] = useState(false);

  const [productImage, setProductImage] = useState();
  const [iphoneDesignImage, setIphoneDesignImage] = useState(
    product?.designId?.frontDesign?.designImages[3]?.imageUrl ||
      product?.designId?.backDesign?.designImages[1]?.imageUrl,
  );

  useEffect(() => {
    if (product) {
      const colorsArr = product.productMappings.map(c => c.color);
      const formattedProduct = {
        colors: [...new Map(colorsArr.map(item => [item['value'], item])).values()],
      };
      setColor(formattedProduct.colors.length);
      setProductImage(product.image);
    }
  }, [product]);

  return (
    <>
      <Card variant="outlined" className={classes.card}>
        <CardMedia
          component="img"
          image={product.name === 'Case' ? '/assets/img/FINALCASE.png' : productImage}
          className={classes.productImage}
          alt="green iguana"
          onMouseEnter={() => {
            console.log('call');
            if (backDesign && frontDesign) {
              product.name !== 'Case' &&
                product.name !== 'Mug' &&
                product.name !== 'Poster' &&
                (setFrontChange(true),
                product.slug === 'hoodie'
                  ? setProductImage(BackHoodie)
                  : product.slug === 'longsleeve'
                  ? setProductImage(BackLong)
                  : setProductImage(BackTee));
            }
          }}
          onMouseLeave={() => {
            if (backDesign && frontDesign) {
              product.name !== 'Case' &&
                product.name !== 'Mug' &&
                product.name !== 'Poster' &&
                (setFrontChange(false), setProductImage(product.image));
            }
          }}
          style={{
            backgroundImage: product.name === 'Case' && `url(${iphoneDesignImage})`,
            backgroundSize: product.name === 'Case' && '37% 80%',
          }}
        />
        {product?.designId && product.name !== 'Case' && (
          <img
            src={frontChange ? (backDesign ? backDesign : frontDesign) : frontDesign}
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
            onMouseEnter={() => {
              console.log('call');
              if (backDesign && frontDesign) {
                product.name !== 'Case' &&
                  product.name !== 'Mug' &&
                  product.name !== 'Poster' &&
                  (setFrontChange(true),
                  product.slug === 'hoodie'
                    ? setProductImage(BackHoodie)
                    : product.slug === 'longsleeve'
                    ? setProductImage(BackLong)
                    : setProductImage(BackTee));
              }
            }}
            onMouseLeave={() => {
              if (backDesign && frontDesign) {
                product.name !== 'Case' &&
                  product.name !== 'Mug' &&
                  product.name !== 'Poster' &&
                  (setFrontChange(false), setProductImage(product.image));
              }
            }}
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
          {`${product.slug === 'longsleeve' ? 'Long' : product.name} // ${vendorName}`}
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
      <div hidden>
        <img src={backDesign} />
        <img src={BackLong} />
        <img src={BackTee} />
        <img src={BackHoodie} />
      </div>
    </>
  );
};

export { VendorStoreProductCard as default };
