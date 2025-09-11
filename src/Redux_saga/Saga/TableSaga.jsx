import { call, put, takeLatest } from "redux-saga/effects";
import { deleteContainerApi, fetchContainersApi } from "../../Service/Table_Service";
import { deleteContainerFailure, deleteContainerSuccess, fetchContainersFailure, fetchContainersSuccess } from "../Actions/Table_Action";
import { DELETE_CONTAINER_REQUEST, FETCH_CONTAINERS_REQUEST } from "../Types/Table_Types";


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

// worker: delete container
function* handleDeleteContainer(action) {
  try {
    yield call(deleteContainerApi, action.payload);
    yield put(deleteContainerSuccess(action.payload));
  } catch (error) {
    yield put(deleteContainerFailure(error.message));
  }
}

// watcher
export default function* tableSaga() {
    yield takeLatest(FETCH_CONTAINERS_REQUEST, fetchContainersSaga);
  yield takeLatest(DELETE_CONTAINER_REQUEST, handleDeleteContainer);
}