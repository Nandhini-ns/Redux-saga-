 import { createContainerRequest } from ".";
import { CREATE_CONTAINER_FAILURE, CREATE_CONTAINER_REQUEST, CREATE_CONTAINER_SUCCESS, FETCH_CONTAINER_GROUPS_FAILURE, FETCH_CONTAINER_GROUPS_REQUEST, FETCH_CONTAINER_GROUPS_SUCCESS, FETCH_PORTS_FAILURE, FETCH_PORTS_REQUEST, FETCH_PORTS_SUCCESS } from "../Types/Container_Types";
// import { CREATE_CONTAINER_FAILURE, CREATE_CONTAINER_REQUEST, CREATE_CONTAINER_SUCCESS } from "../Types/Container_Types";

//get group 
export const fetchContainerGroupsRequest=(payload) =>({
    type: FETCH_CONTAINER_GROUPS_REQUEST,
    payload,
});
export const fetchContainerGroupsSuccess=(data) =>({
    type: FETCH_CONTAINER_GROUPS_SUCCESS,
    data,
});
export const fetchContainerGroupsFailure=(error)=>({
    type: FETCH_CONTAINER_GROUPS_FAILURE,
    error,
});

//get ports
export const fetchPortsRequest=(payload)=>({
    type: FETCH_PORTS_REQUEST,
    payload,
});
export const fetchPortsSuccess=(data)=>({
    type:FETCH_PORTS_SUCCESS,
    data,
});
export const fetchPortsFailure=(error)=>({
    type:FETCH_PORTS_FAILURE,
    error,
})

//create container
export const createContainerRequest = (payload) =>({
    type:CREATE_CONTAINER_REQUEST,
    payload,
});
export const createContainerSuccess=(data)=>({
    type:CREATE_CONTAINER_SUCCESS,
    data,
});
export const createContainerFailure=(error)=>({
    type:CREATE_CONTAINER_FAILURE,
    error,
});





