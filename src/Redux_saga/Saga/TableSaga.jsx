import { call, put, takeLatest } from "redux-saga/effects";
import {  fetchContainersApi,createContainerApi,viewContainerApi,editContainerApi, } from "../../Service/Table_Service";
import { createContainerFailure, createContainerSuccess, editContainerFailure, editContainerSuccess, fetchContainersFailure, fetchContainersSuccess, viewContainerFailure, viewContainerSuccess } from "../Actions/Table_Action";
import { CREATE_CONTAINER_REQUEST, EDIT_CONTAINER_REQUEST, FETCH_CONTAINERS_REQUEST, VIEw_CONTAINER_REQUEST, } from "../Types/Table_Types";


function* fetchContainersSaga() {
  try {
    // fetchContainersApi will read token from localStorage
    const response = yield call(fetchContainersApi);

    // Store JWT token if present
    const token = response.data?.data?.jwt;
    if (token) {
      localStorage.setItem("authToken", token);
      console.log("Token stored in localStorage:", token);
    }

    // Extract table data safely
    const tableData = response.data?.data?.tableData || [];
    yield put(fetchContainersSuccess(tableData));

    console.log("Containers fetched:", tableData); // verify
  } catch (error) {
    console.error("Error fetching containers:", error);
    yield put(fetchContainersFailure(error.message));
  }
}  
 // Create
function* createContainerSaga(action) {
  try {
    const response = yield call(createContainerApi, action.payload);
    yield put(createContainerSuccess(response.data));
  } catch (error) {
    yield put(createContainerFailure(error.message));
  }
}

// View
function* viewContainerSaga(action) {
  try {
    const response = yield call(viewContainerApi, action.payload);
    yield put(viewContainerSuccess(response.data));
  } catch (error) {
    yield put(viewContainerFailure(error.message));
  }
}

// Edit
function* editContainerSaga(action) {
  try {
    const { id, updatedData } = action.payload;
    const response = yield call(editContainerApi, id, updatedData);
    yield put(editContainerSuccess(response.data));
  } catch (error) {
    yield put(editContainerFailure(error.message));
  }
}

// watcher
export default function* tableSaga() {
    yield takeLatest(FETCH_CONTAINERS_REQUEST, fetchContainersSaga);
  // yield takeLatest(DELETE_CONTAINER_REQUEST, handleDeleteContainer);
  yield takeLatest(CREATE_CONTAINER_REQUEST, createContainerSaga);
  yield takeLatest(VIEw_CONTAINER_REQUEST, viewContainerSaga);
  yield takeLatest(EDIT_CONTAINER_REQUEST, editContainerSaga);
}