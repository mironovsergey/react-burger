import {
    getUserRequest,
    postTokenRequest,
    postLogoutRequest
} from '../../services/api';

import { cookies } from '../cookie';

export const SET_USER = 'SET_USER';

export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_ERROR = 'GET_USER_ERROR';

export const UPDATE_TOKEN_REQUEST = 'UPDATE_TOKEN_REQUEST';
export const UPDATE_TOKEN_SUCCESS = 'UPDATE_TOKEN_SUCCESS';
export const UPDATE_TOKEN_ERROR = 'UPDATE_TOKEN_ERROR';

export const POST_LOGOUT_REQUEST = 'POST_LOGOUT_REQUEST';
export const POST_LOGOUT_SUCCESS = 'POST_LOGOUT_SUCCESS';
export const POST_LOGOUT_ERROR = 'POST_LOGOUT_ERROR';

export const setUser = (payload) => ({
    type: SET_USER,
    payload
});

// Получение информации о пользователе
export const getUser = () => {
    return (dispatch) => {
        dispatch({
            type: GET_USER_REQUEST
        });

        return getUserRequest()
            .then((res) => {
                dispatch({
                    type: GET_USER_SUCCESS,
                    payload: res.user
                });
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
                            dispatch({
                                type: GET_USER_ERROR
                            });
                        });
                } else {
                    dispatch({
                        type: GET_USER_ERROR
                    });
                }
            });
    };
};

// Обновление токена
export const postToken = () => {
    return (dispatch) => {
        dispatch({
            type: UPDATE_TOKEN_REQUEST
        });

        return postTokenRequest()
            .then((res) => {
                cookies.set('accessToken', res.accessToken, {
                    expires: new Date(Date.now() + 1200000)
                });

                cookies.set('refreshToken', res.refreshToken);

                dispatch({
                    type: UPDATE_TOKEN_SUCCESS
                });
            })
            .catch((err) => {
                cookies.remove('refreshToken');

                dispatch({
                    type: UPDATE_TOKEN_ERROR
                });

                throw new Error(err);
            });
    };
};

// Выход из системы
export const postLogout = () => {
    return (dispatch) => {
        dispatch({
            type: POST_LOGOUT_REQUEST
        });

        postLogoutRequest()
            .then(() => {
                cookies.remove('accessToken');
                cookies.remove('refreshToken');

                dispatch({
                    type: POST_LOGOUT_SUCCESS
                });
            })
            .catch(() => {
                dispatch({
                    type: POST_LOGOUT_ERROR
                });
            });
    };
};