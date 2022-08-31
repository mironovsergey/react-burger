import { postRegisterRequest } from '../api';
import { cookies } from '../cookie';

import type { AppThunk } from '../../utils/types';

import { setUser } from './user';

export const POST_REGISTER_REQUEST: 'POST_REGISTER_REQUEST' = 'POST_REGISTER_REQUEST';
export const POST_REGISTER_SUCCESS: 'POST_REGISTER_SUCCESS' = 'POST_REGISTER_SUCCESS';
export const POST_REGISTER_ERROR: 'POST_REGISTER_ERROR' = 'POST_REGISTER_ERROR';

export interface IPostRegisterRequestAction {
    readonly type: typeof POST_REGISTER_REQUEST;
}

export interface IPostRegisterSuccessAction {
    readonly type: typeof POST_REGISTER_SUCCESS;
}

export interface IPostRegisterErrorAction {
    readonly type: typeof POST_REGISTER_ERROR;
    readonly payload: string;
}

export type TRegisterActions =
    | IPostRegisterRequestAction
    | IPostRegisterSuccessAction
    | IPostRegisterErrorAction;

export const postRegisterRequestAction = (): IPostRegisterRequestAction => ({
    type: POST_REGISTER_REQUEST
});

export const postRegisterSuccessAction = (): IPostRegisterSuccessAction => ({
    type: POST_REGISTER_SUCCESS
});

export const postRegisterErrorAction = (payload: string): IPostRegisterErrorAction => ({
    type: POST_REGISTER_ERROR,
    payload
});

// Регистрация пользователя
export const postRegister = (payload: string): AppThunk => {
    return (dispatch) => {
        dispatch(postRegisterRequestAction());

        postRegisterRequest(payload)
            .then((res) => {
                cookies.set('accessToken', res.accessToken, {
                    expires: new Date(Date.now() + 1200000)
                });

                cookies.set('refreshToken', res.refreshToken);
                dispatch(postRegisterSuccessAction());
                dispatch(setUser(res.user));
            })
            .catch((err) => {
                dispatch(postRegisterErrorAction(err.message));
            });
    };
};