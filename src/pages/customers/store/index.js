import React, { useEffect, useLayoutEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Container, Grid, Box, Typography, Stack, Button, Badge, IconButton } from '@mui/material';
import axios from 'axios';
import Logo from '../../../assets/images/logo.png';
import { makeStyles } from '@mui/styles';
import { baseURL } from '../../../configs/const';
import StoreProductCard from '../../../components/storeProductCard';
import { useMediaQuery } from 'react-responsive';
import { useParams } from 'react-router-dom';
import {
  ThemeColorCustomise,
  ThemeCustomise,
  themeStyles,
} from '../../../components/themeCustomize/themeStyle';
import { useSelector } from 'react-redux';
import { fetchStore } from '../../../store/redux/actions/store';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
const useStyle = makeStyles(theme => ({
  coverContainer: {
    position: 'relative',
    height: '50vh',
    [theme.breakpoints.down('sm')]: {
      height: '30vh',
    },
  },
  coverImage: {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  header: {
    position: 'absolute',
    width: '50%',
    left: '25%',
    textAlign: 'center'
  },
  logo: {
    position: 'absolute',
    width: '150px',
    borderRadius: '100px',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    [theme.breakpoints.up('sm')]: {
      margin: 'auto',
      width: '300px',
      borderRadius: '50%'
    }
  },
  storeName: {
    fontSize: '1.5rem',
    textTransform: 'uppercase',
    textDecoration: 'underline',
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1rem',
    },
  },
  productsContainer: {
    padding: '2rem 8rem',
    [theme.breakpoints.down('sm')]: {
      padding: '1rem',
      spacing: '5',
    },
  },
  topBar: {
    padding: '0px 5%',
    display: 'flex',
    flexDirection: 'row-reverse'
  },
  shoppingCart: {
    cursor: 'pointer',
  },
}));

const Store = ({ fetchStore, store }) => {
  let themeColor, theme;
  const classes = useStyle();
  const navigate = useNavigate();

  const isMobile = useMediaQuery({ maxWidth: 767 });
  const { storeUrl } = useParams();
  const [themeClass, setThemeClass] = useState('');
  const [themeColorClass, setThemeColorClass] = useState('');
  const [totalNumberOfVariants, setTotalNumberOfVariants] = useState(0);

  const themeClasses = themeStyles();

  theme = useSelector(state => state.design);

  useEffect(() => {
    fetchStore(storeUrl);
  }, []);

  useEffect(() => {
    if (store) {
      console.log('from use effect');
      console.log('from setting theme');
      themeColor = store.themeColor;
      const tmpthemeClass = ThemeCustomise(themeClasses, themeColor);
      const tmpthemeColorClass = ThemeColorCustomise(themeClasses, themeColor);
      setThemeClass(tmpthemeClass);
      setThemeColorClass(tmpthemeColorClass);
    }
  }, [store]);

  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -6,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }));
  const handleCartButton = () => {
    const cart = JSON.parse(localStorage.getItem('MERCHPALS_CART'))
    if(cart) {
      if(cart.products.length === 0) {
        navigate(`/cart/${storeUrl}`);
      }
      else {
        navigate(`/checkout/${storeUrl}`);
      }
      return
    } 
  };
  return store ? (
    <Grid container spacing={3} className={themeClass}>
      <Grid item container md={12} xs={12} alignItems="center" className={classes.topBar}>
        <Grid className={classes.header}>
          <Typography variant="h4">Official Store</Typography>
        </Grid>
        <Grid display="flex" justifyContent="flex-end" style={{position: 'relative', right: '0', top: '0'}}>
          <IconButton
            aria-label="cart"
            onClick={handleCartButton}
            size="large"
            style={{ height: '50px', width: '50px'}}
          >
            <StyledBadge badgeContent={totalNumberOfVariants}>
              <ShoppingCartOutlinedIcon className={themeColorClass} sx={{ fontSize: '2rem' }} />
            </StyledBadge>
          </IconButton>
        </Grid>
      </Grid>
      <Grid item md={12} xs={12} className={classes.coverContainer}>
        <img src={store.coverAvatar} alt="image" className={classes.coverImage} />
        <img src={store.logo} className={classes.logo} />
      </Grid>
      <Grid item md={12} sm={12} xs={12}>
        <Grid item md={12} display="flex" justifyContent="center">
          <Typography variant="h4" className={classes.storeName}>
            {store.name}&#39;S MERCH STORE
          </Typography>
        </Grid>
        <Grid
          container
          spacing={isMobile ? 1 : 10}
          className={`${themeClass} ${classes.productsContainer}`}
        >
          {store.vendorProductIds?.map((product, index) => {
            return (
              <Grid item md={4} xs={6} key={index}>
                <StoreProductCard product={product} storeName={store.name} storeUrl={storeUrl} />
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </Grid>
  ) : null;
};

const mapDispatch = dispatch => ({
  fetchStore: store => dispatch(fetchStore(store)),
});

const mapState = state => ({
  store: state.store.store,
});
export default connect(mapState, mapDispatch)(Store);