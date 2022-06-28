import { postForgotPasswordRequest } from '../api';

export const POST_FORGOT_PASSWORD_REQUEST = 'POST_FORGOT_PASSWORD_REQUEST';
export const POST_FORGOT_PASSWORD_SUCCESS = 'POST_FORGOT_PASSWORD_SUCCESS';
export const POST_FORGOT_PASSWORD_ERROR = 'POST_FORGOT_PASSWORD_ERROR';

// Восстановление пароля
export const postForgotPassword = (payload) => {
    return (dispatch) => {
        dispatch({
            type: POST_FORGOT_PASSWORD_REQUEST
        });

        postForgotPasswordRequest(payload)
            .then((res) => {
                dispatch({
                    type: POST_FORGOT_PASSWORD_SUCCESS
                });
            })
            .catch((err) => {
                dispatch({
                    type: POST_FORGOT_PASSWORD_ERROR,
                    payload: err.message
                });
            });
    };
};