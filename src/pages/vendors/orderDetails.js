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
  const [orderCreationDate, setOrderCreationDate] = useState();
  const [orderPayoutDate, setOrderPayoutDate] = useState();

  const [order, setOrder] = useState();
  const [designChange, setDesignChange] = useState({
    status: false,
    id: '',
  });
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
        const date = new Date(orderData.createdAt);
        setOrderCreationDate(date.toDateString());

        date.setDate(date.getDate() + 7);
        setOrderPayoutDate(date.toDateString());

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
                {order?.products?.map(product => (
                  <Grid key={product._id} item xs={12} sm={6} md={6} lg={4}>
                    <Typography sx={{ textAlign: 'center' }} variant="h5">
                      {product.vendorProduct.productId.name}
                    </Typography>
                    <Card>
                      <CardMedia
                        src={
                          designChange.status && designChange.id == product._id
                            ? product.vendorProduct.productId.name === 'Hoodie'
                              ? product.vendorProduct.productId.backImage
                              : product.vendorProduct.productId.name === 'Long Sleeve'
                              ? product.vendorProduct.productId.backImage
                              : product.vendorProduct.productId.name === 'Tee'
                              ? product.vendorProduct.productId.backImage
                              : product.vendorProduct.productId.image
                            : product.vendorProduct.productId.image
                        }
                        style={{
                          backgroundColor:
                            product.productMapping.color.label === 'white'
                              ? '#ffffff'
                              : product.productMapping.color.label === 'navy'
                              ? '#262d4f '
                              : product.productMapping.color.label === 'black'
                              ? '#121616'
                              : '',
                          backgroundImage:
                            product.vendorProduct.productId.name === 'Case' &&
                            `url(${
                              product.vendorProduct.designId.frontDesign.designImages[3].imageUrl ||
                              product.vendorProduct.designId.backDesign.designImages[1].imageUrl
                            })`,
                          backgroundSize:
                            product.vendorProduct.productId.name === 'Case' && '37% 80%',
                        }}
                        height="100%"
                        component="img"
                        onMouseOver={() => {
                          console.log('call');
                          if (
                            product?.vendorProduct?.designId?.backDesign?.designImages[1]
                              ?.imageUrl &&
                            product.vendorProduct.designId.frontDesign.designImages[4].imageUrl
                          ) {
                            product.vendorProduct.productId.name !== 'Case' &&
                              product.vendorProduct.productId.name !== 'Mug' &&
                              product.vendorProduct.productId.name !== 'Poster' &&
                              setDesignChange({
                                status: true,
                                id: product._id,
                              });
                          }
                        }}
                        onMouseLeave={() => {
                          if (
                            product?.vendorProduct?.designId?.backDesign?.designImages[1]
                              ?.imageUrl &&
                            product.vendorProduct.designId.frontDesign.designImages[4].imageUrl
                          ) {
                            product.vendorProduct.productId.name !== 'Case' &&
                              product.vendorProduct.productId.name !== 'Mug' &&
                              product.vendorProduct.productId.name !== 'Poster' &&
                              setDesignChange({
                                status: false,
                                id: product._id,
                              });
                          }
                        }}
                      />
                      {product?.vendorProduct?.designId &&
                        product.vendorProduct.productId.name !== 'Case' && (
                          <>
                            <img
                              src={
                                designChange.status && designChange.id == product._id
                                  ? product.vendorProduct.productId.name === 'Hoodie'
                                    ? product.vendorProduct.designId.backDesign.designImages[1]
                                        .imageUrl
                                    : product.vendorProduct.productId.name === 'Long Sleeve'
                                    ? product.vendorProduct.designId.backDesign.designImages[1]
                                        .imageUrl
                                    : product.vendorProduct.productId.name === 'Tee'
                                    ? product.vendorProduct.designId.backDesign.designImages[1]
                                        .imageUrl
                                    : product.vendorProduct.designId.frontDesign.designImages[4]
                                        .imageUrl
                                  : product.vendorProduct.designId.frontDesign.designImages[4]
                                      .imageUrl
                              }
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
                              onMouseOver={() => {
                                console.log('call');
                                if (
                                  product?.vendorProduct?.designId?.backDesign?.designImages[1]
                                    ?.imageUrl &&
                                  product.vendorProduct.designId.frontDesign.designImages[4]
                                    .imageUrl
                                ) {
                                  product.vendorProduct.productId.name !== 'Case' &&
                                    product.vendorProduct.productId.name !== 'Mug' &&
                                    product.vendorProduct.productId.name !== 'Poster' &&
                                    setDesignChange({
                                      status: true,
                                      id: product._id,
                                    });
                                }
                              }}
                              onMouseLeave={() => {
                                if (
                                  product?.vendorProduct?.designId?.backDesign?.designImages[1]
                                    ?.imageUrl &&
                                  product.vendorProduct.designId.frontDesign.designImages[4]
                                    .imageUrl
                                ) {
                                  product.vendorProduct.productId.name !== 'Case' &&
                                    product.vendorProduct.productId.name !== 'Mug' &&
                                    product.vendorProduct.productId.name !== 'Poster' &&
                                    setDesignChange({
                                      status: false,
                                      id: product._id,
                                    });
                                }
                              }}
                            />
                            <img src={product?.vendorProduct?.productId?.backImage} />
                          </>
                        )}
                      <CardContent style={{ padding: '5px' }}>
                        <Typography
                          gutterBottom
                          variant="body1"
                          fontWeight="light"
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
                        Products: {order.products.length}
                      </Typography>
                      {/* 
                      <Typography variant="p" component="p">
                        Total Amount: {order.totalAmount}$
                      </Typography> */}

                      <Typography variant="p" component="p">
                        Profit: ${totalProfit}
                      </Typography>

                      {/* <Typography variant="p" component="p">
                        Store Name: {order.storeId.name}
                      </Typography> */}

                      <Typography variant="p" component="p">
                        Order Placed: {orderCreationDate}
                      </Typography>

                      <Typography variant="p" component="p">
                        Ready to Payout: {orderPayoutDate}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12}>
                  <Card>
                    <CardContent>
                      <Typography variant="p" component="p">
                        Shipping to:{' '}
                        {order.billingAddress.aptNo
                          ? order.billingAddress.aptNo + ', '
                          : '' +
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
