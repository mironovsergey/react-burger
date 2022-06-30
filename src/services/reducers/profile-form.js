import {
    POST_USER_REQUEST,
    POST_USER_SUCCESS,
    POST_USER_ERROR
} from '../actions/profile-form';

const initialState = {
    profileRequest: false,
    profileError: false,
};

export const profileFormReducer = (state = initialState, action) => {
    switch (action.type) {
        case POST_USER_REQUEST: {
            return {
                ...state,
                profileRequest: true
            };
        }
        case POST_USER_SUCCESS: {
            return {
                ...state,
                profileRequest: false,
                profileError: null
            };
        }
        case POST_USER_ERROR: {
            return {
                ...state,
                profileRequest: false,
                profileError: action.payload
            };
        }
        default: {
            return state;
        }
    }
};