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
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';

function VendorOrders() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  const [totalProfit, setTotalProfit] = useState(0);
  let rows = [];

  const columns = [
    { field: 'no', headerName: 'Order No', width: 70 },
    { field: 'customer', headerName: 'Customer', width: 130 },
    { field: 'products', headerName: 'Products', width: 130 },
    {
      field: 'totalAmount',
      headerName: 'Total Amount',
      type: 'number',
      width: 90,
    },
    {
      field: 'profit',
      headerName: 'Profit',
      type: 'number',
    },
    {
      field: 'createdAt',
      headerName: 'Created At',
      type: 'date',
    },
  ];

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

        // orderData.map(order => {
        //   rows.push({
        //     no: order.orderId,
        //     customer:
        //       order.customerId.firstName + ' ' + order.customerId.lastName,
        //     products: order.products.length,
        //     totalAmount: order.totalAmount,
        //     profit: order.totalAmount,
        //     createdAt: order.createdAt,
        //   });
        //   console.log('Rows: ', rows);
        // });
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

  const Profit = order => {
    // const profit =
    //   order.products.reduce(
    //     (sum, curr) => sum + (curr.minPrice - curr.basePrice),
    //     0,
    //   ) * 0.75;

    // return profit.toFixed(2);

    const orderPrice = order.price;
    const productsTotal = order.products.reduce(
      (sum, curr) => sum + curr.basePrice,
      0,
    );

    const profit = orderPrice - productsTotal;

    return profit.toFixed(2);
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
                <TableCell align="center">Added</TableCell>
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
                    {index + 1}
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
                    {order.totalAmount.toFixed(2)}
                  </TableCell>

                  <TableCell component="th" scope="row">
                    {Profit(order)}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {new Date(order.createdAt).toDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* {rows.length > 0 && (
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
          />
        )} */}
      </Grid>
    </LoggedInVendor>
  );
}

export default VendorOrders;
