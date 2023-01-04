import { v4 as uuidv4 } from 'uuid';

import type {
    TBurgerConstructorActions
} from '../actions/burger-constructor';

import {
    ADD_INGREDIENT,
    REMOVE_INGREDIENT,
    MOVE_INGREDIENT,
    RESET_CONSTRUCTOR
} from '../actions/burger-constructor';

import { initialState, burgerConstructorReducer } from './burger-constructor';

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

describe('Проверка burgerConstructorReducer', () => {
    test('Проверка начального состояния', () => {
        expect(burgerConstructorReducer(undefined, {} as TBurgerConstructorActions)).toEqual(
            initialState
        );
    });

    test('Проверка добавления булки в конструктор', () => {
        const bun = ingredients.filter(({ type }) => type === 'bun')[0];
        const key = uuidv4();

        const action = {
            type: ADD_INGREDIENT,
            payload: { ...bun, key }
        };

        expect(burgerConstructorReducer(initialState, action)).toEqual({
            ...initialState,
            bun: { ...bun, key }
        });
    });

    test('Проверка добавления ингредиента в конструктор', () => {
        const ingredient = ingredients.filter(({ type }) => type !== 'bun')[0];
        const key = uuidv4();

        const action = {
            type: ADD_INGREDIENT,
            payload: { ...ingredient, key }
        };

        expect(burgerConstructorReducer(initialState, action)).toEqual({
            ...initialState,
            ingredients: [
                { ...ingredient, key }
            ]
        });
    });

    test('Проверка удаления ингредиента из конструктора', () => {
        const ingredientsWithKeys = ingredients.filter(({ type }) => type !== 'bun').map((item) => ({
            ...item, key: uuidv4()
        }));

        const key = ingredientsWithKeys[0].key;

        const state = {
            ...initialState,
            ingredients: ingredientsWithKeys
        };

        const action = {
            type: REMOVE_INGREDIENT,
            payload: key
        };

        expect(burgerConstructorReducer(state, action)).toEqual({
            ...state,
            ingredients: state.ingredients.filter(
                (ingredient) => ingredient.key !== key
            )
        });
    });

    test('Проверка перемещения ингредиента в конструкторе', () => {
        const ingredientsWithKeys = ingredients.filter(({ type }) => type !== 'bun').map((item) => ({
            ...item, key: uuidv4()
        }));

        const state = {
            ...initialState,
            ingredients: ingredientsWithKeys
        };

        const dragIndex = 1;
        const hoverIndex = 0;

        const action = {
            type: MOVE_INGREDIENT,
            payload: { dragIndex, hoverIndex }
        };

        const movedIngredients = [...ingredientsWithKeys];

        movedIngredients.splice(hoverIndex, 0, ...movedIngredients.splice(dragIndex, 1));

        expect(burgerConstructorReducer(state, action)).toEqual({
            ...initialState,
            ingredients: movedIngredients
        });
    });

    test('Проверка очистки конструктора', () => {
        const action = {
            type: RESET_CONSTRUCTOR
        };

        expect(burgerConstructorReducer(initialState, action)).toEqual({
            ...initialState,
            bun: null,
            ingredients: []
        });
    });
});