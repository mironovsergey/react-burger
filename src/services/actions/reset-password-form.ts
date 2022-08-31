import { postResetPasswordRequest } from '../api';

import type { AppThunk } from '../../utils/types';

export const POST_RESET_PASSWORD_REQUEST: 'POST_RESET_PASSWORD_REQUEST' = 'POST_RESET_PASSWORD_REQUEST';
export const POST_RESET_PASSWORD_SUCCESS: 'POST_RESET_PASSWORD_SUCCESS' = 'POST_RESET_PASSWORD_SUCCESS';
export const POST_RESET_PASSWORD_ERROR: 'POST_RESET_PASSWORD_ERROR' = 'POST_RESET_PASSWORD_ERROR';

export interface IPostResetPasswordRequestAction {
    readonly type: typeof POST_RESET_PASSWORD_REQUEST;
}

export interface IPostResetPasswordSuccessAction {
    readonly type: typeof POST_RESET_PASSWORD_SUCCESS;
}

export interface IPostResetPasswordErrorAction {
    readonly type: typeof POST_RESET_PASSWORD_ERROR;
    readonly payload: string;
}

export type TResetPasswordActions =
    | IPostResetPasswordRequestAction
    | IPostResetPasswordSuccessAction
    | IPostResetPasswordErrorAction;

export const postResetPasswordRequestAction = (): IPostResetPasswordRequestAction => ({
    type: POST_RESET_PASSWORD_REQUEST
});

export const postResetPasswordSuccessAction = (): IPostResetPasswordSuccessAction => ({
    type: POST_RESET_PASSWORD_SUCCESS
});

export const postResetPasswordErrorAction = (payload: string): IPostResetPasswordErrorAction => ({
    type: POST_RESET_PASSWORD_ERROR,
    payload
});

// Сброс пароля
export const postResetPassword = (payload: string): AppThunk => {
    return (dispatch) => {
        dispatch(postResetPasswordRequestAction());

        postResetPasswordRequest(payload)
            .then((res) => {
                dispatch(postResetPasswordSuccessAction());
            })
            .catch((err) => {
                dispatch(postResetPasswordErrorAction(err.message));
            });
    };
};