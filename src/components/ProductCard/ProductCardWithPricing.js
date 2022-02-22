import React, { useState } from 'react';
import {
  Box,
  Grid,
  Avatar,
  Typography,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  CardHeader,
  Popover,
  Fade,
  Checkbox,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import DoneIcon from '@mui/icons-material/Done';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Slide from '@mui/material/Slide';
import { useMediaQuery } from 'react-responsive';
import { calculateProfit } from '../../configs/const';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles(theme => ({
  product: {
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  box: {
    position: 'relative',
  },
  imageArea: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: '350px',
    height: '400px',
  },
  design: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    height: '100px',
    width: '100px',
    [theme.breakpoints.down('sm')]: {
      height: '70px',
      width: '70px',
    },
  },
  absolute: {
    position: 'absolute',
    top: '20px',
    right: '20px',
  },
  colorGrid: {
    marginTop: '-12px',
  },
  container: {
    [theme.breakpoints.down('sm')]: {
      height: '300px',
      width: '100%',
    },
  },
  productCard: {
    position: 'relative',
    borderRadius: '16px',
    [theme.breakpoints.down('sm')]: {
      margin: '5px',
    },
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    height: '100%',
    width: '100%',
    position: 'absolute',
  },
  checkbox: {
    position: 'absolute',
    top: '15px',
    right: '15px',
    [theme.breakpoints.down('sm')]: {
      top: '10px',
      right: '10px',
    },
  },
  productName: {
    color: '#0097a7',
    width: '70%',
    margin: 'auto',
    fontWeight: '500',
  },

  poster: {
    height: '150px',
    width: '150px',
    borderRadius: '5px',
    [theme.breakpoints.down('sm')]: {
      height: '105px',
      width: '105px',
    },
  },
  phoneCase: {
    height: '80px',
    width: '80px',
    [theme.breakpoints.down('sm')]: {
      height: '60px',
      width: '60px',
      top: '52%',
    },
  },
  mug: {
    height: '90px',
    width: '90px',
    top: '55%',
    left: '52%',
    [theme.breakpoints.down('sm')]: {
      height: '60px',
      width: '60px',
    },
  },
  productImage: {},
  checkboxContainer: {
    position: 'absolute',
    top: '10px',
    left: '10px',
    zIndex: '5',
    [theme.breakpoints.down('sm')]: {
      top: '1px',
      left: '1px',
    },
  },
  colorsCheckbox: {
    [theme.breakpoints.down('sm')]: {
      width: '30px',
      height: '30px',
    },
  },
}));
const label = { inputProps: { 'aria-label': 'Select Project' } };

