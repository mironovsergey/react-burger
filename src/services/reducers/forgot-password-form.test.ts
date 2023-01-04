import type {
    TForgotPasswordActions
} from '../actions/forgot-password-form';

import {
    POST_FORGOT_PASSWORD_REQUEST,
    POST_FORGOT_PASSWORD_SUCCESS,
    POST_FORGOT_PASSWORD_ERROR
} from '../actions/forgot-password-form';

import { initialState, forgotPasswordFormReducer } from './forgot-password-form';

describe('Проверка forgotPasswordFormReducer', () => {
    test('Проверка начального состояния', () => {
        expect(forgotPasswordFormReducer(undefined, {} as TForgotPasswordActions)).toEqual(
            initialState
        );
    });

    test('Проверка отправки http-запроса на восстановление пароля', () => {
        const action = {
            type: POST_FORGOT_PASSWORD_REQUEST
        };

        expect(forgotPasswordFormReducer(initialState, action)).toEqual({
            ...initialState,
            forgotPasswordRequest: true,
            forgotPasswordSuccess: false
        });
    });

    test('Проверка успешно выполненного восстановления пароля', () => {
        const action = {
            type: POST_FORGOT_PASSWORD_SUCCESS
        };

        expect(forgotPasswordFormReducer(initialState, action)).toEqual({
            ...initialState,
            forgotPasswordRequest: false,
            forgotPasswordSuccess: true,
            forgotPasswordError: null
        });
    });

    test('Проверка неуспешно выполненного восстановления пароля', () => {
        const errorMessage = 'Ошибка восстановления пароля';

        const action = {
            type: POST_FORGOT_PASSWORD_ERROR,
            payload: errorMessage
        };

        expect(forgotPasswordFormReducer(initialState, action)).toEqual({
            ...initialState,
            forgotPasswordRequest: false,
            forgotPasswordSuccess: false,
            forgotPasswordError: errorMessage
        });
    });
});