import type { FC, UIEvent } from 'react';

import { useCallback, useMemo, useRef } from 'react';

import { useSelector, useDispatch } from '../../services/hooks';

import Tab from '../ui/tab';

import styles from './burger-ingredients.module.css';

import { categories } from '../../utils/constants';
import { setCurrentCategory } from '../../services/actions/burger-ingredients';

import BurgerIngredientsItem from '../burger-ingredients-item/burger-ingredients-item';

type TIngredientCount = {
    [key: string]: number;
};

const BurgerIngredients: FC = () => {
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

    // Ref-объект блока ингредиентов
    const panelRef = useRef<HTMLDivElement>(null);

    // Смена активного таба при клике
    const handleTabClick = useCallback((value: string) => {
        dispatch(setCurrentCategory(value));

        const category = categories.find((item) => item.value === value);

        if (panelRef.current instanceof HTMLElement && category) {
            const title = Array.from(panelRef.current.getElementsByTagName('h2'))
                .find(({ textContent }) => textContent === category.name);

            if (title instanceof HTMLElement) {
                title.scrollIntoView({ block: 'start', behavior: 'smooth' });
            }
        }
    }, [dispatch]);

    // Смена активного таба при скролле
    const handleScroll = useCallback((event: UIEvent<HTMLDivElement>) => {
        const scrollTop = event.currentTarget.scrollTop;
        const titles = Array.from(event.currentTarget.getElementsByTagName('h2'))
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
        const result: TIngredientCount = {};

        if (constructorBun) {
            result[constructorBun._id] = 2;
        }

        constructorIngredients.forEach(({ _id }) => {
            result[_id] = !result[_id] ? 1 : result[_id] + 1;
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
        </section>
    );
};

export default BurgerIngredients;