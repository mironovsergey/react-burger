import { getIngredientsRequest } from '../api';

import type { AppThunk, TIngredient } from '../../utils/types';

export const GET_INGREDIENTS_REQUEST: 'GET_INGREDIENTS_REQUEST' = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS: 'GET_INGREDIENTS_SUCCESS' = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_ERROR: 'GET_INGREDIENTS_ERROR' = 'GET_INGREDIENTS_ERROR';

export const SET_CURRENT_CATEGORY: 'SET_CURRENT_CATEGORY' = 'SET_CURRENT_CATEGORY';

export interface IGetIngredientsRequestAction {
    readonly type: typeof GET_INGREDIENTS_REQUEST;
}

export interface IGetIngredientsSuccessAction {
    readonly type: typeof GET_INGREDIENTS_SUCCESS;
    readonly payload: TIngredient[];
}

export interface IGetIngredientsErrorAction {
    readonly type: typeof GET_INGREDIENTS_ERROR;
}

export interface ISetCurrentCategoryAction {
    readonly type: typeof SET_CURRENT_CATEGORY;
    readonly payload: string;
}

export type TBurgerIngredientsActions =
    | IGetIngredientsRequestAction
    | IGetIngredientsSuccessAction
    | IGetIngredientsErrorAction
    | ISetCurrentCategoryAction;

export const getIngredientsRequestAction = (): IGetIngredientsRequestAction => ({
    type: GET_INGREDIENTS_REQUEST
});

export const getIngredientsSuccessAction = (payload: TIngredient[]): IGetIngredientsSuccessAction => ({
    type: GET_INGREDIENTS_SUCCESS,
    payload
});

export const getIngredientsErrorAction = (): IGetIngredientsErrorAction => ({
    type: GET_INGREDIENTS_ERROR
});

// Получить массив ингредиентов
export const getIngredients = (): AppThunk => {
    return (dispatch) => {
        dispatch(getIngredientsRequestAction());

        getIngredientsRequest()
            .then((res) => {
                dispatch(getIngredientsSuccessAction(res.data));
            })
            .catch(() => {
                dispatch(getIngredientsErrorAction());
            });
    };
};

// Установить текущую категорию ингредиентов
export const setCurrentCategory = (payload: string): ISetCurrentCategoryAction => ({
    type: SET_CURRENT_CATEGORY,
    payload
});