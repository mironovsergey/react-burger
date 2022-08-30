import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { rootReducer } from './reducers';

import { socketMiddleware } from './middleware/ws';

import {
    wsConnectionStart,
    wsConnectionStop,
    wsConnectionSuccess,
    wsConnectionError,
    wsConnectionClosed,
    wsGetMessage,
    wsSendMessage
} from './actions/ws';

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const wsActions = {
    wsConnect: wsConnectionStart,
    wsDisconnect: wsConnectionStop,
    onOpen: wsConnectionSuccess,
    onError: wsConnectionError,
    onClose: wsConnectionClosed,
    onMessage: wsGetMessage,
    wsSendMessage: wsSendMessage
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware(wsActions)));

export const store = createStore(rootReducer, enhancer);