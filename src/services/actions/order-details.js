import { postOrderRequest } from '../api';

export const POST_ORDER_REQUEST = 'POST_ORDER_REQUEST';
export const POST_ORDER_SUCCESS = 'POST_ORDER_SUCCESS';
export const POST_ORDER_ERROR = 'POST_ORDER_ERROR';

export const TOGGLE_ORDER_MODAL = 'TOGGLE_ORDER_MODAL';
export const RESET_ORDER = 'RESET_ORDER';

// Отправить заказ
export const postOrder = (payload) => {
    return (dispatch) => {
        dispatch({
            type: POST_ORDER_REQUEST
        });

        return postOrderRequest(payload)
            .then((res) => {
                dispatch({
                    type: POST_ORDER_SUCCESS,
                    payload: res.order
                });
            })
            .catch((err) => {
                dispatch({
                    type: POST_ORDER_ERROR
                });

                throw new Error(err);
            });
    };
};

// Переключить окно заказа
export const toggleOrderModal = () => ({
    type: TOGGLE_ORDER_MODAL
});

// Сбросить заказ
export const resetOrder = () => ({
    type: RESET_ORDER
});