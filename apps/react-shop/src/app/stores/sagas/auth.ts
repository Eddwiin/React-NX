import { put } from "redux-saga/effects";
import { UserAPI, UserAPIKeys } from "../../shared/interfaces/UserAPI";
import * as actions from './../actions';
import { API } from './../../helpers/api-helper';

type UserForSignUp = Omit<UserAPI, 'id'>;
type UserForSignIn = Pick<UserAPI, UserAPIKeys.email | UserAPIKeys.password>;
type UserForForgotPassword = Pick<UserAPI, UserAPIKeys.email>;

export function* signUpSaga(action: any) {

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
        yield API.post('users', JSON.stringify(user));
        yield put(actions.signUpSuccess())
    } catch (e) {
        yield put(actions.signUpFail(e))
    }
}

export function* signInSaga(action: any): Generator<any> {
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

export function* forgotPasswordSaga(action: any): Generator<any> {
    yield put(actions.forgotPasswordStart());
    const user: UserForForgotPassword = {
        [UserAPIKeys.email]: action.payload.email
    }

    try {
        const isSent = yield API.post('password', JSON.stringify(user));
        yield put(actions.forgotPasswordSuccess(isSent as boolean));
    } catch (e) {
        yield put(actions.forgotPasswordFail(e))
    }
}