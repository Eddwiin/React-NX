import { Action } from "@reduxjs/toolkit";
import { UserAPI } from "../../shared/interfaces/UserAPI";

export type AuthState = Omit<UserAPI, 'id'>

const initialState: AuthState = {
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    adress: '',
    password: ''
}

const authReducer = (state = initialState, action: Action) => {
    switch (action.type) {
        default:
            return state;
    }
}

export default authReducer;