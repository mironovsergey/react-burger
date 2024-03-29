import type { FC } from 'react';
import type { RouteProps } from 'react-router';

import { useState, useEffect } from 'react';

import { useSelector, useDispatch } from '../../services/hooks';

import { Route, Redirect, useLocation } from 'react-router-dom';

import { getUser } from '../../services/actions/user';

const ProtectedRoute: FC<RouteProps> = (props) => {
    const dispatch = useDispatch();
    const location = useLocation();

    const { user } = useSelector(({ user }) => user);

    const [isAuth, setAuth] = useState(false);

    useEffect(() => {
        dispatch(getUser())
            .finally(() => setAuth(true));
    }, [dispatch]);

    if (!isAuth) {
        return null;
    }

    if (!user) {
        return (
            <Redirect
                to={{
                    pathname: '/login',
                    state: { from: location }
                }}
            />
        )
    }

    return <Route {...props} />
};

export default ProtectedRoute;