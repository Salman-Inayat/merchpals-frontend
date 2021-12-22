import {
  AUTH_OTP_VERFICATION,
  AUTH_OTP_VERFICATION_SUCCESS,
  AUTH_OTP_VERFICATION_FAILED
} from '../types';

const initialState = {
  otpVerified: false,
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_OTP_VERFICATION:
      return { otpVerified: false };
    case AUTH_OTP_VERFICATION_SUCCESS:
      return { otpVerified: true, error: false };
    case AUTH_OTP_VERFICATION_FAILED:
      return { otpVerified: false, error: true };
    default:
      return state
  }
}

export { authReducer as default };