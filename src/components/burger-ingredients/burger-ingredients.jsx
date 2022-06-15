import { useEffect, useCallback, useMemo, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './burger-ingredients.module.css';

import { categories } from '../../utils/constants';
import { getIngredients } from '../../services/actions/burger-ingredients';
import { setCurrentCategory } from '../../services/actions/burger-ingredients';
import { setCurrentIngredient } from '../../services/actions/ingredient-details';

import BurgerIngredientsItem from '../burger-ingredients-item/burger-ingredients-item';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';

const BurgerIngredients = () => {
    const dispatch = useDispatch();

    const {
        ingredients,
        ingredientsRequest,
        ingredientsError,
        currentCategory
    } = useSelector(({ burgerIngredients }) => burgerIngredients);

    const {
        bun: constructorBun,
        ingredients: constructorIngredients
    } = useSelector(({ burgerConstructor }) => burgerConstructor);

    const {
        currentIngredient
    } = useSelector(({ ingredientDetails }) => ingredientDetails);

    useEffect(() => {
        dispatch(getIngredients());
    }, [dispatch]);

    // Ref-объект блока ингредиентов
    const panelRef = useRef(null);

    // Смена активного таба при клике
    const handleTabClick = useCallback((value) => {
        dispatch(setCurrentCategory(value));

        const category = categories.find((item) => item.value === value);

        if (panelRef.current instanceof HTMLElement) {
            const title = [...panelRef.current.getElementsByTagName('h2')]
                .find(({ textContent }) => textContent === category.name);

            if (title instanceof HTMLElement) {
                title.scrollIntoView({ block: 'start', behavior: 'smooth' });
            }
        }
    }, [dispatch]);

    // Смена активного таба при скролле
    const handleScroll = useCallback((event) => {
        const scrollTop = event.currentTarget.scrollTop;
        const titles = [...event.currentTarget.getElementsByTagName('h2')]
            .map(({ textContent, offsetTop }) => ({
                name: textContent, diff: Math.abs(offsetTop - scrollTop)
            }))
            .sort((a, b) => (a.diff - b.diff));

        const category = categories.find(({ name }) => name === titles[0]?.name);

        if (category && category.value !== currentCategory) {
            dispatch(setCurrentCategory(category.value));
        }
    }, [dispatch, currentCategory]);

    // Список табов категорий
    const tabList = categories.map(({ name, value }) => {
        return (
            <Tab
                key={value}
                value={value}
                active={currentCategory === value}
                onClick={handleTabClick}
            >
                {name}
            </Tab>
        );
    });

    // Количество добавленных в конструктор ингредиентов
    const ingredientCount = useMemo(() => {
        const result = {};

        if (constructorBun) {
            result[constructorBun._id] = 2;
        }

        constructorIngredients.forEach((ingredient) => {
            result[ingredient._id] = !result[ingredient._id]
                ? 1 : result[ingredient._id] + 1;
        });

        return result;
    }, [constructorBun, constructorIngredients]);

    // Список ингредиентов сгруппированных по категориям
    const ingredientList = categories.map(({ name, value }) => {
        const list = ingredients
            .filter(({ type }) => (
                type === value
            ))
            .map((ingredient) => (
                <BurgerIngredientsItem
                    key={ingredient._id}
                    ingredient={ingredient}
                    count={Number(ingredientCount[ingredient._id])}
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
            {
                ingredientsRequest && (
                    <div className={styles.notice}>
                        <div className="text text_type_main-large">
                            Загрузка....
                        </div>
                    </div>
                )
            }
            {
                ingredientsError && (
                    <div className={styles.notice}>
                        <div className="text text_type_main-large">
                            Произошла ошибка
                        </div>
                    </div>
                )
            }
            {
                !(ingredientsRequest || ingredientsError) && (
                    <div className={styles.panel}>
                        <div className={styles.panel_outer}>
                            <div ref={panelRef} onScroll={handleScroll}
                                className={`${styles.panel_inner} custom-scroll`}>
                                {ingredientList}
                            </div>
                        </div>
                    </div>
                )
            }
            {
                currentIngredient && (
                    <Modal
                        title="Детали ингредиента"
                        onClose={() => dispatch(setCurrentIngredient(null))}
                    >
                        <IngredientDetails />
                    </Modal>
                )
            }
        </section>
    );
};

export default BurgerIngredients;