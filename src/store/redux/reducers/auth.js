import {
  AUTH_OTP_VERFICATION,
  AUTH_OTP_VERFICATION_SUCCESS,
  AUTH_OTP_VERFICATION_FAILED,
  AUTH_OTP_SEND,
  AUTH_OTP_SEND_SUCCESS,
  AUTH_OTP_SEND_FAILED,
  AUTH_FORGOT_PASSWORD_OTP,
  AUTH_FORGOT_PASSWORD_OTP_SUCCESS,
  AUTH_FORGOT_PASSWORD_OTP_FAILED,
  AUTH_RESET_PASSWORD_SUCCESS,
  AUTH_RESET_PASSWORD_FAILED,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILED,
  AUTH_LOGOUT,
  GET_LOGGED_IN_USER_INFO_SUCCESS,
  GET_LOGGED_IN_USER_INFO_FAILED,
  AUTH_LOGOUT_CLEAR,
  CLEAR_ERRORS,
} from '../types';

const initialState = {
  otpVerified: false,
  otpSent: false,
  isLoggedIn: false,
  isLoggedOut: false,
  verificationError: '',
  sendingError: '',
  error: '',
  user: null,
  redirect: false,
};

const setAuthTokens = data => {
  console.log({ data });
  localStorage.setItem('MERCHPAL_AUTH_TOKEN', data.token);
  return true;
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_OTP_VERFICATION:
      return { otpVerified: false };
    case AUTH_OTP_VERFICATION_SUCCESS:
      return { otpVerified: true, verificationError: '' };
    case AUTH_OTP_VERFICATION_FAILED:
      return { otpVerified: false, verificationError: 'Something went wrong!' };
    case AUTH_OTP_SEND:
    case AUTH_FORGOT_PASSWORD_OTP:
      return { otpSent: false };
    case AUTH_OTP_SEND_SUCCESS:
    case AUTH_FORGOT_PASSWORD_OTP_SUCCESS:
      return { otpSent: true, sendingError: '' };
    case AUTH_OTP_SEND_FAILED:
    case AUTH_FORGOT_PASSWORD_OTP_FAILED:
      return {
        otpSent: false,
        sendingError: 'Error sending OTP. Please Try again!',
      };
    case AUTH_RESET_PASSWORD_SUCCESS:
      return { passwordUpdated: true, error: false };
    case AUTH_RESET_PASSWORD_FAILED:
      return { passwordUpdated: false, error: action.payload };
    case AUTH_LOGIN_SUCCESS:
      setAuthTokens(action.payload);
      return { isLoggedIn: true, error: false };
    case CLEAR_ERRORS:
      return {
        ...state,
        verificationError: '',
        sendingError: '',
        error: '',
      };
    case AUTH_LOGOUT:
    case AUTH_LOGIN_FAILED:
    case GET_LOGGED_IN_USER_INFO_FAILED:
      localStorage.removeItem('MERCHPAL_AUTH_TOKEN');
      return { isLoggedOut: true, isLoggedIn: false };
    case GET_LOGGED_IN_USER_INFO_SUCCESS:
      console.log({ payload: action });
      return { user: action.payload };
    case AUTH_LOGOUT_CLEAR:
      return { isLoggedOut: false };
    default:
      return state;
  }
};

export { authReducer as default };
