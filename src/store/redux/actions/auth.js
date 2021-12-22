import axios from 'axios';
import { baseURL } from '../../../configs/const';
import { 
  AUTH_OTP_VERFICATION,
  AUTH_OTP_VERFICATION_SUCCESS,
  AUTH_OTP_VERFICATION_FAILED,
  AUTH_OTP_SEND,
  AUTH_OTP_SEND_SUCCESS,
  AUTH_OTP_SEND_FAILED,
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

export const clearError = () => async dispatch => {
  dispatch({ type: CLEAR_ERRORS })
}