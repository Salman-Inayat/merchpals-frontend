import axios from 'axios';
import { baseURL } from '../../../configs/const';
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
  CLEAR_ERRORS
} from '../types';

export const verifyOTP = (phoneNo, code) => async dispatch => {
  dispatch({ type: AUTH_OTP_VERFICATION });

  axios.post(`${baseURL}/auth/verify-otp`, { 
    phoneNo, 
    code
  }).then(res => dispatch({ type: AUTH_OTP_VERFICATION_SUCCESS }))
    .catch(err => dispatch({ type: AUTH_OTP_VERFICATION_FAILED }));
};

export const sendOTP = (phoneNo) => async dispatch => {
  dispatch({ type: AUTH_OTP_SEND })

  axios.post(`${baseURL}/auth/send-otp`, { phoneNo })
    .then(res => dispatch({ type: AUTH_OTP_SEND_SUCCESS }))
    .catch(err => dispatch({ type: AUTH_OTP_SEND_FAILED })); 
}

export const clearError = (phoneNo) => async dispatch => {
  dispatch({ type: CLEAR_ERRORS })
}

export const sendOTPForResetPassword = (phoneNo) => async dispatch => {
  dispatch({ type: AUTH_FORGOT_PASSWORD_OTP });

  axios.post(`${baseURL}/auth/send-otp-for-reset-password`, { phoneNo })
    .then(res => dispatch({ type: AUTH_FORGOT_PASSWORD_OTP_SUCCESS }))
    .catch(err => dispatch({ type: AUTH_FORGOT_PASSWORD_OTP_FAILED }));
}

export const verifyOTPForResetPassword = (phoneNo, code) => async dispatch => {
  dispatch({ type: AUTH_OTP_VERFICATION });

  axios.post(`${baseURL}/auth/verify-otp?reset-password=y`, { 
    phoneNo, 
    code
  }).then(res => dispatch({ type: AUTH_OTP_VERFICATION_SUCCESS }))
    .catch(err => dispatch({ type: AUTH_OTP_VERFICATION_FAILED }));
};

export const updatePassword = (password, phoneNo) => async dispatch => {
  axios.put(`${baseURL}/auth/update-password`, { 
    password,
    phoneNo
  }).then(res => dispatch({ type: AUTH_RESET_PASSWORD_SUCCESS }))
    .catch(err => {
      console.log('err', err);
      dispatch({ type: AUTH_RESET_PASSWORD_FAILED, payload: err.response.data.message })
    });  
}