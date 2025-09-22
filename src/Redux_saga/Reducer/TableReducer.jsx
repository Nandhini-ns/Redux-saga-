import { CREATE_CONTAINER_FAILURE, CREATE_CONTAINER_SUCCESS, EDIT_CONTAINER_FAILURE, EDIT_CONTAINER_SUCCESS, FETCH_CONTAINERS_FAILURE, FETCH_CONTAINERS_REQUEST, FETCH_CONTAINERS_SUCCESS, VIEW_CONTAINER_FAILURE, VIEW_CONTAINER_SUCCESS } from "../Types/Table_Types";
const initialState = {
  containers: [],
  loading: false,
  error: null,
};

const tableReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CONTAINERS_REQUEST:
    // case DELETE_CONTAINER_REQUEST:
      return { ...state, loading: true };

    case FETCH_CONTAINERS_SUCCESS:
      return { ...state, loading: false, containers: action.payload };

    case FETCH_CONTAINERS_FAILURE:
      return { ...state, loading: false, error: action.payload };
      

      case VIEW_CONTAINER_SUCCESS:
      return { ...state, selectedContainer: action.payload };
    case VIEW_CONTAINER_FAILURE:
      return { ...state, error: action.payload };

    case EDIT_CONTAINER_SUCCESS:
      return {
        ...state,
        containers: state.containers.map((c) =>
          c.id === action.payload.id ? action.payload : c
        ),
      };
    case EDIT_CONTAINER_FAILURE:
      return { ...state, error: action.payload };


    default:
      return state;
  }
};

export default tableReducer;

