import {
  Grid,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Stack,
  Card,
} from '@mui/material';
import moment from 'moment';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import axios from 'axios';
import { baseURL } from '../../../../configs/const';
import { makeStyles } from '@mui/styles';
import { fontSize } from '@mui/system';

const useStyles = makeStyles(theme => ({
  container: {
    padding: '1rem 14rem',
    [theme.breakpoints.down('sm')]: {
      padding: '2rem 0.5rem',
    },
  },
  card: {
    borderRadius: '5px',
    boxShadow: '0px 2px 3px rgba(0,0,0,0.2)',
  },
  buttonText: {
    color: '#116dff',
    cursor: 'pointer',
    fontSize: '0.8rem',
    fontWeight: 'medium',
  },
  payoutButtonContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  name: {
    fontSize: '1.5rem',
    fontWeight: 'light',
  },
  balance: {
    fontSize: '1.5rem',
    fontWeight: 'light',
  },

  payoutButton: {
    marginBottom: '10px',
  },
  tableHeading: {
    fontSize: '1.2rem',
    fontWeight: 'medium',
  },
  topText: {
    fontSize: '0.9rem',
    fontWeight: 'light',
  },
  lightText: {
    color: '#8e8e8e',
    fontSize: '0.8rem',
  },
  tableColumnHeading: {
    fontSize: '1rem',
  },
  tableRow: {
    height: '50px',
    [theme.breakpoints.down('sm')]: {
      height: '40px',
    },
  },
  tableLightText: {
    color: '#8e8e8e',
    fontSize: '0.9rem',
  },
}));

