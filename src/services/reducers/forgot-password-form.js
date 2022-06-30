import {
    POST_FORGOT_PASSWORD_REQUEST,
    POST_FORGOT_PASSWORD_SUCCESS,
    POST_FORGOT_PASSWORD_ERROR
} from '../actions/forgot-password-form';

const initialState = {
    forgotPasswordRequest: false,
    forgotPasswordSuccess: false,
    forgotPasswordError: null
};

export const forgotPasswordFormReducer = (state = initialState, action) => {
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