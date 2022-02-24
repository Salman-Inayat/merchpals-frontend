import { UPDATE_CANVAS_SHAPE } from '../types';

const initialState = {
  shape: 'square',
};

const updateShape = (state, payload) => {
  return { ...state, shape: payload };
};

const canvasReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_CANVAS_SHAPE: {
      return updateShape(state, action.payload);
    }

    default:
      return state;
  }
};

export { canvasReducer as default };
