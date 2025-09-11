import { CREATE_CONTAINER_FAILURE, CREATE_CONTAINER_REQUEST, CREATE_CONTAINER_SUCCESS, EDIT_CONTAINER_FAILURE, EDIT_CONTAINER_REQUEST, EDIT_CONTAINER_SUCCESS, FETCH_CONTAINERS_FAILURE, FETCH_CONTAINERS_REQUEST, FETCH_CONTAINERS_SUCCESS, VIEW_CONTAINER_FAILURE, VIEw_CONTAINER_REQUEST, VIEW_CONTAINER_SUCCESS } from "../Types/Table_Types";

// fetch

export const fetchContainersRequest = () => ({
  type: FETCH_CONTAINERS_REQUEST,
});

export const fetchContainersSuccess = (containers) => ({
  type: FETCH_CONTAINERS_SUCCESS,
  payload: containers,
});

export const fetchContainersFailure = (error) => ({
  type: FETCH_CONTAINERS_FAILURE,
  payload: error,
});

// // delete
// export const deleteContainerRequest = (id) => ({
//   type: DELETE_CONTAINER_REQUEST,
//   payload: id,
// });
// export const deleteContainerSuccess = (id) => ({
//   type: DELETE_CONTAINER_SUCCESS,
//   payload: id,
// });
// export const deleteContainerFailure = (error) => ({
//   type: DELETE_CONTAINER_FAILURE,
//   payload: error,
// });

// Create
export const createContainerRequest = (data) => ({
   type: CREATE_CONTAINER_REQUEST, 
   payload: data });
export const createContainerSuccess = (data) => ({ 
  type: CREATE_CONTAINER_SUCCESS, 
  payload: data });
export const createContainerFailure = (error) => ({
   type: CREATE_CONTAINER_FAILURE, 
   payload: error });

export const viewContainerRequest = (id) => ({ 
  type: VIEw_CONTAINER_REQUEST,
   payload: id });
export const viewContainerSuccess = (data) => ({ 
  type: VIEW_CONTAINER_SUCCESS, 
  payload: data });
export const viewContainerFailure = (error) => ({ 
  type: VIEW_CONTAINER_FAILURE, 
  payload: error });

  export const editContainerRequest = (id, updatedData) => ({
  type: EDIT_CONTAINER_REQUEST,
  payload: { id, updatedData },
});
export const editContainerSuccess = (data) => ({
   type: EDIT_CONTAINER_SUCCESS, 
   payload: data });
export const editContainerFailure = (error) => ({ 
  type: EDIT_CONTAINER_FAILURE, 
  payload: error });