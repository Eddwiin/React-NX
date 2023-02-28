import { AnyAction } from "@reduxjs/toolkit";
import * as CryptoJS from 'crypto-js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { ref, set } from 'firebase/database';
import { put, PutEffect } from "redux-saga/effects";
import { db, FIREBASE_ENDPOINT, getAuthWithApp } from "../../configs/firebase";
import { UserAPI, UserAPIKeys } from "../../shared/interfaces/UserAPI";
import * as actions from './../actions';


const secretKeyForCryptoJs = process.env.NX_SECRET_KEY_CRYPTOJS || '';

type UserForSignUp = Omit<UserAPI, 'id'>;
type UserForSignIn = Pick<UserAPI, UserAPIKeys.email | UserAPIKeys.password>;
// type UserForForgotPassword = Pick<UserAPI, UserAPIKeys.email>;
// type UserForResetPassword = Pick<UserAPI, UserAPIKeys.password>;

type GeneratorType = Generator<PutEffect<AnyAction> | Promise<void>>;

export function* signUpSaga(action: AnyAction): GeneratorType{
    yield put(actions.signUpStart());
    const user: UserForSignUp = {
        [UserAPIKeys.firstName]: action.payload.first_name,
        [UserAPIKeys.lastName]: action.payload.last_name,
        [UserAPIKeys.email]: action.payload.email,
        [UserAPIKeys.phone]: action.payload.phone,
        [UserAPIKeys.adress]: action.payload.adress,
        [UserAPIKeys.password]: CryptoJS.AES.encrypt(action.payload.password, secretKeyForCryptoJs).toString()
    }

    try {
        yield createUserWithEmailAndPassword(getAuthWithApp, user.email, user.password).then((userCredential) => {
            const uuid4 = userCredential.user.uid;
            set(ref(db, `${FIREBASE_ENDPOINT.USERS}/${uuid4}`), user)
        })
        yield put(actions.signUpSuccess())
    } catch (e) {
        yield put(actions.signUpFail(e))
    }
}

export function* signInSaga(action: AnyAction): GeneratorType {
    yield put(actions.signInStart());
    const user: UserForSignIn = {
        [UserAPIKeys.email]: action.payload.email,
        [UserAPIKeys.password]: CryptoJS.AES.encrypt(action.payload.password, secretKeyForCryptoJs).toString()
    }

    try {
        yield signInWithEmailAndPassword(getAuthWithApp, user.email, user.password).then(userCredential => {
            console.log("userCredential", userCredential)
        })
        yield put(actions.signInSuccess());
    } catch (e) {
        console.log("ERROR LOGGIN", e)
        yield put(actions.signInFail(e))
    }
}

export function* forgotPasswordSaga(action: AnyAction): GeneratorType {
    yield put(actions.forgotPasswordStart());
    // const user: UserForForgotPassword = {
    //     [UserAPIKeys.email]: action.payload.email
    // }

    try {
        // yield sendPasswordResetEmail(auth, action.payload.email);
        yield put(actions.forgotPasswordSuccess());
        // const forgotPasswordRequest = () => API.post('password', JSON.stringify(user)).then(response => response)
        // const isSent = yield call(forgotPasswordRequest);
        // yield put(actions.forgotPasswordSuccess(isSent as boolean));
    } catch (e) {
        yield put(actions.forgotPasswordFail(e))
    }
}

export function* resetPasswordSaga(action: AnyAction): GeneratorType {
    yield put(actions.resetPasswordStart());
    // const user: UserForResetPassword = {
    //     [UserAPIKeys.password]: action.payload.password
    // }

    try {
        // const isUpdated = yield API.post('password', JSON.stringify(user));
        // yield put(actions.resetPasswordSuccess(isUpdated as boolean))
    } catch (e) {
        yield put(actions.resetPasswordFail(e));
    }
}