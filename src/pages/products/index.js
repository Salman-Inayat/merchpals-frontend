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
    width: '80%',
    height: '80%',
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
    fontSize: '1.6rem',
    fontWeight: '300',
    color: '#8e8e8e',
    marginBottom: '16px',
  },
  backButton: {
    margin: '20px',
  },
  design: {
    position: 'absolute',
    width: '150px',
    height: '150px',
    [theme.breakpoints.down('sm')]: {
      width: '100px',
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
    backgroundColor: '#f0d708',
    borderRadius: '100px',
    border: 'none',
    color: '#000',
    '&:hover': {
      backgroundColor: '#cab50c',
      border: 'none',
    },
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
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

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

  const reduxCartProducts = useSelector(state => state.cart?.cart?.products);
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

  useEffect(() => {
    if (fetchedProduct) {
      const designUrl =
        fetchedProduct?.designId?.designImages?.length > 3
          ? fetchedProduct.designId?.designImages[4].imageUrl
          : '';
      const colorsArr = fetchedProduct.productMappings.map(c => c.color);
      const variantArr = fetchedProduct.productMappings.map(c => c.variant);
      console.log(' fetched product', fetchedProduct);
      console.log('colr array', colorsArr);
      const formattedProduct = {
        vendorProduct: fetchedProduct.vendorProductId,
        productId: fetchedProduct._id,
        name: fetchedProduct.name,
        description: fetchedProduct.description,
        image: fetchedProduct.image,
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
      };

      console.log(formattedProduct.colors);
      setProduct(formattedProduct);
      setSize(formattedProduct.sizes[0]);
      setColor(formattedProduct.colors[0]);
    }
  }, [fetchedProduct]);

  const handleColorChange = event => {
    const selectedColor = product.colors.find(c => c.id === Number(event.target.value));
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
            variantId: selectedVariant.variantId,
          },
        ],
        price: product.cost,
        basePrice: product.basePrice,
        name: product.name,
        image: product.image,
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
  // console.log(product);
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
          <Grid container>
            <Grid
              item
              md={7}
              p={5}
              xs={12}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <div className={classes.imageContainer} style={{ backgroundColor: color.label }}>
                  <img src={`${product.image}`} alt="" className={classes.image} />
                  <img src={product.design} alt="design" className={classes.design} />
                </div>
              </div>
            </Grid>
            <Grid
              item
              md={5}
              // p={5}
              xs={12}
              display="flex"
              justifyContent="center"
              alignItems="center"
              className={classes.gridContainer}
            >
              <Stack direction="column" spacing={2} className={classes.stack}>
                <Typography gutterBottom variant="h3" component="div" align="center">
                  {product.name}
                </Typography>

                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  className={classes.price}
                  align="center"
                >
                  $ {product?.cost ? product.cost.toFixed(2) : 0}
                </Typography>

                <FormControl component="fieldset">
                  {/* <FormLabel component="legend">Color</FormLabel> */}
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
                            <div
                              className={classes.color}
                              style={{
                                backgroundColor: label,
                                backgroundImage: `url(${product.image})`,
                                backgroundSize: '100% 100%',
                                backgroundRepeat: 'no-repeat',
                                width: '50px',
                                height: '50px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}
                            >
                              {' '}
                              {/* <Typography>Rehman</Typography> */}
                              {/* <img src={`${product.image}`} height="50" width="50" /> */}
                              <img
                                src={product.design}
                                width="15px"
                                height="15px"
                                style={{
                                  position: 'absolute',
                                }}
                              />
                            </div>
                          }
                        />
                      );
                    })}
                  </RadioGroup>
                </FormControl>

                <FormControl component="fieldset">
                  <FormLabel component="legend">Select Size</FormLabel>
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
                                product.slug === 'case' ? classes.caseSize : classes.selectSize
                              }
                            >
                              <Typography
                                component="h4"
                                className={product.slug === 'case' && classes.caseSizeHeading}
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
                <Grid item md={12} display="flex" justifyContent="center">
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
                      {product.details?.map(detail => (
                        <ListItem disablePadding>
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
                    {product.shippingText?.map(shippingText => (
                      <Typography variant="body1" sx={{ fontWeight: '400 !important' }} mb={4}>
                        {shippingText}
                      </Typography>
                    ))}
                  </AccordionDetails>
                </Accordion>

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
    </Grid>
  );
};

export default Product;
