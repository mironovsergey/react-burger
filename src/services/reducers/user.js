import {
    SET_USER,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_ERROR,
    UPDATE_TOKEN_REQUEST,
    UPDATE_TOKEN_SUCCESS,
    UPDATE_TOKEN_ERROR,
    POST_LOGOUT_REQUEST,
    POST_LOGOUT_SUCCESS,
    POST_LOGOUT_ERROR
} from '../actions/user';

const initialState = {
    user: null,
    userRequest: false,
    userError: false,
    tokenRequest: false,
    tokenError: false,
    logoutRequest: false,
    logoutError: false
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER: {
            return {
                ...state,
                user: action.payload
            };
        }
        case GET_USER_REQUEST: {
            return {
                ...state,
                userRequest: true
            };
        }
        case GET_USER_SUCCESS: {
            return {
                ...state,
                user: action.payload,
                userRequest: false,
                userError: false
            };
        }
        case GET_USER_ERROR: {
            return {
                ...state,
                userRequest: false,
                userError: true
            };
        }
        case UPDATE_TOKEN_REQUEST: {
            return {
                ...state,
                tokenRequest: true
            };
        }
        case UPDATE_TOKEN_SUCCESS: {
            return {
                ...state,
                tokenRequest: false,
                tokenError: false
            };
        }
        case UPDATE_TOKEN_ERROR: {
            return {
                ...state,
                tokenRequest: false,
                tokenError: true
            };
        }
        case POST_LOGOUT_REQUEST: {
            return {
                ...state,
                logoutRequest: true
            };
        }
        case POST_LOGOUT_SUCCESS: {
            return {
                ...state,
                user: null,
                logoutRequest: false,
                logoutError: false
            };
        }
        case POST_LOGOUT_ERROR: {
            return {
                ...state,
                logoutRequest: false,
                logoutError: true
            };
        }
        default: {
            return state;
        }
    }
};