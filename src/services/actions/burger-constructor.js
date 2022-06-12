import { v4 as uuidv4 } from 'uuid';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';
export const MOVE_INGREDIENT = 'MOVE_INGREDIENT';

// Добавить ингредиент в конструктор
export const addIngredient = (payload) => ({
    type: ADD_INGREDIENT,
    payload: {
        ...payload,
        id: uuidv4()
    }
});

// Удалить ингредиент из конструктора
export const removeIngredient = (payload) => ({
    type: REMOVE_INGREDIENT,
    payload
});

// Переместить ингредиент в конструкторе
export const moveIngredient = (payload) => ({
    type: MOVE_INGREDIENT,
    payload
});