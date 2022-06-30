import {
    POST_RESET_PASSWORD_REQUEST,
    POST_RESET_PASSWORD_SUCCESS,
    POST_RESET_PASSWORD_ERROR
} from '../actions/reset-password-form';

const initialState = {
    resetPasswordRequest: false,
    resetPasswordError: null
};

export const resetPasswordFormReducer = (state = initialState, action) => {
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