import React from 'react';

import { ingredientPropType } from '../../utils/prop-types';

import {
    Counter,
    CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './burger-ingredient.module.css';

const BurgerIngredient = ({ ingredient: { name, image, price } }) => {
    return (
        <div className={styles.ingredient}>
            <div className={`${styles.image} ml-4 mr-4 mb-1`}>
                <div className={styles.image_wrap}>
                    <img src={image} alt={name} />
                </div>
            </div>
            <div className={`${styles.price} mb-1`}>
                <span className="text text_type_digits-default mr-2">
                    {price}
                </span>
                <CurrencyIcon type="primary" />
            </div>
            <div className={`${styles.name} text_type_main-default`}>
                {name}
            </div>
            <Counter count={1} size="default" />
        </div>
    );
};

BurgerIngredient.propTypes = {
    ingredient: ingredientPropType.isRequired
};

export default BurgerIngredient;