import {
    POST_REGISTER_REQUEST,
    POST_REGISTER_SUCCESS,
    POST_REGISTER_ERROR
} from '../actions/register-form';

const initialState = {
    registerRequest: false,
    registerError: null
};

export const registerFormReducer = (state = initialState, action) => {
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