import { fetchIngredients } from '../api';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_ERROR = 'GET_INGREDIENTS_ERROR';

export const SET_CURRENT_CATEGORY = 'SET_CURRENT_CATEGORY';

// Получить массив ингредиентов
export const getIngredients = () => {
    return (dispatch) => {
        dispatch({
            type: GET_INGREDIENTS_REQUEST
        });

        fetchIngredients()
            .then((res) => {
                dispatch({
                    type: GET_INGREDIENTS_SUCCESS,
                    payload: res.data
                });
            })
            .catch(() => {
                dispatch({
                    type: GET_INGREDIENTS_ERROR
                });
            });
    };
};

// Установить текущую категорию ингредиентов
export const setCurrentCategory = (payload) => ({
    type: SET_CURRENT_CATEGORY,
    payload
});