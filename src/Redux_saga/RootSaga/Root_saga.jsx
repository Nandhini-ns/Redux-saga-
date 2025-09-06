import { all } from "redux-saga/effects";
import watchLoginSaga from "../Saga/AuthloginSaga";

export default function* rootSaga() {
  yield all([watchLoginSaga()]);
}
