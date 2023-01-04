import {
    PATCH_USER_REQUEST,
    PATCH_USER_SUCCESS,
    PATCH_USER_ERROR
} from '../actions/profile-form';

import type {
    TProfileActions
} from '../actions/profile-form';

type TProfileFormState = {
    profileRequest: boolean;
    profileError: null | string;
};

export const initialState: TProfileFormState = {
    profileRequest: false,
    profileError: null
};

export const profileFormReducer = (
    state = initialState,
    action: TProfileActions
): TProfileFormState => {
    switch (action.type) {
        case PATCH_USER_REQUEST: {
            return {
                ...state,
                profileRequest: true
            };
        }
        case PATCH_USER_SUCCESS: {
            return {
                ...state,
                profileRequest: false,
                profileError: null
            };
        }
        case PATCH_USER_ERROR: {
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