import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Grid, Avatar, Typography, Button, Stack } from '@mui/material';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useNavigate, useParams } from 'react-router-dom';
import { getCart, emptyCart } from '../../../store/redux/actions/cart';
import { Customer, PaymentInfo, BillingAddress } from './forms';
import axios from 'axios';
import { baseURL } from '../../../configs/const';
import { makeStyles } from '@mui/styles';
import Lock from '../../../assets/images/icons/lock1.png';
import {
  getInitializePriceCalculation,
  getPriceCalculation,
} from '../../../store/redux/actions/printful';
import { createOrder, resetOrder } from '../../../store/redux/actions/order';

const useStyles = makeStyles(theme => ({
  card: {
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    padding: '0rem  15rem',
    [theme.breakpoints.down('sm')]: {
      padding: '0rem  1rem',
    },
  },
  heading: {
    fontWeight: 'bolder',
    fontSize: '24px',
    color: 'black',
  },
  back: {
    color: '#000',
  },
}));

const Checkout = ({
  getCart = () => {},
  getPriceCalculation = () => {},
  getInitializePriceCalculation = () => {},
  priceCalculation = {},
  emptyCart = () => {},
  reduxCartProducts = [],
  createOrder = () => {},
  resetOrder = () => {},
  orderCreated,
}) => {
  const [completedCustomerInfo, setCompletedCustomerInfo] = useState(false);
  const [completedAddress, setCompletedAddress] = useState(false);
  const [completedPayment, setCompletedPayment] = useState(false);
  const [customer, setCustomer] = useState({});
  const [billingAddress, setBillingAddress] = useState({
    country: 'US',
    // state: 'NY',
    // zip: '10001',
  });
  const [payment, setPayment] = useState({});
  const [cart, setCart] = useState({
    amount: 0,
    profit: 0,
    products: [],
    savedProducts: [],
  });
  const [phoneNo, setPhoneNo] = useState('');
  const [email, setEmail] = useState('');
  const [formErrors, setFormErrors] = useState({
    phoneNo: '',
    message: '',
  });
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [region, setRegion] = useState('America');
  const [loading, setLoading] = useState(false);
  const [printfulData, setPrintfulData] = useState(null);
  const classes = useStyles();
  const { storeUrl } = useParams();
  const navigate = useNavigate();
  let initializepriceCalculation = 0;
  const total = products => {
    let totalCartPrice = 0;

    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      const quantities = product.productMappings.reduce((sum, cur) => sum + cur.quantity, 0);
      const productPrice = product.price * quantities;

      totalCartPrice = totalCartPrice + productPrice;
    }

    return Number(totalCartPrice.toFixed(2));
  };

  useEffect(() => {
    console.log('storeUrl', storeUrl);
    getCart(storeUrl);
    getCountries();
  }, []);
  let check = 0;
  useEffect(() => {
    if (cart && check === 0) {
      console.log('call', check);
      let items = [];
      let productPrice = 0;
      for (let i = 0; i < reduxCartProducts.length; i++) {
        let curProduct = reduxCartProducts[i];
        for (let j = 0; j < curProduct.productMappings.length; j++) {
          const curVariant = curProduct.productMappings[j];
          console.log('data', curVariant.quantity * curProduct.price);
          productPrice = productPrice + curProduct.price * curVariant.quantity;
        }
      }
      initializepriceCalculation = {
        orderActualAmount: Number(productPrice.toFixed(2)),
        amountWithTaxAndShipping: Number(productPrice.toFixed(2)),
      };
      if (initializepriceCalculation) {
        getInitializePriceCalculation(initializepriceCalculation);
      }
      check = 1;
    }
  }, [cart]);

  useEffect(() => {
    if (orderCreated) {
      emptyCart();
      resetOrder();
      navigate('/checkout/complete', { state: { customer: customer, storeUrl: storeUrl } });
    }
  }, [orderCreated]);
  const getCountries = () => {
    axios
      .get('https://api.countrystatecity.in/v1/countries', {
        headers: {
          'X-CSCAPI-KEY': process.env.REACT_APP_CSC_APIKEY,
        },
      })
      .then(response => setCountries(response.data))
      .catch(err => console.log({ err }));
  };

  const getStatesOfCountry = country => {
    axios
      .get(`https://api.countrystatecity.in/v1/countries/${country}/states`, {
        headers: {
          'X-CSCAPI-KEY': process.env.REACT_APP_CSC_APIKEY,
        },
      })
      .then(response => {
        const sortedStates = response.data.sort((a, b) => {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        });

        setStates(sortedStates);
      })
      .catch(err => console.log({ err }));
  };

  const updateCart = products => {
    setCart({
      savedProducts: products,
    });
  };

  useEffect(() => {
    const { zip, state, country } = billingAddress;
    if (zip?.length === 5 && country && state) {
      updateTaxAndShipping();
    }
  }, [cart, billingAddress]);

  useEffect(() => {
    updateCart(reduxCartProducts);
  }, [reduxCartProducts]);

  const initializePrice = () => {
    console.log('cart', reduxCartProducts);
    let items = [];
    let productPrice = 0;
    for (let i = 0; i < reduxCartProducts.length; i++) {
      let curProduct = reduxCartProducts[i];
      for (let j = 0; j < curProduct.productMappings.length; j++) {
        const curVariant = curProduct.productMappings[j];
        console.log('data', curVariant.quantity * curProduct.price);
        productPrice = productPrice + curProduct.price * curVariant.quantity;
      }
    }
    initializepriceCalculation = {
      orderActualAmount: Number(productPrice.toFixed(2)),
      amountWithTaxAndShipping: Number(productPrice.toFixed(2)),
    };
    if (initializepriceCalculation) {
      getInitializePriceCalculation(initializepriceCalculation);
    }

    // productPrice = items;
  };
  const updateTaxAndShipping = () => {
    const { aptNo, street, zip, city, state, country } = billingAddress;
    let items = [];
    console.log(cart);
    for (let i = 0; i < cart.savedProducts.length; i++) {
      let curProduct = cart.savedProducts[i];
      for (let j = 0; j < curProduct.productMappings.length; j++) {
        const curVariant = curProduct.productMappings[j];
        items.push({
          quantity: curVariant.quantity,
          vendorProduct: curProduct.vendorProduct,
          productMapping: curVariant.id,
          variant_id: curVariant.variantId,
        });
      }
    }

    const data = {
      recipient: {
        street,
        aptNo,
        address1: `${aptNo} ${street}`,
        city,
        country_code: country,
        state_code: state,
        country,
        state,
        zip,
      },
      items,
    };
    if (items.length > 0) {
      setPrintfulData(data);
      getPriceCalculation(data);
    }
  };

  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_CUSTOMER_KEY);

  const markAddressComplete = isCompleted => setCompletedAddress(isCompleted);

  const placeOrder = token => {
    let error = false;
    let errors = {};
    if (!phoneNo.trim()) {
      errors = { phoneNo: 'Please provide a phone number' };
      error = true;
    }

    if (!email.trim()) {
      errors = {
        ...errors,
        email: 'Please provide an email',
      };
      error = true;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors = {
        ...errors,
        email: 'Please provide a valid email',
      };
      error = true;
    }

    if (error) {
      setFormErrors(errors);
      return;
    }

    setLoading(true);

    const data = {
      printfulData,
      storeUrl,
      customer: {
        ...customer,
        phoneNo,
        email,
      },
      payment: {
        token: token.id,
        last4: token.card.last4,
      },
    };

    setCustomer(data.customer);

    createOrder(data);
  };

  return (
    <Grid justifyContent="center" alignItems="center" container className={classes.card}>
      <Grid xs={12} item pt={2}>
        <Grid container alignItems="center" justifyContent="flex-end" xs={12} item>
          <Grid item md={12} xs={12} p={2}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={4}>
              <Button className={classes.back} onClick={() => navigate(-1)}>
                Back
              </Button>
              <Typography align="left" className={classes.heading}>
                Checkout
              </Typography>
              <img src={Lock} style={{ width: '20px', height: '20px' }} />
            </Stack>
            {/* <Grid xs={5} item style={{ padding: '10px' }}>
            <Button className={classes.back} onClick={() => navigate(-1)}>
              Back
            </Button>
          </Grid>
          <Grid xs={6} item style={{ padding: '10px' }}>
            <Typography align="left" className={classes.heading}>
              Checkout
            </Typography>
          </Grid>
          <Grid xs={1} item>
            <img src={Lock} style={{ width: '20px', height: '20px' }} />
          </Grid> */}
          </Grid>
        </Grid>

        <Customer
          setCustomer={setCustomer}
          products={cart.savedProducts}
          setProducts={updateCart}
          priceCalculation={priceCalculation}
          initializepriceCalculation={initializepriceCalculation}
          storeUrl={storeUrl}
        />

        <BillingAddress
          taxError={priceCalculation.taxError}
          shippingError={priceCalculation.shippingError}
          markAddressComplete={markAddressComplete}
          setBillingAddress={setBillingAddress}
          updateTaxAndShipping={updateTaxAndShipping}
          setPhoneNo={setPhoneNo}
          setEmail={setEmail}
          setFormErrors={setFormErrors}
          phoneNo={phoneNo}
          email={email}
          formErrors={formErrors}
          setCustomer={setCustomer}
          countries={countries}
          states={states}
          getStatesOfCountry={getStatesOfCountry}
        />

        <Elements stripe={stripePromise}>
          <PaymentInfo
            completedAddress={completedAddress}
            placeOrder={placeOrder}
            loading={loading}
            setLoading={setLoading}
          />
        </Elements>
      </Grid>
    </Grid>
  );
};

const mapDispatch = dispatch => ({
  getCart: store => dispatch(getCart(store)),
  emptyCart: () => dispatch(emptyCart()),
  getPriceCalculation: data => dispatch(getPriceCalculation(data)),
  getInitializePriceCalculation: data => dispatch(getInitializePriceCalculation(data)),
  createOrder: data => dispatch(createOrder(data)),
  resetOrder: () => dispatch(resetOrder()),
});

const mapState = state => ({
  reduxCartProducts: state.cart.cart.products,
  priceCalculation: state.printful.priceCalculation,
  orderCreated: state.order.created,
});

export default connect(mapState, mapDispatch)(Checkout);
