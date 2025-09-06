
import { takeLatest, put, call } from "redux-saga/effects";
import { LOGIN_REQUEST } from "../Types/LoginForm_Types";
import { loginSuccess, loginFailure } from "../Actions/Authlogin_Action";
import { loginApi } from "../../Service/LoginForm_Service";

function* handleLogin(action) {
  try {
    const response = yield call(loginApi, action.payload);
    yield put(loginSuccess(response.data));
  } catch (error) {
    const errorMsg =
      error.response?.data?.error?.message || // backend la { error: { message: "..." } }
      error.response?.data?.message ||        // backend la { message: "..." }
      error.message ||                        // axios la default message
      "Login Failed";

    yield put(loginFailure(errorMsg));
  }
}

export default function* authloginSaga() {
  yield takeLatest(LOGIN_REQUEST, handleLogin);
}
