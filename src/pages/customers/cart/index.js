import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { removeFromCart, emptyCart } from '../../../store/redux/actions/cart';
import { Grid, Button, Typography } from '@mui/material';
import CartProductCard from '../../../components/cartProductCard';
import { makeStyles } from '@mui/styles';
import { useNavigate, useParams } from 'react-router-dom';

const useStyle = makeStyles(theme => ({
  productsContainer: {
    padding: '2rem 8rem',
    [theme.breakpoints.down('sm')]: {
      padding: '1rem',
      spacing: '5',
    },
  },
}));

const Cart = ({ cartProducts }) => {
  const classes = useStyle();
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [store, setStore] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const { storeUrl } = useParams();

  useEffect(() => {
    const storedCart = localStorage.getItem('MERCHPALS_CART');
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart);
      setSelectedProducts(parsedCart);
    }
  }, []);

  const handleCheckout = () => {
    navigate(`/checkout/${storeUrl}`);
  };

  const total = () => {
    let totalCartPrice = 0;
    for (let i = 0; i < selectedProducts.length; i++) {
      const product = selectedProducts[i];
      const quantities = product.productMappings.reduce((sum, cur) => sum + cur.quantity, 0);
      const productPrice = product.price * quantities;
      totalCartPrice = totalCartPrice + productPrice;
    }

    return totalCartPrice;
  };

  const updateQuantity = (productId, variantId, op) => {
    let updatedCart = [...selectedProducts];
    let updatedVariant = {};
    let updatedProduct = {};

    const prevProductIndex = selectedProducts.findIndex(v => v.productId === productId);
    const prevProduct = selectedProducts[prevProductIndex];

    const variantIndex = prevProduct.productMappings.findIndex(prv => prv.id === variantId);
    const variant = { ...prevProduct.productMappings[variantIndex] };
    let mappings = [...prevProduct.productMappings];

    if (op === 'add') {
      updatedVariant = {
        ...variant,
        quantity: variant.quantity + 1,
      };
    } else {
      const newQuantity = variant.quantity - 1 > -1 ? variant.quantity - 1 : 0;

      updatedVariant = {
        ...variant,
        quantity: newQuantity,
      };
    }

    mappings.splice(variantIndex, 1, updatedVariant);
    updatedProduct = {
      ...prevProduct,
      productMappings: mappings,
    };
    updatedCart.splice(prevProductIndex, 1, updatedProduct);
    setSelectedProducts(updatedCart);
    localStorage.setItem('MERCHPALS_CART', JSON.stringify(updatedCart));
  };

  const emptyCart = () => {
    localStorage.removeItem('MERCHPALS_CART');
    navigate(`/store/${storeUrl}`);
  };

  const removeFromCart = (productId, variantId) => {
    let updatedCart = {};

    const prevProduct = selectedProducts.find(v => v.productId === productId);
    let mappings = [...prevProduct.productMappings];
    mappings = mappings.filter(m => m.id !== variantId);

    updatedCart = {
      ...prevProduct,
      productMappings: [...mappings],
    };

    const otherProductVariants = selectedProducts.filter(cv => cv.productId !== productId);
    const updatedCartList = [updatedCart, ...otherProductVariants];
    setSelectedProducts(updatedCartList);
    localStorage.setItem('MERCHPALS_CART', JSON.stringify(updatedCartList));
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h3" align="center">
          Cart
        </Typography>
      </Grid>

      {selectedProducts.length > 0 && (
        <Grid item xs={12} display="flex" justifyContent="flex-end">
          <Button onClick={() => emptyCart()} variant="contained" color="error">
            Empty Cart
          </Button>
        </Grid>
      )}

      {selectedProducts.length > 0 ? (
        <Grid item md={12} xs={12} className={classes.productsContainer}>
          <Grid container spacing={2}>
            {selectedProducts.map(product =>
              product.productMappings.map(variant => (
                <Grid item md={4} xs={6} key={product.id}>
                  <CartProductCard
                    variant={variant}
                    name={product.name}
                    image={product.image}
                    price={product.price}
                    productId={product.productId}
                    updateQuantity={updateQuantity}
                    removeFromCart={removeFromCart}
                  />
                </Grid>
              )),
            )}
          </Grid>
          <Grid item md={12} display="flex" justifyContent="space-around" alignItems="center">
            <Typography variant="h5">Total: ${total()}</Typography>

            <Button onClick={handleCheckout} variant="contained" color="secondary">
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

export default Cart;
