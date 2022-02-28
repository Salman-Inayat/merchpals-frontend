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
  CardHeader,
} from '@mui/material';
import { makeStyles } from '@mui/styles';

import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { calculateOrderProfit } from '../../configs/const';

const useStyles = makeStyles(theme => ({
  design: {
    position: 'absolute',
    top: '35%',
    left: '49%',
    transform: 'translate(-50%, -50%)',
    height: '60px',
    width: '60px',
    [theme.breakpoints.down('sm')]: {
      height: '90px',
      width: '90px',
    },
  },
  poster: {
    height: '106px',
    width: '106px',
    borderRadius: '5px',
    top: '40%',
    left: '50%',
    [theme.breakpoints.down('sm')]: {
      height: '200px',
      width: '200px',
      top: '44%',
    },
  },
  phoneCase: {
    height: '60px',
    width: '60px',
    top: '43%',
    [theme.breakpoints.down('sm')]: {
      height: '100px',
      width: '100px',
      top: '45%',
    },
  },
  mug: {
    height: '60px',
    width: '60px',
    top: '44%',
    left: '52%',
    [theme.breakpoints.down('sm')]: {
      height: '100px',
      width: '100px',
      top: '48%',
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

        setOrder(orderData);

        const profit = calculateOrderProfit(orderData);
        setTotalProfit(profit);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);
  console.log({ order });
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
                    <Typography sx={{ textAlign: 'center' }} variant="h5">
                      {product.vendorProduct.productId.name}
                    </Typography>
                    <Card>
                      <CardMedia
                        src={product.vendorProduct.productId.image}
                        style={{
                          backgroundColor:
                            product.productMapping.color.label === 'white'
                              ? '#ffffff'
                              : product.productMapping.color.label === 'navy'
                              ? '#262d4f '
                              : color.label === 'black'
                              ? '#121616'
                              : '',
                        }}
                        height="100%"
                        component="img"
                      />
                      {product?.vendorProduct?.designId && (
                        <img
                          src={product.vendorProduct.designId.designImages[4].imageUrl}
                          className={[
                            classes.design,
                            product.vendorProduct.productId.name === 'Poster'
                              ? classes.poster
                              : product.vendorProduct.productId.name === 'Case'
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
                          variant="bosy1"
                          fontWeight="light"
                          component="body1"
                          textAlign="center"
                        >
                          {`Total quantity: ${product.quantity}`}
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
                        Total Amount: {order.totalAmount}$
                      </Typography>

                      <Typography variant="p" component="p">
                        Profit: {totalProfit}$
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
