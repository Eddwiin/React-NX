import { AnyAction } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential } from "firebase/auth";
import { child, get, ref, set } from 'firebase/database';
import { call, CallEffect, put, PutEffect } from "redux-saga/effects";
import { db, FIREBASE_ENDPOINT, getAuthWithApp } from "../../configs/firebase";
import { LocalStorageKey } from "../../shared/enum/localstorage-key.enum";
import { UserAPI, UserAPIKeys } from "../../shared/interfaces/UserAPI";
import * as actions from './../actions';


// const secretKeyForCryptoJs = process.env.NX_SECRET_KEY_CRYPTOJS || '';

type UserForSignUp = Omit<UserAPI, 'id'>;
type UserForSignIn = Pick<UserAPI, UserAPIKeys.email | UserAPIKeys.password>;
// type UserForForgotPassword = Pick<UserAPI, UserAPIKeys.email>;
// type UserForResetPassword = Pick<UserAPI, UserAPIKeys.password>;

type GeneratorType = Generator<PutEffect<AnyAction> | Promise<any> | CallEffect<any>>;

export function* signUpSaga(action: AnyAction): GeneratorType{
    yield put(actions.signUpStart());
    const userSignUp: UserForSignUp = {
        [UserAPIKeys.firstName]: action.payload.firstName,
        [UserAPIKeys.lastName]: action.payload.lastName,
        [UserAPIKeys.email]: action.payload.email,
        [UserAPIKeys.phone]: action.payload.phone,
        [UserAPIKeys.adress]: action.payload.adress,
        [UserAPIKeys.password]: action.payload.password,
    }

    try {
        const userCredential = (yield createUserWithEmailAndPassword(getAuthWithApp, userSignUp.email, userSignUp.password)) as UserCredential;
        const uuid4 = userCredential.user.uid;

        yield set(ref(db, `${FIREBASE_ENDPOINT.USERS}/${uuid4}`), userSignUp);
        yield put(actions.signUpSuccess())
    } catch (e) {
        yield put(actions.signUpFail(e))
    }
}

export function* signInSaga(action: AnyAction): GeneratorType {
    yield put(actions.signInStart());
    const userSignIn: UserForSignIn = {
        [UserAPIKeys.email]: action.payload.email,
        [UserAPIKeys.password]: action.payload.password
    }

    try {
        const userCredential = (yield signInWithEmailAndPassword(getAuthWithApp, userSignIn.email, userSignIn.password)) as UserCredential
        const accessToken = (yield userCredential.user.getIdToken()) as string;
        const uuid4 = userCredential.user.uid;
        const dbRef= ref(db);

        const user = (yield get(child(dbRef, `${FIREBASE_ENDPOINT.USERS}/${uuid4}`))
            .then((snapshot) => snapshot.exists() ? snapshot.val() : null)) as UserAPI;

        if (user) {
            yield call([localStorage, localStorage.setItem], LocalStorageKey.AccessToken, accessToken);
            yield call([localStorage, localStorage.setItem], LocalStorageKey.User, JSON.stringify(user));
        } else {
            put(actions.signInFail('User not found'))
        }
        yield put(actions.signInSuccess());
        
    } catch (e) {
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