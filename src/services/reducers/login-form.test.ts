import type {
    TLoginActions
} from '../actions/login-form';

import {
    POST_LOGIN_REQUEST,
    POST_LOGIN_SUCCESS,
    POST_LOGIN_ERROR
} from '../actions/login-form';

import { initialState, loginFormReducer } from './login-form';

describe('Проверка loginFormReducer', () => {
    test('Проверка начального состояния', () => {
        expect(loginFormReducer(undefined, {} as TLoginActions)).toEqual(
            initialState
        );
    });

    test('Проверка отправки http-запроса на авторизацию пользователя', () => {
        const action = {
            type: POST_LOGIN_REQUEST
        };

        expect(loginFormReducer(initialState, action)).toEqual({
            ...initialState,
            loginRequest: true
        });
    });

    test('Проверка успешно выполненной авторизации пользователя', () => {
        const action = {
            type: POST_LOGIN_SUCCESS
        };

        expect(loginFormReducer(initialState, action)).toEqual({
            ...initialState,
            loginRequest: false,
            loginError: null
        });
    });

    test('Проверка неуспешно выполненной авторизации пользователя', () => {
        const errorMessage = 'Ошибка авторизации';

        const action = {
            type: POST_LOGIN_ERROR,
            payload: errorMessage
        };

        expect(loginFormReducer(initialState, action)).toEqual({
            ...initialState,
            loginRequest: false,
            loginError: errorMessage
        });
    });
});