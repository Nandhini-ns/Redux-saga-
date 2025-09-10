import { type } from "@testing-library/user-event/dist/type";
import { DELETE_CONTAINER_FAILURE, DELETE_CONTAINER_REQUEST, DELETE_CONTAINER_SUCCESS, FETCH_CONTAINERS_FAILURE, FETCH_CONTAINERS_REQUEST, FETCH_CONTAINERS_SUCCESS } from "../Types/Tabel_Types";

export const fetchContainersRequest = () =>({
    type:FETCH_CONTAINERS_REQUEST,
});

export const fetchContainersSuccess =(data) =>({
    type: FETCH_CONTAINERS_SUCCESS,
    payload:data,
});

export const fetchContainersFailure =(error)=>({
    type: FETCH_CONTAINERS_FAILURE,
    payload:error,
});

export const deleteContainerRequest =(id)=>({
    type:DELETE_CONTAINER_REQUEST,
    payload: id,
});

export const deleteContainerSuccess = (id) =>({
    type:DELETE_CONTAINER_SUCCESS,
    payload:id,
});

export const deleteContainerFailure =(error) =>({
    type: DELETE_CONTAINER_FAILURE,
    payload : erroe,
});