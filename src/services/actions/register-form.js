import { postRegisterRequest } from '../api';
import { cookies } from '../cookie';

import { setUser } from './user';

export const POST_REGISTER_REQUEST = 'POST_REGISTER_REQUEST';
export const POST_REGISTER_SUCCESS = 'POST_REGISTER_SUCCESS';
export const POST_REGISTER_ERROR = 'POST_REGISTER_ERROR';

// Регистрация пользователя
export const postRegister = (payload) => {
    return (dispatch) => {
        dispatch({
            type: POST_REGISTER_REQUEST
        });

        postRegisterRequest(payload)
            .then((res) => {
                cookies.set('accessToken', res.accessToken, {
                    expires: new Date(Date.now() + 1200000)
                });

                cookies.set('refreshToken', res.refreshToken);

                dispatch({
                    type: POST_REGISTER_SUCCESS
                });

                dispatch(setUser(res.user));
            })
            .catch((err) => {
                dispatch({
                    type: POST_REGISTER_ERROR,
                    payload: err.message
                });
            });
    };
};