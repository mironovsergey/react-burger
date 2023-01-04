import type {
    TWSActions
} from '../actions/ws';

import {
    WS_CONNECTION_STOP,
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_MESSAGE
} from '../actions/ws';

import { initialState, wsReducer } from './ws';

const message = {
    "success": true,
    "orders": [
        {
            "_id": "631bd74742d34a001c286f4e",
            "ingredients": [
                "60d3b41abdacab0026a733cd",
                "60d3b41abdacab0026a733cc",
                "60d3b41abdacab0026a733c7",
                "60d3b41abdacab0026a733c7"
            ],
            "status": "done",
            "name": "Space флюоресцентный spicy бургер",
            "createdAt": "2022-09-10T00:16:07.129Z",
            "updatedAt": "2022-09-10T00:16:07.484Z",
            "number": 25088
        },
        {
            "_id": "631bafdf42d34a001c286e46",
            "ingredients": [
                "60d3b41abdacab0026a733cd",
                "60d3b41abdacab0026a733c7"
            ],
            "status": "done",
            "name": "Space флюоресцентный бургер",
            "createdAt": "2022-09-09T21:27:59.181Z",
            "updatedAt": "2022-09-09T21:27:59.500Z",
            "number": 25087
        }
    ],
    "total": 25001,
    "totalToday": 41
};

describe('Проверка wsReducer', () => {
    test('Проверка начального состояния', () => {
        expect(wsReducer(undefined, {} as TWSActions)).toEqual(
            initialState
        );
    });

    test('Проверка принудительного закрытия сокет-соединения', () => {
        const action = {
            type: WS_CONNECTION_STOP
        };

        expect(wsReducer(initialState, action)).toEqual({
            ...initialState,
            connected: false,
            message: null,
            error: null
        });
    });

    test('Проверка успешно выполненного открытия сокет-соединения', () => {
        const action = {
            type: WS_CONNECTION_SUCCESS
        };

        expect(wsReducer(initialState, action)).toEqual({
            ...initialState,
            connected: true,
            error: null
        });
    });

    test('Проверка успешно выполненного закрытия сокет-соединения из-за ошибки', () => {
        const errorEvent = new Event('error');

        const action = {
            type: WS_CONNECTION_ERROR,
            payload: errorEvent
        };

        expect(wsReducer(initialState, action)).toEqual({
            ...initialState,
            connected: false,
            error: errorEvent
        });
    });

    test('Проверка закрытия сокет-соединения', () => {
        const action = {
            type: WS_CONNECTION_CLOSED
        };

        expect(wsReducer(initialState, action)).toEqual({
            ...initialState,
            connected: false
        });
    });

    test('Проверка получения данных по сокет-соединению', () => {
        const action = {
            type: WS_GET_MESSAGE,
            payload: message
        };

        expect(wsReducer(initialState, action)).toEqual({
            ...initialState,
            message
        });
    });
});