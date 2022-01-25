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
} from '@mui/material';
import moment from 'moment';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const TransactionHistory = ({ vendor, initiatePayout }) => {
  return (
    <Grid container spacing={2} p={3}>
      <Grid item md={12} xs={12} mb={3}>
        <Grid container spacing={2}>
          <Grid
            item
            md={5}
            xs={12}
            display="flex"
            flexDirection="row"
            justifyContent="flex-start"
            alignItems="center"
          >
            <AccountCircleIcon sx={{ fontSize: 80, marginRight: '10px' }} />
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="flex-start"
            >
              <Typography variant="p" component="p">
                Pilot since Jan, 2022
              </Typography>
              <Typography variant="p" component="p">
                joi dijo
              </Typography>
              <Typography variant="p" component="p" color="secondary">
                View stripe account
              </Typography>
            </Stack>
          </Grid>
          <Grid item md={2}>
            <Stack direction="column">
              <Typography variant="p" component="p">
                Pending Balance
              </Typography>
              <Typography variant="h4" component="p">
                $ 191.33
              </Typography>
              <Typography variant="p" component="p">
                4 transactions
              </Typography>
            </Stack>
          </Grid>
          <Grid item md={2}>
            <Stack direction="column">
              <Typography variant="p" component="p">
                Your Balance
              </Typography>
              <Typography variant="h4" component="p">
                $ 191.33
              </Typography>
              <Typography variant="p" component="p">
                $ 191.33 available
              </Typography>
            </Stack>
          </Grid>
          <Grid item md={3}>
            <Stack
              direction="column"
              alignItems="center"
              justifyContent="center"
            >
              <Button
                variant="outlined"
                onClick={initiatePayout}
                disabled={!vendor.balance > 0}
              >
                Payout Now
              </Button>
              <Button>View Payouts on Stripe</Button>
            </Stack>
          </Grid>
        </Grid>
      </Grid>

      <Grid item md={12} xs={12} p={3}>
        <Grid container spacing={2}>
          <Grid item md={12} xs={12}>
            <Typography>Transaction History</Typography>
          </Grid>
          <Grid item md={12} xs={12}>
            {vendor.transactions.length > 0 && (
              <TableContainer>
                <Table
                  sx={{ minWidth: 650 }}
                  size="small"
                  aria-label="a dense table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Name</TableCell>
                      <TableCell align="center">Date</TableCell>
                      <TableCell align="center">Release Date</TableCell>
                      <TableCell align="center">Status</TableCell>
                      <TableCell align="center">Amount</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {vendor.transactions.map(row => (
                      <TableRow
                        key={row._id}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                        }}
                      >
                        <TableCell align="center" scope="row">
                          <Stack direction="row" alignItems="center">
                            <AccountCircleIcon
                              sx={{ fontSize: 40, marginRight: '10px' }}
                            />
                            <Typography variant="p" component="p">
                              {vendor.displayName}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell
                          align="center"
                          scope="row"
                          style={{ width: '300px' }}
                        >
                          {moment(row.updatedAt).format('LLL')}
                        </TableCell>
                        <TableCell align="center" scope="row">
                          {moment(row.updatedAt).format('LLL')}
                        </TableCell>
                        <TableCell align="center" scope="row">
                          pending
                        </TableCell>
                        <TableCell align="center" scope="row">
                          {row.totalPayout}$
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default TransactionHistory;
