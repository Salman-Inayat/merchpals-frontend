import {
  UPDATE_FRONT_CANVAS_SHAPE,
  UPDATE_BACK_CANVAS_SHAPE,
  UPDATE_CANVAS_MODE,
  CLEAR_CANVAS,
  SAVE_CANVAS_BACKGROUNDIMAGE_FOR_MOBILE,
} from '../types';

const initialState = {
  frontShape: 'square',
  backShape: 'square',
  mode: 'front',
  mobileBackgroundImage: null,
};

const updateFrontShape = (state, payload) => {
  return { ...state, frontShape: payload };
};

const updateBackShape = (state, payload) => {
  return { ...state, backShape: payload };
};

const updateMode = (state, payload) => {
  return { ...state, mode: payload };
};
const clearCanvas = state => {
  return { ...state, mode: 'front', frontShape: 'square', backShape: 'square' };
};

const saveCanvasBackgroundImageForMobile = (state, payload) => {
  return { ...state, mobileBackgroundImage: payload };
};

const canvasReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_FRONT_CANVAS_SHAPE: {
      return updateFrontShape(state, action.payload);
    }

    case UPDATE_BACK_CANVAS_SHAPE: {
      return updateBackShape(state, action.payload);
    }

    case UPDATE_CANVAS_MODE: {
      return updateMode(state, action.payload);
    }
    case CLEAR_CANVAS: {
      return clearCanvas(state);
    }

    case SAVE_CANVAS_BACKGROUNDIMAGE_FOR_MOBILE: {
      return saveCanvasBackgroundImageForMobile(state, action.payload);
    }

    default:
      return state;
  }
};

export { canvasReducer as default };
