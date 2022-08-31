import type { FC } from 'react';

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './order-receipt-item.module.css';

import IngredientImage from '../ingredient-image/ingredient-image';

import type { TIngredient } from '../../utils/types';

type TOrderReceiptItem = {
    ingredient: TIngredient,
    count: number
}

const OrderReceiptItem: FC<TOrderReceiptItem> = ({ ingredient, count }) => {
    return (
        <div className={`${styles.component} mr-6`}>
            <div className={styles.image}>
                <IngredientImage
                    src={ingredient.image}
                    alt={ingredient.name}
                />
            </div>
            <div className={`${styles.name} text text_type_main-default`}>
                {ingredient.name}
            </div>
            <div className={styles.price}>
                <span className="text text_type_digits-default mr-2">
                    {`${count} x ${ingredient.price}`}
                </span>
                <CurrencyIcon type="primary" />
            </div>
        </div>
    );
};

export default OrderReceiptItem;