import { takeLatest, put, call } from "redux-saga/effects";
import { LOGIN_REQUEST, OTP_RESEND_REQUEST, OTP_VERIFY_REQUEST } from "../Types/LoginForm_Types";
import { 
  loginSuccess, 
  loginFailure, 
  otpVerifySuccess, 
  otpResendFailure, 
  otpResendSuccess, 
  otpSent, 
  otpVerifyFailure 
} from "../Actions/Authlogin_Action";
import { loginApi, resendOtpApi, verifyOtpApi } from "../../Service/LoginForm_Service";
import { toast } from "react-toastify";
function* handleLogin(action) {
  try {
    // Log the payload being sent
    console.log("Login payload:", action.payload);

    // Call the login API
    const response = yield call(loginApi, action.payload);

    // Log full API response
    console.log("Login API response:", response.data);

    //  Extract JWT token safely
    const token = response.data?.data?.jwt;
    if (token) {
      localStorage.setItem("authToken", token);
      console.log("Token stored in localStorage:", localStorage.getItem("authToken"));
    } else {
      console.warn("JWT token not found in response");
    }

    // store other info if backend returns opaque or userId
    const opaque = response.data?.data?.opaque;
    console.log(opaque) 
    if (opaque) localStorage.setItem("opaque", opaque);

    //  Dispatch login success
    yield put(loginSuccess(response.data));
    console.log("Login success action dispatched");

    //Dispatch OTP sent action to open OTP modal
    yield put(otpSent());
    console.log("OTP sent action dispatched, modal should open");
  } catch (error) {
    // Catch any errors and log fully
    // const errorMsg =
    //   error.response?.data?.error?.message ||
    //   error.response?.data?.message ||
    //   error.message ||
    //   "Login Failed";

    // console.error("Login error:", errorMsg);
    // yield put(loginFailure(errorMsg));
     yield put(loginFailure(error.response?.data || error.message));
  }
}

//  OTP VERIFY SAGA 
function* handleOtpVerify(action) {
  try {
    const jwtToken = localStorage.getItem("authToken");
    const opaque = localStorage.getItem("opaque");
    const accessCode = action.payload?.accessCode; // from input

    // console.log("Verifying OTP with payload:", { opaque, accessCode }, "JWT:", jwtToken);

    const payload = { opaque, accessCode };

    const response = yield call(verifyOtpApi, payload, jwtToken);
    console.log("OTP verify response:", response.data);

    if (response.data?.data?.isValidAccessCode) {
      yield put(otpVerifySuccess("OTP Verified Successfully!"));
      toast.success(response.data?.data?.message || " OTP Verified Successfully!");
    } else {
      yield put(otpVerifyFailure("Invalid OTP. Please try again."));
      toast.error(response.data?.data?.message || "Invalid OTP. Please try again.");
    }
  } catch (error) {
    console.error("OTP verify error:", error.response || error);
    yield put(otpVerifyFailure("OTP Verification Failed"));
     toast.error(" OTP Verification Failed, Try Again!");
  }
}

function* handleOtpResend() {
  try {
    const jwtToken = localStorage.getItem("authToken"); // JWT from login
    const opaque = localStorage.getItem("opaque");      // Opaque from login

    if (!jwtToken || !opaque) {
      throw new Error("Missing JWT token or opaque value");
    }

    const payload = { opaque };
    // console.log("Resend OTP payload:", payload, "JWT:", jwtToken);

    const response = yield call(resendOtpApi, payload, jwtToken);

    // console.log("Resend OTP response:", response.data?.data);

    // 👇 API la vandha pudhusa values
    const { opaque: newOpaque, accessCode: newAccessCode } =
      response.data?.data || {};

      console.log(opaque)
      console.log(newAccessCode)
    // localStorage update
    if (newOpaque) {
      localStorage.setItem("opaque", newOpaque);
    }

    // success action -> both message + data send pannunga
    yield put(
      otpResendSuccess({
        message: response.data?.message || "OTP Resent Successfully",
        opaque: newOpaque,
        accessCode: newAccessCode,
      })
    );
  } catch (error) {
    const errorMsg =
      error.response?.data?.error?.message ;


    yield put(otpResendFailure(errorMsg));
  }
}


export default function* authloginSaga() {
  yield takeLatest(LOGIN_REQUEST, handleLogin);
  yield takeLatest(OTP_VERIFY_REQUEST, handleOtpVerify);
  yield takeLatest(OTP_RESEND_REQUEST, handleOtpResend);
}
