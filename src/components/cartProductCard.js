import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardMedia,
  Button,
  ButtonGroup,
  Stack,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  removeFromCart,
  addQuantity,
  subtractQuantity,
} from '../store/redux/actions/cart';

const useStyles = makeStyles(theme => ({
  productImage: {
    height: '100%',
  },
  container: {
    padding: '30px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      padding: '10px',
    },
  },
  button: {
    backgroundColor: 'red',
    marginTop: '20px',
  },
  productName: {
    color: '#0097a7',
    width: '90%',
    margin: 'auto',
    fontWeight: '500',
  },
}));

const CartProductCard = ({
  product,
  removeFromCart,
  addQuantity,
  subtractQuantity,
}) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
    addQuantity(product.id);
  };

  const handleDecrement = () => {
    setQuantity(quantity - 1);
    subtractQuantity(product.id);
  };

  return (
    <Box className={classes.container}>
      <Typography
        gutterBottom
        variant="h4"
        component="div"
        align="center"
        className={classes.productName}
      >
        {product.name}
      </Typography>
      <Card variant="outlined" className={classes.card}>
        <CardMedia
          component="img"
          image={`${product.image}`}
          alt="green iguana"
          className={classes.productImage}
        />
      </Card>
      <Stack direction="row" spacing={2} justify="space-between" align="center">
        <Box>
          <ButtonGroup size="small" aria-label="small outlined button group">
            <Button
              disabled={quantity == 1 ? true : false}
              onClick={handleDecrement}
            >
              -
            </Button>

            <Button disabled>{quantity}</Button>
            <Button onClick={handleIncrement}>+</Button>
          </ButtonGroup>
        </Box>
        <Button
          size="medium"
          variant="contained"
          onClick={() => removeFromCart(product.id)}
          className={classes.button}
        >
          <DeleteIcon />
        </Button>
      </Stack>
    </Box>
  );
};

const mapDispatch = dispatch => ({
  removeFromCart: productId => {
    dispatch(removeFromCart(productId));
  },
  addQuantity: productId => {
    dispatch(addQuantity(productId));
  },
  subtractQuantity: productId => {
    dispatch(subtractQuantity(productId));
  },
});

const mapState = state => {
  const cart = state.cart;
  return { cart };
};

export default connect(mapState, mapDispatch)(CartProductCard);
