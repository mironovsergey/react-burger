import type { FC } from 'react';

import { useEffect } from 'react';
import { Switch, Route, useHistory, useLocation } from 'react-router-dom';

import { useDispatch } from '../../services/hooks';

import styles from './app.module.css';

import { getIngredients } from '../../services/actions/burger-ingredients';
import { getUser } from '../../services/actions/user';

import AppHeader from '../app-header/app-header';
import ProtectedRoute from '../protected-route/protected-route';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderReceipt from '../order-receipt/order-receipt';
import Modal from '../modal/modal';

import {
    Home,
    Login,
    Register,
    ForgotPassword,
    ResetPassword,
    Profile,
    Orders,
    Order,
    Feed,
    FeedOrder,
    Ingredient,
    NotFound
} from '../../pages';

import { Location } from 'history';

type TLocationState = {
    background: Location;
};

const App: FC = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation<TLocationState>();
    const background = location.state && location.state.background;

    useEffect(() => {
        dispatch(getIngredients());
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
                    <ProtectedRoute exact path="/profile/orders/:id">
                        <Order />
                    </ProtectedRoute>
                    <Route exact path="/feed">
                        <Feed />
                    </Route>
                    <Route exact path="/feed/:id">
                        <FeedOrder />
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
                        <>
                            <Route path="/ingredients/:id">
                                <Modal
                                    title="Детали ингредиента"
                                    onClose={() => history.goBack()}
                                >
                                    <IngredientDetails />
                                </Modal>
                            </Route>
                            <Route path="/feed/:id">
                                <Modal
                                    onClose={() => history.goBack()}
                                >
                                    <OrderReceipt />
                                </Modal>
                            </Route>
                            <Route path="/profile/orders/:id">
                                <Modal
                                    onClose={() => history.goBack()}
                                >
                                    <OrderReceipt />
                                </Modal>
                            </Route>
                        </>
                    )
                }
            </main>
        </div>
    );
};

export default App;