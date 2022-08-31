import type { FC } from 'react';

import styles from './ingredient.module.css';

import IngredientDetails from '../../components/ingredient-details/ingredient-details';

const Ingredient: FC = () => {
    return (
        <div className={styles.container}>
            <h1 className="text text_type_main-large">
                Детали ингредиента
            </h1>
            <IngredientDetails />
        </div>
    );
};

export default Ingredient;