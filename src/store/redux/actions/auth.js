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
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILED,
  AUTH_LOGOUT,
  AUTH_LOGOUT_CLEAR,
  CLEAR_ERRORS,
  GET_LOGGED_IN_USER_INFO_SUCCESS,
  GET_LOGGED_IN_USER_INFO_FAILED,
  CREATE_VENDOR_SUCCESS,
  CREATE_VENDOR_FAILED,
} from '../types';

export const verifyOTP = (phoneNo, code) => async dispatch => {
  dispatch({ type: AUTH_OTP_VERFICATION });

  axios
    .post(`${baseURL}/auth/verify-otp`, {
      phoneNo,
      code,
    })
    .then(res => dispatch({ type: AUTH_OTP_VERFICATION_SUCCESS }))
    .catch(err => dispatch({ type: AUTH_OTP_VERFICATION_FAILED }));
};

export const sendOTP = phoneNo => async dispatch => {
  dispatch({ type: AUTH_OTP_SEND });

  axios
    .post(`${baseURL}/auth/send-otp`, { phoneNo })
    .then(res => dispatch({ type: AUTH_OTP_SEND_SUCCESS }))
    .catch(err => dispatch({ type: AUTH_OTP_SEND_FAILED }));
};

export const clearError = phoneNo => async dispatch => {
  dispatch({ type: CLEAR_ERRORS });
};

export const sendOTPForResetPassword = phoneNo => async dispatch => {
  dispatch({ type: AUTH_FORGOT_PASSWORD_OTP });

  axios
    .post(`${baseURL}/auth/send-otp-for-reset-password`, { phoneNo })
    .then(res => dispatch({ type: AUTH_FORGOT_PASSWORD_OTP_SUCCESS }))
    .catch(err => dispatch({ type: AUTH_FORGOT_PASSWORD_OTP_FAILED }));
};

export const verifyOTPForResetPassword = (phoneNo, code) => async dispatch => {
  dispatch({ type: AUTH_OTP_VERFICATION });

  axios
    .post(`${baseURL}/auth/verify-otp?reset-password=y`, {
      phoneNo,
      code,
    })
    .then(res => dispatch({ type: AUTH_OTP_VERFICATION_SUCCESS }))
    .catch(err => dispatch({ type: AUTH_OTP_VERFICATION_FAILED }));
};

export const updatePassword = (password, phoneNo) => async dispatch => {
  axios
    .put(`${baseURL}/auth/update-password`, {
      password,
      phoneNo,
    })
    .then(res => dispatch({ type: AUTH_RESET_PASSWORD_SUCCESS }))
    .catch(err =>
      dispatch({ type: AUTH_RESET_PASSWORD_FAILED, payload: err.response.data.message }),
    );
};

export const login = (phoneNo, password) => async dispatch => {
  axios
    .post(`${baseURL}/auth/login`, {
      phoneNo,
      password,
    })
    .then(res => dispatch({ type: AUTH_LOGIN_SUCCESS, payload: res.data }))
    .catch(err => dispatch({ type: AUTH_LOGIN_FAILED, message: err.response.data.message }));
};

export const logout = () => dispatch => {
  dispatch({ type: AUTH_LOGOUT });
};

export const clearLogoutFlag = () => dispatch => {
  dispatch({ type: AUTH_LOGOUT_CLEAR });
};

export const getLoggedInUserInfo = () => async dispatch => {
  axios
    .get(`${baseURL}/auth`, {
      headers: {
        Authorization: localStorage.getItem('MERCHPAL_AUTH_TOKEN'),
      },
    })
    .then(res => dispatch({ type: GET_LOGGED_IN_USER_INFO_SUCCESS, payload: res.data }))
    .catch(err =>
      dispatch({ type: GET_LOGGED_IN_USER_INFO_FAILED, message: err.response.data.message }),
    );
};

export const registerVendor = data => async dispatch => {
  axios
    .post(`${baseURL}/auth/sign-up`, { data })
    .then(response => {
      dispatch({
        type: CREATE_VENDOR_SUCCESS,
        payload: { phoneNo: data.phoneNo, token: response.data.token },
      });
    })
    .catch(error => {
      dispatch({
        type: CREATE_VENDOR_FAILED,
        payload: error.response.data,
      });
    });
};