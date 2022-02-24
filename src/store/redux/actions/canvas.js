import { UPDATE_CANVAS_SHAPE } from '../types';

export const updateCanvasShape = shape => async dispatch => {
  dispatch({ type: UPDATE_CANVAS_SHAPE, payload: shape });
};
