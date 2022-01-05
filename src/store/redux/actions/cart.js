import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  ADD_QUANTITY,
  SUB_QUANTITY,
  EMPTY_CART,
} from '../types';

export const addToCart = product => async dispatch => {
  dispatch({ type: ADD_TO_CART, payload: product });
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
