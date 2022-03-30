import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  ADD_QUANTITY,
  SUB_QUANTITY,
  EMPTY_CART,
  GET_CART
} from '../types';

export const addToCart = (store, products) => async dispatch => {
  dispatch({ type: ADD_TO_CART, payload: {store, products} });
};

export const getCart = (store) => async dispatch => {
  dispatch({ type: GET_CART, payload: store });
};

export const removeFromCart = productId => async dispatch => {
  dispatch({ type: REMOVE_FROM_CART, payload: productId });
};

export const addQuantity = productId => async dispatch => {
  dispatch({ type: ADD_QUANTITY, payload: productId });
};

export const subtractQuantity = productId => async dispatch => {
  dispatch({ type: SUB_QUANTITY, payload: productId });
};

export const emptyCart = () => async dispatch => {
  dispatch({ type: EMPTY_CART });
};
