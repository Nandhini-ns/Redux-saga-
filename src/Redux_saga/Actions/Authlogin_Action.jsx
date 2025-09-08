
// import { type } from "@testing-library/user-event/dist/type";
import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, OTP_RESEND_FAILURE, OTP_RESEND_REQUEST, OTP_RESEND_SUCCESS, OTP_SENT, OTP_VERIFY_FAILURE, OTP_VERIFY_REQUEST, OTP_VERIFY_SUCCESS,} from "../Types/LoginForm_Types";

export const loginRequest = (credentials) => ({
  type: LOGIN_REQUEST,
  payload: credentials,
});

export const loginSuccess = (data) => ({
  type: LOGIN_SUCCESS,
  payload: data,
});

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const otpSent =() =>({
  type:OTP_SENT,
});

export const otpVerifyRequest =(otpData) =>({
  type: OTP_VERIFY_REQUEST,
  payload: otpData,
});

export const otpVerifySuccess = (message) => ({
  type: OTP_VERIFY_SUCCESS,
  payload: message,
});

export const otpVerifyFailure = (error) => ({
  type: OTP_VERIFY_FAILURE,
  payload: error,
});

export const otpResendRequest = (userId) => ({
  type: OTP_RESEND_REQUEST,
  payload: userId,
});

export const otpResendSuccess = (message) => ({
  type: OTP_RESEND_SUCCESS,
  payload: message,
});

export const otpResendFailure = (error) => ({
  type: OTP_RESEND_FAILURE,
  payload: error,
});
