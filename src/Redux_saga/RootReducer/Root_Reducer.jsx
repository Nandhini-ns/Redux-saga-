
import { combineReducers } from "@reduxjs/toolkit";
import tableReducer from "../Reducer/TableReducer";


const rootReducer = combineReducers({
    table: tableReducer, // use lowercase 'table'
   
});

export default rootReducer;
