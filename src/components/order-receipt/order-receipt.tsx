import type { FC } from 'react';

import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { useSelector } from '../../services/hooks';

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './order-receipt.module.css';

import OrderReceiptItem from '../order-receipt-item/order-receipt-item';
import OrderDatetime from '../order-datetime/order-datetime';

import type { TParams } from '../../utils/types';
import { StatusCodes } from '../../utils/types';

import { formatNumber } from '../../utils/helpers';

const OrderReceipt: FC = () => {
    const { id } = useParams<TParams>();
    const { message } = useSelector(({ ws }) => ws);
    const { ingredients } = useSelector(({ burgerIngredients }) => burgerIngredients);

    const currentOrder = useMemo(
        () => message?.orders.find(({ _id }) => _id === id) || null,
        [id, message?.orders]
    );

    const currentOrderIngredients = useMemo(
        () => Array.from(new Set(currentOrder?.ingredients)).map((item) => ({
            ingredient: ingredients.find(({ _id }) => _id === item),
            count: currentOrder?.ingredients.filter((id) => id === item).length
        })),
        [currentOrder?.ingredients, ingredients]
    );

    const totalPrice = useMemo(
        () => currentOrderIngredients.reduce((acc, { ingredient, count }) => (
            acc + (ingredient?.price || 0) * (count || 0)
        ), 0),
        [currentOrderIngredients]
    );

    return currentOrder
        ? (
            <div className={styles.component}>
                <div className={`${styles.head} mb-15`}>
                    <div className={`${styles.number} text text_type_digits-default mb-10`}>
                        {`#${currentOrder.number}`}
                    </div>
                    <div className={`${styles.name} text text_type_main-medium mb-3`}>
                        {currentOrder.name}
                    </div>
                    {
                        currentOrder.status === StatusCodes.done && (
                            <div className={`${styles.status} text text_type_main-default text_color_success`}>
                                Выполнен
                            </div>
                        )
                    }
                </div>
                <div className={`${styles.body} mb-10`}>
                    <div className="text text_type_main-medium mb-6">
                        Состав:
                    </div>
                    <div className={styles.panel}>
                        <div className={styles.panel_outer}>
                            <div className={`${styles.panel_inner} custom-scroll`}>
                                {
                                    currentOrderIngredients.map(({ ingredient, count }) => (
                                        ingredient && count && (
                                            <OrderReceiptItem key={ingredient?._id} ingredient={ingredient} count={count} />
                                        )
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`${styles.foot}`}>
                    <div className={`${styles.datetime} text text_type_main-default text_color_inactive`}>
                        <OrderDatetime date={currentOrder.createdAt} />
                    </div>
                    <div className={styles.price}>
                        <span className="text text_type_digits-default mr-2">
                            {formatNumber(totalPrice)}
                        </span>
                        <CurrencyIcon type="primary" />
                    </div>
                </div>
            </div>
        )
        : null;
};

export default OrderReceipt;