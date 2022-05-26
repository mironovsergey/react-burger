import React from 'react';

import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

import { categories, ingredients } from '../../utils/data';

import styles from './app.module.css';

const App = () => {
    return (
        <div className={styles.app}>
            <AppHeader />
            <main className={styles.main}>
                <div className={styles.container}>
                    <BurgerIngredients
                        categories={categories}
                        ingredients={ingredients} />
                    <BurgerConstructor
                        ingredients={ingredients} />
                </div>
            </main>
        </div>
    );
};

export default App;