import { AnyAction } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, UserCredential } from "firebase/auth";
import { child, get, ref, set } from 'firebase/database';
import { call, CallEffect, put, PutEffect } from "redux-saga/effects";
import { db, FIREBASE_ENDPOINT, getAuthWithApp } from "../../configs/firebase";
import { LocalStorageKey } from "../../shared/enum/localstorage-key.enum";
import { UserAPI, UserAPIKeys } from "../../shared/interfaces/UserAPI";
import * as actions from './../actions';


// const secretKeyForCryptoJs = process.env.NX_SECRET_KEY_CRYPTOJS || '';

type UserForSignUp = Omit<UserAPI, 'id'>;
type UserForSignIn = Pick<UserAPI, UserAPIKeys.email | UserAPIKeys.password>;
type UserForForgotPassword = Pick<UserAPI, UserAPIKeys.email>;

type GeneratorType = Generator<PutEffect<AnyAction> | Promise<any> | CallEffect<any>>;

export function* signUpSaga(action: AnyAction): GeneratorType{
    yield put(actions.signUpStart());
    const userSignUp: UserForSignUp = {
        [UserAPIKeys.firstName]: action.payload.first_name,
        [UserAPIKeys.lastName]: action.payload.last_name,
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
    const user: UserForForgotPassword = {
        [UserAPIKeys.email]: action.payload.email
    }

    try {
        yield sendPasswordResetEmail(getAuthWithApp, user.email).then((res) => console.log("res", res)).catch(console.error);
        yield put(actions.forgotPasswordSuccess());
   
    } catch (e) {
        yield put(actions.forgotPasswordFail(e))
    }
}
