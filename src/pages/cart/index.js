import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { removeFromCart } from '../../store/redux/actions/cart';
import { Grid, Button, Typography } from '@mui/material';
// import { makeStyles } from '@material-ui/core/styles';

const Cart = ({ cart, removeFromCart }) => {
  //   const classes = useStyles();
  const [products, setProducts] = useState();

  useEffect(() => {
    setProducts(cart);
  }, []);

  useEffect(() => {
    setProducts(cart);
  }, [cart]);

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h4">Cart</Typography>

        {products &&
          products.map(product => (
            <Grid item xs={12} key={product.id}>
              <Grid container>
                <Grid item xs={12}>
                  <Typography variant="h6">{product.name}</Typography>

                  <Typography variant="body1">{product.description}</Typography>

                  <Typography variant="body1">{product.cost}</Typography>

                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => removeFromCart(product.id)}
                  >
                    Remove
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          ))}
      </Grid>
    </Grid>
  );
};

const mapDispatch = dispatch => ({
  removeFromCart: productId => {
    dispatch(removeFromCart(productId));
  },
});

const mapState = state => {
  const cart = state.cart;
  return { cart };
};

export default connect(mapState, mapDispatch)(Cart);
