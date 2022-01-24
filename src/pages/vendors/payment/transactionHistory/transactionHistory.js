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
} from '@mui/material';
import moment from 'moment';

const TransactionHistory = ({ vendor, initiatePayout }) => {
  return (
    <Grid>
      <Button variant="outlined" onClick={initiatePayout}>
        Payout Now
      </Button>
      <Grid container>
        {vendor.transactions.length > 0 && (
          <TableContainer>
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>Transaction History</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {vendor.transactions.map(row => (
                  <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{vendor.displayName}</TableCell>
                    <TableCell align="right">
                      {moment(row.updatedAt).format('LLL')}
                    </TableCell>
                    <TableCell align="right">{row.totalPayout}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Grid>
    </Grid>
  );
};

export default TransactionHistory;
