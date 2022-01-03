import { useState } from 'react';
import { Button, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import ProductCard from '../../../components/ProductCard';

const useStyles = makeStyles(() => ({
  footer: {
    // backgroundColor: '#babdb3',
    maxWidth: '100%',
    // position: 'fixed',
    bottom: '0',
    padding: '10px 0px',
  },
  btn: {
    color: '#fff',
    fontSize: '18px',
    '&:hover': {
      backgroundColor: '#aaa',
    },
  },
  productsContainer: {
    // padding: '2rem 8rem',
  },
}));
const Products = ({
  productSelectionCompleted = () => {},
  products = [],
  initialDesign = '',
}) => {
  const [selectedVariants, setSelectedVariants] = useState({});

  const classes = useStyles();

  const onVariantClick = productVariant => {
    const [product, color] = productVariant.split(',');
    // console.log({ product, color });
    let removedProduct = false;
    let productColors = [];

    if (!selectedVariants[product]) {
      productColors = [color];
    } else {
      const colorIndex = selectedVariants[product].findIndex(c => c === color);

      if (colorIndex > -1) {
        productColors = [...selectedVariants[product]];

        if (productColors.length === 1) {
          let prevSelectedProducts = { ...selectedVariants };
          delete prevSelectedProducts[product];
          removedProduct = true;

          setSelectedVariants({
            ...prevSelectedProducts,
          });
        } else {
          productColors.splice(colorIndex, 1);
        }
      } else {
        productColors = [...selectedVariants[product], color];
      }
    }

    if (!removedProduct) {
      setSelectedVariants({
        ...selectedVariants,
        [product]: [...new Set(productColors)],
      });
    }
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
        const relatedMappings = curr.relatedProductVariantsId.map(p => p.color);
        return [...color, ...relatedMappings];
      }, []);

      const uniqVariantIds = variantsOfProduct.filter(function (item, pos) {
        return variantsOfProduct.indexOf(item) == pos;
      });

      setSelectedVariants({
        ...selectedVariants,
        [productId]: [...uniqVariantIds],
      });
    }
  };
  console.log({ products });

  const formatAndContinue = () => {
    const selectedProducts = Object.keys(selectedVariants);
    const formattedVariants = selectedProducts.map(productId => {
      const productsSelectedVariants = selectedVariants[productId];
      let productMappings = [];
      const colors = products.find(p => p._id === productId).colors;
      productsSelectedVariants.forEach(psv => {
        productMappings = colors
          .find(c => c.id === psv)
          .relatedProductVariantsId.map(rp => rp._id);
      });

      return { productId, productMappings };
    });
    console.log({ formattedVariants });
    productSelectionCompleted(formattedVariants);
  };

  console.log({ selectedVariants });
  return (
    <Grid container>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        mt={5}
        pb={18}
      >
        <Grid
          item
          xs={12}
          justifyContent="flex-start"
          alignItems="flex-start"
          spacing={3}
          style={{ padding: '0rem 9rem ' }}
        >
          <Grid>
            <Typography
              align="center"
              variant="h3"
              style={{ color: '#0097a7' }}
            >
              Product Selection
            </Typography>
            <Typography
              align="center"
              variant="h5"
              style={{ fontWeight: 'normal' }}
            >
              Please select products for your design
            </Typography>
          </Grid>
          <Grid container spacing={10} className={classes.productsContainer}>
            {products.map((product, i) => (
              <Grid item md={4} mt={5} key={`product-${i}`}>
                <ProductCard
                  product={product}
                  onVariantClick={onVariantClick}
                  onProductClick={onProductClick}
                  selectedVariants={selectedVariants}
                  initialDesign={initialDesign}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        className={classes.footer}
      >
        <Button
          onClick={formatAndContinue}
          className={classes.btn}
          size="large"
          color="primary"
          variant="contained"
        >
          Continue
        </Button>
      </Grid>
    </Grid>
  );
};

export { Products as default };