const ProductCard = ({
  product,
  design,
  price: productDefaultPrice,
  shippingCost,
  costPrice,
  onVariantClick = () => {},
  onProductClick = () => {},
  updatePrice = () => {},
  selectedVariants = {},
}) => {
  const classes = useStyles();
  const [displayPriceModal, setDisplayPriceModal] = useState(false);
  const [priceError, setPriceError] = useState('');
  const [price, setPrice] = useState('');
  const [profit, setProfit] = useState(
    calculateProfit(productDefaultPrice, shippingCost, costPrice),
  );
  const [tempProfit, setTempProfit] = useState();

  let isMobile = useMediaQuery({ maxWidth: 767 });

  const renderBgColor = () => {
    let bgColor = '#ffffff';

    if (selectedVariants[product._id]) {
      const productSelectedVariants = selectedVariants[product._id];
      const lastSelectedColor = productSelectedVariants[productSelectedVariants?.length - 1];
      bgColor = product.colors.find(c => c.id === lastSelectedColor)?.label;
      bgColor = bgColor === 'white' ? '#ffffff' : bgColor === 'navy' ? '#262d4f ' : '#121616';
    }
    return bgColor;
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const closePriceModal = () => {
    setPrice('');
    setPriceError('');
    setDisplayPriceModal(false);
    handleClosePopover();
  };

  const saveAndCloseModal = () => {
    if (Number(price) < product.minPrice) {
      setPriceError(`Price can not be less than min price i.e. ${product.minPrice}`);
      return;
    }
    updatePrice(product._id, design._id, price);
    updateProfit(price);
    closePriceModal();
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const updateProfit = price => {
    setProfit(calculateProfit(price, shippingCost, costPrice));
  };

  return (
    <Grid>
      <Card sx={{ maxWidth: 345 }}>
        <Box className={classes.checkboxContainer}>
          <Checkbox
            checked={selectedVariants[product._id] ? true : false}
            onChange={() => onProductClick(event.target.value)}
            value={product._id}
            icon={<RadioButtonUncheckedIcon />}
            checkedIcon={<CheckCircleIcon />}
          />
        </Box>
        <Box className={classes.imageContainer}>
          <CardMedia
            component="img"
            image={`${product.image}`}
            alt=""
            className={classes.productImage}
            style={{ backgroundColor: renderBgColor() }}
          />

          {design && (
            <Box>
              <img
                className={[
                  classes.design,
                  product.name === 'Poster'
                    ? classes.poster
                    : product.name === 'Phone Case'
                    ? classes.phoneCase
                    : product.name === 'Mug'
                    ? classes.mug
                    : '',
                ].join(' ')}
                src={design.designImages[4].imageUrl}
              />
            </Box>
          )}
        </Box>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {design?.name} {product.name}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            onClick={() => setDisplayPriceModal(true)}
            style={{ cursor: 'pointer' }}
          >
            ${price || productDefaultPrice}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Profit: ${profit.toFixed(2)}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <Grid container spacing={isMobile ? 3 : 1}>
            {product.colors.length !== 1 && product.colors.label !== 'n/a' ? (
              product.colors.map((pm, i) => (
                <Grid key={`colors-${i}`} item md={2} xs={2}>
                  <Checkbox
                    style={{
                      width: `${isMobile ? '25px' : '30px'}`,
                      height: `${isMobile ? '25px' : '30px'}`,
                      backgroundColor:
                        `${pm.label}` === 'transparent'
                          ? '#ffffff'
                          : pm.label === 'white'
                          ? '#ffffff'
                          : pm.label === 'navy'
                          ? '#262d4f '
                          : '#121616',
                    }}
                    onChange={() => onVariantClick(event.target.value)}
                    checked={selectedVariants[product._id]?.includes(pm.id) ? true : false}
                    value={`${product._id},${pm.id}`}
                    sx={{
                      border: '1px solid #000',
                      color:
                        `${pm.label}` === 'transparent'
                          ? 'white'
                          : pm.label === 'white'
                          ? '#ffffff'
                          : pm.label === 'navy'
                          ? '#262d4f '
                          : '#121616',
                      '&.Mui-checked': {
                        color: `${pm.label}` == 'white' ? '#000000' : '#ffffff',
                      },
                    }}
                    checkedIcon={<DoneIcon style={{ fontSize: `${isMobile ? '20px' : '25px'}` }} />}
                    className={classes.colorsCheckbox}
                  />
                </Grid>
              ))
            ) : (
              <Grid style={{ opacity: 0 }}>
                <Checkbox iconSize={40} checkedIcon={<DoneIcon />} />
              </Grid>
            )}
          </Grid>
        </CardActions>
      </Card>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Button variant="outlined" onClick={() => setDisplayPriceModal(true)}>
          Edit price
        </Button>
      </Popover>
      {displayPriceModal && (
        <Grid xs={12} container item>
          <Dialog
            open={displayPriceModal}
            TransitionComponent={Transition}
            keepMounted
            onClose={closePriceModal}
          >
            <DialogTitle>{"Enter product's price!"}</DialogTitle>
            <DialogContent style={{ width: `${isMobile ? '80vw' : '500px'}` }}>
              <TextField
                id="outlined-basic"
                placeholder={`$${productDefaultPrice}`}
                variant="outlined"
                helperText={priceError ? priceError : `Profit: ${tempProfit}`}
                type="number"
                style={{ marginTop: '15px' }}
                error={Boolean(priceError)}
                onChange={e => {
                  setPrice(e.target.value);
                  setPriceError('');
                  setTempProfit(
                    calculateProfit(e.target.value, shippingCost, costPrice).toFixed(2),
                  );
                }}
                autoComplete="off"
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={closePriceModal}>Cancel</Button>
              <Button onClick={saveAndCloseModal}>Save</Button>
            </DialogActions>
          </Dialog>
        </Grid>
      )}
    </Grid>
  );
};

export { ProductCard as default };
