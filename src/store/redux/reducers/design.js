import { SAVE_DESIGN_JSON, SAVE_THEME_COLOR } from '../types';

const saveDesignJSON = (state, action) => {
  switch (action.type) {
    case SAVE_DESIGN_JSON:
      return { ...state, json: action.payload };
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
  json: '',
};

const designReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_DESIGN_JSON: {
      return saveDesignJSON(state, action);
    }
    case SAVE_THEME_COLOR: {
      return saveThemeColor(state, action);
    }
    default:
      return state;
  }
};

export { designReducer as default };
