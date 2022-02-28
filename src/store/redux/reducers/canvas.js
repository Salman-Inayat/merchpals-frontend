import { UPDATE_CANVAS_SHAPE, UPDATE_CANVAS_MODE } from '../types';

const initialState = {
  shape: 'square',
  mode: 'front',
};

const updateShape = (state, payload) => {
  return { ...state, shape: payload };
};

const updateMode = (state, payload) => {
  return { ...state, mode: payload };
};

const canvasReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_CANVAS_SHAPE: {
      return updateShape(state, action.payload);
    }

    case UPDATE_CANVAS_MODE: {
      return updateMode(state, action.payload);
    }

    default:
      return state;
  }
};

export { canvasReducer as default };
