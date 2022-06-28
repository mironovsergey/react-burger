import { apiUrl } from '../utils/constants';
import { cookies } from './cookie';

const checkResponse = (response) => {
    return response.ok ? response.json()
        : response.json().then((error) => Promise.reject(error));
};

const checkSuccess = (data) => {
    return data?.success ? data : Promise.reject(data);
};

// Получение ингредиента
export const getIngredientsRequest = async () => {
    const response = await fetch(`${apiUrl}/ingredients`);
    const data = await checkResponse(response);

    return checkSuccess(data);
};

// Оформление заказа
export const postOrderRequest = async (body) => {
    const response = await fetch(`${apiUrl}/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body
    });

    const data = await checkResponse(response);

    return checkSuccess(data);
};

// Регистрация пользователя
export const postRegisterRequest = async (body) => {
    const response = await fetch(`${apiUrl}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body
    });

    const data = await checkResponse(response);

    return checkSuccess(data);
};

// Авторизация пользователя
export const postLoginRequest = async (body) => {
    const response = await fetch(`${apiUrl}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body
    });

    const data = await checkResponse(response);

    return checkSuccess(data);
};

// Выход из системы
export const postLogoutRequest = async () => {
    const response = await fetch(`${apiUrl}/auth/logout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            token: cookies.get('refreshToken')
        })
    });

    const data = await checkResponse(response);

    return checkSuccess(data);
};

// Получение информации о пользователе
export const getUserRequest = async () => {
    const response = await fetch(`${apiUrl}/auth/user`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': cookies.get('accessToken')
        }
    });

    const data = await checkResponse(response);

    return checkSuccess(data);
};

// Обновление информации о пользователе
export const patchUserRequest = async (body) => {
    const response = await fetch(`${apiUrl}/auth/user`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': cookies.get('accessToken')
        },
        body
    });

    const data = await checkResponse(response);

    return checkSuccess(data);
};

// Обновление токена
export const postTokenRequest = async () => {
    const response = await fetch(`${apiUrl}/auth/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            token: cookies.get('refreshToken')
        })
    });

    const data = await checkResponse(response);

    return checkSuccess(data);
};

// Восстановление пароля
export const postForgotPasswordRequest = async (body) => {
    const response = await fetch(`${apiUrl}/password-reset`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body
    });

    const data = await checkResponse(response);

    return checkSuccess(data);
};

// Сброс пароля
export const postResetPasswordRequest = async (body) => {
    const response = await fetch(`${apiUrl}/password-reset/reset`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body
    });

    const data = await checkResponse(response);

    return checkSuccess(data);
};