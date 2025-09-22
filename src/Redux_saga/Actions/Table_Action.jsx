import {  EDIT_CONTAINER_FAILURE, EDIT_CONTAINER_REQUEST, EDIT_CONTAINER_SUCCESS, FETCH_CONTAINERS_FAILURE, FETCH_CONTAINERS_REQUEST, FETCH_CONTAINERS_SUCCESS, VIEW_CONTAINER_FAILURE, VIEw_CONTAINER_REQUEST, VIEW_CONTAINER_SUCCESS } from "../Types/Table_Types";

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

// Create


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