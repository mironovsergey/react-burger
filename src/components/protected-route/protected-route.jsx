import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Redirect, useLocation } from 'react-router-dom';

import { routePropType } from '../../utils/prop-types';
import { getUser } from '../../services/actions/user';

const ProtectedRoute = (props) => {
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

ProtectedRoute.propTypes = {
    ...routePropType
};

export default ProtectedRoute;