import { useEffect, useState } from "react";
import { 
  Grid,
  CardContent,
  Typography
} from "@mui/material";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useNavigate, useParams } from 'react-router-dom';
import {
  Customer,
  PaymentInfo,
  BillingAddress
} from './forms';
import axios from 'axios';
import { baseURL } from '../../../configs/const'

const Checkout = () => {
const [completedCustomerInfo, setCompletedCustomerInfo] = useState(false);
const [completedAddress, setCompletedAddress] = useState(false);
const [completedPayment, setCompletedPayment] = useState(false);
const [customer, setCustomer] = useState({});
const [billingAddress, setBillingAddress] = useState({});
const [payment, setPayment] = useState({});
const [cart, setCart] = useState({
  amount: 0,
  products: []
})
const [phoneNo, setPhoneNo] = useState('');
const [email, setEmail] = useState('');
const [formErrors, setFormErrors] = useState({
  phoneNo: '',
  message: ''
});
const [printfulMessage, setPrintfulMessage] = useState({
  tax: '',
  shipping: '',
})
const [loading, setLoading] = useState(false);
const [tax, setTax] = useState(0);
const [shippingCost, setShippingCost] = useState(0);
const [printfulData, setPrintfulData] = useState(null);

const { storeUrl } = useParams();
const navigate = useNavigate();

const total = (products) => {
  let totalCartPrice = 0;
  for(let i=0; i< products.length; i++){
    const product = products[i];
    const quantities = product.productMappings.reduce((sum, cur) => sum + cur.quantity, 0);
    const productPrice = product.price * quantities;
    totalCartPrice = totalCartPrice + productPrice;
  }

  return totalCartPrice;
}

useEffect(()=> {
  const storedCart = localStorage.getItem('MERCHPALS_CART')
  if (storedCart) {
    const products = JSON.parse(storedCart)
    // console.log({products});
    const amount = total(products);

    let formattedProducts = []
    for(let i = 0; i < products.length; i++){
      const product = products[i];
      const variantIds = product.productMappings.map(pm => pm.id)
      formattedProducts.push({
        productId: product.productId,
        productMappings: variantIds
      })
    }

    setCart({
      amount,
      products: formattedProducts,
      savedProducts: products
    })
  }
}, [])

useEffect(() => {
  if (billingAddress.country) {
    const { aptNo, street, zip, city, state, country } = billingAddress;
    let items = [];
    for(let i =0; i < cart.savedProducts.length; i++) {
      let curProduct = cart.savedProducts[i];
      for(let j=0; j < curProduct.productMappings.length; j++) {
        const curVariant = curProduct.productMappings[j];
        items.push({ quantity: curVariant.quantity, variant_id: 200 })
      }
    }
    const data = {      
      recipient: {
        address1: `${aptNo} ${street}`,
        city,
        country_code: country,
        state_code: state,
        zip
      },
      items
    }
    setPrintfulData(data)
    getTax(data);
    getShippingCost(data);
  }
}, [billingAddress.country, billingAddress.state, billingAddress.city, billingAddress.zip])

const getTax = async(data) => {
  axios.post(`${baseURL}/printful/calculate-tax`, { data })
  .then(response => {
    console.log(response.data.payload.rate);
    setTax(response.data.payload.rate)
    setPrintfulMessage({
      ...printfulMessage,
      tax: ''
    })
  })
  .catch(error => {
    console.log({ error: error.response.data });
    setPrintfulMessage({
      ...printfulMessage,
      tax: error.response.data.message
    })
  })
}

const getShippingCost = async (data) => {
  axios.post(`${baseURL}/printful/calculate-shipping`, { data })
  .then(response => {
    setPrintfulMessage({
      ...printfulMessage,
      shipping: ''
    })
    setShippingCost(response.data.payload.cost);
  })
  .catch(error => {
    console.log({ error: error.response.data });
    setPrintfulMessage({
      ...printfulMessage,
      shipping: error.response.data.message
    })
  })
}
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const markCustomerInfoComplete = (isCompleted) => setCompletedCustomerInfo(isCompleted);
const markAddressComplete = (isCompleted) => setCompletedAddress(isCompleted);
const markPaymentComplete = (isCompleted) => setCompletedPayment(isCompleted);

const placeOrder = (token) => {
  let error = false;
  let errors = {};
  if(!phoneNo.trim()){
    errors = {phoneNo: 'Please provide a phone number'}
    error = true
  }

  if (!email.trim()) {
    errors = {
      ...errors,
      email: 'Please provide an email'
    }
    error = true
   } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)    ) {
    errors = {
      ...errors,
      email: 'Please provide a valid email'
    }
    error = true
    }
  
    if(error){
      setFormErrors(errors)
      return 
    }
  const data = {
    printfulData,
    order: {
      storeUrl,
      amount: cart.amount,
      products: cart.products,
      billingAddress
    },
    customer: {
      ...customer,
      phoneNo,
      email
    },
    payment: {
      token: token.id,
      last4: token.card.last4
    }
  }
  console.log({data});
  setLoading(true)
  axios.post(`${baseURL}/order`, data)
    .then(response => {
      console.log({orderplacementResponse: response});
      setLoading(false)
      localStorage.removeItem('MERCHPALS_CART')
      navigate(`/store/${storeUrl}`)
    })
    .catch(error => {
      setLoading(false)
      console.log({ error });
    })
}
  return (
    <Grid justifyContent='space-between' alignItems='center' mt={12} p={3} container>
      <Grid xs={6} item>
        <Customer 
          markCustomerInfoComplete={markCustomerInfoComplete} 
          setCustomer={setCustomer}
        />
        
        {
          <BillingAddress 
            taxError={printfulMessage.tax}
            shippingError={printfulMessage.shipping}
            markAddressComplete={markAddressComplete} 
            setBillingAddress={setBillingAddress}
          />
        }

        { completedAddress && 
          <Elements stripe={stripePromise}>
            <PaymentInfo 
              completedCustomerInfo={completedCustomerInfo}
              completedAddress={completedAddress}
              placeOrder={placeOrder}
              setPhoneNo={setPhoneNo}
              setEmail={setEmail}
              setFormErrors={setFormErrors}
              phoneNo={phoneNo}
              email={email}
              formErrors={formErrors}
              loading={loading}
              setLoading={setLoading}
            />
          </Elements>
        }
      </Grid>
      <Grid xs={4} item>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Amount: {cart.amount}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Shipping Cost: {shippingCost}
          </Typography>
          <Typography  sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Tax: {tax}
          </Typography>
          <Typography  variant="h5" component="div">
            Total: {Number(cart.amount) + Number(tax) + Number(shippingCost)}
          </Typography>
        </CardContent>
      </Grid>
    </Grid>
  )
};

export { Checkout as default }