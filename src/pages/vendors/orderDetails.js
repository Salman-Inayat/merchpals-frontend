import { useEffect, useState } from 'react';
import axios from 'axios';
import { baseURL } from '../../configs/const';
import LoggedInVendor from '../../layouts/LoggedInVendor';

import { Typography, Grid, Card, CardMedia, CardContent } from '@mui/material';

import { useLocation, useParams } from 'react-router-dom';

function VendorOrderDetails() {
  //   const location = useLocation();
  //   const order = location.state.order;
  const [totalProfit, setTotalProfit] = useState(0);

  const [order, setOrder] = useState();
  const { orderId } = useParams();

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
        console.log(orderData);
        let total = 0;

        orderData.products.map(product => {
          const individualProfit =
            (product.minPrice - product.basePrice) * 0.75;
          total += individualProfit;
        });

        console.log(total);
        setTotalProfit(total);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <LoggedInVendor>
      <Grid container>
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
                  <Grid item xs={12} sm={6} md={6} lg={4}>
                    <Card>
                      <CardMedia
                        src={product.image}
                        height="100%"
                        component="img"
                      />
                      <CardContent style={{ padding: '5px' }}>
                        <Typography
                          gutterBottom
                          variant="h5"
                          component="h2"
                          align="center"
                        >
                          {product.name}
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
                  <Typography variant="p" component="p">
                    Total Products: {order.products.length}
                  </Typography>

                  <Typography variant="p" component="p">
                    Total Amount: {order.totalAmount}
                  </Typography>

                  <Typography variant="p" component="p">
                    Profit: {totalProfit.toFixed(2)}
                  </Typography>

                  <Typography variant="p" component="p">
                    Store Name: {order.storeId.name}
                  </Typography>

                  <Typography variant="p" component="p">
                    Order created at: {new Date(order.createdAt).toDateString()}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="p" component="p">
                    Customer:{' '}
                    {order.customerId.firstName +
                      ' ' +
                      order.customerId.lastName}
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

                  <Typography variant="p" component="p">
                    Order Status: {order.status}
                  </Typography>
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
