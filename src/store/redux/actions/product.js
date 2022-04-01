import axios from '../../../configs/axios';
import {
  FETCH_PRODUCT_SUCCESS,
  FETCH_PRODUCT_FAILED,
  FETCH_ALL_PRODUCTS_SUCCESS,
  FETCH_ALL_PRODUCTS_FAILED,
  UPDATE_SELECTED_VARIANTS,
  GET_SELECTED_VARIANTS,
} from '../types';

export const fetchProduct = (storeUrl, productId) => async dispatch => {
  axios
    .get(`/products/${storeUrl}/product/${productId}`)
    .then(response => {
      dispatch({
        type: FETCH_PRODUCT_SUCCESS,
        payload: response.data.product,
      });
    })
    .catch(err => dispatch({ type: FETCH_PRODUCT_FAILED }));
};

export const fetchProducts = () => async dispatch => {
  axios
    .get('/products')
    .then(response => {
      dispatch({
        type: FETCH_ALL_PRODUCTS_SUCCESS,
        payload: response.data.products,
      });
    })
    .catch(err => {
      dispatch({
        type: FETCH_ALL_PRODUCTS_FAILED,
      });
    });
};

export const updateSelectedVariants = variants => async dispatch => {
  dispatch({
    type: UPDATE_SELECTED_VARIANTS,
    payload: variants,
  });
};

export const getSelectedVariants = () => async dispatch => {
  dispatch({
    type: GET_SELECTED_VARIANTS,
  });
};