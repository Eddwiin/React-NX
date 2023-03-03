import { Action } from "@reduxjs/toolkit";
import { UserAPI, UserAPIKeys } from "../../shared/interfaces/UserAPI";
import * as ActionsTypes from './../actions/actionsType';

export type AuthState = Omit<UserAPI, 'id'>

export const authInitialState: AuthState = {
    [UserAPIKeys.firstName]: '',
    [UserAPIKeys.lastName]: '',
    [UserAPIKeys.email]: '',
    [UserAPIKeys.phone]: '',
    [UserAPIKeys.adress]: '',
    [UserAPIKeys.password]: ''
}

const authReducer = (state = authInitialState, action: Action) => {
    switch (action.type) {
        case ActionsTypes.SIGN_IN_SUCCESS:
            console.log("sign in sucess", action)
            return state;

        case ActionsTypes.SIGN_IN_FAIL:
            return state;
        
        case ActionsTypes.SIGN_UP_SUCCESS:
            return state;

        case ActionsTypes.SIGN_UP_FAIL:
            return state;

        case ActionsTypes.FORGOT_PASSWORD_SUCCESS:
            return state;

        case ActionsTypes.FORGOT_PASSWORD_FAIL:
            return state;
        
        default:
            return state;
    }
}

export default authReducer;