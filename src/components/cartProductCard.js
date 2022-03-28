import {
  Box,
  Typography,
  Card,
  CardMedia,
  Button,
  ButtonGroup,
  Stack,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';

const useStyles = makeStyles(theme => ({
  productImage: {
    height: '100%',
  },
  container: {
    padding: '30px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      padding: '10px',
    },
  },
  button: {
    backgroundColor: 'red',
    marginTop: '20px',
  },
  productName: {
    color: '#0097a7',
    width: '90%',
    margin: 'auto',
    fontWeight: '500',
  },
}));

const CartProductCard = ({
  productId,
  variant,
  removeFromCart,
  updateQuantity,
  name,
  image,
}) => {
  const classes = useStyles();
  const navigate = useNavigate();
  return (
    variant ? <Box className={classes.container}>
      <Typography
        gutterBottom
        variant="h4"
        component="div"
        align="center"
        className={classes.productName}
      >
        {name}
      </Typography>
      <Card variant="outlined" className={classes.card}>
        <CardMedia
          style={{backgroundColor: variant.color}}
          component="img"
          image={`${image}`}
          alt="green iguana"
          className={classes.productImage}
        />
      </Card>
      <Stack direction="row" spacing={2} justify="space-between" align="center">
        <Box>
          <ButtonGroup size="small" aria-label="small outlined button group">
            <Button
              disabled={variant.quantity == 1 ? true : false}
              onClick={() => updateQuantity(productId, variant.id, 'minus')}
            >
              -
            </Button>

            <Button disabled>{variant.quantity}</Button>
            <Button onClick={() => updateQuantity(productId, variant.id, 'add')}>+</Button>
          </ButtonGroup>
        </Box>
        <Button
          size="medium"
          variant="contained"
          onClick={() => removeFromCart(productId, variant.id)}
          className={classes.button}
        >
          <DeleteIcon />
        </Button>
      </Stack>
    </Box>
    : null
  );
};

export default CartProductCard;
