import {
  UPDATE_FRONT_CANVAS_SHAPE,
  UPDATE_BACK_CANVAS_SHAPE,
  UPDATE_CANVAS_MODE,
  SAVE_CANVAS_BACKGROUNDIMAGE_FOR_MOBILE,
  CLEAR_CANVAS,
} from '../types';

export const updateFrontCanvasShape = shape => async dispatch => {
  dispatch({ type: UPDATE_FRONT_CANVAS_SHAPE, payload: shape });
};

export const updateBackCanvasShape = shape => async dispatch => {
  dispatch({ type: UPDATE_BACK_CANVAS_SHAPE, payload: shape });
};

export const updateCanvasMode = canvasMode => async dispatch => {
  dispatch({ type: UPDATE_CANVAS_MODE, payload: canvasMode });
};
export const clearCanvas = () => async dispatch => {
  dispatch({ type: CLEAR_CANVAS });
};

export const saveCanvasBackgroundImageForMobile = backgroundImage => async dispatch => {
  dispatch({ type: SAVE_CANVAS_BACKGROUNDIMAGE_FOR_MOBILE, payload: backgroundImage });
};
