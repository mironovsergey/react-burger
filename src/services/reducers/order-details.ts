import {
    POST_ORDER_REQUEST,
    POST_ORDER_SUCCESS,
    POST_ORDER_ERROR,
    TOGGLE_ORDER_MODAL,
    RESET_ORDER
} from '../actions/order-details';

import type {
    TOrderActions
} from '../actions/order-details';

import type {
    TOrder
} from '../../utils/types';

type TOrderDetailsState = {
    order: null | TOrder;
    orderRequest: boolean;
    orderError: boolean;
    isOrderModalShown: boolean;
};

const initialState: TOrderDetailsState = {
    order: null,
    orderRequest: false,
    orderError: false,
    isOrderModalShown: false
};

export const orderDetailsReducer = (
    state = initialState,
    action: TOrderActions
): TOrderDetailsState => {
    switch (action.type) {
        case POST_ORDER_REQUEST: {
            return {
                ...state,
                orderRequest: true
            };
        }
        case POST_ORDER_SUCCESS: {
            return {
                ...state,
                order: action.payload,
                orderRequest: false,
                orderError: false
            };
        }
        case POST_ORDER_ERROR: {
            return {
                ...state,
                orderRequest: false,
                orderError: true
            };
        }
        case TOGGLE_ORDER_MODAL: {
            return {
                ...state,
                isOrderModalShown: !state.isOrderModalShown
            };
        }
        case RESET_ORDER: {
            return {
                ...state,
                order: null,
                orderRequest: false,
                orderError: false,
            };
        }
        default: {
            return state;
        }
    }
};