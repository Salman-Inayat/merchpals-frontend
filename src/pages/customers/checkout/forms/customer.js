import { connect } from 'react-redux';
import {
  Grid,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Avatar,
  Button,
  ButtonGroup,
  Box,
  Tooltip,
  IconButton,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { makeStyles } from '@mui/styles';
import QuestionMark from '@mui/icons-material/QuestionMark';
import { addToCart, getCart } from '../../../../store/redux/actions/cart';


const useStyles = makeStyles(theme => ({
  accordian: {
    backgroundColor: '#0A0A0A',
    color: '#fff',
  },
  heading: {
    fontWeight: 'bold',
    fontSize: '16px',
    textTransform: 'uppercase',
  },
  avatar: {
    backgroundColor: '#000',
    width: '200px',
    height: '200px',
    [theme.breakpoints.down('sm')]: {
      width: '100px',
      height: '100px',
    },
  },
  removeBtn: {
    color: '#908687',
  },
  text: {
    color: '#7B7C78',
    fontSize: '16px',
    fontWeight: '600',
  },
  operatorBtn: {
    backgroundColor: '#E9ECEF',
    border: '1px solid rgba(145, 158, 171, 0.24)',
    color: 'rgba(145, 158, 171, 0.8)',
    '&:hover': {
      border: '1px solid rgba(145, 158, 171, 0.24)',
      color: 'rgba(145, 158, 171, 0.8)',
    },
  },
  separator: {
    color: '#F4F4F4',
    margin: '15px 0px',
  },
  infoBtn: {
    backgroundColor: '#000',
    width: '12px',
    height: '12px',
    marginLeft: '10px',
  },
  infoIcon: {
    width: '12px',
    color: 'white',
  },
  summaryText: {
    fontWeight: 'bolder',
    color: 'black',
    fontSize: '14px',
  },
  totalText: {
    fontWeight: 'bolder',
    fontSize: '14px',
    color: 'red',
  },
  imageCard: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  design: {
    position: 'absolute',
  },
}));

const Customer = ({ products = [], setProducts, addToCart, storeUrl, priceCalculation }) => {
  const classes = useStyles();
  const updateQuantity = (vendorProduct, variantId, op) => {
    let updatedCart = [...products];
    let updatedVariant = {};
    let updatedProduct = {};

    const prevProductIndex = products.findIndex(v => v.vendorProduct === vendorProduct);
    const prevProduct = products[prevProductIndex];

    const variantIndex = prevProduct.productMappings.findIndex(prv => prv.id === variantId);
    const variant = { ...prevProduct.productMappings[variantIndex] };
    let mappings = [...prevProduct.productMappings];

    if (op === 'add') {
      updatedVariant = {
        ...variant,
        quantity: variant.quantity + 1,
      };
    } else {
      const newQuantity = variant.quantity - 1 > -1 ? variant.quantity - 1 : 0;

      updatedVariant = {
        ...variant,
        quantity: newQuantity,
      };
    }

    mappings.splice(variantIndex, 1, updatedVariant);
    updatedProduct = {
      ...prevProduct,
      productMappings: mappings,
    };
    updatedCart.splice(prevProductIndex, 1, updatedProduct);

    setProducts(updatedCart);
    addToCart(storeUrl, updatedCart);
  };

  const removeFromCart = (vendorProduct, variantId) => {
    let updatedCart = {};

    const prevProduct = products.find(v => v.vendorProduct === vendorProduct);
    let mappings = [...prevProduct.productMappings];
    mappings = mappings.filter(m => m.id !== variantId);

    updatedCart = {
      ...prevProduct,
      productMappings: [...mappings],
    };

    const otherProductVariants = products.filter(cv => cv.vendorProduct !== vendorProduct);
    const updatedCartList = [updatedCart, ...otherProductVariants];

    setProducts(updatedCartList);
    addToCart(storeUrl, updatedCartList);
  };

  return (
    <Grid item>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon style={{ color: 'white' }} />}>
          <Typography className={classes.heading}>In your bag</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {products.map(product =>
            product.productMappings.map((variant, i) => (
              <Grid direction="row" xs={12} item container mt={2} key={`product-${i}`}>
                <Grid xs={4} item className={classes.imageCard}>
                  <Avatar
                    className={classes.avatar}
                    style={{ backgroundColor: variant.color === 'n/a' ? '#fff' : variant.color }}
                    src={product.image}
                    variant="square"
                  />
                  <Avatar className={classes.design} src={variant.design} variant="square" />
                </Grid>
                <Grid spacing={1} direction="column" container xs={5} item>
                  <Grid className={classes.text} item>
                    {' '}
                    Style: {product.name}{' '}
                  </Grid>
                  <Grid className={classes.text} item>
                    {' '}
                    Size: {variant.variant.toUpperCase()}{' '}
                  </Grid>
                  <Grid item>
                    <Box>
                      <ButtonGroup size="small" aria-label="small outlined button group">
                        <Button
                          onClick={() => updateQuantity(product.vendorProduct, variant.id, 'minus')}
                          className={classes.operatorBtn}
                        >
                          {' '}
                          -{' '}
                        </Button>
                        <Button disabled>{variant.quantity}</Button>
                        <Button
                          onClick={() => updateQuantity(product.vendorProduct, variant.id, 'add')}
                          className={classes.operatorBtn}
                        >
                          {' '}
                          +{' '}
                        </Button>
                      </ButtonGroup>
                    </Box>
                  </Grid>
                </Grid>
                <Grid xs={3} item>
                  <Button
                    className={classes.removeBtn}
                    onClick={() => removeFromCart(product.vendorProduct, variant.id)}
                  >
                    Remove
                  </Button>
                </Grid>
              </Grid>
            )),
          )}
          <hr className={classes.separator} />
          <Grid container rowSpacing={1}>
            <Grid justifyContent="space-between" item container>
              <Grid xs={6} alignItems="center" item container>
                <Typography className={classes.summaryText}>Sub Total</Typography>
                <Tooltip
                  placement="top"
                  describeChild
                  title="The subtotal reflects the total price of your order before including any shipping, costs, or 
taxes"
                >
                  <IconButton className={classes.infoBtn}>
                    <QuestionMark className={classes.infoIcon} />
                  </IconButton>
                </Tooltip>
              </Grid>
              <Grid xs={6} item>
                <Typography className={classes.summaryText} align="right">
                  ${priceCalculation.orderActualAmount}
                </Typography>
              </Grid>
            </Grid>

            <Grid justifyContent="space-between" item container>
              <Grid xs={6} alignItems="center" item container>
                <Typography className={classes.summaryText}>Estimated Shipping</Typography>
                <Tooltip placement="top" describeChild title="Shipping description">
                  <IconButton className={classes.infoBtn}>
                    <QuestionMark className={classes.infoIcon} />
                  </IconButton>
                </Tooltip>
              </Grid>
              <Grid xs={6} item>
                <Typography className={classes.summaryText} align="right">
                  {priceCalculation.shippingAmount === 'FREE'
                    ? 'FREE'
                    : `$${priceCalculation.shippingAmount}`}
                </Typography>
              </Grid>
            </Grid>
            <Grid justifyContent="space-between" item container>
              <Grid xs={6} alignItems="center" item container>
                <Typography className={classes.summaryText}>Estimated Cost</Typography>
                <Tooltip
                  placement="top"
                  describeChild
                  title="This covers the cost of Sales Tax, VAT, GST, QST, PST, and HST. Please check with your 
applicable state or local government for more information"
                >
                  <IconButton className={classes.infoBtn}>
                    <QuestionMark className={classes.infoIcon} />
                  </IconButton>
                </Tooltip>
              </Grid>
              <Grid xs={2} item>
                <Typography className={classes.summaryText} align="right">
                  ${priceCalculation.taxAmount}
                </Typography>
              </Grid>
            </Grid>
            <Grid justifyContent="space-between" item container>
              <Typography className={classes.summaryText}>Total</Typography>
              <Typography className={classes.totalText} align="right">
                ${priceCalculation.amountWithTaxAndShipping}
              </Typography>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Grid>
  );
};

const mapDispatch = dispatch => ({
  addToCart: (store, products) => dispatch(addToCart(store, products)),
})

const mapState = state => ({
  reduxCartProducts: state.cart.cart.products
})


export default connect(mapState, mapDispatch)(Customer)
