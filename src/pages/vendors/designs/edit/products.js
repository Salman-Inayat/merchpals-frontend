import React, { useState, useEffect } from 'react';
import {
  Grid,
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Snackbar,
  Alert as MuiAlert,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { baseURL } from '../../../../configs/const';
import LoggedInVendor from '../../../../layouts/LoggedInVendor';
import { ProductCardWithPricing } from '../../../../components/ProductCard';
import BackButton from '../../../../components/backButton';
import { ClassNames } from '@emotion/react';
import { makeStyles } from '@mui/styles';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const useStyles = makeStyles(theme => ({
  selected: {
    border: '3px solid #116dff',
    borderRadius: '16px',
  },
}));
const EditDesign = ({ designId }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [selectedVariants, setSelectedVariants] = useState({});
  const [products, setProducts] = useState([]);
  const [design, setDesign] = useState();
  const [vendorUpdatedPrices, setVendorUpdatedPrices] = useState({});
  const [open, setOpen] = useState(false);
  const [designName, setDesignName] = useState('');
  const [updatedDesignName, setUpdatedDesignName] = useState('');
  const [snackBarToggle, setSnackBarToggle] = useState({
    visible: false,
    type: '',
    message: '',
  });

  useEffect(() => {
    getDesign();
    fetchProducts();
  }, [designId]);

  const fetchProducts = async () => {
    axios
      .get(`${baseURL}/products`)
      .then(response => {
        setProducts(response.data.products);
      })
      .catch(err => {
        console.log({ err });
      });
  };

  const getDesign = async () => {
    axios
      .get(`${baseURL}/store/design/products/${designId}`, {
        headers: {
          Authorization: localStorage.getItem('MERCHPAL_AUTH_TOKEN'),
        },
      })
      .then(response => {
        setDesign(response.data.design);
        setDesignName(response.data.design.name);
      })
      .catch(error => console.log({ error: error.response.data.message }));
  };

  useEffect(() => {
    if (design) {
      selectAllProductsAndVariants();
      return;
    }
  }, [design]);

  const selectAllProductsAndVariants = () => {
    let tmpVariants = {};

    design.vendorProductIds.forEach(product => {
      const variantsOfProduct = product.productMappings.map(pm => pm.color.value);

      const uniqVariantIds = variantsOfProduct.filter(function (item, pos) {
        return variantsOfProduct.indexOf(item) == pos;
      });

      tmpVariants = {
        ...tmpVariants,
        [product.productId]: [...uniqVariantIds],
      };
      setSelectedVariants(tmpVariants);
    });
  };

  const onVariantClick = productVariant => {
    const [product, color] = productVariant.split(',');
    let removedProduct = false;
    let productColors = [];
    let updatedVariants = {};

    if (!selectedVariants[product]) {
      productColors = [Number(color)];
    } else {
      const colorIndex = selectedVariants[product].findIndex(c => c === Number(color));

      if (colorIndex > -1) {
        productColors = [...selectedVariants[product]];

        if (productColors.length === 1) {
          let prevSelectedProducts = { ...selectedVariants };
          delete prevSelectedProducts[product];
          removedProduct = true;

          updatedVariants = {
            ...prevSelectedProducts,
          };
        } else {
          productColors.splice(colorIndex, 1);
        }
      } else {
        productColors = [...selectedVariants[product], Number(color)];
      }
    }

    if (!removedProduct) {
      updatedVariants = {
        ...selectedVariants,
        [product]: [...new Set(productColors)],
      };
    }

    setSelectedVariants(updatedVariants);
  };

  const onProductClick = productId => {
    let prevSelectedProducts = { ...selectedVariants };

    if (prevSelectedProducts[productId]) {
      delete prevSelectedProducts[productId];
      setSelectedVariants({
        ...prevSelectedProducts,
      });
    } else {
      const relatedProduct = products.find(p => p._id === productId);

      const variantsOfProduct = relatedProduct.colors.reduce((color, curr) => {
        const relatedMappings = curr.relatedProductVariantsId.map(p => p.color.value);
        return [...color, ...relatedMappings];
      }, []);

      const uniqVariantIds = variantsOfProduct.filter(function (item, pos) {
        return variantsOfProduct.indexOf(item) == pos;
      });

      const updatedVariants = {
        ...selectedVariants,
        [productId]: [...uniqVariantIds],
      };

      setSelectedVariants(updatedVariants);
    }
  };

  const updatePrice = (productId, designId, price) => {
    setVendorUpdatedPrices({
      ...vendorUpdatedPrices,
      [productId]: {
        designId,
        price,
      },
    });
  };

  const formatAndContinue = () => {
    const selectedProducts = Object.keys(selectedVariants);
    const updatedProducts = selectedProducts.map(productId => {
      const productsSelectedVariants = selectedVariants[productId];
      let productMappingsIds = [];
      const colors = products.find(p => p._id === productId).colors;
      productsSelectedVariants.forEach(psv => {
        const allColorsArrs = colors.filter(c => c.id === psv);
        const productMappings = allColorsArrs.reduce(
          (mapArr, cur) => [...mapArr, ...cur.relatedProductVariantsId],
          [],
        );
        productMappingsIds.push(...productMappings.map(rp => rp._id));
      });

      return { productId, productMappings: productMappingsIds };
    });

    axios
      .put(
        `${baseURL}/store/design/products/${designId}`,
        { updatedProducts, vendorUpdatedPrices },
        {
          headers: {
            Authorization: localStorage.getItem('MERCHPAL_AUTH_TOKEN'),
          },
        },
      )
      .then(response => {
        navigate('/vendor/designs');
      })
      .catch(error => console.log({ error: error.response.data.message }));
  };

  const productPrice = pr => {
    let price;
    if (!design) {
      return pr.minPrice;
    }

    if (vendorUpdatedPrices[pr._id]) {
      return vendorUpdatedPrices[pr._id].price;
    }
    price = design.vendorProductIds.find(vp => vp.productId === pr._id)?.price;

    if (!price) {
      price = pr.minPrice;
    }
    return price;
  };

  const productShippingCost = pr => {
    let shipping_cost = pr.shippingCost;

    return shipping_cost;
  };

  const productCostPrice = pr => {
    let cost_price = pr.costPrice;

    return cost_price;
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseAndUpdateName = () => {
    setDesignName(updatedDesignName);
    setOpen(false);
    axios
      .put(
        `${baseURL}/store/design/${designId}/name`,
        { designName: updatedDesignName },
        {
          headers: {
            Authorization: localStorage.getItem('MERCHPAL_AUTH_TOKEN'),
          },
        },
      )
      .then(response => {
        setSnackBarToggle({
          visible: true,
          type: 'success',
          message: 'Design name updated successfully',
        });
        setOpen(false);
      })
      .catch(error => {
        console.log({ error: error });
      });
  };

  const handleSnackBarClose = () =>
    setSnackBarToggle({
      ...snackBarToggle,
      visible: false,
    });

  return (
    // <LoggedInVendor >
    <Grid
      mt={5}
      style={{
        margin: 'auto',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Grid justifyContent="center" container style={{ maxWidth: '800px', margin: 'auto' }}>
        <Grid item md={12} xs={12}>
          <Button color="primary" onClick={handleClickOpen}>
            Update Design Name
          </Button>

          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{'Update design name'}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Enter the new name for the design
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Name"
                type="text"
                fullWidth
                defaultValue={designName}
                onChange={e => setUpdatedDesignName(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleCloseAndUpdateName} autoFocus>
                Update
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
        {products?.map((product, i) => (
          <Grid
            style={{ paddingLeft: '10px', paddingRight: '10px' }}
            justifyContent="center"
            container
            md={4}
            mt={5}
            xs={6}
            key={`product-${i}`}
          >
            <div className={selectedVariants[product._id] ? classes.selected : null}>
              <ProductCardWithPricing
                design={design}
                designName={designName}
                product={product}
                price={productPrice(product)}
                shippingCost={productShippingCost(product)}
                costPrice={productCostPrice(product)}
                onVariantClick={onVariantClick}
                onProductClick={onProductClick}
                selectedVariants={selectedVariants}
                updatePrice={updatePrice}
              />
            </div>
          </Grid>
        ))}

        <Grid mt={6} justifyContent="center" container>
          <Button variant="contained" onClick={formatAndContinue}>
            Update products
          </Button>
        </Grid>
      </Grid>
      <Snackbar open={snackBarToggle.visible} autoHideDuration={2000} onClose={handleSnackBarClose}>
        <Alert severity={snackBarToggle.type}>{snackBarToggle.message}</Alert>
      </Snackbar>
    </Grid>
    // </LoggedInVendor>
  );
};

export default EditDesign;
