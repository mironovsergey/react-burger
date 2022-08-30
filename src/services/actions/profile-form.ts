import { patchUserRequest } from '../api';

import type { AppThunk } from '../../utils/types';

import { setUser } from './user';

export const PATCH_USER_REQUEST: 'PATCH_USER_REQUEST' = 'PATCH_USER_REQUEST';
export const PATCH_USER_SUCCESS: 'PATCH_USER_SUCCESS' = 'PATCH_USER_SUCCESS';
export const PATCH_USER_ERROR: 'PATCH_USER_ERROR' = 'PATCH_USER_ERROR';

export interface IPatchUserRequestAction {
    readonly type: typeof PATCH_USER_REQUEST;
}

export interface IPatchUserSuccessAction {
    readonly type: typeof PATCH_USER_SUCCESS;
}

export interface IPatchUserErrorAction {
    readonly type: typeof PATCH_USER_ERROR;
    readonly payload: string;
}

export type TProfileActions =
    | IPatchUserRequestAction
    | IPatchUserSuccessAction
    | IPatchUserErrorAction;

export const patchUserRequestAction = (): IPatchUserRequestAction => ({
    type: PATCH_USER_REQUEST
});

export const patchUserSuccessAction = (): IPatchUserSuccessAction => ({
    type: PATCH_USER_SUCCESS
});

export const patchUserErrorAction = (payload: string): IPatchUserErrorAction => ({
    type: PATCH_USER_ERROR,
    payload
});

// Обновление информации о пользователе
export const patchUser = (payload: string): AppThunk => {
    return (dispatch) => {
        dispatch(patchUserRequestAction());

        patchUserRequest(payload)
            .then((res) => {
                dispatch(patchUserSuccessAction());
                dispatch(setUser(res.user));
            })
            .catch((err) => {
                dispatch(patchUserErrorAction(err.message));
            });
    };
};