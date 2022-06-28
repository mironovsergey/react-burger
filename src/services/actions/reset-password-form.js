import { postResetPasswordRequest } from '../api';

export const POST_RESET_PASSWORD_REQUEST = 'POST_RESET_PASSWORD_REQUEST';
export const POST_RESET_PASSWORD_SUCCESS = 'POST_RESET_PASSWORD_SUCCESS';
export const POST_RESET_PASSWORD_ERROR = 'POST_RESET_PASSWORD_ERROR';

// Сброс пароля
export const postResetPassword = (payload) => {
    return (dispatch) => {
        dispatch({
            type: POST_RESET_PASSWORD_REQUEST
        });

        postResetPasswordRequest(payload)
            .then((res) => {
                dispatch({
                    type: POST_RESET_PASSWORD_SUCCESS
                });
            })
            .catch((err) => {
                dispatch({
                    type: POST_RESET_PASSWORD_ERROR,
                    payload: err.message
                });
            });
    };
};