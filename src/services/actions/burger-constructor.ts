import { v4 as uuidv4 } from 'uuid';

import type {
    TIngredient,
    TConstructorIngredient
} from '../../utils/types';

export const ADD_INGREDIENT: 'ADD_INGREDIENT' = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT: 'REMOVE_INGREDIENT' = 'REMOVE_INGREDIENT';
export const MOVE_INGREDIENT: 'MOVE_INGREDIENT' = 'MOVE_INGREDIENT';
export const RESET_CONSTRUCTOR: 'RESET_CONSTRUCTOR' = 'RESET_CONSTRUCTOR';

export type TMoveItem = {
    dragIndex: number;
    hoverIndex: number;
};

export interface IAddIngredientAction {
    readonly type: typeof ADD_INGREDIENT;
    readonly payload: TConstructorIngredient;
}

export interface IRemoveIngredientAction {
    readonly type: typeof REMOVE_INGREDIENT;
    readonly payload: string;
}

export interface IMoveIngredientAction {
    readonly type: typeof MOVE_INGREDIENT;
    readonly payload: TMoveItem;
}

export interface IResetConstructorAction {
    readonly type: typeof RESET_CONSTRUCTOR;
}

export type TBurgerConstructorActions =
    | IAddIngredientAction
    | IRemoveIngredientAction
    | IMoveIngredientAction
    | IResetConstructorAction;

// Добавить ингредиент в конструктор
export const addIngredient = (payload: TIngredient): IAddIngredientAction => ({
    type: ADD_INGREDIENT,
    payload: {
        ...payload,
        key: uuidv4()
    }
});

// Удалить ингредиент из конструктора
export const removeIngredient = (payload: string): IRemoveIngredientAction => ({
    type: REMOVE_INGREDIENT,
    payload
});

// Переместить ингредиент в конструкторе
export const moveIngredient = (payload: TMoveItem): IMoveIngredientAction => ({
    type: MOVE_INGREDIENT,
    payload
});

// Очистить конструктор
export const resetConstructor = (): IResetConstructorAction => ({
    type: RESET_CONSTRUCTOR
});