import {
    POST_LOGIN_REQUEST,
    POST_LOGIN_SUCCESS,
    POST_LOGIN_ERROR
} from '../actions/login-form';

import type {
    TLoginActions
} from '../actions/login-form';

type TLoginFormState = {
    loginRequest: boolean;
    loginError: null | string;
};

const initialState: TLoginFormState = {
    loginRequest: false,
    loginError: null
};

export const loginFormReducer = (
    state = initialState,
    action: TLoginActions
): TLoginFormState => {
    switch (action.type) {
        case POST_LOGIN_REQUEST: {
            return {
                ...state,
                loginRequest: true
            };
        }
        case POST_LOGIN_SUCCESS: {
            return {
                ...state,
                loginRequest: false,
                loginError: null
            };
        }
        case POST_LOGIN_ERROR: {
            return {
                ...state,
                loginRequest: false,
                loginError: action.payload
            };
        }
        default: {
            return state;
        }
    }
};