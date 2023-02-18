import { put, call } from "redux-saga/effects";
import { UserAPI, UserAPIKeys } from "../../shared/interfaces/UserAPI";
import * as actions from './../actions';
import { API } from './../../helpers/api-helper';
import { Action, ActionCreator, AnyAction } from "@reduxjs/toolkit";

type UserForSignUp = Omit<UserAPI, 'id'>;
type UserForSignIn = Pick<UserAPI, UserAPIKeys.email | UserAPIKeys.password>;
type UserForForgotPassword = Pick<UserAPI, UserAPIKeys.email>;
type UserForResetPassword = Pick<UserAPI, UserAPIKeys.password>;

export function* signUpSaga(action: AnyAction): Generator<any> {
    yield put(actions.signUpStart());
    const user: UserForSignUp = {
        [UserAPIKeys.firstName]: action.payload.first_name,
        [UserAPIKeys.lastName]: action.payload.last_name,
        [UserAPIKeys.email]: action.payload.email,
        [UserAPIKeys.phone]: action.payload.phone,
        [UserAPIKeys.adress]: action.payload.adress,
        [UserAPIKeys.password]: action.payload.password
    }

    try {
        const response = yield API.post('users/add', JSON.stringify(user)).then(res => res.json());
        console.log({ response })
        yield put(actions.signUpSuccess())
    } catch (e) {
        yield put(actions.signUpFail(e))
    }
}

export function* signInSaga(action: AnyAction): Generator<any> {
    yield put(actions.signInStart());
    const user: UserForSignIn = {
        [UserAPIKeys.email]: action.payload.email,
        [UserAPIKeys.password]: action.payload.password
    }

    try {
        const sessionToken = yield API.post('sessions', JSON.stringify(user));
        yield put(actions.signInSuccess(sessionToken));
    } catch (e) {
        yield put(actions.signInFail(e))
    }
}

export function* forgotPasswordSaga(action: AnyAction): Generator<any> {
    yield put(actions.forgotPasswordStart());
    const user: UserForForgotPassword = {
        [UserAPIKeys.email]: action.payload.email
    }

    try {
        const forgotPasswordRequest = () => API.post('password', JSON.stringify(user)).then(response => response)
        const isSent = yield call(forgotPasswordRequest);
        yield put(actions.forgotPasswordSuccess(isSent as boolean));
    } catch (e) {
        yield put(actions.forgotPasswordFail(e))
    }
}

export function* resetPasswordSaga(action: AnyAction): Generator<any> {
    yield put(actions.resetPasswordStart());
    const user: UserForResetPassword = {
        [UserAPIKeys.password]: action.payload.password
    }

    try {
        const isUpdated = yield API.post('password', JSON.stringify(user));
        yield put(actions.resetPasswordSuccess(isUpdated as boolean))
    } catch (e) {
        yield put(actions.resetPasswordFail(e));
    }
}