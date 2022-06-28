import { Link, useLocation } from 'react-router-dom';
import { useDrag } from 'react-dnd';
import PropTypes from 'prop-types';

import { ingredientPropType } from '../../utils/prop-types';

import {
    Counter,
    CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './burger-ingredients-item.module.css';

const BurgerIngredientsItem = ({ ingredient, count }) => {
    const location = useLocation();

    const [{ opacity }, dragRef] = useDrag({
        type: 'ingredientsItem',
        item: ingredient,
        collect: (monitor) => ({
            opacity: monitor.isDragging() ? 0.5 : 1
        })
    });

    return (
        <div ref={dragRef} className={styles.component} style={{ opacity }}>
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
                <Link
                    to={{
                        pathname: `/ingredients/${ingredient._id}`,
                        state: { background: location },
                    }}
                    className={styles.link}
                >
                    {ingredient.name}
                </Link>
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