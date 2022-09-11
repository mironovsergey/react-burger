import type {
    TBurgerIngredientsActions
} from '../actions/burger-ingredients';

import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_ERROR,
    SET_CURRENT_CATEGORY
} from '../actions/burger-ingredients';

import { initialState, burgerIngredientsReducer } from './burger-ingredients';

const ingredients = [
    {
        "_id": "60d3b41abdacab0026a733c6",
        "name": "Краторная булка N-200i",
        "type": "bun",
        "proteins": 80,
        "fat": 24,
        "carbohydrates": 53,
        "calories": 420,
        "price": 1255,
        "image": "https://code.s3.yandex.net/react/code/bun-02.png",
        "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
        "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
        "__v": 0
    },
    {
        "_id": "60d3b41abdacab0026a733c7",
        "name": "Флюоресцентная булка R2-D3",
        "type": "bun",
        "proteins": 44,
        "fat": 26,
        "carbohydrates": 85,
        "calories": 643,
        "price": 988,
        "image": "https://code.s3.yandex.net/react/code/bun-01.png",
        "image_mobile": "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
        "image_large": "https://code.s3.yandex.net/react/code/bun-01-large.png",
        "__v": 0
    },
    {
        "_id": "60d3b41abdacab0026a733c8",
        "name": "Филе Люминесцентного тетраодонтимформа",
        "type": "main",
        "proteins": 44,
        "fat": 26,
        "carbohydrates": 85,
        "calories": 643,
        "price": 988,
        "image": "https://code.s3.yandex.net/react/code/meat-03.png",
        "image_mobile": "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
        "image_large": "https://code.s3.yandex.net/react/code/meat-03-large.png",
        "__v": 0
    },
    {
        "_id": "60d3b41abdacab0026a733c9",
        "name": "Мясо бессмертных моллюсков Protostomia",
        "type": "main",
        "proteins": 433,
        "fat": 244,
        "carbohydrates": 33,
        "calories": 420,
        "price": 1337,
        "image": "https://code.s3.yandex.net/react/code/meat-02.png",
        "image_mobile": "https://code.s3.yandex.net/react/code/meat-02-mobile.png",
        "image_large": "https://code.s3.yandex.net/react/code/meat-02-large.png",
        "__v": 0
    }
];

describe('Проверка burgerIngredientsReducer', () => {
    test('Проверка начального состояния', () => {
        expect(burgerIngredientsReducer(undefined, {} as TBurgerIngredientsActions)).toEqual(
            initialState
        );
    });

    test('Проверка отправки http-запроса на получение ингредиентов', () => {
        const action = {
            type: GET_INGREDIENTS_REQUEST
        };

        expect(burgerIngredientsReducer(initialState, action)).toEqual({
            ...initialState,
            ingredientsRequest: true
        });
    });

    test('Проверка успешно выполненного http-запроса', () => {
        const action = {
            type: GET_INGREDIENTS_SUCCESS,
            payload: ingredients
        };

        expect(burgerIngredientsReducer(initialState, action)).toEqual({
            ...initialState,
            ingredientsRequest: false,
            ingredientsError: false,
            ingredients
        });
    });

    test('Проверка неуспешно выполненного http-запроса', () => {
        const action = {
            type: GET_INGREDIENTS_ERROR
        };

        expect(burgerIngredientsReducer(initialState, action)).toEqual({
            ...initialState,
            ingredientsRequest: false,
            ingredientsError: true
        });
    });

    test('Проверка смены текущей категории ингредиентов', () => {
        const category = 'bun';

        const action = {
            type: SET_CURRENT_CATEGORY,
            payload: category
        };

        expect(burgerIngredientsReducer(initialState, action)).toEqual({
            ...initialState,
            currentCategory: category
        });
    });
});