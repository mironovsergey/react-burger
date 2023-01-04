import {
    POST_REGISTER_REQUEST,
    POST_REGISTER_SUCCESS,
    POST_REGISTER_ERROR
} from '../actions/register-form';

import type {
    TRegisterActions
} from '../actions/register-form';

type TRegisterFormState = {
    registerRequest: boolean;
    registerError: null | string;
};

export const initialState: TRegisterFormState = {
    registerRequest: false,
    registerError: null
};

export const registerFormReducer = (
    state = initialState,
    action: TRegisterActions
): TRegisterFormState => {
    switch (action.type) {
        case POST_REGISTER_REQUEST: {
            return {
                ...state,
                registerRequest: true
            };
        }
        case POST_REGISTER_SUCCESS: {
            return {
                ...state,
                registerRequest: false,
                registerError: null
            };
        }
        case POST_REGISTER_ERROR: {
            return {
                ...state,
                registerRequest: false,
                registerError: action.payload
            };
        }
        default: {
            return state;
        }
    }
};