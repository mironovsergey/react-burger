import {
    POST_FORGOT_PASSWORD_REQUEST,
    POST_FORGOT_PASSWORD_SUCCESS,
    POST_FORGOT_PASSWORD_ERROR
} from '../actions/forgot-password-form';

import type {
    TForgotPasswordActions
} from '../actions/forgot-password-form';

type TForgotPasswordFormState = {
    forgotPasswordRequest: boolean;
    forgotPasswordSuccess: boolean;
    forgotPasswordError: null | string;
};

const initialState: TForgotPasswordFormState = {
    forgotPasswordRequest: false,
    forgotPasswordSuccess: false,
    forgotPasswordError: null
};

export const forgotPasswordFormReducer = (
    state = initialState,
    action: TForgotPasswordActions
): TForgotPasswordFormState => {
    switch (action.type) {
        case POST_FORGOT_PASSWORD_REQUEST: {
            return {
                ...state,
                forgotPasswordRequest: true,
                forgotPasswordSuccess: false
            };
        }
        case POST_FORGOT_PASSWORD_SUCCESS: {
            return {
                ...state,
                forgotPasswordRequest: false,
                forgotPasswordSuccess: true,
                forgotPasswordError: null
            };
        }
        case POST_FORGOT_PASSWORD_ERROR: {
            return {
                ...state,
                forgotPasswordRequest: false,
                forgotPasswordSuccess: false,
                forgotPasswordError: action.payload
            };
        }
        default: {
            return state;
        }
    }
};