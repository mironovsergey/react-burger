import type { FC } from 'react';

import { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { useSelector } from '../../services/hooks';

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './order-list-item.module.css';

import IngredientImage from '../ingredient-image/ingredient-image';
import OrderDatetime from '../order-datetime/order-datetime';

import type { TOrder } from '../../utils/types';

import { formatNumber } from '../../utils/helpers';

type TOrderListItem = {
    order: TOrder
};

const OrderListItem: FC<TOrderListItem> = ({ order }) => {
    const location = useLocation();
    const maxIndex = 6;

    const { ingredients } = useSelector(({ burgerIngredients }) => burgerIngredients);

    const orderIngredients = useMemo(
        () => order.ingredients
            .map((id) => ingredients.find((ingredient) => ingredient._id === id)),
        [order, ingredients]
    );

    const totalPrice = useMemo(
        () => orderIngredients.reduce((acc, curr) => acc + (curr?.price || 0), 0),
        [orderIngredients]
    );

    return (
        <div className={`${styles.component} p-6 mr-4`}>
            <div className={styles.head}>
                <div className={`${styles.number} text text_type_digits-default`}>
                    {order.number}
                </div>
                <div className={`${styles.datetime} text text_type_main-default text_color_inactive`}>
                    <OrderDatetime date={order.createdAt} />
                </div>
            </div>
            <div className={styles.body}>
                <div className={`${styles.name} text text_type_main-medium`}>
                    <Link
                        to={{
                            pathname: `${location.pathname}/${order._id}`,
                            state: { background: location },
                        }}
                        className={styles.link}
                    >
                        {order.name}
                    </Link>
                </div>
            </div>
            <div className={styles.foot}>
                <div className={styles.ingredients}>
                    {
                        orderIngredients.slice(0, maxIndex).map((orderIngredient, index) => (
                            orderIngredient && (
                                <IngredientImage
                                    key={index}
                                    src={orderIngredient.image}
                                    alt={orderIngredient.name}
                                    {...(order.ingredients.length > maxIndex && index === maxIndex - 1
                                        ? { count: order.ingredients.length - maxIndex + 1 } : {})}
                                />
                            )
                        ))
                    }
                </div>
                <div className={styles.price}>
                    <span className="text text_type_digits-default mr-2">
                        {formatNumber(totalPrice)}
                    </span>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </div>
    );
};

export default OrderListItem;