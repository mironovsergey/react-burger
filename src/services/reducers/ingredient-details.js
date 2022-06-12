import {
    SET_CURRENT_INGREDIENT,
} from '../actions/ingredient-details';

const initialState = {
    currentIngredient: null
};

export const ingredientDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_INGREDIENT: {
            return {
                ...state,
                currentIngredient: action.payload
            };
        }
        default: {
            return state;
        }
    }
};