import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import { store } from '../services/store';

import type { TBurgerIngredientsActions } from '../services/actions/burger-ingredients';
import type { TBurgerConstructorActions } from '../services/actions/burger-constructor';
import type { TLoginActions } from '../services/actions/login-form';
import type { TRegisterActions } from '../services/actions/register-form';
import type { TForgotPasswordActions } from '../services/actions/forgot-password-form';
import type { TResetPasswordActions } from '../services/actions/reset-password-form';
import type { TProfileActions } from '../services/actions/profile-form';
import type { TUserActions } from '../services/actions/user';
import type { TOrderActions } from '../services/actions/order-details';

// Типизация всех экшенов приложения
type TAppActions =
    | TBurgerIngredientsActions
    | TBurgerConstructorActions
    | TLoginActions
    | TRegisterActions
    | TForgotPasswordActions
    | TResetPasswordActions
    | TProfileActions
    | TUserActions
    | TOrderActions;

// Типизация описания хранилища
export type RootState = ReturnType<typeof store.getState>;

// Типизация thunk'ов
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, TAppActions>;

// Типизация dispatch
export type AppDispatch = ThunkDispatch<RootState, unknown, TAppActions>;

export type TCategory = {
    name: string;
    value: string;
};

export type TIngredient = {
    _id: string;
    name: string;
    type: string;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v?: number;
};

export type TConstructorIngredient = TIngredient & {
    key: string;
};

export type TLocationState = {
    from: {
        pathname: string;
    };
};

export type TIngredientsResponse = {
    success: boolean;
    data: TIngredient[];
};

export type TOrder = {
    number: number;
};

export type TOrderResponse = {
    success: boolean;
    name: string;
    order: TOrder;
};

export type TUser = {
    email: string;
    name: string;
};

export type TRegisterResponse = {
    success: boolean;
    accessToken: string;
    refreshToken: string;
    user: TUser;
};

export type TLoginResponse = {
    success: boolean;
    accessToken: string;
    refreshToken: string;
    user: TUser;
};

export type TLogoutResponse = {
    success: boolean;
    message: string;
};

export type TUserResponse = {
    success: boolean;
    user: TUser;
};

export type TTokenResponse = {
    success: boolean;
    accessToken: string;
    refreshToken: string;
};

export type TForgotPasswordResponse = {
    success: boolean;
    message: string;
};

export type TResetPasswordResponse = {
    success: boolean;
    message: string;
};