import { SAVE_DESIGN_JSON } from '../types';

export const saveDesignJSON = json => async dispatch => {
  dispatch({ type: SAVE_DESIGN_JSON, payload: json });
};
