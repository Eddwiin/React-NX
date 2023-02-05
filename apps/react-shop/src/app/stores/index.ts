import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { reducers } from "./reducers";
import authReducer from "./reducers/auth";
import { watchAuth } from "./sagas";

const sagaMiddleware = createSagaMiddleware();
const middleware = (getDefaultMiddleware: any) => [...getDefaultMiddleware({ thunk: false }), sagaMiddleware];

export const store = configureStore({
    reducer: {
        authReducer: authReducer
    },
    middleware
})

sagaMiddleware.run(watchAuth);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store;