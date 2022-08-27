import {
    getUserRequest,
    postTokenRequest,
    postLogoutRequest
} from '../api';

import { cookies } from '../cookie';

import type { AppThunk, AppDispatch, TUser } from '../../utils/types';

export const SET_USER: 'SET_USER' = 'SET_USER';

export const GET_USER_REQUEST: 'GET_USER_REQUEST' = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS: 'GET_USER_SUCCESS' = 'GET_USER_SUCCESS';
export const GET_USER_ERROR: 'GET_USER_ERROR' = 'GET_USER_ERROR';

export const UPDATE_TOKEN_REQUEST: 'UPDATE_TOKEN_REQUEST' = 'UPDATE_TOKEN_REQUEST';
export const UPDATE_TOKEN_SUCCESS: 'UPDATE_TOKEN_SUCCESS' = 'UPDATE_TOKEN_SUCCESS';
export const UPDATE_TOKEN_ERROR: 'UPDATE_TOKEN_ERROR' = 'UPDATE_TOKEN_ERROR';

export const POST_LOGOUT_REQUEST: 'POST_LOGOUT_REQUEST' = 'POST_LOGOUT_REQUEST';
export const POST_LOGOUT_SUCCESS: 'POST_LOGOUT_SUCCESS' = 'POST_LOGOUT_SUCCESS';
export const POST_LOGOUT_ERROR: 'POST_LOGOUT_ERROR' = 'POST_LOGOUT_ERROR';

export interface ISetUserAction {
    readonly type: typeof SET_USER;
    readonly payload: TUser;
}

export interface IGetUserRequestAction {
    readonly type: typeof GET_USER_REQUEST;
}

export interface IGetUserSuccessAction {
    readonly type: typeof GET_USER_SUCCESS;
    readonly payload: TUser;
}

export interface IGetUserErrorAction {
    readonly type: typeof GET_USER_ERROR;
}

export interface IPostTokenRequestAction {
    readonly type: typeof UPDATE_TOKEN_REQUEST;
}

export interface IPostTokenSuccessAction {
    readonly type: typeof UPDATE_TOKEN_SUCCESS;
}

export interface IPostTokenErrorAction {
    readonly type: typeof UPDATE_TOKEN_ERROR;
}

export interface IPostLogoutRequestAction {
    readonly type: typeof POST_LOGOUT_REQUEST;
}

export interface IPostLogoutSuccessAction {
    readonly type: typeof POST_LOGOUT_SUCCESS;
}

export interface IPostLogoutErrorAction {
    readonly type: typeof POST_LOGOUT_ERROR;
}

export type TUserActions =
    | ISetUserAction
    | IGetUserRequestAction
    | IGetUserSuccessAction
    | IGetUserErrorAction
    | IPostTokenRequestAction
    | IPostTokenSuccessAction
    | IPostTokenErrorAction
    | IPostLogoutRequestAction
    | IPostLogoutSuccessAction
    | IPostLogoutErrorAction;

export const getUserRequestAction = (): IGetUserRequestAction => ({
    type: GET_USER_REQUEST
});

export const getUserSuccessAction = (payload: TUser): IGetUserSuccessAction => ({
    type: GET_USER_SUCCESS,
    payload
});

export const getUserErrorAction = (): IGetUserErrorAction => ({
    type: GET_USER_ERROR
});

export const postTokenRequestAction = (): IPostTokenRequestAction => ({
    type: UPDATE_TOKEN_REQUEST
});

export const postTokenSuccessAction = (): IPostTokenSuccessAction => ({
    type: UPDATE_TOKEN_SUCCESS
});

export const postTokenErrorAction = (): IPostTokenErrorAction => ({
    type: UPDATE_TOKEN_ERROR
});

export const postLogoutRequestAction = (): IPostLogoutRequestAction => ({
    type: POST_LOGOUT_REQUEST
});

export const postLogoutSuccessAction = (): IPostLogoutSuccessAction => ({
    type: POST_LOGOUT_SUCCESS
});

export const postLogoutErrorAction = (): IPostLogoutErrorAction => ({
    type: POST_LOGOUT_ERROR
});

// Инициализация пользователя
export const setUser = (payload: TUser): ISetUserAction => ({
    type: SET_USER,
    payload
});

// Получение информации о пользователе
export const getUser = (): AppThunk<Promise<void>> => {
    return (dispatch: AppDispatch): Promise<void> => {
        dispatch(getUserRequestAction());

        return getUserRequest()
            .then((res) => {
                dispatch(getUserSuccessAction(res.user));
            })
            .catch(() => {
                // В случае наличия refreshToken, выполнить обновление accessToken,
                // и повторить попытку получения информации о пользователе
                if (cookies.get('refreshToken')) {
                    dispatch(postToken())
                        .then(() => {
                            dispatch(getUser());
                        })
                        .catch(() => {
                            dispatch(getUserErrorAction());
                        });
                } else {
                    dispatch(getUserErrorAction());
                }
            });
    };
};

// Обновление токена
export const postToken = (): AppThunk<Promise<void>> => {
    return (dispatch: AppDispatch): Promise<void> => {
        dispatch(postTokenRequestAction());

        return postTokenRequest()
            .then((res) => {
                cookies.set('accessToken', res.accessToken, {
                    expires: new Date(Date.now() + 1200000)
                });

                cookies.set('refreshToken', res.refreshToken);
                dispatch(postTokenSuccessAction());
            })
            .catch((err) => {
                cookies.remove('refreshToken');
                dispatch(postTokenErrorAction());
                throw new Error(err);
            });
    };
};

// Выход из системы
export const postLogout = (): AppThunk => {
    return (dispatch: AppDispatch) => {
        dispatch(postLogoutRequestAction());

        postLogoutRequest()
            .then(() => {
                cookies.remove('accessToken');
                cookies.remove('refreshToken');
                dispatch(postLogoutSuccessAction());
            })
            .catch(() => {
                dispatch(postLogoutErrorAction());
            });
    };
};