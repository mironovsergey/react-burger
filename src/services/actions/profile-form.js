import { patchUserRequest } from '../api';

import { setUser } from './user';

export const POST_USER_REQUEST = 'POST_USER_REQUEST';
export const POST_USER_SUCCESS = 'POST_USER_SUCCESS';
export const POST_USER_ERROR = 'POST_USER_ERROR';

// Обновление информации о пользователе
export const patchUser = (payload) => {
    return (dispatch) => {
        dispatch({
            type: POST_USER_REQUEST
        });

        patchUserRequest(payload)
            .then((res) => {
                dispatch({
                    type: POST_USER_SUCCESS
                });

                dispatch(setUser(res.user));
            })
            .catch((err) => {
                dispatch({
                    type: POST_USER_ERROR,
                    payload: err.message
                });
            });
    };
};