import { useState } from 'react';
import useResource from '../../hooks/use-resource';

import { apiUrl, categories } from '../../utils/constants';

import styles from './app.module.css';

import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';
import Modal from '../modal/modal';

const App = () => {
    const { isLoading, hasError, data } = useResource(apiUrl);

    const [currentIngredient, setCurrentIngredient] = useState(null);
    const [isModalIngredientOpen, setIsModalIngredientOpen] = useState(false);
    const [isModalOrderOpen, setIsModalOrderOpen] = useState(false);

    const handleModalIngredientOpen = (ingredient) => {
        setCurrentIngredient(ingredient);
        setIsModalIngredientOpen(true);
    };

    const handleModalIngredientClose = () => {
        setCurrentIngredient(null);
        setIsModalIngredientOpen(false);
    };

    const handleModalOrderOpen = () => {
        setIsModalOrderOpen(true);
    };

    const handleModalOrderClose = () => {
        setIsModalOrderOpen(false);
    };

    return (
        <div className={styles.component}>
            <AppHeader />
            <main className={styles.main}>
                {
                    isLoading && (
                        <div className={`${styles.notice}`}>
                            <div className="text text_type_main-large">
                                Загрузка....
                            </div>
                        </div>
                    )
                }
                {
                    hasError && (
                        <div className={`${styles.notice}`}>
                            <div className="text text_type_main-large">
                                Произошла ошибка
                            </div>
                        </div>
                    )
                }
                {
                    !(isLoading || hasError || data === null) && (
                        <div className={styles.container}>
                            <BurgerIngredients
                                categories={categories}
                                ingredients={data.data}
                                onModalIngredientOpen={handleModalIngredientOpen} />
                            <BurgerConstructor
                                ingredients={data.data}
                                onModalOrderOpen={handleModalOrderOpen} />
                        </div>
                    )
                }
            </main>
            {
                isModalIngredientOpen && (
                    <Modal
                        title="Детали ингредиента"
                        onClose={handleModalIngredientClose}
                    >
                        <IngredientDetails ingredient={currentIngredient} />
                    </Modal>
                )
            }
            {
                isModalOrderOpen && (
                    <Modal onClose={handleModalOrderClose}>
                        <OrderDetails />
                    </Modal>
                )
            }
        </div>
    );
};

export default App;