import type {
    TResetPasswordActions
} from '../actions/reset-password-form';

import {
    POST_RESET_PASSWORD_REQUEST,
    POST_RESET_PASSWORD_SUCCESS,
    POST_RESET_PASSWORD_ERROR
} from '../actions/reset-password-form';

import { initialState, resetPasswordFormReducer } from './reset-password-form';

describe('Проверка resetPasswordFormReducer', () => {
    test('Проверка начального состояния', () => {
        expect(resetPasswordFormReducer(undefined, {} as TResetPasswordActions)).toEqual({
            resetPasswordRequest: false,
            resetPasswordError: null
        });
    });

    test('Проверка отправки http-запроса на сброс пароля', () => {
        const action = {
            type: POST_RESET_PASSWORD_REQUEST
        };

        expect(resetPasswordFormReducer(initialState, action)).toEqual({
            ...initialState,
            resetPasswordRequest: true
        });
    });

    test('Проверка успешно выполненного сброса пароля', () => {
        const action = {
            type: POST_RESET_PASSWORD_SUCCESS
        };

        expect(resetPasswordFormReducer(initialState, action)).toEqual({
            ...initialState,
            resetPasswordRequest: false,
            resetPasswordError: null
        });
    });

    test('Проверка неуспешно выполненного сброса пароля', () => {
        const errorMessage = 'Ошибка сброса пароля';

        const action = {
            type: POST_RESET_PASSWORD_ERROR,
            payload: errorMessage
        };

        expect(resetPasswordFormReducer(initialState, action)).toEqual({
            ...initialState,
            resetPasswordRequest: false,
            resetPasswordError: errorMessage
        });
    });
});