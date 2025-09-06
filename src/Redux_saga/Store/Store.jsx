import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../RootSaga/Root_saga";
import AuthloReducer from "../Reducer/AuthloReducer";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    auth:AuthloReducer ,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;
