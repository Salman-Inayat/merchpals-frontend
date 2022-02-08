import { SAVE_DESIGN, SAVE_THEME_COLOR } from '../types';

export const saveDesign = json => async dispatch => {
  dispatch({ type: SAVE_DESIGN, payload: json });
};
export const saveThemeColor =
  ({ themeColor }) =>
  async dispatch => {
    dispatch({ type: SAVE_THEME_COLOR, payload: themeColor });
  };
