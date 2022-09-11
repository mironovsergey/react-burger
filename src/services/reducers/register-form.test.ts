import type {
    TRegisterActions
} from '../actions/register-form';

import {
    POST_REGISTER_REQUEST,
    POST_REGISTER_SUCCESS,
    POST_REGISTER_ERROR
} from '../actions/register-form';

import { initialState, registerFormReducer } from './register-form';

describe('Проверка registerFormReducer', () => {
    test('Проверка начального состояния', () => {
        expect(registerFormReducer(undefined, {} as TRegisterActions)).toEqual(
            initialState
        );
    });

    test('Проверка отправки http-запроса на регистрацию пользователя', () => {
        const action = {
            type: POST_REGISTER_REQUEST
        };

        expect(registerFormReducer(initialState, action)).toEqual({
            ...initialState,
            registerRequest: true
        });
    });

    test('Проверка успешно выполненной регистрации пользователя', () => {
        const action = {
            type: POST_REGISTER_SUCCESS
        };

        expect(registerFormReducer(initialState, action)).toEqual({
            ...initialState,
            registerRequest: false,
            registerError: null
        });
    });

    test('Проверка неуспешно выполненной регистрации пользователя', () => {
        const errorMessage = 'Ошибка регистрации пользователя';

        const action = {
            type: POST_REGISTER_ERROR,
            payload: errorMessage
        };

        expect(registerFormReducer(initialState, action)).toEqual({
            ...initialState,
            registerRequest: false,
            registerError: errorMessage
        });
    });
});