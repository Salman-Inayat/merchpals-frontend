import { SAVE_DESIGN_JSON } from '../types';

const saveDesignJSON = (state, action) => {
  switch (action.type) {
    case SAVE_DESIGN_JSON:
      return { ...state, json: action.payload };
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

    default:
      return state;
  }
};

export { designReducer as default };
