import type { Middleware, MiddlewareAPI } from 'redux';
import type { RootState, AppDispatch } from '../../utils/types';

import {
    wsConnectionStart,
    wsConnectionStop,
    wsConnectionSuccess,
    wsConnectionError,
    wsConnectionClosed,
    wsGetMessage,
    wsSendMessage
} from '../actions/ws';

export type TWSActionTypes = {
    wsConnect: typeof wsConnectionStart;
    wsDisconnect: typeof wsConnectionStop;
    onOpen: typeof wsConnectionSuccess;
    onError: typeof wsConnectionError;
    onClose: typeof wsConnectionClosed;
    onMessage: typeof wsGetMessage;
    wsSendMessage: typeof wsSendMessage;
};

export const socketMiddleware = (wsActions: TWSActionTypes): Middleware => {
    return (store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: null | WebSocket = null;
        let isConnected: boolean = false;
        let reconnectTimer: number = 0;
        let timeout: number = 5000;
        let url: string = '';

        return (next) => (action) => {
            const { dispatch } = store;
            const { type, payload } = action;
            const { wsConnect, wsDisconnect, onOpen, onError,
                onClose, onMessage, wsSendMessage } = wsActions;

            if (type === wsConnect(payload).type) {
                url = payload;
                socket = new WebSocket(url);
                isConnected = true;
            }

            if (socket) {
                socket.onopen = () => {
                    dispatch(onOpen());
                };

                socket.onerror = (event) => {
                    dispatch(onError(event));
                };

                socket.onmessage = (event) => {
                    const { data } = event;
                    const parsedData = JSON.parse(data);
                    const { success, ...restParsedData } = parsedData;

                    dispatch(onMessage(restParsedData));
                };

                socket.onclose = (event) => {
                    if (event.code !== 1000) {
                        dispatch(onError(event));
                    }

                    dispatch(onClose());

                    if (isConnected) {
                        reconnectTimer = window.setTimeout(() => {
                            dispatch(wsConnect(url));
                        }, timeout);
                    }
                };

                if (type === wsSendMessage(payload).type) {
                    socket.send(JSON.stringify(payload));
                }

                if (type === wsDisconnect().type) {
                    clearTimeout(reconnectTimer)
                    isConnected = false;
                    reconnectTimer = 0;
                    socket.close();
                    dispatch(onClose());
                }
            }

            next(action);
        };
    };
};