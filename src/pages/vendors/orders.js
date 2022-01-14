import { useEffect, useState } from 'react';
import axios from 'axios';
import { baseURL } from '../../configs/const';
import LoggedInVendor from '../../layouts/LoggedInVendor';

import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { useNavigate } from 'react-router-dom';

function VendorOrders() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  const [totalProfit, setTotalProfit] = useState(0);

  useEffect(() => {
    axios
      .get(`${baseURL}/vendor/orders`, {
        headers: {
          Authorization: localStorage.getItem('MERCHPAL_AUTH_TOKEN'),
        },
      })
      .then(res => {
        console.log(res.data.orders);
        let orderData = res.data.orders;
        setOrders(orderData);

        let total = 0;

        orderData.products.map(product => {
          const individualProfit =
            (product.minPrice - product.basePrice) * 0.75;
          total += individualProfit;
        });

        setTotalProfit(total);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const handleOrderClick = order => {
    navigate(`/vendor/orders/${order._id}`, {
      state: {
        order,
      },
    });
  };

  return (
    <LoggedInVendor>
      <Grid container>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Order No.</TableCell>
                <TableCell align="center">Customer</TableCell>
                <TableCell align="center">Products</TableCell>
                <TableCell align="center">Total Amount</TableCell>
                <TableCell align="center">Profit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order, index) => (
                <TableRow
                  key={order.id}
                  onClick={() => handleOrderClick(order)}
                  sx={{ cursor: 'pointer' }}
                >
                  <TableCell component="th" scope="row">
                    {index}
                  </TableCell>

                  <TableCell component="th" scope="row">
                    {order.customerId.firstName +
                      ' ' +
                      order.customerId.lastName}
                  </TableCell>

                  <TableCell component="th" scope="row">
                    {order.products.map(product => (
                      <div>{product.name}</div>
                    ))}
                  </TableCell>

                  <TableCell component="th" scope="row">
                    {totalProfit}
                  </TableCell>

                  <TableCell component="th" scope="row"></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </LoggedInVendor>
  );
}

export default VendorOrders;
