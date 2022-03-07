import { useState, useEffect } from 'react';
import { Grid, Button, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { baseURL } from '../../../../configs/const';
import LoggedInVendor from '../../../../layouts/LoggedInVendor';
import { ProductCardWithPricing } from '../../../../components/ProductCard';
import BackButton from '../../../../components/backButton';

const EditDesign = () => {
  const navigate = useNavigate();
  const { designId } = useParams();

  const [selectedVariants, setSelectedVariants] = useState({});
  const [products, setProducts] = useState([]);
  const [design, setDesign] = useState();
  const [vendorUpdatedPrices, setVendorUpdatedPrices] = useState({});

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

  return (
    <LoggedInVendor>
      <Grid mt={5} container>
        <BackButton />
        <Grid item xs={12} justifyContent="flex-start" alignItems="flex-start" spacing={3}>
          <Grid item md={12} sm={12} xs={12}>
            <Typography align="center" variant="h3" style={{ color: '#0097a7' }}>
              Product Selection
            </Typography>
            <Typography align="center" variant="h5" style={{ fontWeight: 'normal' }}>
              Please select products for your design
            </Typography>
          </Grid>
          <Grid justifyContent="center" container spacing={2}>
            {products?.map((product, i) => (
              <Grid
                justifyContent="center"
                container
                item
                md={4}
                mt={5}
                xs={6}
                key={`product-${i}`}
              >
                <ProductCardWithPricing
                  design={design}
                  product={product}
                  price={productPrice(product)}
                  shippingCost={productShippingCost(product)}
                  costPrice={productCostPrice(product)}
                  onVariantClick={onVariantClick}
                  onProductClick={onProductClick}
                  selectedVariants={selectedVariants}
                  updatePrice={updatePrice}
                />
              </Grid>
            ))}

            <Grid mt={6} justifyContent="center" container>
              <Button variant="contained" onClick={formatAndContinue}>
                Update products
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </LoggedInVendor>
  );
};

export default EditDesign;
