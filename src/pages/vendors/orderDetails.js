import { useEffect, useState } from 'react';
import axios from 'axios';
import { baseURL } from '../../configs/const';
import LoggedInVendor from '../../layouts/LoggedInVendor';
import BackButton from '../../components/backButton';

import {
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Paper,
  Button,
} from '@mui/material';
import { makeStyles } from '@mui/styles';

import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { calculateOrderProfit } from '../../configs/const';

const useStyles = makeStyles(theme => ({
  design: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    height: '100px',
    width: '100px',
    [theme.breakpoints.down('sm')]: {
      height: '70px',
      width: '70px',
    },
  },
  poster: {
    height: '190px',
    width: '190px',
    borderRadius: '5px',
    [theme.breakpoints.down('sm')]: {
      height: '130px',
      width: '130px',
    },
  },
  phoneCase: {
    height: '80px',
    width: '80px',
    [theme.breakpoints.down('sm')]: {
      height: '60px',
      width: '60px',
      top: '52%',
    },
  },
  mug: {
    height: '90px',
    width: '90px',
    top: '55%',
    left: '52%',
    [theme.breakpoints.down('sm')]: {
      height: '60px',
      width: '60px',
    },
  },
  productImage: {
    height: '100%',
  },
}));

function VendorOrderDetails() {
  //   const location = useLocation();
  //   const order = location.state.order;
  const navigate = useNavigate();
  const [totalProfit, setTotalProfit] = useState(0);

  const [order, setOrder] = useState();
  const { orderId } = useParams();
  const classes = useStyles();

  useEffect(() => {
    axios
      .get(`${baseURL}/vendor/orders/${orderId}`, {
        headers: {
          Authorization: localStorage.getItem('MERCHPAL_AUTH_TOKEN'),
        },
      })
      .then(res => {
        const orderData = res.data.order;
        console.log({ orderData });
        setOrder(orderData);

        const profit = calculateOrderProfit(orderData);
        setTotalProfit(profit);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <LoggedInVendor>
      <Grid container>
        <BackButton />
        <Grid item xs={12}>
          <Typography variant="h4" component="h1" gutterBottom>
            Order Details
          </Typography>
        </Grid>
        {order && (
          <Grid container>
            <Grid item md={6} xs={12}>
              <Grid container spacing={4} p={4}>
                {order.products.map(product => (
                  <Grid key={product._id} item xs={12} sm={6} md={6} lg={4}>
                    <Card>
                      <CardMedia
                        src={product.vendorProduct.productId.image}
                        style={{ backgroundColor: product.productMapping.color.label }}
                        height="100%"
                        component="img"
                      />
                      {product?.vendorProduct?.designId && (
                        <img
                          src={product.vendorProduct.designId.url}
                          className={[
                            classes.design,
                            product.vendorProduct.productId.name === 'Poster'
                              ? classes.poster
                              : product.vendorProduct.productId.name === 'Phone Case'
                              ? classes.phoneCase
                              : product.vendorProduct.productId.name === 'Mug'
                              ? classes.mug
                              : '',
                          ].join(' ')}
                        />
                      )}
                      <CardContent style={{ padding: '5px' }}>
                        <Typography
                          gutterBottom
                          variant="h5"
                          fontWeight="light"
                          component="h5"
                          align="center"
                        >
                          {product.vendorProduct.productId.name}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid item md={6} xs={12}>
              <Grid container spacing={4} p={4}>
                <Grid item xs={12}>
                  <Card>
                    <CardContent>
                      <Typography variant="p" component="p">
                        Total Products: {order.products.length}
                      </Typography>

                      <Typography variant="p" component="p">
                        Total Amount: {order.totalAmount}
                      </Typography>

                      <Typography variant="p" component="p">
                        Profit: {totalProfit}
                      </Typography>

                      <Typography variant="p" component="p">
                        Store Name: {order.storeId.name}
                      </Typography>

                      <Typography variant="p" component="p">
                        Order added on: {new Date(order.createdAt).toDateString()}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12}>
                  <Card>
                    <CardContent>
                      <Typography variant="p" component="p">
                        Order placed by: {order.customer.firstName + ' ' + order.customer.lastName}
                      </Typography>
                      <Typography variant="p" component="p">
                        Billing Address:{' '}
                        {order.billingAddress.aptNo +
                          ', ' +
                          order.billingAddress.street +
                          ', ' +
                          order.billingAddress.city +
                          ', ' +
                          order.billingAddress.state +
                          ', ' +
                          order.billingAddress.country}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        )}
      </Grid>
    </LoggedInVendor>
  );
}

export default VendorOrderDetails;
