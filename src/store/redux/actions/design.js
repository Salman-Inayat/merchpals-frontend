import { SAVE_DESIGN_JSON, SAVE_THEME_COLOR } from '../types';

export const saveDesignJSON = json => async dispatch => {
  dispatch({ type: SAVE_DESIGN_JSON, payload: json });
};
export const saveThemeColor =
  ({ themeColor }) =>
  async dispatch => {
    dispatch({ type: SAVE_THEME_COLOR, payload: themeColor });
  };
