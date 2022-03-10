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
  Stack,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { makeStyles } from '@mui/styles';
import QuestionMark from '@mui/icons-material/QuestionMark';
import { addToCart, getCart } from '../../../../store/redux/actions/cart';
import { useState } from 'react';
import BackLong from '../../../../assets/images/back-long.png';
import BackTee from '../../../../assets/images/back-tee.png';
import BackHoodie from '../../../../assets/images/Back-hoodie.png';
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
    textTransform: 'none',
    borderBottom: '2px solid transparent',
    borderRadius: '0px',
    padding: '8px 0px',
    height: '20px',
    marginBottom: '6px',
    transition: theme.transitions.create(['border-bottom'], {
      duration: 500,
    }),
    '&:hover': {
      textDecoration: 'none',
      backgroundColor: 'transparent',
      borderBottom: '2px solid black',
    },
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
  const [showTooltip, setShowToolTip] = useState({
    estimate: false,
    subTotal: false,
  });
  const [designChange, setDesignChange] = useState({
    status: false,
    id: '',
  });

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
    let updatedCartList = [];

    const prevProduct = products.find(v => v.vendorProduct === vendorProduct);
    const otherProductVariants = products.filter(cv => cv.vendorProduct !== vendorProduct);

    let mappings = [...prevProduct.productMappings];
    mappings = mappings.filter(m => m.id !== variantId);

    if (mappings.length > 0) {
      updatedCart = {
        ...prevProduct,
        productMappings: [...mappings],
      };

      updatedCartList = [updatedCart, ...otherProductVariants];
    } else {
      updatedCartList = [...otherProductVariants];
    }

    setProducts(updatedCartList);
    addToCart(storeUrl, updatedCartList);
  };
  console.log('product', products);
  return (
    <Accordion defaultExpanded>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon style={{ color: 'white' }} />}
        className={classes.accordian}
      >
        <Typography className={classes.heading}>In your bag</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {products.map(product =>
          product.productMappings.map((variant, i) => (
            <Grid direction="row" xs={12} item container mt={2} key={`product-${i}`}>
              {console.log('variant', variant, i)}
              <Grid item xs={9} container>
                <Stack
                  className={classes.imageCard}
                  onMouseOver={() => {
                    console.log('call');
                    if (variant.backDesign && variant.design) {
                      product.name !== 'Case' &&
                        product.name !== 'Mug' &&
                        product.name !== 'Poster' &&
                        setDesignChange({
                          status: true,
                          id: variant.id,
                        });
                    }
                  }}
                  onMouseLeave={() => {
                    if (variant.backDesign && variant.design) {
                      product.name !== 'Case' &&
                        product.name !== 'Mug' &&
                        product.name !== 'Poster' &&
                        setDesignChange({
                          status: false,
                          id: variant.id,
                        });
                    }
                  }}
                >
                  <Avatar
                    className={classes.avatar}
                    style={{
                      backgroundColor:
                        variant.color === 'n/a'
                          ? '#fff'
                          : variant.color === 'white'
                          ? '#ffffff'
                          : variant.color === 'navy'
                          ? '#262d4f '
                          : variant.label === 'black'
                          ? '#121616'
                          : '',
                      backgroundImage: product.name === 'Case' && `url(${variant.design})`,
                      backgroundSize: '37% 80%',
                    }}
                    src={
                      product.name === 'Case'
                        ? '/assets/img/FINALCASE.png'
                        : designChange.status && designChange.id == variant.id
                        ? product.name === 'Hoodie'
                          ? BackHoodie
                          : product.name === 'Long Sleeve'
                          ? BackLong
                          : product.name === 'Tee'
                          ? BackTee
                          : product.image
                        : product.image
                    }
                    variant="square"
                  />
                  <Avatar
                    className={classes.design}
                    src={
                      designChange.status && designChange.id == variant.id
                        ? product.name === 'Hoodie'
                          ? variant.backDesign
                          : product.name === 'Long Sleeve'
                          ? variant.backDesign
                          : product.name === 'Tee'
                          ? variant.backDesign
                          : variant.design
                        : variant.design
                    }
                    variant="square"
                  />
                </Stack>
                <Stack direction="column" ml={{ md: 2, xs: 1 }}>
                  <Typography className={classes.text}> Style: {product.name}</Typography>
                  <Typography className={classes.text}>
                    {' '}
                    Size: {variant.variant.toUpperCase()}{' '}
                  </Typography>

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
                </Stack>
              </Grid>
              <Grid xs={3} item display="flex" justifyContent="flex-end">
                <Button
                  classes={{
                    root: classes.removeBtn,
                  }}
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
                open={showTooltip.subTotal}
                onOpen={() => setShowToolTip({ subTotal: true })}
                onClose={() => setShowToolTip({ subTotal: false })}
                title="The subtotal reflects the total price of your order before including any shipping, costs, or 
taxes"
              >
                <IconButton className={classes.infoBtn}>
                  <QuestionMark
                    className={classes.infoIcon}
                    onClick={() =>
                      setShowToolTip({
                        subTotal: !showTooltip.subTotal,
                      })
                    }
                  />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid xs={6} item>
              <Typography className={classes.summaryText} align="right">
                $
                {priceCalculation.orderActualAmount
                  ? priceCalculation.orderActualAmount.toFixed(2)
                  : 0}
              </Typography>
            </Grid>
          </Grid>

          <Grid justifyContent="space-between" item container>
            <Grid xs={6} alignItems="center" item container>
              <Typography className={classes.summaryText}>Estimated Shipping</Typography>
            </Grid>
            <Grid xs={6} item>
              <Typography className={classes.summaryText} align="right">
                {priceCalculation.shippingAmount === 'FREE'
                  ? 'FREE'
                  : `$${
                      priceCalculation.shippingAmount ? priceCalculation.shippingAmount : 'FREE'
                    }`}
              </Typography>
            </Grid>
          </Grid>
          <Grid justifyContent="space-between" item container>
            <Grid xs={6} alignItems="center" item container>
              <Typography className={classes.summaryText}>Estimated Cost</Typography>
              <Tooltip
                placement="top"
                describeChild
                open={showTooltip.estimate}
                onOpen={() => setShowToolTip({ estimate: true })}
                onClose={() => setShowToolTip({ estimate: false })}
                title="This covers the cost of Sales Tax, VAT, GST, QST, PST, and HST. Please check with your 
applicable state or local government for more information"
              >
                <IconButton
                  className={classes.infoBtn}
                  onClick={() =>
                    setShowToolTip({
                      estimate: !showTooltip.estimate,
                    })
                  }
                >
                  <QuestionMark className={classes.infoIcon} />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid xs={2} item>
              <Typography className={classes.summaryText} align="right">
                ${priceCalculation.taxAmount ? priceCalculation.taxAmount.toFixed(2) : 0}
              </Typography>
            </Grid>
          </Grid>
          <Grid justifyContent="space-between" item container>
            <Typography className={classes.summaryText}>Total</Typography>
            <Typography className={classes.totalText} align="right">
              $
              {priceCalculation.amountWithTaxAndShipping
                ? priceCalculation.amountWithTaxAndShipping.toFixed(2)
                : 0}
            </Typography>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

const mapDispatch = dispatch => ({
  addToCart: (store, products) => dispatch(addToCart(store, products)),
});

const mapState = state => ({
  reduxCartProducts: state.cart.cart.products,
});

export default connect(mapState, mapDispatch)(Customer);
