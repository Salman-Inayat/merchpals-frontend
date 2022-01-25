import React, { useEffect, useState } from 'react';
import {
  Grid,
  Button,
  Stack,
  Snackbar,
  Typography,
  Badge,
  IconButton,
} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import axios from 'axios';
import { Link as RouterLink } from 'react-router-dom';
import Logo from '../../assets/images/logo.png';
import { makeStyles } from '@mui/styles';
import { baseURL } from '../../configs/const';
import { styled } from '@mui/material/styles';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { addToCart } from '../../store/redux/actions/cart';
import Slide from '@mui/material/Slide';
import MuiAlert from '@mui/material/Alert';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';

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
    backgroundColor: '#f0d708',
    borderRadius: '100px',
    color: '#000',
    '&:hover': {
      backgroundColor: '#cab50c',
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
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

const Product = ({ addToCart, cart }) => {
  const classes = useStyle();
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

  useEffect(() => {
    fetchProduct(productId);
    setCartProducts(cart);
    const storedCart = localStorage.getItem('MERCHPALS_CART');
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart);
      console.log({ parsedCart });
      setCartsVariants(parsedCart);
    }
  }, []);

  useEffect(() => {
    setCartProducts(cart);
  }, [cart]);

  const fetchProduct = async productId => {
    axios
      .get(`${baseURL}/products/${storeUrl}/product/${productId}`)
      .then(response => {
        const product = response.data.product;
        const colorsArr = product.productMappings.map(c => c.color);
        const variantArr = product.productMappings.map(c => c.variant);
        console.log({ productInResponse: product });
        const formattedProduct = {
          id: product._id,
          name: product.name,
          description: product.description,
          image: product.image,
          cost: product.price,
          basePrice: product.basePrice,
          slug: product.slug,
          productMappings: product.productMappings,
          colors: [
            ...new Map(colorsArr.map(item => [item['id'], item])).values(),
          ],
          sizes: [
            ...new Map(variantArr.map(item => [item['id'], item])).values(),
          ],
          productNumberedId: product.productMappings[0].productNumberedId,
          design: product.designId?.url,
        };

        setProduct(formattedProduct);
        setSize(formattedProduct.sizes[0]);
        setColor(formattedProduct.colors[0]);
      })
      .catch(err => {
        console.log({ err });
      });
  };
  // console.log({formattedProduct: product});
  const handleColorChange = event => {
    const selectedColor = product.colors.find(c => c.id === event.target.value);
    setColor(selectedColor);
  };

  const handleSizeChange = event => {
    const selectedSize = product.sizes.find(c => c.id === event.target.value);
    setSize(selectedSize);
  };

  const handleBackButton = event => {
    navigate(-1);
  };

  const handleAddToCart = () => {
    const keyId = `${product.productNumberedId}-${size.id}-${color.id}`;
    const selectedVariant = product.productMappings.find(
      p => p.keyId === keyId,
    );
    console.log({ keyId });
    if (!selectedVariant) {
      setSnackBarToggle({
        visible: true,
        type: 'error',
        message: 'Variant not available',
      });
      return;
    }

    // console.log(keyId, product.productMappings.find(p => p.keyId === keyId));
    const productMappingId = selectedVariant._id;
    let updatedCart = {};
    // console.log({selectedVariant});
    const prevProduct = cartsVariants.find(v => v.productId === product.id);
    // console.log({prevProduct});

    if (prevProduct) {
      const isSameVariantAlreadySelected = prevProduct.productMappings.find(
        prv => prv.id === selectedVariant._id,
      );
      let mappings = [...prevProduct.productMappings];
      if (isSameVariantAlreadySelected) {
        mappings = mappings.filter(m => m.id !== selectedVariant._id);
      }
      console.log({ selectedVariant });
      updatedCart = {
        ...prevProduct,
        productMappings: [
          ...mappings,
          {
            id: productMappingId,
            quantity: isSameVariantAlreadySelected
              ? isSameVariantAlreadySelected.quantity + 1
              : 1,
            color: selectedVariant.color.label,
            variant: selectedVariant.variant.label,
            variantId: selectedVariant.variantId,
            design: product.design,
          },
        ],
      };
    } else {
      updatedCart = {
        productId: product.id,
        productMappings: [
          {
            id: productMappingId,
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

    // console.log({ updatedCart });
    const otherProductVariants = cartsVariants.filter(
      cv => cv.productId !== product.id,
    );
    const updatedCartList = [updatedCart, ...otherProductVariants];
    // console.log({ updatedCartList });
    setCartsVariants(updatedCartList);
    localStorage.setItem('MERCHPALS_CART', JSON.stringify(updatedCartList));
    addToCart(`${product.productNumberedId}-${size.id}-${color.id}`);
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
    navigate(`/cart/${storeUrl}`);
  };

  const handleSnackBarClose = () => {
    setSnackBarToggle({
      visible: false,
    });
  };
  console.log({ product });
  return (
    <Grid container spacing={1}>
      <Grid item md={6} xs={12}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleBackButton}
          className={classes.backButton}
        >
          Back
        </Button>
      </Grid>
      <Grid item md={6} xs={12}>
        <IconButton
          aria-label="cart"
          onClick={handleCartButton}
          size="large"
          style={{ height: '50px', width: '50px' }}
        >
          <StyledBadge badgeContent={totalNumberOfVariants} color="secondary">
            <ShoppingCartIcon />
          </StyledBadge>
        </IconButton>
      </Grid>
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
              <div
                className={classes.imageContainer}
                style={{ backgroundColor: color.label }}
              >
                <img
                  src={`${product.image}`}
                  alt=""
                  className={classes.image}
                />
                <img
                  src={product.design}
                  alt="design"
                  className={classes.design}
                />
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
              <Typography
                gutterBottom
                variant="h3"
                component="div"
                align="center"
              >
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
                            style={{
                              backgroundColor: label,
                              width: '100%',
                              height: '100%',
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                          >
                            {' '}
                            <img
                              src={`${product.image}`}
                              height="50"
                              width="50"
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
                        style={{ marginLeft: '0px' }}
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
                            style={{
                              width: '50px',
                              height: '50px',
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              borderRadius: '5px',
                              marginLeft: '0px',
                            }}
                          >
                            <Typography component="h4">
                              {label.toUpperCase()}
                            </Typography>
                          </div>
                        }
                      />
                    );
                  })}
                </RadioGroup>
              </FormControl>

              <Button
                fullWidth
                color="secondary"
                variant="outlined"
                size="large"
                onClick={handleAddToCart}
                className={classes.addToCartButton}
              >
                Add to Cart
              </Button>

              <Accordion className={classes.accordian}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography component="h5">DETAILS</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Suspendisse malesuada lacus ex, sit amet blandit leo
                    lobortis eget.
                  </Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion className={classes.accordian}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography component="h5">SHIPPING DETAILS</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Suspendisse malesuada lacus ex, sit amet blandit leo
                    lobortis eget.
                  </Typography>
                </AccordionDetails>
              </Accordion>

              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Snackbar
                  open={snackBarToggle.visible}
                  autoHideDuration={3000}
                  onClose={handleSnackBarClose}
                >
                  <Alert severity={snackBarToggle.type}>
                    {snackBarToggle.message}
                  </Alert>
                </Snackbar>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

const mapDispatch = dispatch => ({
  addToCart: product => {
    dispatch(addToCart(product));
  },
});

const mapState = state => {
  const cart = state.cart;
  return { cart };
};

export default connect(mapState, mapDispatch)(Product);

// export { Product as default };
