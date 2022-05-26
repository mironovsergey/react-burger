import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
    categoryPropType,
    ingredientPropType
} from '../../utils/prop-types';

import {
    Tab
} from '@ya.praktikum/react-developer-burger-ui-components';

import BurgerIngredient from '../burger-ingredient/burger-ingredient';

import styles from './burger-ingredients.module.css';

const BurgerIngredients = ({ categories, ingredients }) => {
    const [current, setCurrent] = useState(categories[0].value);

    // Список табов
    const tabList = categories.map(({ name, value }) => {
        return (
            <Tab
                key={value}
                value={value}
                active={current === value}
                onClick={setCurrent}
            >{name}</Tab>
        );
    });

    // Список ингредиентов сгруппированных по категориям
    const ingredientList = categories.map(({ name, value }) => {
        const list = ingredients
            .filter(({ type }) => type === value)
            .map((item) => <BurgerIngredient key={item._id} ingredient={item} />);

        return (
            <div key={value} className={styles.category}>
                <h2 className="text text_type_main-medium mb-6">
                    {name}
                </h2>
                <div className={`${styles.list} ml-4 mr-4`}>
                    {list}
                </div>
            </div>
        );
    });

    return (
        <section className={`${styles.ingredients} pt-10 pb-10`}>
            <h1 className="text text_type_main-large mb-5">
                Соберите бургер
            </h1>

            <div className={`${styles.tabs} mb-10`}>
                {tabList}
            </div>

            <div className={styles.pane}>
                <div className={styles.pane_outer}>
                    <div className={`${styles.pane_inner} custom-scroll`}>
                        {ingredientList}
                    </div>
                </div>
            </div>
        </section>
    );
};

BurgerIngredients.propTypes = {
    categories: PropTypes.arrayOf(categoryPropType.isRequired).isRequired,
    ingredients: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired
};

export default BurgerIngredients;