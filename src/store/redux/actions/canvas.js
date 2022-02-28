import { UPDATE_CANVAS_SHAPE, UPDATE_CANVAS_MODE } from '../types';

export const updateCanvasShape = shape => async dispatch => {
  dispatch({ type: UPDATE_CANVAS_SHAPE, payload: shape });
};

export const updateCanvasMode = canvasMode => async dispatch => {
  dispatch({ type: UPDATE_CANVAS_MODE, payload: canvasMode });
};
