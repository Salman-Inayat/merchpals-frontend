import {
  FETCH_PRODUCT_SUCCESS,
  FETCH_PRODUCT_FAILED,
  FETCH_ALL_PRODUCTS_SUCCESS,
  FETCH_ALL_PRODUCTS_FAILED,
  UPDATE_SELECTED_VARIANTS,
  GET_SELECTED_VARIANTS,
} from '../types';

const initialState = {
  product: null,
  products: [],
  selectedVariants: [],
};

const fetchAllProductsFailed = state => ({
  ...state,
  products: [],
  error: 'Something went wrong!. please refresh the page and try again',
});

const updateSelectedVariants = (state, payload) => {
  localStorage.setItem('selectedVariants', JSON.stringify(payload));
  return {
    ...state,
    selectedVariants: payload,
  };
};

const getSelectedVariants = state => {
  const existingVariants = localStorage.getItem('selectedVariants');
  let formattedVariants = [];
  if (state.products.length > 0) {
    if (existingVariants) {
      formattedVariants = JSON.parse(existingVariants);
    } else {
      formattedVariants = selectAllProductsAndVariants(state.products);
    }
  }

  return {
    ...state,
    selectedVariants: formattedVariants,
  };
};

const selectAllProductsAndVariants = products => {
  let selectedVariants = {};

  products.forEach(product => {
    const variantsOfProduct = product.colors.reduce((color, curr) => {
      const relatedMappings = curr.relatedProductVariantsId.map(p => p.color.value);
      return [...color, ...relatedMappings];
    }, []);

    const uniqVariantIds = variantsOfProduct.filter(function (item, pos) {
      return variantsOfProduct.indexOf(item) == pos;
    });

    selectedVariants = {
      ...selectedVariants,
      [product._id]: [...uniqVariantIds],
    };
  });

  localStorage.setItem('selectedVariants', JSON.stringify(selectedVariants));
  return selectedVariants;
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCT_SUCCESS:
      return { ...state, product: action.payload };
    case FETCH_PRODUCT_FAILED:
      return { ...state, product: null };
    case FETCH_ALL_PRODUCTS_SUCCESS:
      return { ...state, products: action.payload };
    case FETCH_ALL_PRODUCTS_FAILED:
      return fetchAllProductsFailed(state);
    case UPDATE_SELECTED_VARIANTS:
      return updateSelectedVariants(state, action.payload);
    case GET_SELECTED_VARIANTS:
      return getSelectedVariants(state);
    default:
      return state;
  }
};

export { productReducer as default };
