import { Action } from "@reduxjs/toolkit";
import { UserAPI, UserAPIKeys } from "../../shared/interfaces/UserAPI";

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
        default:
            return state;
    }
}

export default authReducer;