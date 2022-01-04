import { ADD_TO_CART, REMOVE_FROM_CART } from '../types';

export const addToCart = product => async dispatch => {
  dispatch({ type: ADD_TO_CART, payload: product });
};

export const removeFromCart = productId => async dispatch => {
  console.log('Removing item from cart from action');
  dispatch({ type: REMOVE_FROM_CART, payload: productId });
};

export const subtractQuantity = product => {
  return {
    type: SUB_QUANTITY,
    product,
  };
};
export const addQuantity = product => {
  return {
    type: ADD_QUANTITY,
    product,
  };
};
export const emptyCart = () => {
  return {
    type: EMPTY_CART,
  };
};
