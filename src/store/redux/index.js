import { combineReducers } from 'redux';
import auth from './reducers/auth';
import cart from './reducers/cart';
import design from './reducers/design';

export default combineReducers({
  auth,
  cart,
  design,
});
