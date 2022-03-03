import { SAVE_FRONT_DESIGN, SAVE_BACK_DESIGN, SAVE_THEME_COLOR } from '../types';

const saveFrontDesign = (state, action) => {
  return { ...state, design: { ...state.design, front: action.payload } };
};

const saveBackDesign = (state, action) => {
  return { ...state, design: { ...state.design, back: action.payload } };
};

const saveThemeColor = (state, action) => {
  return { ...state, themeColor: action.payload };
};

const initialState = {
  design: {},
};

const designReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_FRONT_DESIGN: {
      return saveFrontDesign(state, action);
    }
    case SAVE_BACK_DESIGN: {
      return saveBackDesign(state, action);
    }
    case SAVE_THEME_COLOR: {
      return saveThemeColor(state, action);
    }
    default:
      return state;
  }
};

export { designReducer as default };
