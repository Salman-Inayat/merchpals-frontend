import { SAVE_FRONT_DESIGN, SAVE_BACK_DESIGN, SAVE_THEME_COLOR, CLEAR_DESIGN } from '../types';

export const saveFrontDesign = frontDesign => async dispatch => {
  dispatch({ type: SAVE_FRONT_DESIGN, payload: frontDesign });
};

export const saveBackDesign = backDesign => async dispatch => {
  dispatch({ type: SAVE_BACK_DESIGN, payload: backDesign });
};

export const clearDesign = () => dispatch => {
  const promise = new Promise(resolve => {
    dispatch({ type: CLEAR_DESIGN });
    resolve();
  });
  return promise;
};

export const saveThemeColor =
  ({ themeColor }) =>
  async dispatch => {
    dispatch({ type: SAVE_THEME_COLOR, payload: themeColor });
  };
