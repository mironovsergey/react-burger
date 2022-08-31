import {
    ADD_INGREDIENT,
    REMOVE_INGREDIENT,
    MOVE_INGREDIENT,
    RESET_CONSTRUCTOR
} from '../actions/burger-constructor';

import type {
    TBurgerConstructorActions
} from '../actions/burger-constructor';

import type {
    TConstructorIngredient
} from '../../utils/types';

type TBurgerConstructorState = {
    bun: null | TConstructorIngredient;
    ingredients: ReadonlyArray<TConstructorIngredient>;
};

const initialState: TBurgerConstructorState = {
    bun: null,
    ingredients: []
};

export const burgerConstructorReducer = (
    state = initialState,
    action: TBurgerConstructorActions
): TBurgerConstructorState => {
    switch (action.type) {
        case ADD_INGREDIENT: {
            if (action.payload.type === 'bun') {
                return {
                    ...state,
                    bun: action.payload
                }
            }

            return {
                ...state,
                ingredients: [
                    ...state.ingredients,
                    action.payload
                ]
            };
        }
        case REMOVE_INGREDIENT: {
            return {
                ...state,
                ingredients: state.ingredients.filter(
                    (ingredient) => ingredient.key !== action.payload
                )
            };
        }
        case MOVE_INGREDIENT: {
            const ingredients = [...state.ingredients];
            const { dragIndex, hoverIndex } = action.payload;

            ingredients.splice(hoverIndex, 0, ...ingredients.splice(dragIndex, 1));

            return {
                ...state,
                ingredients
            };
        }
        case RESET_CONSTRUCTOR: {
            return {
                ...state,
                bun: null,
                ingredients: []
            };
        }
        default: {
            return state;
        }
    }
};