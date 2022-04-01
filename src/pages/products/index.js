import React, { useEffect, useState } from 'react';
import {
  Grid,
  Button,
  Stack,
  Snackbar,
  Typography,
  Badge,
  IconButton,
  List,
  // ListItemText,
  ListItem,
  ListItemIcon,
  CircularProgress,
  Slide,
  Collapse,
  Paper,
  Card,
  CardMedia,
} from '@mui/material';
// import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
// import axios from 'axios';
// import { Link as RouterLink } from 'react-router-dom';
// import Logo from '../../assets/images/logo.png';
import { makeStyles } from '@mui/styles';
// import { baseURL } from '../../configs/const';
import { styled } from '@mui/material/styles';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
// import { connect } from 'react-redux';
import { addToCart, getCart } from '../../store/redux/actions/cart';
// import Slide from '@mui/material/Slide';
import MuiAlert from '@mui/material/Alert';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Box from '@mui/material/Box';
import { fetchProduct } from '../../store/redux/actions/product';
import Footer from '../../layouts/static/footer';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const useStyle = makeStyles(theme => ({
  gridContainer: {
    padding: '5rem',
    [theme.breakpoints.down('sm')]: {
      padding: '2rem',
    },
  },
  imageContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      height: '100%',
    },
  },
  stack: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'left',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      height: '100%',
    },
  },
  image: {
    height: '100%',
    width: '100%',
  },
  price: {
    fontSize: '1.4rem',
    fontWeight: '500',
    color: 'black',
    marginBottom: '16px',
    [theme.breakpoints.down('sm')]: {
      textAlign: 'right',
      marginRight: '10px',
    },
  },
  backButton: {
    margin: '20px',
  },
  design: {
    position: 'absolute',
    width: '150px !important',
    height: '150px',
    [theme.breakpoints.down('sm')]: {
      width: '100px !important',
      height: '100px',
    },
  },
  radio: {
    margin: '10px',
    display: 'none',

    '&$checked + label': {
      backgroundColor: '#f5f5f5',
      borderColor: '#f5f5f5',
    },
  },
  addToCartButton: {
    margin: '10px',
    width: '80%',
    backgroundColor: 'black',
    maxHeight: '60px',
    borderRadius: '100px',
    fontWeight: '400',
    padding: '2rem',
    border: 'none',
    color: 'white',
    '&:hover': {
      backgroundColor: '#d1cfcf',
      border: 'none',
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  acwrapper: {
    // maxWidth: '376px',
    // [theme.breakpoints.down('sm')]: {
    //   maxWidth: '100%'
    // }
  },
  accordian: {
    margin: '10px 0px',
  },
  formControls: {
    margin: '10px 0px',
    [theme.breakpoints.down('sm')]: {
      marginLeft: '20px',
    },
  },
  parentSelectSize: {
    marginLeft: '0px',
    backgroundColor: '#F4F4F4',
    margin: '10px',
    [theme.breakpoints.down('sm')]: {
      margin: '10px',
    },
  },
  selectSize: {
    width: '50px',
    height: '50px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '5px',
    marginLeft: '0px',
  },
  caseSize: {
    width: '50px',
    height: '50px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    borderRadius: '5px',
    marginLeft: '0px',
    padding: '5px',
  },
  caseSizeHeading: {
    fontSize: '12px !important',
  },
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    backgroundColor: '#f5f5f5',
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));
function Item(props) {
  return (
    <Paper>
      <h2>{props.item.name}</h2>
      <p>{props.item.description}</p>

      <Button className="CheckButton">Check it out!</Button>
    </Paper>
  );
}

