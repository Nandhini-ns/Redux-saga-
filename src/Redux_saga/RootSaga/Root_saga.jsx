import { all } from "redux-saga/effects";
import watchLoginSaga from "../Saga/AuthloginSaga";
import tableSaga from "../Saga/TableSaga";

export default function* rootSaga() {
  yield all([watchLoginSaga(),tableSaga()]);
}
