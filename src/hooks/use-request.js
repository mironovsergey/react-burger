import { useState, useEffect, useMemo } from 'react';

const useRequest = (request) => {
    const initialState = useMemo(() => ({
        isLoading: true,
        hasError: false,
        data: null
    }), []);

    const [state, setState] = useState(initialState);

    useEffect(() => {
        let isCanceled = false;

        setState(initialState);

        request()
            .then((data) => !isCanceled && setState({
                isLoading: false,
                hasError: false,
                data
            }))
            .catch((error) => !isCanceled  && setState({
                isLoading: false,
                hasError: true,
                data: null
            }));

        return () => isCanceled = true;
    }, [request, initialState]);

    return state;
};

export default useRequest;