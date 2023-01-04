import type {
    TUserActions
} from '../actions/user';

import {
    SET_USER,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_ERROR,
    UPDATE_TOKEN_REQUEST,
    UPDATE_TOKEN_SUCCESS,
    UPDATE_TOKEN_ERROR,
    POST_LOGOUT_REQUEST,
    POST_LOGOUT_SUCCESS,
    POST_LOGOUT_ERROR
} from '../actions/user';

import { initialState, userReducer } from './user';

const user = {
    email: 'mironov@parfyonov.com',
    name: 'Sergey'
}

describe('Проверка userReducer', () => {
    test('Проверка начального состояния', () => {
        expect(userReducer(undefined, {} as TUserActions)).toEqual(
            initialState
        );
    });

    test('Проверка инициализации пользователя', () => {
        const action = {
            type: SET_USER,
            payload: user
        };

        expect(userReducer(initialState, action)).toEqual({
            ...initialState,
            user
        });
    });

    test('Проверка отправки http-запроса на получение информации о пользователе', () => {
        const action = {
            type: GET_USER_REQUEST
        };

        expect(userReducer(initialState, action)).toEqual({
            ...initialState,
            userRequest: true
        });
    });

    test('Проверка успешно выполненного получения информации о пользователе', () => {
        const action = {
            type: GET_USER_SUCCESS,
            payload: user
        };

        expect(userReducer(initialState, action)).toEqual({
            ...initialState,
            userRequest: false,
            userError: false,
            user
        });
    });

    test('Проверка неуспешно выполненного получения информации о пользователе', () => {
        const action = {
            type: GET_USER_ERROR
        };

        expect(userReducer(initialState, action)).toEqual({
            ...initialState,
            userRequest: false,
            userError: true
        });
    });

    test('Проверка отправки http-запроса на обновление токена', () => {
        const action = {
            type: UPDATE_TOKEN_REQUEST
        };

        expect(userReducer(initialState, action)).toEqual({
            ...initialState,
            tokenRequest: true
        });
    });

    test('Проверка успешно выполненного обновления токена', () => {
        const action = {
            type: UPDATE_TOKEN_SUCCESS
        };

        expect(userReducer(initialState, action)).toEqual({
            ...initialState,
            tokenRequest: false,
            tokenError: false
        });
    });

    test('Проверка неуспешно выполненного обновления токена', () => {
        const action = {
            type: UPDATE_TOKEN_ERROR
        };

        expect(userReducer(initialState, action)).toEqual({
            ...initialState,
            tokenRequest: false,
            tokenError: true
        });
    });

    test('Проверка отправки http-запроса на выход из системы', () => {
        const action = {
            type: POST_LOGOUT_REQUEST
        };

        expect(userReducer(initialState, action)).toEqual({
            ...initialState,
            logoutRequest: true
        });
    });

    test('Проверка успешно выполненного выхода из системы', () => {
        const action = {
            type: POST_LOGOUT_SUCCESS
        };

        expect(userReducer(initialState, action)).toEqual({
            ...initialState,
            logoutRequest: false,
            logoutError: false,
            user: null
        });
    });

    test('Проверка неуспешно выполненного выхода из системы', () => {
        const action = {
            type: POST_LOGOUT_ERROR
        };

        expect(userReducer(initialState, action)).toEqual({
            ...initialState,
            logoutRequest: false,
            logoutError: true
        });
    });
});