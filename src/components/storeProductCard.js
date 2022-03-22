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
    // padding: '30px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    cursor: 'pointer',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      padding: '4px',
    },
  },
  card: {
    borderRadius: '0px',
    backgroundColor: '#F6F0ED',
    boxShadow: '0 0 18px #BDBCBC',
  },
  borderR: {
    borderRadius: '5px!important',
  },
  button: {
    backgroundColor: '#116DFF',
    marginTop: '20px',
  },
  productName: {
    // color: '#0097a7',
    alignSelf: 'flex-start',
    marginTop: '1rem',
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
  productTextColor: {
    color: '#555352',
    fontWeight: '300',
    fontSize: '14px!important',
    textTransform: 'uppercase',
  },
  priceText: {
    color: 'black',
    fontWeight: '600',
    fontSize: '14px',
    textTransform: 'uppercase',
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
  const frontDesign = product?.designId?.frontDesign?.designImages[4]?.imageUrl;
  const backDesign = product?.designId?.backDesign?.designImages[1]?.imageUrl;
  const [designImage, setDesignImage] = useState(frontDesign);
  const [productDesign, setProductDesign] = useState(product.image);
  const [designChange, setDesignChange] = useState(false);
  const [iphoneDesignImage, setIphoneDesignImage] = useState(
    product?.designId?.frontDesign?.designImages[3]?.imageUrl ||
      product?.designId?.backDesign?.designImages[1]?.imageUrl,
  );
  const [mugPosterDesign, setMugPosterDesign] = useState(
    product?.designId?.frontDesign?.designImages[4]?.imageUrl ||
      product?.designId?.backDesign?.designImages[1]?.imageUrl,
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
      <Card
        variant="outlined"
        className={classes.card}
        onMouseOver={() => {
          console.log('call');
          if (product?.designId?.backDesign?.designImages[1]?.imageUrl) {
            product.name !== 'Case' &&
              product.name !== 'Mug' &&
              product.name !== 'Poster' &&
              (setDesignChange(true),
              product.slug === 'hoodie'
                ? setProductDesign(product.backImage)
                : product.slug === 'longsleeve'
                ? setProductDesign(product.backImage)
                : setProductDesign(product.backImage));
          }
        }}
        onMouseLeave={() => {
          if (product?.designId?.backDesign?.designImages[1]?.imageUrl) {
            product.name !== 'Case' &&
              product.name !== 'Mug' &&
              product.name !== 'Poster' &&
              (setDesignChange(false), setProductDesign(product.image));
          }
        }}
      >
        <CardMedia
          component="img"
          image={productDesign}
          alt="green iguana"
          className={classes.productImage}
          style={{
            backgroundImage: product.name === 'Case' && `url(${iphoneDesignImage})`,
            backgroundSize: '37% 80%',
          }}
        />
        {product.name !== 'Poster' &&
        product.name !== 'Mug' &&
        product?.designId &&
        product.name !== 'Case'
          ? designChange
            ? backDesign && (
                <img
                  src={backDesign}
                  className={[
                    classes.borderR,
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
              )
            : designImage && (
                <img
                  src={designImage}
                  className={[
                    classes.borderR,
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
              )
          : mugPosterDesign &&
            (product.name === 'Mug' || product.name === 'Poster') && (
              <img
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
                src={mugPosterDesign}
              />
            )}
      </Card>
      <Grid className={classes.productName}>
        <Typography
          gutterBottom
          align="left"
          variant="h5"
          component="div"
          className={classes.productTextcolor}
        >
          {`${product.slug === 'longsleeve' ? 'Long' : product.name} // ${storeName}`}
        </Typography>
        <Typography
          gutterBottom
          align="left"
          variant="h5"
          component="div"
          className={classes.productTextColor}
        >
          {`${color} Colors`}
        </Typography>
        <Typography
          className={classes.priceText}
          gutterBottom
          align="left"
          variant="h5"
          component="div"
        >
          {`$${product.price} USD`}
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
        <img src={product?.backImage} />
      </div>
    </Box>
  );
};

export { StoreProductCard as default };
