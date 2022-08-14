import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route, useHistory, useLocation } from 'react-router-dom';

import styles from './app.module.css';

import { getIngredients } from '../../services/actions/burger-ingredients';
import { getUser } from '../../services/actions/user';

import AppHeader from '../app-header/app-header';
import ProtectedRoute from '../protected-route/protected-route';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';

import {
    Home,
    Login,
    Register,
    ForgotPassword,
    ResetPassword,
    Profile,
    Orders,
    Feed,
    Ingredient,
    NotFound
} from '../../pages';

import { Location } from 'history';

type TLocationState = {
    background: Location;
};

const App = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation<TLocationState>();
    const background = location.state && location.state.background;

    useEffect(() => {
        // @ts-ignore
        dispatch(getIngredients());
        // @ts-ignore
        dispatch(getUser());
    }, [dispatch]);

    return (
        <div className={styles.component}>
            <AppHeader />
            <main className={styles.main}>
                <Switch location={background || location}>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route exact path="/login">
                        <Login />
                    </Route>
                    <Route exact path="/register">
                        <Register />
                    </Route>
                    <Route exact path="/forgot-password">
                        <ForgotPassword />
                    </Route>
                    <Route exact path="/reset-password">
                        <ResetPassword />
                    </Route>
                    <ProtectedRoute exact path="/profile">
                        <Profile />
                    </ProtectedRoute>
                    <ProtectedRoute exact path="/profile/orders">
                        <Orders />
                    </ProtectedRoute>
                    <Route exact path="/feed">
                        <Feed />
                    </Route>
                    <Route exact path="/ingredients/:id">
                        <Ingredient />
                    </Route>
                    <Route>
                        <NotFound />
                    </Route>
                </Switch>

                {
                    background && (
                        <Route path="/ingredients/:id">
                            <Modal
                                title="Детали ингредиента"
                                onClose={() => history.goBack()}
                            >
                                <IngredientDetails />
                            </Modal>
                        </Route>
                    )
                }
            </main>
        </div>
    );
};

export default App;