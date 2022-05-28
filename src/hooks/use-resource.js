import { useCallback } from 'react';

import useRequest from './use-request';

const getResource = async (url) => {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Ошибка HTTP ${response.status}`);
    }

    return await response.json();
};

const useResource = (url) => {
    return useRequest(
        useCallback(() => getResource(url), [url])
    );
};

export default useResource;