const TransactionHistory = ({
  vendor,
  initiatePayout,
  handleViewStripeDashboard,
  pendingBalance,
  transactionHistory,
}) => {
  const classes = useStyles();

  const callCronJob = () => {
    axios
      .get(`${baseURL}/cron-job`)
      .then(response => {
        console.log(response);
        alert('Escrow payment released successfully');
      })
      .catch(error => {
        console.log(error);
      });
  };

  console.log(vendor.transactions);
  const vendorTransaction = vendor.transactions.filter(
    transaction => transaction.status === 'succeeded',
  );

  console.log(vendorTransaction);

  return (
    <Grid container spacing={2} className={classes.container}>
      <Grid item md={12} xs={12} mb={3}>
        <Grid container spacing={2}>
          <Grid
            item
            md={6}
            xs={12}
            display="flex"
            flexDirection="row"
            justifyContent="flex-start"
            alignItems="center"
          >
            <AccountCircleIcon
              sx={{ fontSize: 60, marginRight: '10px', color: '#cfd7df' }}
            />
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="flex-start"
            >
              <Typography className={classes.name}>
                {vendor.displayName}
              </Typography>

              <Typography
                onClick={handleViewStripeDashboard}
                className={classes.buttonText}
              >
                View stripe account
              </Typography>
            </Stack>
          </Grid>
          <Grid item md={2} xs={6}>
            <Stack direction="column">
              <Typography variant="p" component="p" className={classes.topText}>
                Pending Balance
              </Typography>
              <Typography className={classes.balance}>
                ${pendingBalance.pendingBalance.toFixed(2)}
              </Typography>
              <Typography
                variant="p"
                component="p"
                className={classes.lightText}
              >
                {pendingBalance.numberOfTransactions} transactions
              </Typography>
            </Stack>
          </Grid>
          <Grid item md={2} xs={6}>
            <Stack direction="column">
              <Typography variant="p" component="p" className={classes.topText}>
                Your Balance
              </Typography>
              <Typography className={classes.balance}>
                ${vendor.balance.toFixed(2)}
              </Typography>
              <Typography
                variant="p"
                component="p"
                className={classes.lightText}
              >
                ${vendor.balance.toFixed(2)} available
              </Typography>
            </Stack>
          </Grid>
          <Grid item md={2} xs={12}>
            <Stack direction="column" className={classes.payoutButtonContainer}>
              <Button
                onClick={initiatePayout}
                disabled={!vendor.balance > 0}
                fullWidth
                className={classes.payoutButton}
                variant="contained"
                color="primary"
              >
                Payout Now
              </Button>
              <Typography
                className={classes.buttonText}
                onClick={handleViewStripeDashboard}
                align="center"
              >
                View Payouts on Stripe
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Grid>
      <Grid item md={12} xs={12}>
        <Button
          onClick={callCronJob}
          fullWidth
          variant="contained"
          color="primary"
        >
          Testing purpose: Release Escrow payments
        </Button>
      </Grid>

      <Grid item md={12} xs={12} p={3}>
        <Grid container spacing={2}>
          <Grid item md={12} xs={12}>
            {transactionHistory.length > 0 && (
              <Grid container spacing={2}>
                <Grid item md={12} xs={12}>
                  <Typography className={classes.tableHeading}>
                    Escrow Details
                  </Typography>
                </Grid>
                <Grid item md={12} xs={12}>
                  <Card className={classes.card}>
                    <TableContainer>
                      <Table
                        sx={{ minWidth: 650 }}
                        size="small"
                        aria-label="a dense table"
                      >
                        <TableHead>
                          <TableRow className={classes.tableRow}>
                            <TableCell
                              align="center"
                              className={classes.tableColumnHeading}
                            >
                              Date
                            </TableCell>
                            <TableCell
                              align="center"
                              className={classes.tableColumnHeading}
                            >
                              Release Date
                            </TableCell>
                            <TableCell
                              align="center"
                              className={classes.tableColumnHeading}
                            >
                              Status
                            </TableCell>
                            <TableCell
                              align="center"
                              className={classes.tableColumnHeading}
                            >
                              Amount
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {transactionHistory.map(transaction => (
                            <TableRow
                              key={transaction._id}
                              sx={{
                                '&:last-child td, &:last-child th': {
                                  border: 0,
                                },
                              }}
                              className={classes.tableRow}
                            >
                              <TableCell
                                align="center"
                                scope="row"
                                className={classes.tableLightText}
                              >
                                {moment(transaction.updatedAt).format('LLL')}
                              </TableCell>
                              <TableCell
                                align="center"
                                scope="row"
                                className={classes.tableLightText}
                              >
                                {moment(transaction.releaseDate).format('LLL')}
                              </TableCell>
                              <TableCell
                                align="center"
                                scope="row"
                                className={classes.tableLightText}
                              >
                                {transaction.status}
                              </TableCell>
                              <TableCell
                                align="center"
                                scope="row"
                                className={classes.tableLightText}
                              >
                                $ {transaction.vendorProfit.toFixed(2)}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Card>
                </Grid>
              </Grid>
            )}
          </Grid>
          <Grid item md={12} xs={12} mt={4}>
            {vendorTransaction.length > 0 && (
              <Grid container spacing={2}>
                <Grid item md={12} xs={12}>
                  <Typography className={classes.tableHeading}>
                    Transaction history
                  </Typography>
                </Grid>
                <Grid item md={12} xs={12}>
                  <Card className={classes.card}>
                    <TableContainer>
                      <Table
                        sx={{ minWidth: 650 }}
                        size="small"
                        aria-label="a dense table"
                      >
                        <TableHead>
                          <TableRow className={classes.tableRow}>
                            <TableCell align="center">Name</TableCell>
                            <TableCell align="center">Date</TableCell>
                            <TableCell align="center">Status</TableCell>
                            <TableCell align="center">Amount</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {vendorTransaction.map(row => (
                            <TableRow
                              key={row._id}
                              sx={{
                                '&:last-child td, &:last-child th': {
                                  border: 0,
                                },
                              }}
                              className={classes.tableRow}
                            >
                              <TableCell align="center" scope="row">
                                <Stack direction="row" alignItems="center">
                                  <AccountCircleIcon
                                    sx={{
                                      fontSize: 30,
                                      marginRight: '10px',
                                      color: '#cfd7df',
                                    }}
                                  />
                                  <Typography variant="p" component="p">
                                    {vendor.displayName}
                                  </Typography>
                                </Stack>
                              </TableCell>
                              <TableCell
                                align="center"
                                scope="row"
                                className={classes.tableLightText}
                              >
                                {moment(row.updatedAt).format('LLL')}
                              </TableCell>

                              <TableCell
                                align="center"
                                scope="row"
                                className={classes.tableLightText}
                              >
                                {row.status}
                              </TableCell>
                              <TableCell
                                align="center"
                                scope="row"
                                className={classes.tableLightText}
                              >
                                $ {row.totalPayout}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Card>
                </Grid>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default TransactionHistory;
