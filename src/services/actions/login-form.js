import { postLoginRequest } from '../api';
import { cookies } from '../cookie';

import { setUser } from './user';

export const POST_LOGIN_REQUEST = 'POST_LOGIN_REQUEST';
export const POST_LOGIN_SUCCESS = 'POST_LOGIN_SUCCESS';
export const POST_LOGIN_ERROR = 'POST_LOGIN_ERROR';

// Авторизация пользователя
export const postLogin = (payload) => {
    return (dispatch) => {
        dispatch({
            type: POST_LOGIN_REQUEST
        });

        postLoginRequest(payload)
            .then((res) => {
                cookies.set('accessToken', res.accessToken, {
                    expires: new Date(Date.now() + 1200000)
                });

                cookies.set('refreshToken', res.refreshToken);

                dispatch({
                    type: POST_LOGIN_SUCCESS
                });

                dispatch(setUser(res.user));
            })
            .catch((err) => {
                dispatch({
                    type: POST_LOGIN_ERROR,
                    payload: err.message
                });
            });
    };
};