import {
  AUTH_OTP_VERFICATION,
  AUTH_OTP_VERFICATION_SUCCESS,
  AUTH_OTP_VERFICATION_FAILED,
  AUTH_OTP_SEND,
  AUTH_OTP_SEND_SUCCESS,
  AUTH_OTP_SEND_FAILED,
  CLEAR_ERRORS
} from '../types';

const initialState = {
  otpVerified: false,
  otpSent: false,
  verificationError: '',
  sendingError: ''
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
  case AUTH_OTP_VERFICATION:
    return { otpVerified: false };
  case AUTH_OTP_VERFICATION_SUCCESS:
    return { otpVerified: true, verificationError: '' };
  case AUTH_OTP_VERFICATION_FAILED:
    return { otpVerified: false, verificationError: 'Something went wrong!' };
  case AUTH_OTP_SEND:
    return { otpSent: false };
  case AUTH_OTP_SEND_SUCCESS:
    return { otpSent: true, sendingError: '' };
  case AUTH_OTP_SEND_FAILED:
    return { otpSent: false, sendingError: 'Error sending OTP. Please Try again!' };
  case CLEAR_ERRORS:
    return { 
      ...state, 
      verificationError: false,
      sendingError: false
    }
  default:
    return state
  }
}

export { authReducer as default };