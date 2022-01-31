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

import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { calculateOrderProfit } from '../../configs/const';

function VendorOrderDetails() {
  //   const location = useLocation();
  //   const order = location.state.order;
  const navigate = useNavigate();
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
                          fontWeight="light"
                          component="h5"
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
                        Order added on:{' '}
                        {new Date(order.createdAt).toDateString()}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12}>
                  <Card>
                    <CardContent>
                      <Typography variant="p" component="p">
                        Order placed by:{' '}
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
