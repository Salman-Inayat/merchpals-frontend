import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { removeFromCart, emptyCart } from '../../store/redux/actions/cart';
import { Grid, Button, Typography } from '@mui/material';
import CartProductCard from '../../components/cartProductCard';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';

const useStyle = makeStyles(theme => ({
  productsContainer: {
    padding: '2rem 8rem',
    [theme.breakpoints.down('sm')]: {
      padding: '1rem',
      spacing: '5',
    },
  },
}));

const Cart = ({ cart, removeFromCart, emptyCart }) => {
  const classes = useStyle();
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setProducts(cart);
  }, []);

  useEffect(() => {
    console.log(cart);
    setProducts(cart);
  }, [cart]);

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h3" align="center">
          Cart
        </Typography>
      </Grid>

      {products.length > 0 && (
        <Grid item xs={12} display="flex" justifyContent="flex-end">
          <Button onClick={() => emptyCart()} variant="contained" color="error">
            Empty Cart
          </Button>
        </Grid>
      )}

      {products.length > 0 ? (
        <Grid item md={12} xs={12} className={classes.productsContainer}>
          <Grid container spacing={2}>
            {products.map(product => (
              <Grid item md={4} xs={6} key={product.id}>
                <CartProductCard
                  product={product}
                  removeFromCart={removeFromCart}
                />
              </Grid>
            ))}
          </Grid>
          <Grid
            item
            md={12}
            display="flex"
            justifyContent="space-around"
            alignItems="center"
          >
            <Typography variant="h5">
              Total: $
              {products.reduce((acc, product) => {
                return acc + product.cost * product.quantity;
              }, 0)}
            </Typography>

            <Button
              onClick={handleCheckout}
              variant="contained"
              color="secondary"
            >
              Checkout
            </Button>
          </Grid>
        </Grid>
      ) : (
        <Grid item xs={12}>
          <Typography variant="h4" align="center">
            Cart is empty
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};

const mapDispatch = dispatch => ({
  removeFromCart: productId => {
    dispatch(removeFromCart(productId));
  },
  emptyCart: () => {
    dispatch(emptyCart());
  },
});

const mapState = state => {
  const cart = state.cart;
  return { cart };
};

export default connect(mapState, mapDispatch)(Cart);
