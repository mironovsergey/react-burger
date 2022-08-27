import { postForgotPasswordRequest } from '../api';

import type { AppThunk, AppDispatch } from '../../utils/types';

export const POST_FORGOT_PASSWORD_REQUEST: 'POST_FORGOT_PASSWORD_REQUEST' = 'POST_FORGOT_PASSWORD_REQUEST';
export const POST_FORGOT_PASSWORD_SUCCESS: 'POST_FORGOT_PASSWORD_SUCCESS' = 'POST_FORGOT_PASSWORD_SUCCESS';
export const POST_FORGOT_PASSWORD_ERROR: 'POST_FORGOT_PASSWORD_ERROR' = 'POST_FORGOT_PASSWORD_ERROR';

export interface IPostForgotPasswordRequestAction {
    readonly type: typeof POST_FORGOT_PASSWORD_REQUEST;
}

export interface IPostForgotPasswordSuccessAction {
    readonly type: typeof POST_FORGOT_PASSWORD_SUCCESS;
}

export interface IPostForgotPasswordErrorAction {
    readonly type: typeof POST_FORGOT_PASSWORD_ERROR;
    readonly payload: string;
}

export type TForgotPasswordActions =
    | IPostForgotPasswordRequestAction
    | IPostForgotPasswordSuccessAction
    | IPostForgotPasswordErrorAction;

export const postForgotPasswordRequestAction = (): IPostForgotPasswordRequestAction => ({
    type: POST_FORGOT_PASSWORD_REQUEST
});

export const postForgotPasswordSuccessAction = (): IPostForgotPasswordSuccessAction => ({
    type: POST_FORGOT_PASSWORD_SUCCESS
});

export const postForgotPasswordErrorAction = (payload: string): IPostForgotPasswordErrorAction => ({
    type: POST_FORGOT_PASSWORD_ERROR,
    payload
});

// Восстановление пароля
export const postForgotPassword = (payload: string): AppThunk => {
    return (dispatch: AppDispatch) => {
        dispatch(postForgotPasswordRequestAction());

        postForgotPasswordRequest(payload)
            .then((res) => {
                dispatch(postForgotPasswordSuccessAction());
            })
            .catch((err) => {
                dispatch(postForgotPasswordErrorAction(err.message));
            });
    };
};