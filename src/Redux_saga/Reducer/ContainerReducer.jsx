// import {
//   CREATE_CONTAINER_REQUEST,
//   CREATE_CONTAINER_SUCCESS,
//   CREATE_CONTAINER_FAILURE,
// } from "../Types/Container_Types";

// const initialState = {
//   loading: false,
//   data: null,
//   error: null,
// };

// const containerReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case CREATE_CONTAINER_REQUEST:
//       return {
//         ...state,
//         loading: true,
//         error: null,
//       };

//     case CREATE_CONTAINER_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         data: action.payload,
//       };

//     case CREATE_CONTAINER_FAILURE:
//       return {
//         ...state,
//         loading: false,
//         error: action.payload,
//       };

//     default:
//       return state;
//   }
// };

// export default containerReducer;
