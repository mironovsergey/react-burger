import { postLoginRequest } from '../api';
import { cookies } from '../cookie';

import type { AppThunk, AppDispatch } from '../../utils/types';

import { setUser } from './user';

export const POST_LOGIN_REQUEST: 'POST_LOGIN_REQUEST' = 'POST_LOGIN_REQUEST';
export const POST_LOGIN_SUCCESS: 'POST_LOGIN_SUCCESS' = 'POST_LOGIN_SUCCESS';
export const POST_LOGIN_ERROR: 'POST_LOGIN_ERROR' = 'POST_LOGIN_ERROR';

export interface IPostLoginRequestAction {
    readonly type: typeof POST_LOGIN_REQUEST;
}

export interface IPostLoginSuccessAction {
    readonly type: typeof POST_LOGIN_SUCCESS;
}

export interface IPostLoginErrorAction {
    readonly type: typeof POST_LOGIN_ERROR;
    readonly payload: string;
}

export type TLoginActions =
    | IPostLoginRequestAction
    | IPostLoginSuccessAction
    | IPostLoginErrorAction;

export const postLoginRequestAction = (): IPostLoginRequestAction => ({
    type: POST_LOGIN_REQUEST
});

export const postLoginSuccessAction = (): IPostLoginSuccessAction => ({
    type: POST_LOGIN_SUCCESS
});

export const postLoginErrorAction = (payload: string): IPostLoginErrorAction => ({
    type: POST_LOGIN_ERROR,
    payload
});

// Авторизация пользователя
export const postLogin = (payload: string): AppThunk => {
    return (dispatch: AppDispatch) => {
        dispatch(postLoginRequestAction());

        postLoginRequest(payload)
            .then((res) => {
                cookies.set('accessToken', res.accessToken, {
                    expires: new Date(Date.now() + 1200000)
                });

                cookies.set('refreshToken', res.refreshToken);
                dispatch(postLoginSuccessAction());
                dispatch(setUser(res.user));
            })
            .catch((err) => {
                dispatch(postLoginErrorAction(err.message));
            });
    };
};