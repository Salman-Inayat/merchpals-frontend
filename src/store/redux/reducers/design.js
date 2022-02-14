import { SAVE_DESIGN, SAVE_THEME_COLOR } from '../types';

const saveDesign = (state, action) => {
  switch (action.type) {
    case SAVE_DESIGN:
      return { ...state, design: action.payload };
    default:
      return state;
  }
};
const saveThemeColor = (state, action) => {
  switch (action.type) {
    case SAVE_THEME_COLOR:
      return { ...state, themeColor: action.payload };
    default:
      return state;
  }
};

const initialState = {
  design: {},
};

const designReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_DESIGN: {
      return saveDesign(state, action);
    }
    case SAVE_THEME_COLOR: {
      return saveThemeColor(state, action);
    }
    default:
      return state;
  }
};

export { designReducer as default };
