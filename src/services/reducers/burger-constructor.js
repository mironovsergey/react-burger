import {
    ADD_INGREDIENT,
    REMOVE_INGREDIENT,
    MOVE_INGREDIENT
} from '../actions/burger-constructor';

const initialState = {
    bun: null,
    ingredients: []
};

export const burgerConstructorReducer = (state = initialState, action) => {
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
                    (ingredient) => ingredient.id !== action.payload
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
        default: {
            return state;
        }
    }
};