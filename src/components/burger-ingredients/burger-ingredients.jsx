import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import {
    categoryPropType,
    ingredientPropType
} from '../../utils/prop-types';

import {
    Tab
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './burger-ingredients.module.css';

import BurgerIngredient from '../burger-ingredient/burger-ingredient';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';

const BurgerIngredients = ({ categories, ingredients }) => {
    const [currentTab, setCurrentTab] = useState(categories[0].value);
    const [currentIngredient, setCurrentIngredient] = useState(null);
    const [isModalDetailsOpen, setIsModalDetailsOpen] = useState(false);

    // Ref-объект блока ингредиентов
    const pane = useRef(null);

    useEffect(() => {
        const category = categories.find(({ value }) => value === currentTab);

        if (pane.current instanceof HTMLElement) {
            const title = [...pane.current.getElementsByTagName('h2')]
                .find(({ textContent }) => textContent === category.name);

            if (title instanceof HTMLElement) {
                title.scrollIntoView({ block: 'start', behavior: 'smooth' });
            }
        }
    }, [categories, currentTab]);

    // Список табов категорий
    const tabList = categories.map(({ name, value }) => {
        return (
            <Tab
                key={value}
                value={value}
                active={currentTab === value}
                onClick={setCurrentTab}
            >
                {name}
            </Tab>
        );
    });

    // Список ингредиентов сгруппированных по категориям
    const ingredientList = categories.map(({ name, value }) => {
        const list = ingredients
            .filter(({ type }) => (
                type === value
            ))
            .map((item) => (
                <BurgerIngredient
                    key={item._id}
                    ingredient={item}
                    onClick={() => {
                        setCurrentIngredient(item);
                        setIsModalDetailsOpen(true);
                    }}
                />
            ));

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
        <section className={`${styles.component} pt-10 pb-10`}>
            <h1 className="text text_type_main-large mb-5">
                Соберите бургер
            </h1>
            <div className={`${styles.tabs} mb-10`}>
                {tabList}
            </div>
            <div className={styles.pane} ref={pane}>
                <div className={styles.pane_outer}>
                    <div className={`${styles.pane_inner} custom-scroll`}>
                        {ingredientList}
                    </div>
                </div>
            </div>
            {
                isModalDetailsOpen && (
                    <Modal
                        title="Детали ингредиента"
                        onClose={() => {
                            setCurrentIngredient(null);
                            setIsModalDetailsOpen(false);
                        }}
                    >
                        <IngredientDetails ingredient={currentIngredient} />
                    </Modal>
                )
            }
        </section>
    );
};

BurgerIngredients.propTypes = {
    categories: PropTypes.arrayOf(categoryPropType.isRequired).isRequired,
    ingredients: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired
};

export default BurgerIngredients;