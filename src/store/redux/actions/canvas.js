import {UPDATE_FRONT_CANVAS_SHAPE, UPDATE_BACK_CANVAS_SHAPE, UPDATE_CANVAS_MODE} from '../types';

export const updateFrontCanvasShape = shape => async dispatch => {
    dispatch({type: UPDATE_FRONT_CANVAS_SHAPE, payload: shape});
};

export const updateBackCanvasShape = shape => async dispatch => {
    dispatch({type: UPDATE_BACK_CANVAS_SHAPE, payload: shape});
};

export const updateCanvasMode = canvasMode => async dispatch => {
    dispatch({type: UPDATE_CANVAS_MODE, payload: canvasMode});
};
