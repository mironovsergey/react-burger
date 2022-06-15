import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_ERROR,
    SET_CURRENT_CATEGORY
} from '../actions/burger-ingredients';

const initialState = {
    ingredients: [],
    ingredientsRequest: false,
    ingredientsError: false,
    currentCategory: 'bun'
};

export const burgerIngredientsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_INGREDIENTS_REQUEST: {
            return {
                ...state,
                ingredientsRequest: true
            };
        }
        case GET_INGREDIENTS_SUCCESS: {
            return {
                ...state,
                ingredients: action.payload,
                ingredientsRequest: false,
                ingredientsError: false
            };
        }
        case GET_INGREDIENTS_ERROR: {
            return {
                ...state,
                ingredientsRequest: false,
                ingredientsError: true
            };
        }
        case SET_CURRENT_CATEGORY: {
            return {
                ...state,
                currentCategory: action.payload
            };
        }
        default: {
            return state;
        }
    }
};