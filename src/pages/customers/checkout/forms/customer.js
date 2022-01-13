import { useEffect, useState } from "react";
import * as Yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Grid,
  Stack,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Avatar,
  Button,
  ButtonGroup,
  Box,
  Tooltip,
  IconButton
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { makeStyles } from '@mui/styles';
import QuestionMark from '@mui/icons-material/QuestionMark';

const useStyles = makeStyles(theme => ({
  accordian: {
    backgroundColor: '#0A0A0A',
    color: '#fff',
  },
  heading: {
    fontWeight: 'bold',
    fontSize: '16px',
    textTransform: 'uppercase'
  },
  avatar: {
    backgroundColor: '#000',
    width: '200px',
    height: '200px'
  },
  removeBtn: {
    color: '#908687'
  },
  text: {
    color: '#7B7C78',
    fontSize: '16px',
    fontWeight: '600'
  },
  operatorBtn: {
    backgroundColor: '#E9ECEF',
    border: '1px solid rgba(145, 158, 171, 0.24)',
    color: 'rgba(145, 158, 171, 0.8)',
    '&:hover': {
      border: '1px solid rgba(145, 158, 171, 0.24)',
    color: 'rgba(145, 158, 171, 0.8)'
    }
  },
  separator: {
    color: '#F4F4F4',
    margin: '15px 0px',
  },
  infoBtn: {
    backgroundColor: '#000',
    width: '12px',
    height: '12px',
    marginLeft: '10px'
  },
  infoIcon: {
    width: '12px',
    color: 'white'
  },
  summaryText: {
    fontWeight: 'bolder',
    color: 'black',
    fontSize: '14px'
  },
  totalText: {
    fontWeight: 'bolder',
    fontSize: '14px',
    color: 'red'
  },
  imageCard: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  },
  design: {
    position: 'absolute'
  }
}));

