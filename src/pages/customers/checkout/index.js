import { useEffect, useState } from 'react';
import { Grid, Avatar, Typography, Button } from '@mui/material';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useNavigate, useParams } from 'react-router-dom';

import { Customer, PaymentInfo, BillingAddress } from './forms';
import axios from 'axios';
import { baseURL } from '../../../configs/const';
import { makeStyles } from '@mui/styles';
import Lock from '../../../assets/images/icons/lock1.png';
const useStyles = makeStyles(theme => ({
  card: {
    boxShadow:
      '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
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

const Checkout = () => {
  const [completedCustomerInfo, setCompletedCustomerInfo] = useState(false);
  const [completedAddress, setCompletedAddress] = useState(false);
  const [completedPayment, setCompletedPayment] = useState(false);
  const [customer, setCustomer] = useState({});
  const [billingAddress, setBillingAddress] = useState({});
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
  // const [printfulMessage, setPrintfulMessage] = useState({
  //   tax: '',
  //   shipping: '',
  // })
  const [shippingError, setShippingError] = useState('');
  const [taxErrorStr, setTaxErrorStr] = useState('');
  const [loading, setLoading] = useState(false);
  const [tax, setTax] = useState(0);
  const [shippingCost, setShippingCost] = useState(0);
  const [printfulData, setPrintfulData] = useState(null);
  const classes = useStyles();
  const { storeUrl } = useParams();
  const navigate = useNavigate();

  const total = products => {
    let totalCartPrice = 0;
    let totalProfit = 0;

    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      const quantities = product.productMappings.reduce(
        (sum, cur) => sum + cur.quantity,
        0,
      );
      const productPrice = product.price * quantities;
      const productProfit = (product.price - product.basePrice) * quantities;

      totalCartPrice = totalCartPrice + productPrice;
      totalProfit = productProfit;
    }

    return [Number(totalCartPrice.toFixed(2)), Number(totalProfit.toFixed(2))];
  };

  useEffect(() => {
    const storedCart = localStorage.getItem('MERCHPALS_CART');
    if (storedCart) {
      const products = JSON.parse(storedCart);
      updateCart(products);
    }
  }, []);

  const updateCart = products => {
    console.log({ productsTo: products });
    const [amount, profit] = total(products);
    console.log({ amount, profit });
    let formattedProducts = [];
    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      const variantIds = product.productMappings.map(pm => pm.id);
      formattedProducts.push({
        productId: product.productId,
        productMappings: variantIds,
      });
    }

    setCart({
      amount,
      profit,
      products: formattedProducts,
      savedProducts: products,
    });
  };
  const updateTaxAndShipping = () => {
    if (billingAddress.country === 'US') {
      setShippingCost('Free');
    } else {
      setShippingCost(0);
    }
    if (billingAddress.country && billingAddress.state) {
      const { aptNo, street, zip, city, state, country } = billingAddress;
      let items = [];
      for (let i = 0; i < cart.savedProducts.length; i++) {
        let curProduct = cart.savedProducts[i];
        for (let j = 0; j < curProduct.productMappings.length; j++) {
          const curVariant = curProduct.productMappings[j];
          items.push({
            quantity: curVariant.quantity,
            variant_id: curVariant.variantId,
          });
        }
      }

      const data = {
        recipient: {
          address1: `${aptNo} ${street}`,
          city,
          country_code: country,
          state_code: state,
          zip,
        },
        items,
      };
      console.log({ items });
      setPrintfulData(data);
      getTax(data);
      if (billingAddress.country !== 'US') {
        getShippingCost(data);
      }
    }
  };

  useEffect(() => {
    updateTaxAndShipping();
  }, [
    completedAddress,
    billingAddress.country,
    billingAddress.state,
    billingAddress.zip,
  ]);

  const getTax = async data => {
    axios
      .post(`${baseURL}/printful/calculate-tax`, { data })
      .then(response => {
        // console.log({tax: response.data.payload.rate});
        setTax(response.data.payload.rate);
        setTaxErrorStr('');
      })
      .catch(err => {
        console.log({ errorTTax: err });
        setTaxErrorStr(err.response.data.message);
      });
  };
  // console.log({taxErrorStr});
  const getShippingCost = async data => {
    axios
      .post(`${baseURL}/printful/calculate-shipping`, { data })
      .then(response => {
        // console.log('shippingCost',response.data.payload.cost);
        setShippingError('');
        setShippingCost(response.data.payload.rate);
      })
      .catch(error => {
        console.log({ shippingError: error });
        setShippingError(error.response.data.message);
      });
  };
  const stripePromise = loadStripe(
    process.env.REACT_APP_STRIPE_PUBLISHABLE_CUSTOMER_KEY,
  );

  const markCustomerInfoComplete = isCompleted =>
    setCompletedCustomerInfo(isCompleted);
  const markAddressComplete = isCompleted => setCompletedAddress(isCompleted);
  const markPaymentComplete = isCompleted => setCompletedPayment(isCompleted);
  // console.log('cart.products',cart.products);
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

    const data = {
      printfulData,
      profit: cart.profit,
      order: {
        storeUrl,
        amount: cart.amount,
        products: cart.products,
        billingAddress,
      },
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
    console.log({ data });
    setLoading(true);
    axios
      .post(`${baseURL}/order`, data)
      .then(response => {
        // console.log({orderplacementResponse: response});
        setLoading(false);
        localStorage.removeItem('MERCHPALS_CART');
        navigate(`/store/${storeUrl}`);
      })
      .catch(error => {
        setLoading(false);
        console.log({ error });
      });
  };
  return (
    <Grid justifyContent="center" alignItems="center" mt={12} p={3} container>
      <Grid className={classes.card} xs={12} item>
        <Grid
          container
          alignItems="center"
          justifyContent="flex-end"
          xs={12}
          item
        >
          <Grid xs={5} item style={{ padding: '10px' }}>
            <Button className={classes.back} onClick={() => navigate(-1)}>
              {' '}
              Back{' '}
            </Button>
          </Grid>
          <Grid xs={6} item style={{ padding: '10px' }}>
            <Typography align="left" className={classes.heading}>
              Checkout
            </Typography>
          </Grid>
          <Grid xs={1} item>
            <Avatar src={Lock} style={{ width: '20px', height: '20px' }} />
          </Grid>
        </Grid>

        <Customer
          setCustomer={setCustomer}
          products={cart.savedProducts}
          setProducts={updateCart}
          tax={tax}
          shippingCost={shippingCost}
        />

        <BillingAddress
          taxError={taxErrorStr}
          shippingError={shippingError}
          markAddressComplete={markAddressComplete}
          setBillingAddress={setBillingAddress}
          updateTaxAndShipping={updateTaxAndShipping}
          setPhoneNo={setPhoneNo}
          setEmail={setEmail}
          setFormErrors={setFormErrors}
          phoneNo={phoneNo}
          email={email}
          formErrors={formErrors}
        />

        {completedAddress && (
          <Elements stripe={stripePromise}>
            <PaymentInfo
              completedAddress={completedAddress}
              placeOrder={placeOrder}
              loading={loading}
              setLoading={setLoading}
            />
          </Elements>
        )}
      </Grid>
    </Grid>
  );
};

export { Checkout as default };
