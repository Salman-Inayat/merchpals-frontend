import { combineReducers } from 'redux';
import auth from './reducers/auth';
import cart from './reducers/cart';
import design from './reducers/design';
import store from './reducers/store';
import product from './reducers/product';
import printful from './reducers/printful';
import order from './reducers/order';
import canvas from './reducers/canvas';

export default combineReducers({
  auth,
  cart,
  design,
  store,
  product,
  printful,
  order,
  canvas,
});
