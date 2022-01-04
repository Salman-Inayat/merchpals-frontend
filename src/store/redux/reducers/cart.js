import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  ADD_QUANTITY,
  SUB_QUANTITY,
  EMPTY_CART,
} from '../types';

const cartReducer = (state = [], action) => {
  let doesItemExist;
  switch (action.type) {
    case ADD_TO_CART: {
      doesItemExist = false;
      const newState = state.map(item => {
        if (item.id == action.payload.id) {
          item.quantity += 1;
          doesItemExist = true;
        }
        return item;
      });
      if (doesItemExist) {
        return newState;
      }
      return [...state, { ...action.payload, quantity: 1 }];
    }

    case REMOVE_FROM_CART: {
      console.log('Removing item from cart from reducer');
      const newCartState = state.filter(item => {
        console.log(item.id);
        console.log(action.payload);
        if (item.id === action.payload) {
          return false;
        }
        return true;
      });
      return newCartState;
    }

    case ADD_QUANTITY:
      return {
        ...state,
        products: state.products.map(product =>
          product.id === action.payload.id
            ? { ...product, quantity: product.quantity + 1 }
            : product,
        ),
      };

    case SUB_QUANTITY:
      return {
        ...state,
        products: state.products.map(product =>
          product.id === action.payload.id
            ? {
                ...product,
                quantity: product.quantity !== 1 ? product.quantity - 1 : 1,
              }
            : product,
        ),
      };

    case EMPTY_CART:
      return {
        ...state,
        products: state.products.map(product =>
          product.selected
            ? { ...product, selected: false, quantity: 1 }
            : product,
        ),
      };

    default:
      return state;
  }
};

export { cartReducer as default };
