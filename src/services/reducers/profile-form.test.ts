import type {
    TProfileActions
} from '../actions/profile-form';

import {
    PATCH_USER_REQUEST,
    PATCH_USER_SUCCESS,
    PATCH_USER_ERROR
} from '../actions/profile-form';

import { initialState, profileFormReducer } from './profile-form';

describe('Проверка profileFormReducer', () => {
    test('Проверка начального состояния', () => {
        expect(profileFormReducer(undefined, {} as TProfileActions)).toEqual({
            profileRequest: false,
            profileError: null
        });
    });

    test('Проверка отправки http-запроса на обновление информации о пользователе', () => {
        const action = {
            type: PATCH_USER_REQUEST
        };

        expect(profileFormReducer(initialState, action)).toEqual({
            ...initialState,
            profileRequest: true
        });
    });

    test('Проверка успешно выполненного обновления информации о пользователе', () => {
        const action = {
            type: PATCH_USER_SUCCESS
        };

        expect(profileFormReducer(initialState, action)).toEqual({
            ...initialState,
            profileRequest: false,
            profileError: null
        });
    });

    test('Проверка неуспешно выполненного обновления информации о пользователе', () => {
        const errorMessage = 'Ошибка обновления информации о пользователе';

        const action = {
            type: PATCH_USER_ERROR,
            payload: errorMessage
        };

        expect(profileFormReducer(initialState, action)).toEqual({
            ...initialState,
            profileRequest: false,
            profileError: errorMessage
        });
    });
});