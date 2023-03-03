import { UserAPIKeys } from '../../shared/interfaces/UserAPI';
import { AuthState } from '../reducers/auth';
import * as actionTypes from './actionsType';

export const signUpStart = () => ({
    type: actionTypes.SIGN_UP_START
});

export const signUpFail = (error: unknown) => ({
    type: actionTypes.SIGN_UP_FAIL,
    payload: { error }
});

export const signUpSuccess = () => ({
    type: actionTypes.SIGN_UP_SUCCESS
});

export const signUp = (payload: AuthState) => ({
    type: actionTypes.SIGN_UP,
    payload
});

export const signInStart = () => ({
    type: actionTypes.SIGN_IN_START
});

export const signInSuccess = () => ({
    type: actionTypes.SIGN_IN_SUCCESS,
});

export const signInFail = (error: unknown) => ({
    type: actionTypes.SIGN_IN_FAIL,
    payload: { error }
});

export const signIn = (payload: Pick<AuthState, UserAPIKeys.email | UserAPIKeys.password>) => ({
    type: actionTypes.SIGN_IN,
    payload
});

export const forgotPasswordStart = () => ({
    type: actionTypes.FORGOT_PASSWORD_START
});

export const forgotPasswordSuccess = () => ({
    type: actionTypes.FORGOT_PASSWORD_SUCCESS,
});

export const forgotPasswordFail = (error: unknown) => ({
    type: actionTypes.FORGOT_PASSWORD_FAIL,
    payload: { error }
});

export const forgotPassword = (payload: Pick<AuthState, UserAPIKeys.email>) => ({
    type: actionTypes.FORGOT_PASSWORD,
    payload
})

export const resetPasswordStart = () => ({
    type: actionTypes.FORGOT_PASSWORD_START
})

export const resetPasswordSuccess = (isUpdated: boolean) => ({
    type: actionTypes.FORGOT_PASSWORD_SUCCESS,
    payload: { isUpdated }
});
