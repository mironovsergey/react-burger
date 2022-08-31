import {
    WS_CONNECTION_STOP,
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_MESSAGE
} from '../actions/ws';

import type {
    TWSActions
} from '../actions/ws';

import type {
    TWSMessage
} from '../../utils/types';

type TOrderListState = {
    connected: boolean;
    message: null | TWSMessage;
    error?: null | Event;
};

const initialState: TOrderListState = {
    connected: false,
    message: null,
    error: null
};

export const wsReducer = (
    state = initialState,
    action: TWSActions
): TOrderListState => {
    switch (action.type) {
        case WS_CONNECTION_STOP: {
            return {
                ...state,
                connected: false,
                message: null,
                error: null
            };
        }
        case WS_CONNECTION_SUCCESS: {
            return {
                ...state,
                connected: true,
                error: null
            };
        }
        case WS_CONNECTION_ERROR: {
            return {
                ...state,
                connected: false,
                error: action.payload
            };
        }
        case WS_CONNECTION_CLOSED: {
            return {
                ...state,
                connected: false
            };
        }
        case WS_GET_MESSAGE: {
            return {
                ...state,
                message: { ...action.payload }
            };
        }
        default: {
            return state;
        }
    }
};