const Product = () => {
  const classes = useStyle();
  const dispatch = useDispatch();

  const { productId, storeUrl } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    id: '',
    name: '',
    description: '',
    image: '',
    cost: '',
    slug: '',
    colors: [],
    sizes: [],
  });

  const [color, setColor] = useState({ id: '', label: '' });
  const [size, setSize] = useState({ id: '', label: '' });
  const [productColor, setProductColor] = useState('');
  const [snackBarToggle, setSnackBarToggle] = useState({
    visible: false,
    type: 'success',
    message: 'Added to cart',
  });
  const [cartProducts, setCartProducts] = useState([]);
  const [cartsVariants, setCartsVariants] = useState([]);
  const [totalNumberOfVariants, setTotalNumberOfVariants] = useState(0);
  const [shipping, setShipping] = useState(false);
  const [details, setDetails] = useState(false);
  const [index, setIndex] = useState(0);

  const reduxCartProducts = useSelector(state => state.cart?.cart?.products);
  const [designImage, setDesignImage] = useState('');
  const [backDesignImage, setBackDesignImage] = useState();
  const [mugPosterDesign, setMugPosterDesign] = useState();
  const fetchedProduct = useSelector(state => state.product?.product);

  const handleDetailsChange = data => {
    setDetails(!data);
  };
  const handleShippingChange = data => {
    setShipping(!data);
  };
  useEffect(() => {
    dispatch(fetchProduct(storeUrl, productId));
    dispatch(getCart(storeUrl));
  }, []);

  useEffect(() => {
    if (reduxCartProducts) {
      setCartsVariants(reduxCartProducts);
    }
  }, [reduxCartProducts]);

  let designUrl, backDesignUrl, mugPoster;
  useEffect(() => {
    if (fetchedProduct) {
      fetchedProduct.name === 'Case'
        ? (designUrl =
            fetchedProduct?.designId?.frontDesign?.designImages?.length > 3
              ? fetchedProduct.designId?.frontDesign?.designImages[3]?.imageUrl
              : fetchedProduct.designId?.frontDesign?.designImages[2]?.imageUrl)
        : (designUrl =
            fetchedProduct?.designId?.frontDesign?.designImages?.length > 3 &&
            fetchedProduct.designId?.frontDesign?.designImages[4]?.imageUrl);
      mugPoster =
        fetchedProduct?.designId?.frontDesign?.designImages?.length > 3
          ? fetchedProduct.designId?.frontDesign?.designImages[4]?.imageUrl
          : fetchedProduct.designId?.backDesign?.designImages[1]?.imageUrl;
      backDesignUrl =
        fetchedProduct?.designId?.backDesign?.designImages?.length > 1 &&
        fetchedProduct.designId?.backDesign?.designImages[1]?.imageUrl;

      const colorsArr = fetchedProduct.productMappings.map(c => c.color);
      const variantArr = fetchedProduct.productMappings.map(c => c.variant);
      const formattedProduct = {
        vendorProduct: fetchedProduct.vendorProductId,
        productId: fetchedProduct._id,
        name: fetchedProduct.name,
        description: fetchedProduct.description,
        image: fetchedProduct.image,
        backImage: fetchedProduct.backImage,
        cost: fetchedProduct.price,
        basePrice: fetchedProduct.basePrice,
        slug: fetchedProduct.slug,
        shippingText: fetchedProduct.shippingText,
        details: fetchedProduct.details,
        productMappings: fetchedProduct.productMappings,
        colors: [...new Map(colorsArr.map(item => [item['id'], item])).values()],
        sizes: [...new Map(variantArr.map(item => [item['id'], item])).values()],
        productNumberedId: fetchedProduct.productMappings[0].productNumberedId,
        design: designUrl,
        backDesign: backDesignUrl,
        mugPosterDesign: mugPoster,
      };
      formattedProduct.colors = formattedProduct.colors.sort(function (a, b) {
        return a.id - b.id || a.label.localeCompare(b.label);
      });
      setProduct(formattedProduct);
      setSize(formattedProduct.sizes[0]);
      setColor(formattedProduct.colors[0]);
      setDesignImage(formattedProduct.design);
      setBackDesignImage(fetchedProduct.image);
      setMugPosterDesign(formattedProduct.mugPosterDesign);
    }
  }, [fetchedProduct]);

  const handleColorChange = event => {
    const selectedColor = product.colors.find(c => c.id === Number(event.target.value));
    if ((product.colors[0].label === 'white', product.colors[1].label === 'navy')) {
      switch (selectedColor.label) {
        case 'white':
          setIndex(0);
          break;
        case 'navy':
          setIndex(1);
          break;
      }
    } else {
      switch (selectedColor.label) {
        case 'black':
          setIndex(0);
          break;
        case 'white':
          setIndex(1);
          break;
        case 'navy':
          setIndex(2);
          break;
      }
    }
    setColor(selectedColor);
  };

  const handleSizeChange = event => {
    const selectedSize = product.sizes.find(c => c.id === Number(event.target.value));
    setSize(selectedSize);
  };

  const handleBackButton = event => {
    navigate(-1);
  };

  const handleAddToCart = () => {
    const keyId = `${product.productNumberedId}-${size.id}-${color.id}`;
    const selectedVariant = product.productMappings.find(p => p.keyId === keyId);

    if (!selectedVariant) {
      setSnackBarToggle({
        visible: true,
        type: 'error',
        message: 'Variant not available',
      });
      return;
    }

    const productMapping = selectedVariant._id;
    let updatedCart = {};
    // console.log({selectedVariant});
    const prevProduct = cartsVariants.find(v => v.vendorProduct === product.vendorProduct);
    // console.log({prevProduct});

    if (prevProduct) {
      const isSameVariantAlreadySelected = prevProduct.productMappings.find(
        prv => prv.id === selectedVariant._id,
      );
      let mappings = [...prevProduct.productMappings];
      if (isSameVariantAlreadySelected) {
        mappings = mappings.filter(m => m.id !== selectedVariant._id);
      }
      // console.log({ selectedVariant });
      updatedCart = {
        ...prevProduct,
        productMappings: [
          ...mappings,
          {
            id: productMapping,
            quantity: isSameVariantAlreadySelected ? isSameVariantAlreadySelected.quantity + 1 : 1,
            color: selectedVariant.color.label,
            variant: selectedVariant.variant.label,
            variantId: selectedVariant.variantId,
            design: product.design,
            backDesign: product.backDesign,
            mugPoster: product.mugPosterDesign,
          },
        ],
      };
    } else {
      updatedCart = {
        vendorProduct: product.vendorProduct,
        productMappings: [
          {
            id: productMapping,
            quantity: 1,
            color: selectedVariant.color.label,
            variant: selectedVariant.variant.label,
            design: product.design,
            backDesign: product.backDesign,
            variantId: selectedVariant.variantId,
            mugPoster: product.mugPosterDesign,
          },
        ],
        price: product.cost,
        basePrice: product.basePrice,
        name: product.name,
        image: product.image,
        backImage: product.backImage,
        slug: product.slug,
      };
    }

    const otherProductVariants = cartsVariants.filter(
      cv => cv.vendorProduct !== product.vendorProduct,
    );

    const updatedCartList = [updatedCart, ...otherProductVariants];
    setCartsVariants(updatedCartList);
    dispatch(addToCart(storeUrl, updatedCartList));
    setSnackBarToggle({
      visible: true,
      type: 'success',
      message: 'Added to cart',
    });

    navigate(`/checkout/${storeUrl}`);
    const totalItems = updatedCartList.reduce(
      (total, cur) => total + cur.productMappings.length,
      0,
    );
    setTotalNumberOfVariants(totalItems);
  };

  const handleCartButton = () => {
    if (reduxCartProducts.length === 0) {
      setSnackBarToggle({
        visible: true,
        type: 'info',
        message: 'Your cart is empty. Please select a product and try again. Thank You!',
      });
      return;
    }
    navigate(`/checkout/${storeUrl}`);
  };

  const handleSnackBarClose = () => {
    setSnackBarToggle({
      visible: false,
    });
  };
  let opacity;

  const changeBackground = () => {
    console.log('changing');
  };
  console.log('fetched prodcut', backDesignUrl);

  const countItems = () => {
    var length = 0;
    if (reduxCartProducts) {
      length = reduxCartProducts.length;
      for (var i = 0; i < reduxCartProducts.length; i++) {
        console.log(length);
        for (var n = 0; n < reduxCartProducts[i].productMappings.length; n++) {
          length += reduxCartProducts[i].productMappings[n].quantity;
          console.log(length);
        }
      }
      console.log(length);
    }

    return length;
  };
  const cartItemsLength = countItems();
  return (
    <Grid container spacing={1} justifyContent="center" alignItems="center">
      <Grid item md={1} xs={1} sm={1} display="flex" justifyContent="center" pl={{ xs: 3 }}>
        <ArrowBackIcon onClick={handleBackButton} sx={{ cursor: 'pointer' }} />
      </Grid>
      <Grid item md={10} xs={8} sm={10} display="flex" justifyContent="center">
        <Typography variant="h4">Official Store</Typography>
      </Grid>
      <Grid item md={1} xs={1} sm={1} display="flex" justifyContent="center" pr={{ xs: 5, sm: 0 }}>
        <IconButton
          aria-label="cart"
          onClick={handleCartButton}
          size="large"
          style={{ height: '50px', width: '50px' }}
        >
          <ShoppingCartOutlinedIcon sx={{ fontSize: '2rem' }} />
        </IconButton>
      </Grid>
      {fetchedProduct ? (
        <Grid item md={12} xs={12}>
          <Grid container display="flex" justifyContent="center" alignItems="center">
            <Grid item md={4} xs={12}>
              <Carousel
                selectedItem={index}
                showThumbs={false}
                showArrows={false}
                swipeable={false}
                showStatus={false}
                showIndicators={false}
              >
                {product.colors?.map(({ id, label }) => {
                  return (
                    <Card
                      className={classes.imageContainer}
                      onMouseOver={() => {
                        if (product.backDesign) {
                          product.slug !== 'Case' &&
                            product.slug !== 'mug' &&
                            product.slug !== 'poster' &&
                            (console.log('call ', product.slug),
                            setDesignImage(product.backDesign),
                            product.slug === 'hoodie'
                              ? setBackDesignImage(product.backImage)
                              : product.slug === 'longsleeve'
                              ? setBackDesignImage(product.backImage)
                              : setBackDesignImage(product.backImage));
                        }
                      }}
                      onMouseLeave={() => {
                        if (product.backDesign) {
                          product.slug !== 'Case' &&
                            product.slug !== 'mug' &&
                            product.slug !== 'poster' &&
                            (setDesignImage(product.design), setBackDesignImage(product.image));
                        }
                      }}
                      style={{
                        borderRadius: '0px',
                      }}
                    >
                      {console.log('call product', product)}
                      <CardMedia
                        component="img"
                        style={{
                          // backgroundColor: '#121616',

                          backgroundColor:
                            product.name !== 'Case' && label === 'white'
                              ? '#ffffff'
                              : label === 'navy'
                              ? '#262d4f '
                              : label === 'black'
                              ? '#121616'
                              : '',
                          backgroundImage: product.slug === 'Case' && `url(${designImage})`,
                          backgroundSize: product.name === 'Case' && '37% 80%',
                        }}
                        //  <img
                        image={backDesignImage}
                        alt=""
                        //   className={classes.image}
                        // />
                      />

                      {product.slug !== 'Case' &&
                        (product.slug !== 'mug' && product.slug !== 'poster'
                          ? designImage && (
                              <img src={designImage} alt="design" className={classes.design} />
                            )
                          : mugPosterDesign && (
                              <img src={mugPosterDesign} alt="design" className={classes.design} />
                            ))}
                    </Card>
                  );
                })}
              </Carousel>
            </Grid>
            <Grid
              item
              md={6}
              // p={5}
              xs={12}
              display="flex"
              justifyContent="center"
              alignItems="center"
              className={classes.gridContainer}
            >
              <Stack direction="column" spacing={2} className={classes.stack}>
                <Grid display="flex" flexWrap="wrap" justifyContent="space-between">
                  <Grid xs={6} sm={12}>
                    <Typography gutterBottom variant="h3" component="div" align="left">
                      {`${product.name === 'Case' ? 'Iphone Case' : product.name}`}
                    </Typography>
                  </Grid>
                  <Grid xs={6} sm={12}>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      className={classes.price}
                      align="left"
                    >
                      ${product?.cost ? product.cost.toFixed(2) : 0} USD
                    </Typography>
                  </Grid>
                </Grid>

                <FormControl component="fieldset">
                  <FormLabel sx={{ mb: 1 }} component="legend">
                    Color options:
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-label="color"
                    name="controlled-radio-buttons-group"
                    value={color.id}
                    onChange={handleColorChange}
                  >
                    {product.colors.map(({ id, label }) => {
                      return (
                        <FormControlLabel
                          style={{ marginLeft: '0px' }}
                          key={`colors-${id}`}
                          value={id}
                          control={
                            <Radio
                              onClick={() => {
                                console.log('radio call', id, label);
                              }}
                              className={classes.radio}
                              sx={{
                                '&.Mui-checked': {
                                  '& + .MuiFormControlLabel-label > div': {
                                    border: '1px solid gray',
                                  },
                                },
                              }}
                            />
                          }
                          label={
                            <Card
                              className={classes.color}
                              style={{
                                borderRadius: '0px',
                                width: '50px',
                                height: '50px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}
                            >
                              <CardMedia
                                component="img"
                                style={{
                                  backgroundColor:
                                    product.name !== 'Case' && label === 'white'
                                      ? '#FFFFFF'
                                      : label === 'navy'
                                      ? '#262D4F '
                                      : label === 'black'
                                      ? '#121616'
                                      : '',
                                  backgroundImage: product.slug === 'Case' && `url(${designImage})`,
                                  backgroundSize: product.name === 'Case' && '37% 80%',
                                }}
                                //  <img
                                image={product.image}
                                alt=""
                                //   className={classes.image}
                                // />
                              />
                              {product.slug !== 'Case' &&
                                (product.slug !== 'mug' && product.slug !== 'poster'
                                  ? designImage && (
                                      <img
                                        src={designImage}
                                        alt="design"
                                        width="15px"
                                        height="15px"
                                        style={{
                                          position: 'absolute',
                                        }}
                                      />
                                    )
                                  : mugPosterDesign && (
                                      <img
                                        src={mugPosterDesign}
                                        alt="design"
                                        width="15px"
                                        height="15px"
                                        style={{
                                          position: 'absolute',
                                        }}
                                      />
                                    ))}
                            </Card>
                          }
                        />
                      );
                    })}
                  </RadioGroup>
                </FormControl>

                <FormControl component="fieldset">
                  <FormLabel component="legend">Select size:</FormLabel>
                  <RadioGroup
                    row
                    aria-label="color"
                    name="controlled-radio-buttons-group"
                    value={size.id}
                    onChange={handleSizeChange}
                  >
                    {product.sizes.map(({ id, label }) => {
                      return (
                        <FormControlLabel
                          className={classes.parentSelectSize}
                          key={`sizes-${id}`}
                          value={id}
                          control={
                            <Radio
                              className={classes.radio}
                              sx={{
                                '&.Mui-checked': {
                                  '& + .MuiFormControlLabel-label > div': {
                                    backgroundColor: '#c1bdbd;',
                                  },
                                },
                              }}
                            />
                          }
                          label={
                            <div
                              className={
                                product.slug === 'Case' ? classes.caseSize : classes.selectSize
                              }
                            >
                              <Typography
                                component="h4"
                                className={product.slug === 'Case' && classes.caseSizeHeading}
                              >
                                {label.toUpperCase()}
                              </Typography>
                            </div>
                          }
                        />
                      );
                    })}
                  </RadioGroup>
                </FormControl>
                <Grid item md={12} display="flex" justifyContent="flex-start">
                  <Button
                    color="secondary"
                    variant="outlined"
                    size="large"
                    onClick={handleAddToCart}
                    className={classes.addToCartButton}
                  >
                    Add to Cart
                  </Button>
                </Grid>

                <Grid className={classes.acwrapper}>
                  <Accordion className={classes.accordian}>
                    <AccordionSummary
                      onClick={() => handleDetailsChange(details)}
                      expandIcon={
                        details ? (
                          <RemoveIcon sx={{ color: '#EAEAEA' }} />
                        ) : (
                          <AddIcon sx={{ color: '#EAEAEA' }} />
                        )
                      }
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography variant="h6" sx={{ fontWeight: 'bold !important' }}>
                        DETAILS
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <List>
                        {product.details?.map((detail, i) => (
                          <ListItem disablePadding key={i}>
                            <ListItemIcon
                              disablePadding
                              sx={{ fontSize: '10px' }}
                            >{`\u2B24`}</ListItemIcon>
                            {detail}
                          </ListItem>
                        ))}
                      </List>
                    </AccordionDetails>
                  </Accordion>

                  <Accordion className={classes.accordian}>
                    <AccordionSummary
                      onClick={() => handleShippingChange(shipping)}
                      expandIcon={
                        shipping ? (
                          <RemoveIcon sx={{ color: '#EAEAEA' }} />
                        ) : (
                          <AddIcon sx={{ color: '#EAEAEA' }} />
                        )
                      }
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography variant="h6" sx={{ fontWeight: 'bold !important' }}>
                        SHIPPING DETAILS
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography
                        key={index}
                        variant="body1"
                        sx={{ fontWeight: '400 !important' }}
                        mb={4}
                      >
                        FREE Shipping to US
                      </Typography>
                      {product.shippingText?.map((shippingText, index) => (
                        <Typography
                          key={index}
                          variant="body1"
                          sx={{ fontWeight: '400 !important' }}
                          mb={4}
                        >
                          {shippingText}
                        </Typography>
                      ))}
                    </AccordionDetails>
                  </Accordion>
                </Grid>

                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Snackbar
                    open={snackBarToggle.visible}
                    autoHideDuration={3000}
                    onClose={handleSnackBarClose}
                  >
                    <Alert severity={snackBarToggle.type}>{snackBarToggle.message}</Alert>
                  </Snackbar>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </Grid>
      ) : null}
      <Grid item md={12}>
        <Footer />
      </Grid>
      {product.backDesign !== '' && (
        <div hidden>
          <img src={product.backDesign} />
          <img src={product.backImage} />
        </div>
      )}
    </Grid>
  );
};

const CartButton = props => {
  return (
    <IconButton
      aria-label="cart"
      onClick={() => props.handleCartButton()}
      size="large"
      style={{ height: '50px', width: '50px' }}
    >
      <ShoppingCartOutlinedIcon sx={{ fontSize: '2rem', color: '#000000' }} />
      <Grid
        sx={{
          position: 'absolute',
          dislpay: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          top: '2px',
          right: '-2px',
          borderRadius: '25px',
          color: 'white',
          textAlign: 'center',
          fontWeight: '600',
          backgroundColor: 'black',
          height: '20px',
          width: '20px',
        }}
      >
        <Typography sx={{ fontSize: '10px', fontWeight: '600', marginTop: '3px' }}>
          {props.cartCount}
        </Typography>
      </Grid>
    </IconButton>
  );
};
export default Product;
