import { apiUrl } from '../utils/constants';

const checkResponse = (response) => {
    return response.ok ? response.json()
        : response.json().then((error) => Promise.reject(error));
}

export const fetchIngredients = async () => {
    const response = await fetch(`${apiUrl}/ingredients`);
    const data = await checkResponse(response);

    return data?.success ? data : Promise.reject(data);
};

export const fetchOrder = async (body) => {
    const response = await fetch(`${apiUrl}/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body
    });

    const data = await checkResponse(response);

    return data?.success ? data : Promise.reject(data);
};