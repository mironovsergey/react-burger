import {
    POST_LOGIN_REQUEST,
    POST_LOGIN_SUCCESS,
    POST_LOGIN_ERROR
} from '../actions/login-form';

const initialState = {
    loginRequest: false,
    loginError: null
};

export const loginFormReducer = (state = initialState, action) => {
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