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

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const useStyle = makeStyles(() => ({
  image: {
    height: '100%',
    width: '100%',
  },
  price: {
    fontSize: '3.5rem',
    fontWeight: '400',
  },
  backButton: {
    margin: '20px',
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
  const { productId } = useParams();
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

  const [color, setColor] = useState('');
  const [size, setSize] = useState('');
  const [productColor, setProductColor] = useState('');
  const [snackBarToggle, setSnackBarToggle] = useState(false);
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    fetchProduct(productId);
    setCartProducts(cart);
  }, []);

  useEffect(() => {
    setCartProducts(cart);
  }, [cart]);

  const fetchProduct = async productId => {
    axios
      .get(`${baseURL}/products/${productId}`)
      .then(response => {
        const product = response.data.product;

        setProduct({
          id: product._id,
          name: product.name,
          description: product.description,
          image: product.image,
          cost: product.basePrice,
          slug: product.slug,
          colors: product.colors,
          sizes: product.variants,
        });
      })
      .catch(err => {
        console.log({ err });
      });
  };

  const handleColorChange = event => {
    setColor(event.target.value);
  };

  const handleSizeChange = event => {
    setSize(event.target.value);
  };

  const handleBackButton = event => {
    navigate(-1);
  };

  const handleAddToCart = () => {
    addToCart(product);
    setSnackBarToggle(true);
  };

  const handleCartButton = () => {
    navigate('/cart');
  };

  const handleSnackBarClose = () => {
    setSnackBarToggle(false);
  };

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
          <StyledBadge badgeContent={cartProducts.length} color="secondary">
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
                style={{
                  backgroundColor: 'red',
                  width: '80%',
                  height: '80%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <img
                  src={`${product.image}`}
                  alt=""
                  className={classes.image}
                />
              </div>
            </div>
          </Grid>
          <Grid
            item
            md={4}
            p={5}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Stack
              direction="column"
              alignItems="left"
              justifyContent="space-between"
              spacing={2}
            >
              <Typography gutterBottom variant="h5" component="div">
                {product.slug}
              </Typography>
              <Typography gutterBottom variant="h3" component="div">
                {product.name}
              </Typography>
              <Typography gutterBottom variant="p" component="div">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odio,
                deserunt. Neque at unde, doloribus, minima atque amet optio,
                distinctio ex veniam exercitationem facere! Quam dolore ex minus
                ut impedit necessitatibus!
              </Typography>

              <FormControl component="fieldset">
                <FormLabel component="legend">Size</FormLabel>
                <RadioGroup
                  row
                  aria-label="color"
                  name="controlled-radio-buttons-group"
                  value={size}
                  onChange={handleSizeChange}
                >
                  {product.sizes.map(arr => {
                    return (
                      <FormControlLabel
                        value={arr}
                        control={<Radio />}
                        label={arr}
                      />
                    );
                  })}
                </RadioGroup>
              </FormControl>

              <FormControl component="fieldset">
                <FormLabel component="legend">Color</FormLabel>
                <RadioGroup
                  row
                  aria-label="color"
                  name="controlled-radio-buttons-group"
                  value={color}
                  onChange={handleColorChange}
                >
                  {product.colors.map(arr => {
                    return (
                      <FormControlLabel
                        value={arr}
                        control={<Radio />}
                        label={arr}
                      />
                    );
                  })}
                </RadioGroup>
              </FormControl>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography
                  gutterBottom
                  variant="h3"
                  component="div"
                  className={classes.price}
                >
                  {product.cost} $
                </Typography>
                <Button
                  color="secondary"
                  variant="outlined"
                  size="large"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </Button>
                <Snackbar
                  open={snackBarToggle}
                  autoHideDuration={3000}
                  onClose={handleSnackBarClose}
                >
                  <Alert severity="success">Item added to cart</Alert>
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
