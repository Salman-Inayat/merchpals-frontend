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
  CREATE_VENDOR_SUCCESS,
  CREATE_VENDOR_FAILED,
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
  vendorCreated: false,
  phoneNo: '',
  registrationErrors: {
    phoneNo: '',
    email: '',
    message: '',
  },
};

const setAuthTokens = data => {
  localStorage.setItem('MERCHPAL_AUTH_TOKEN', data.token);
  return true;
};

const createVendor = (state, payload) => {
  localStorage.setItem('MERCHPAL_AUTH_TOKEN', payload.token);
  localStorage.setItem('phoneNoForOTP', payload.phoneNo);
  return {
    phoneNo: payload.phoneNo,
    vendorCreated: true,
    registrationErrors: {
      phoneNo: '',
      email: '',
      message: '',
    },
  };
};

const createVendorFailed = (state, payload) => {
  let err = payload.message;
  let errObj = {};

  if (payload.name === 'object') {
    err = JSON.parse(payload.message);
  }

  if (typeof err === 'string') {
    errObj = { phoneNo: '', email: '', message: err };
  } else {
    errObj = {
      phoneNo: err.phoneNo,
      email: err.email,
      message: '',
    };
    return {
      registrationErrors: errObj,
      vendorCreated: false,
    };
  }
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_OTP_VERFICATION:
      return { ...state, otpVerified: false };
    case AUTH_OTP_VERFICATION_SUCCESS:
      return { ...state, otpVerified: true, verificationError: '' };
    case AUTH_OTP_VERFICATION_FAILED:
      return { ...state, otpVerified: false, verificationError: 'Invalid OTP!' };
    case AUTH_OTP_SEND:
    case AUTH_FORGOT_PASSWORD_OTP:
      return { ...state, otpSent: false };
    case AUTH_OTP_SEND_SUCCESS:
    case AUTH_FORGOT_PASSWORD_OTP_SUCCESS:
      return { ...state, otpSent: true, sendingError: '' };
    case AUTH_OTP_SEND_FAILED:
    case AUTH_FORGOT_PASSWORD_OTP_FAILED:
      return {
        otpSent: false,
        sendingError: 'Error sending OTP. Please Try again!',
      };
    case AUTH_RESET_PASSWORD_SUCCESS:
      return { ...state, passwordUpdated: true, error: false };
    case AUTH_RESET_PASSWORD_FAILED:
      return { ...state, passwordUpdated: false, error: action.payload };
    case AUTH_LOGIN_SUCCESS:
      setAuthTokens(action.payload);
      return { ...state, isLoggedIn: true, error: false };
    case CLEAR_ERRORS:
      return {
        ...state,
        verificationError: '',
        sendingError: '',
        error: '',
      };
    case AUTH_LOGOUT:
      localStorage.removeItem('MERCHPAL_AUTH_TOKEN');
      return { ...state, isLoggedOut: true };
    case AUTH_LOGIN_FAILED:
      return { ...state, isLoggedIn: false, error: action.payload };
    case GET_LOGGED_IN_USER_INFO_FAILED:
      localStorage.removeItem('MERCHPAL_AUTH_TOKEN');
      return { ...state, isLoggedOut: true, isLoggedIn: false };
    case GET_LOGGED_IN_USER_INFO_SUCCESS:
      return { ...state, user: action.payload };
    case AUTH_LOGOUT_CLEAR:
      return { ...state, isLoggedOut: false };
    case CREATE_VENDOR_SUCCESS:
      return createVendor(state, action.payload);
    case CREATE_VENDOR_FAILED:
      return createVendorFailed(state, action.payload);
    default:
      return state;
  }
};

export { authReducer as default };
