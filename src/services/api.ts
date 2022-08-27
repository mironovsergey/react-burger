import { apiUrl } from '../utils/constants';
import { cookies } from './cookie';

import type {
    TIngredientsResponse,
    TOrderResponse,
    TRegisterResponse,
    TLoginResponse,
    TLogoutResponse,
    TUserResponse,
    TTokenResponse,
    TForgotPasswordResponse,
    TResetPasswordResponse
} from '../utils/types';

const checkResponse = <T>(response: Response): Promise<T> => {
    return response.ok ? response.json()
        : response.json().then((error) => Promise.reject(error));
};

const checkSuccess = <T extends { success: boolean }>(data: T): T | Promise<T> => {
    return data.success ? data : Promise.reject(data);
};

// Получение ингредиента
export const getIngredientsRequest = async (): Promise<TIngredientsResponse> => {
    const response = await fetch(`${apiUrl}/ingredients`);
    const data = await checkResponse<TIngredientsResponse>(response);

    return checkSuccess<TIngredientsResponse>(data);
};

// Оформление заказа
export const postOrderRequest = async (body: string): Promise<TOrderResponse> => {
    const response = await fetch(`${apiUrl}/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body
    });

    const data = await checkResponse<TOrderResponse>(response);

    return checkSuccess<TOrderResponse>(data);
};

// Регистрация пользователя
export const postRegisterRequest = async (body: string): Promise<TRegisterResponse> => {
    const response = await fetch(`${apiUrl}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body
    });

    const data = await checkResponse<TRegisterResponse>(response);

    return checkSuccess<TRegisterResponse>(data);
};

// Авторизация пользователя
export const postLoginRequest = async (body: string): Promise<TLoginResponse> => {
    const response = await fetch(`${apiUrl}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body
    });

    const data = await checkResponse<TLoginResponse>(response);

    return checkSuccess<TLoginResponse>(data);
};

// Выход из системы
export const postLogoutRequest = async (): Promise<TLogoutResponse> => {
    const response = await fetch(`${apiUrl}/auth/logout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            token: cookies.get('refreshToken')
        })
    });

    const data = await checkResponse<TLogoutResponse>(response);

    return checkSuccess<TLogoutResponse>(data);
};

// Получение информации о пользователе
export const getUserRequest = async (): Promise<TUserResponse> => {
    const response = await fetch(`${apiUrl}/auth/user`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': cookies.get('accessToken')
        }
    });

    const data = await checkResponse<TUserResponse>(response);

    return checkSuccess<TUserResponse>(data);
};

// Обновление информации о пользователе
export const patchUserRequest = async (body: string): Promise<TUserResponse> => {
    const response = await fetch(`${apiUrl}/auth/user`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': cookies.get('accessToken')
        },
        body
    });

    const data = await checkResponse<TUserResponse>(response);

    return checkSuccess<TUserResponse>(data);
};

// Обновление токена
export const postTokenRequest = async (): Promise<TTokenResponse> => {
    const response = await fetch(`${apiUrl}/auth/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            token: cookies.get('refreshToken')
        })
    });

    const data = await checkResponse<TTokenResponse>(response);

    return checkSuccess<TTokenResponse>(data);
};

// Восстановление пароля
export const postForgotPasswordRequest = async (body: string): Promise<TForgotPasswordResponse> => {
    const response = await fetch(`${apiUrl}/password-reset`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body
    });

    const data = await checkResponse<TForgotPasswordResponse>(response);

    return checkSuccess<TForgotPasswordResponse>(data);
};

// Сброс пароля
export const postResetPasswordRequest = async (body: string): Promise<TResetPasswordResponse> => {
    const response = await fetch(`${apiUrl}/password-reset/reset`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body
    });

    const data = await checkResponse<TResetPasswordResponse>(response);

    return checkSuccess<TResetPasswordResponse>(data);
};
