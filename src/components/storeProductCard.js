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
    top: '53%',
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
      height: '45px',
      width: '45px',
    },
  },
}));

const StoreProductCard = ({ product, storeUrl, storeName }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [color, setColor] = useState();
  const frontDesign =
    product?.designId?.frontDesign?.designImages[4]?.imageUrl ||
    product?.designId?.backDesign?.designImages[1]?.imageUrl;
  const backDesign = product?.designId?.backDesign?.designImages[1]?.imageUrl;
  const [designImage, setDesignImage] = useState(frontDesign);
  const [productDesign, setProductDesign] = useState(product.image);
  const [designChange, setDesignChange] = useState(false);
  const [iphoneDesignImage, setIphoneDesignImage] = useState(
    product?.designId?.frontDesign?.designImages[3]?.imageUrl ||
      product?.designId?.backDesign?.designImages[3]?.imageUrl,
  );
  // const [iphoneDesignImage, setIphoneDesignImage] = useState(
  //   product.designId.frontDesign.designImages[3].imageUrl,
  // );
  const exploreProduct = () => {
    navigate({
      pathname: `/store/${storeUrl}/products/${product.vendorProductId}`,
    });
  };

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
    <Box className={classes.container} onClick={exploreProduct}>
      <Card variant="outlined" className={classes.card}>
        <CardMedia
          component="img"
          image={product.name === 'Case' ? '/assets/img/FINALCASE.png' : productDesign}
          alt="green iguana"
          className={classes.productImage}
          style={{
            backgroundImage: product.name === 'Case' && `url(${iphoneDesignImage})`,
            backgroundSize: '37% 80%',
          }}
          onMouseOver={() => {
            console.log('call');
            if (
              product?.designId?.backDesign?.designImages[1]?.imageUrl &&
              product?.designId?.frontDesign?.designImages[4]?.imageUrl
            ) {
              product.name !== 'Case' &&
                product.name !== 'Mug' &&
                product.name !== 'Poster' &&
                (setDesignChange(true),
                product.slug === 'hoodie'
                  ? setProductDesign(BackHoodie)
                  : product.slug === 'longsleeve'
                  ? setProductDesign(BackLong)
                  : setProductDesign(BackTee));
            }
          }}
          onMouseLeave={() => {
            if (
              product?.designId?.frontDesign?.designImages[4]?.imageUrl &&
              product?.designId?.backDesign?.designImages[1]?.imageUrl
            ) {
              product.name !== 'Case' &&
                product.name !== 'Mug' &&
                product.name !== 'Poster' &&
                (setDesignChange(false), setProductDesign(product.image));
            }
          }}
        />
        {product.name !== 'Case' && product?.designId && (
          <img
            src={designChange ? (backDesign ? backDesign : designImage) : designImage}
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
            onMouseOver={() => {
              console.log('call');
              if (
                product?.designId?.backDesign?.designImages[1]?.imageUrl &&
                product?.designId?.frontDesign?.designImages[4]?.imageUrl
              ) {
                product.name !== 'Case' &&
                  product.name !== 'Mug' &&
                  product.name !== 'Poster' &&
                  (setDesignChange(true),
                  product.slug === 'hoodie'
                    ? setProductDesign(BackHoodie)
                    : product.slug === 'longsleeve'
                    ? setProductDesign(BackLong)
                    : setProductDesign(BackTee));
              }
            }}
            onMouseLeave={() => {
              if (
                product?.designId?.backDesign?.designImages[1]?.imageUrl &&
                product?.designId?.frontDesign?.designImages[4]?.imageUrl
              ) {
                product.name !== 'Case' &&
                  product.name !== 'Mug' &&
                  product.name !== 'Poster' &&
                  (setDesignChange(false), setProductDesign(product.image));
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
          {`${product.slug === 'longsleeve' ? 'Long' : product.name} // ${storeName}`}
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
      <div hidden>
        <img src={backDesign} />
        <img src={BackLong} />
        <img src={BackTee} />
        <img src={BackHoodie} />
      </div>
    </Box>
  );
};

export { StoreProductCard as default };
