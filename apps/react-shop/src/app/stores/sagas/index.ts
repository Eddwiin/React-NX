import { all, takeEvery } from "redux-saga/effects";
import * as actionTypes from './../actions/actionsType';
import { forgotPasswordSaga, signInSaga, signUpSaga } from "./auth";

export function* watchAuth() {
    yield all([
        takeEvery(actionTypes.SIGN_UP, signUpSaga),
        takeEvery(actionTypes.SIGN_IN, signInSaga),
        takeEvery(actionTypes.FORGOT_PASSWORD, forgotPasswordSaga)
    ])
}