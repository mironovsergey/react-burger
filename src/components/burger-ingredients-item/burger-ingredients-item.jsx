import { useDispatch } from 'react-redux';
import { useDrag } from 'react-dnd';
import PropTypes from 'prop-types';

import { ingredientPropType } from '../../utils/prop-types';

import {
    Counter,
    CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './burger-ingredients-item.module.css';

import { setCurrentIngredient } from '../../services/actions/ingredient-details';

const BurgerIngredientsItem = ({ ingredient, count }) => {
    const dispatch = useDispatch();

    const [{ opacity }, dragRef] = useDrag({
        type: 'ingredientsItem',
        item: ingredient,
        collect: (monitor) => ({
            opacity: monitor.isDragging() ? 0.5 : 1
        })
    });

    return (
        <div ref={dragRef} className={styles.component} style={{ opacity }}
            onClick={() => dispatch(setCurrentIngredient(ingredient))}>
            <div className={`${styles.image} ml-4 mr-4 mb-1`}>
                <div className={styles.image_wrap}>
                    <img src={ingredient.image} alt={ingredient.name} />
                </div>
            </div>
            <div className={`${styles.price} mb-1`}>
                <span className="text text_type_digits-default mr-2">
                    {ingredient.price}
                </span>
                <CurrencyIcon type="primary" />
            </div>
            <div className={`${styles.name} text_type_main-default`}>
                {ingredient.name}
            </div>
            {
                !!count && (
                    <Counter count={count} size="default" />
                )
            }
        </div>
    );
};

BurgerIngredientsItem.propTypes = {
    ingredient: ingredientPropType.isRequired,
    count: PropTypes.number
};

export default BurgerIngredientsItem;