import { postOrderRequest } from '../api';

import type { AppThunk, TOrderNumber } from '../../utils/types';

export const POST_ORDER_REQUEST: 'POST_ORDER_REQUEST' = 'POST_ORDER_REQUEST';
export const POST_ORDER_SUCCESS: 'POST_ORDER_SUCCESS' = 'POST_ORDER_SUCCESS';
export const POST_ORDER_ERROR: 'POST_ORDER_ERROR' = 'POST_ORDER_ERROR';

export const TOGGLE_ORDER_MODAL: 'TOGGLE_ORDER_MODAL' = 'TOGGLE_ORDER_MODAL';
export const RESET_ORDER: 'RESET_ORDER' = 'RESET_ORDER';

export interface IPostOrderRequestAction {
    readonly type: typeof POST_ORDER_REQUEST;
}

export interface IPostOrderSuccessAction {
    readonly type: typeof POST_ORDER_SUCCESS;
    readonly payload: TOrderNumber;
}

export interface IPostOrderErrorAction {
    readonly type: typeof POST_ORDER_ERROR;
}

export interface IToggleOrderModalAction {
    readonly type: typeof TOGGLE_ORDER_MODAL;
}

export interface IResetOrderAction {
    readonly type: typeof RESET_ORDER;
}

export type TOrderActions =
    | IPostOrderRequestAction
    | IPostOrderSuccessAction
    | IPostOrderErrorAction
    | IToggleOrderModalAction
    | IResetOrderAction;

export const postOrderRequestAction = (): IPostOrderRequestAction => ({
    type: POST_ORDER_REQUEST
});

export const postOrderSuccessAction = (payload: TOrderNumber): IPostOrderSuccessAction => ({
    type: POST_ORDER_SUCCESS,
    payload
});

export const postOrderErrorAction = (): IPostOrderErrorAction => ({
    type: POST_ORDER_ERROR
});

// Отправить заказ
export const postOrder = (payload: string): AppThunk<Promise<void>> => {
    return (dispatch): Promise<void> => {
        dispatch(postOrderRequestAction());

        return postOrderRequest(payload)
            .then((res) => {
                dispatch(postOrderSuccessAction(res.order));
            })
            .catch((err) => {
                dispatch(postOrderErrorAction());
                throw new Error(err);
            });
    };
};

// Переключить окно заказа
export const toggleOrderModal = (): IToggleOrderModalAction => ({
    type: TOGGLE_ORDER_MODAL
});

// Сбросить заказ
export const resetOrder = (): IResetOrderAction => ({
    type: RESET_ORDER
});