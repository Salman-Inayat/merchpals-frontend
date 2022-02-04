import { FETCH_PRODUCT_SUCCESS, FETCH_PRODUCT_FAILED } from '../types';

const initialState = {
  product: null,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCT_SUCCESS:
      return { ...state, product: action.payload };
    case FETCH_PRODUCT_FAILED:
      return { ...state, product: null };
    default:
      return state;
  }
};

export { productReducer as default };
