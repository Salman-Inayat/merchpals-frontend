import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { baseURL, dataURLtoFile } from '../../../../configs/const';
import { Grid, Button, Alert as MuiAlert, Snackbar } from '@mui/material';
import { Products } from '../../../home/steps';
import { fetchProducts } from '../../../../store/redux/actions/product';
import { clearDesign } from '../../../../store/redux/actions/design';
import { clearCanvas } from '../../../../store/redux/actions/canvas';
import { useDispatch, useSelector } from 'react-redux';
import store from '../../../../store';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ProductSelection = ({ designName }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [snackBarToggle, setSnackBarToggle] = useState({
    visible: false,
    type: 'success',
    message: 'Design added successfully',
  });

  const products = useSelector(state => state.product.products);
  useEffect(() => {
    if (!localStorage.getItem('MERCHPAL_AUTH_TOKEN')) {
      navigate('/login', { replace: true });
    } else {
      dispatch(fetchProducts());
    }
  }, []);

  const postDataToURL = async (url, data) => {
    await axios
      .put(url, data, {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const productSelectionCompleted = selectedProducts => {
    let design = store.getState().design.design;
    design.designName = location.state.name;

    let data = {
      designName: design?.front?.designName,
      products: JSON.stringify([...selectedProducts]),
      canvasModes: {
        front: design?.front != null ? true : false,
        back: design?.back != null ? true : false,
      },
    };

    axios
      .post(`${baseURL}/store/add-design`, data, {
        headers: {
          Authorization: localStorage.getItem('MERCHPAL_AUTH_TOKEN'),
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        console.log(response);

        const urls = response.data.response;

        const frontDesignVariant1 = urls[0].imageUrl;
        const frontDesignVariant2 = urls[1].imageUrl;
        const frontDesignVariant3 = urls[2].imageUrl;
        const frontDesignVariant4 = urls[3].imageUrl;
        const frontDesignVariant5 = urls[4].imageUrl;
        const frontDesignJson = urls[5].imageUrl;

        const frontJSONBlob = new Blob([JSON.stringify(design?.front?.designJson || '')], {
          type: 'application/json',
        });

        const backJSONBlob = new Blob([JSON.stringify(design?.back?.designJson || '')], {
          type: 'application/json',
        });

        postDataToURL(
          frontDesignVariant1,
          dataURLtoFile(
            design?.front?.designImages[0]?.data || design?.back?.designImages[0]?.data,
            `${design?.front?.designImages[0]?.name || design?.back?.designImages[0]?.name}.png`,
          ),
        );
        postDataToURL(
          frontDesignVariant2,
          dataURLtoFile(
            design?.front?.designImages[1]?.data || design?.back?.designImages[1]?.data,
            `${design?.front?.designImages[1]?.name || design?.back?.designImages[1]?.name}.png`,
          ),
        );
        postDataToURL(
          frontDesignVariant3,
          dataURLtoFile(
            design?.front?.designImages[2]?.data || design?.back?.designImages[2]?.data,
            `${design?.front?.designImages[2]?.name || design?.back?.designImages[2]?.name}.png`,
          ),
        );
        postDataToURL(
          frontDesignVariant4,
          dataURLtoFile(
            design?.front?.designImages[3]?.data || design?.back?.designImages[3]?.data,
            `${design?.front?.designImages[3]?.name || design?.back?.designImages[3]?.name}.png`,
          ),
        );
        postDataToURL(
          frontDesignVariant5,
          dataURLtoFile(
            design?.front?.designImages[4]?.data || design?.back?.designImages[4]?.data,
            `${design?.front?.designImages[4]?.name || design?.back?.designImages[4]?.name}.png`,
          ),
        );

        postDataToURL(frontDesignJson, frontJSONBlob);

        if (design?.back != null) {
          const backDesignVariant1 = urls[6].imageUrl;
          const backDesignVariant2 = urls[7].imageUrl;
          const backDesignJson = urls[8].imageUrl;

          postDataToURL(
            backDesignVariant1,
            dataURLtoFile(
              design?.back?.designImages[1]?.data || '',
              `${design?.back?.designImages[1]?.name || ''}.png`,
            ),
          );
          postDataToURL(
            backDesignVariant2,
            dataURLtoFile(
              design?.back?.designImages[4]?.data || '',
              `${design?.back?.designImages[4]?.name || ''}.png`,
            ),
          );

          postDataToURL(backDesignJson, backJSONBlob);
        }

        localStorage.removeItem('design');
        localStorage.removeItem('selectedVariants');
        localStorage.removeItem('designJSON');

        dispatch(clearDesign());
        dispatch(clearCanvas());

        setSnackBarToggle({
          visible: true,
          type: 'success',
          message: 'Design created successfully',
        });

        setTimeout(() => {
          navigate('/vendor/designs');
        }, 2000);
      })
      .catch(error => {
        setSnackBarToggle({
          visible: true,
          type: 'success',
          message: `Something went wrong. Hint: ${
            error?.response?.data?.message || 'Please try again!'
          }`,
        });
      });
  };

  const handleSnackBarClose = () => {
    setSnackBarToggle({
      visible: false,
    });
  };
  return (
    <Grid container>
      <Products
        products={products}
        designName={location.state.name}
        productSelectionCompleted={productSelectionCompleted}
      />
      <Snackbar open={snackBarToggle.visible} autoHideDuration={3000} onClose={handleSnackBarClose}>
        <Alert severity={snackBarToggle.type}>{snackBarToggle.message}</Alert>
      </Snackbar>
    </Grid>
  );
};

export default ProductSelection;
