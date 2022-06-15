export const SET_CURRENT_INGREDIENT = 'SET_CURRENT_INGREDIENT';

// Установить текущий просматриваемый ингредиент
export const setCurrentIngredient = (payload) => ({
    type: SET_CURRENT_INGREDIENT,
    payload
});