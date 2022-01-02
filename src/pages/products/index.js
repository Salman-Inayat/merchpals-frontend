import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  Avatar,
  Stepper,
  Step,
  StepLabel,
  IconButton,
  Button,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import axios from 'axios';
import { Link as RouterLink } from 'react-router-dom';
import Logo from '../../assets/images/logo.png';
import { makeStyles } from '@mui/styles';
import { baseURL } from '../../configs/const';
import StoreProductcard from '../../components/storeProductCard';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const useStyle = makeStyles(() => ({
  image: {
    height: '100%',
    width: '100%',
  },
  price: {
    fontSize: '3.5rem',
    fontWeight: '400',
  },
  backButton: {
    margin: '20px',
  },
}));

const Product = () => {
  const classes = useStyle();
  const { productId } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: '',
    description: '',
    image: '',
    cost: '',
    slug: '',
    colors: [],
    sizes: [],
  });

  const [color, setColor] = useState('');
  const [size, setSize] = useState('');
  const [productColor, setProductColor] = useState('');

  useEffect(() => {
    fetchProduct(productId);
  }, []);

  const fetchProduct = async productId => {
    axios
      .get(`${baseURL}/products/${productId}`)
      .then(response => {
        const product = response.data.product;
        setProduct({
          name: product.name,
          description: product.description,
          image: product.image,
          cost: product.basePrice,
          slug: product.slug,
          colors: product.colors,
          sizes: product.variants,
        });
      })
      .catch(err => {
        console.log({ err });
      });
  };

  const handleColorChange = event => {
    setColor(event.target.value);
    //  switch (event.target.value) {
    //      case "1":
    //          setProductColor("black")
    //          break;
    //         case "2":
    //             setProductColor("white")
    //             break;
    //         case "3":
    //             setProductColor("navy")
    //             break;
    //         case "4":
    //             setProductColor("grey")
    //             break;
    //         case "8":
    //             setProductColor("red")
    //      default:
    //          break;
    //  }
  };

  const handleSizeChange = event => {
    setSize(event.target.value);
  };

  const handleBackButton = event => {
    navigate(-1);
  };

  return (
    <Grid container spacing={1}>
      <Grid item md={12} xs={12}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleBackButton}
          className={classes.backButton}
        >
          Back
        </Button>
      </Grid>
      <Grid item md={12} xs={12}>
        <Grid container>
          <Grid
            item
            md={7}
            p={5}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  backgroundColor: 'red',
                  width: '80%',
                  height: '80%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <img
                  src={`${product.image}`}
                  alt=""
                  className={classes.image}
                />
              </div>
            </div>
          </Grid>
          <Grid
            item
            md={4}
            p={5}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Stack
              direction="column"
              alignItems="left"
              justifyContent="space-between"
              spacing={2}
            >
              <Typography gutterBottom variant="h5" component="div">
                {product.slug}
              </Typography>
              <Typography gutterBottom variant="h3" component="div">
                {product.name}
              </Typography>
              <Typography gutterBottom variant="p" component="div">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odio,
                deserunt. Neque at unde, doloribus, minima atque amet optio,
                distinctio ex veniam exercitationem facere! Quam dolore ex minus
                ut impedit necessitatibus!
              </Typography>

              <FormControl component="fieldset">
                <FormLabel component="legend">Size</FormLabel>
                <RadioGroup
                  row
                  aria-label="color"
                  name="controlled-radio-buttons-group"
                  value={size}
                  onChange={handleSizeChange}
                >
                  {product.sizes.map(arr => {
                    return (
                      <FormControlLabel
                        value={arr}
                        control={<Radio />}
                        label={arr}
                      />
                    );
                  })}
                </RadioGroup>
              </FormControl>

              <FormControl component="fieldset">
                <FormLabel component="legend">Color</FormLabel>
                <RadioGroup
                  row
                  aria-label="color"
                  name="controlled-radio-buttons-group"
                  value={color}
                  onChange={handleColorChange}
                >
                  {product.colors.map(arr => {
                    return (
                      <FormControlLabel
                        value={arr}
                        control={<Radio />}
                        label={arr}
                      />
                    );
                  })}
                </RadioGroup>
              </FormControl>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography
                  gutterBottom
                  variant="h3"
                  component="div"
                  className={classes.price}
                >
                  {product.cost} $
                </Typography>
                <Button color="secondary" variant="outlined" size="large">
                  {' '}
                  Add to Cart
                </Button>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export { Product as default };
