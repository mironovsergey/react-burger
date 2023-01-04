import {
    POST_RESET_PASSWORD_REQUEST,
    POST_RESET_PASSWORD_SUCCESS,
    POST_RESET_PASSWORD_ERROR
} from '../actions/reset-password-form';

import type {
    TResetPasswordActions
} from '../actions/reset-password-form';

type TResetPasswordFormState = {
    resetPasswordRequest: boolean;
    resetPasswordError: null | string;
};

export const initialState: TResetPasswordFormState = {
    resetPasswordRequest: false,
    resetPasswordError: null
};

export const resetPasswordFormReducer = (
    state = initialState,
    action: TResetPasswordActions
): TResetPasswordFormState => {
    switch (action.type) {
        case POST_RESET_PASSWORD_REQUEST: {
            return {
                ...state,
                resetPasswordRequest: true
            };
        }
        case POST_RESET_PASSWORD_SUCCESS: {
            return {
                ...state,
                resetPasswordRequest: false,
                resetPasswordError: null
            };
        }
        case POST_RESET_PASSWORD_ERROR: {
            return {
                ...state,
                resetPasswordRequest: false,
                resetPasswordError: action.payload
            };
        }
        default: {
            return state;
        }
    }
};