const Customer = ({
  products = [],
  setProducts,
  tax,
  shippingCost
}) => {

  const classes = useStyles();
  const updateQuantity = (productId, variantId, op) => {
    let updatedCart = [...products];
    let updatedVariant = {};
    let updatedProduct = {};

    const prevProductIndex = products.findIndex(v => v.productId === productId);
    const prevProduct = products[prevProductIndex];

    const variantIndex = prevProduct.productMappings.findIndex(prv => prv.id === variantId)
    const variant = {...prevProduct.productMappings[variantIndex]}
    let mappings = [...prevProduct.productMappings]


     if (op === 'add') {
       console.log('add - operator');
        updatedVariant =  {
          ...variant,
          quantity: variant.quantity + 1
        }
     } else {
      const newQuantity = variant.quantity - 1 > -1 ? variant.quantity - 1 : 0

      updatedVariant =  {
        ...variant,
        quantity: newQuantity
      }
     }

    mappings.splice(variantIndex, 1, updatedVariant);
    updatedProduct = {
      ...prevProduct,
      productMappings: mappings
    };
    updatedCart.splice(prevProductIndex, 1, updatedProduct)
    setProducts(updatedCart)
    localStorage.setItem('MERCHPALS_CART', JSON.stringify(updatedCart))
  }

  const removeFromCart = (productId, variantId) => {
    let updatedCart = {};

    const prevProduct = products.find(v => v.productId === productId);
// console.log({prevProduct});
    let mappings = [...prevProduct.productMappings]
    mappings = mappings.filter(m => m.id !== variantId)

    updatedCart = {
      ...prevProduct,
      productMappings: [
        ...mappings,
      ]
    }

    const otherProductVariants = products.filter(cv => cv.productId !== productId)
    const updatedCartList = [updatedCart, ...otherProductVariants];
    console.log({updatedCartList});
    setProducts(updatedCartList)
    localStorage.setItem('MERCHPALS_CART', JSON.stringify(updatedCartList))
  }

  const subTotal = () => {
    let totalCartPrice = 0;
    for(let i=0; i< products.length; i++){
      const product = products[i];
      const quantities = product.productMappings.reduce((sum, cur) => sum + cur.quantity, 0);
      const productPrice = product.price * quantities;
      totalCartPrice = totalCartPrice + productPrice;
    }

    return Number(totalCartPrice.toFixed(2));
  }
  const taxAmount = () => {
    const subTotalAmount = subTotal();
    return Number((subTotalAmount * tax).toFixed(2))
  }

  const total = () => {
    const subTotalAmount = subTotal();
    const taxAmountNo = taxAmount();
    const shippingCostCal = shippingCost === 'Free' ? 0 : Number(shippingCost)
    return (Number(subTotalAmount) + shippingCostCal + Number(taxAmountNo)).toFixed(2);
  }

  return (
    <Grid item>
      <Accordion defaultExpanded>
        <AccordionSummary
          className={classes.accordian}
          expandIcon={<ExpandMoreIcon style={{color: 'white'}} />}
        >
          <Typography className={classes.heading}>In your bag</Typography>
        </AccordionSummary>
        <AccordionDetails>
        {products.map(product => (
              product.productMappings.map((variant, i) => (
          <Grid direction='row' xs={12} item container mt={1} key={`product-${i}`}>
            <Grid xs={4} item className={classes.imageCard}>
              <Avatar
                className={classes.avatar}
                style={{backgroundColor: variant.color}}
                src={product.image}
                variant="square"
              />
              <Avatar
                className={classes.design}
                src={variant.design}
                variant="square"
              />
            </Grid>
            <Grid spacing={2} direction='column' container xs={5} item>
              <Grid className={classes.text} item> Style: {product.name} </Grid>
              <Grid className={classes.text} item> Size: {variant.variant}</Grid>
              <Grid item>
                <Box>
                  <ButtonGroup size="small" aria-label="small outlined button group">
                    <Button onClick={() => updateQuantity(product.productId, variant.id, 'minus')} className={classes.operatorBtn}> - </Button>
                    <Button disabled>{variant.quantity}</Button>
                    <Button onClick={() => updateQuantity(product.productId, variant.id, 'add')} className={classes.operatorBtn}> + </Button>
                  </ButtonGroup>
                </Box>
              </Grid>
            </Grid>
            <Grid xs={3} item>
              <Button className={classes.removeBtn} onClick={() => removeFromCart(product.productId, variant.id)}>Remove</Button>
            </Grid>
          </Grid>
            ))
          ))}
          <hr className={classes.separator} />
          <Grid container rowSpacing={1}>
            <Grid justifyContent='space-between' item container>
              <Typography  className={classes.summaryText} >Sub Total</Typography>
              <Typography  className={classes.summaryText} align='right'>${subTotal()}</Typography>
            </Grid>
            <Grid justifyContent='space-between' item container>
              <Grid xs={3} alignItems='center' item container>
                <Typography  className={classes.summaryText} >Estimated Shipping</Typography>
                <Tooltip placement='top' describeChild title='Shipping description'>
                <IconButton className={classes.infoBtn}>
                  <QuestionMark className={classes.infoIcon} />
                </IconButton>
                </Tooltip>
              </Grid>
              <Grid xs={2} item>
                <Typography  className={classes.summaryText} align='right'>
                {shippingCost === 'Free' ? 'Free' : `$${Number(shippingCost).toFixed(2)}`}
                </Typography>
              </Grid>
            </Grid>
            <Grid justifyContent='space-between' item container>
              <Grid xs={3} alignItems='center' item container>
                <Typography  className={classes.summaryText} >Estimated Tax</Typography>
                <Tooltip placement='top' describeChild title='Tax description'>
                <IconButton className={classes.infoBtn}>
                  <QuestionMark className={classes.infoIcon} />
                </IconButton>
                </Tooltip>
              </Grid>
              <Grid xs={2} item>
                <Typography  className={classes.summaryText} align='right'>${taxAmount()}</Typography>
              </Grid>
            </Grid>
            <Grid justifyContent='space-between' item container>
              <Typography  className={classes.summaryText} >Total</Typography>
              <Typography className={classes.totalText} align='right'>${total()}</Typography>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Grid>
  )
}

export { Customer as default }