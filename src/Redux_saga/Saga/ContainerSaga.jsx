// // import { call, put, takeLatest } from "redux-saga/effects";
// // // import {
// // //   CREATE_CONTAINER_REQUEST,
// // // } from "../Types/Container_Types";
// // // import {
// // //   createContainerSuccess,
// // //   createContainerFailure,
// // // } from "../Actions/Container_Action";
// // // import { createContainerApi } from "../api/containerApi";
// // import { CREATE_CONTAINER_REQUEST } from "../Types/Container_Types";
// // import { createContainerFailure, createContainerSuccess } from "../Actions/Table_Action";
// // import { createContainerApi } from "../../Service/Container_Service";

// // function* createContainerSaga(action) {
// //   try {
// //     const response = yield call(createContainerApi, action.payload);
// //     yield put(createContainerSuccess(response));
// //   } catch (error) {
// //     yield put(createContainerFailure(error.message));
// //   }
// // }

// // export function* watchCreateContainer() {
// //   yield takeLatest(CREATE_CONTAINER_REQUEST, createContainerSaga);
// // }

// import { call, put, takeLatest } from "redux-saga/effects";
// import { CREATE_CONTAINER_REQUEST } from "../Types/Container_Types";
// import { createContainerFailure, createContainerSuccess } from "../Actions/Table_Action";
// import { createContainerApi } from "../../Service/Container_Service";

// function* createContainerSaga(action) {
//   try {
//     const response = yield call(createContainerApi, action.payload);

//     // 👇 use response.data only
//     yield put(createContainerSuccess(response.data));
//   } catch (error) {
//     console.error("Create Container Error:", error);
//     yield put(createContainerFailure(error.response?.data?.message || error.message));
//   }
// }

// export function* watchCreateContainer() {
//   yield takeLatest(CREATE_CONTAINER_REQUEST, createContainerSaga);
// }
