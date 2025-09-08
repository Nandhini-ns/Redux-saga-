
import { takeLatest, put, call } from "redux-saga/effects";
import { LOGIN_REQUEST, OTP_RESEND_REQUEST, OTP_VERIFY_REQUEST } from "../Types/LoginForm_Types";
import { loginSuccess, loginFailure, otpVerifySuccess, otpResendFailure, otpResendSuccess, otpSent } from "../Actions/Authlogin_Action";
import { loginApi, resendOtpApi, verifyOtpApi } from "../../Service/LoginForm_Service";

function* handleLogin(action) {
  try {
    const response = yield call(loginApi, action.payload);
    yield put(loginSuccess(response.data));
    yield put(otpSent());
  } catch (error) {
    const errorMsg =
      error.response?.data?.error?.message || // backend la { error: { message: "..." } }
      error.response?.data?.message ||        // backend la { message: "..." }
      error.message ||                        // axios la default message
      "Login Failed";

    yield put(loginFailure(errorMsg));
  }
}

//OTP Verify 
function* handleOtpVerify(action){
  try{
    const response = yield call (verifyOtpApi, action.payload);
    yield put(otpVerifySuccess(response.data?.message || "OTP Verified Successfully"));
  } catch(error){
    const errorMsg = error.response?.data?.error?.message || error.response?.data?.message || error.message || "OTP Verification Failed";
    yield put(otpResendFailure(errorMsg));
  }
}

//Resend OTP 
function* handleOtpResend(action) {
  try{
    const response = yield call(resendOtpApi, action.payload);
    yield put(otpResendSuccess(response.data?.message || "OTP Resent Successfully"));
  } catch(error){
    const errorMsg = error.response?.data?.error?.message || error.response?.data?.message || error.message || "OTP Resent Failed";
    yield put(otpResendFailure(errorMsg));
  }
}


export default function* authloginSaga() {
  yield takeLatest(LOGIN_REQUEST, handleLogin);
  yield takeLatest(OTP_VERIFY_REQUEST, handleOtpVerify);
  yield takeLatest(OTP_RESEND_REQUEST, handleOtpResend);
}
