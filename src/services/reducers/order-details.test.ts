import type {
    TOrderActions
} from '../actions/order-details';

import {
    POST_ORDER_REQUEST,
    POST_ORDER_SUCCESS,
    POST_ORDER_ERROR,
    TOGGLE_ORDER_MODAL,
    RESET_ORDER
} from '../actions/order-details';

import { initialState, orderDetailsReducer } from './order-details';

describe('Проверка orderDetailsReducer', () => {
    test('Проверка начального состояния', () => {
        expect(orderDetailsReducer(undefined, {} as TOrderActions)).toEqual(
            initialState
        );
    });

    test('Проверка отправки http-запроса на оформление заказа', () => {
        const action = {
            type: POST_ORDER_REQUEST
        };

        expect(orderDetailsReducer(initialState, action)).toEqual({
            ...initialState,
            orderRequest: true
        });
    });

    test('Проверка успешно выполненного оформления заказа', () => {
        const order = {
            number: 25088
        };

        const action = {
            type: POST_ORDER_SUCCESS,
            payload: order
        };

        expect(orderDetailsReducer(initialState, action)).toEqual({
            ...initialState,
            orderRequest: false,
            orderError: false,
            order
        });
    });

    test('Проверка неуспешно выполненного оформления заказа', () => {
        const action = {
            type: POST_ORDER_ERROR
        };

        expect(orderDetailsReducer(initialState, action)).toEqual({
            ...initialState,
            orderRequest: false,
            orderError: true
        });
    });

    test('Проверка открытия модального окна заказа', () => {
        const action = {
            type: TOGGLE_ORDER_MODAL
        };

        expect(orderDetailsReducer(initialState, action)).toEqual({
            ...initialState,
            isOrderModalShown: true
        });
    });

    test('Проверка сброса заказа', () => {
        const action = {
            type: RESET_ORDER
        };

        expect(orderDetailsReducer(initialState, action)).toEqual({
            ...initialState,
            order: null,
            orderRequest: false,
            orderError: false
        });
    });
});