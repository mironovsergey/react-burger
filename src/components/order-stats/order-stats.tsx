import type { FC } from 'react';

import { useMemo } from 'react';

import { useSelector } from '../../services/hooks';

import styles from './order-stats.module.css';

import { StatusCodes } from '../../utils/types';

import { formatNumber } from '../../utils/helpers';

const OrderStatistics: FC = () => {
    const maxNumbers = 30;

    const { message } = useSelector(({ ws }) => ws);

    const doneOrders = useMemo(
        () => message?.orders
            .filter(({ status }) => status === StatusCodes.done)
            .map(({ number }) => number)
            .slice(0, maxNumbers)
            || [],
        [message]
    );

    const pendingOrders = useMemo(
        () => message?.orders
            .filter(({ status }) => status === StatusCodes.pending)
            .map(({ number }) => number)
            .slice(0, maxNumbers)
            || [],
        [message]
    );

    return (
        <section className={`${styles.component}`}>
            <div className={`${styles.order_numbers}`}>
                <div className="text text_type_main-medium mb-6">
                    Готовы:
                </div>
                <div className={`${styles.order_numbers_list} cols_${Math.ceil(doneOrders.length / 10)}`}>
                    {
                        doneOrders.map((number) => (
                            <div key={number} className="text text_type_digits-default text_color_success">
                                {number}
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className={`${styles.order_numbers}`}>
                <div className="text text_type_main-medium mb-6">
                    В работе:
                </div>
                <div className={`${styles.order_numbers_list} cols_${Math.ceil(pendingOrders.length / 10)}`}>
                    {
                        pendingOrders.map((number) => (
                            <div key={number} className="text text_type_digits-default">
                                {number}
                            </div>
                        ))
                    }
                </div>
            </div>
            {
                message?.total && (
                    <div className={`${styles.order_total}`}>
                        <div className={`${styles.order_total_title} text text_type_main-medium`}>
                            Выполнено за все время:
                        </div>
                        <div className={`${styles.order_total_value} text text_type_digits-large`}>
                            {formatNumber(message.total)}
                        </div>
                    </div>
                )
            }
            {
                message?.totalToday && (
                    <div className={`${styles.order_total}`}>
                        <div className={`${styles.order_total_title} text text_type_main-medium`}>
                            Выполнено за сегодня:
                        </div>
                        <div className={`${styles.order_total_value} text text_type_digits-large`}>
                            {formatNumber(message.totalToday)}
                        </div>
                    </div>
                )
            }
        </section>
    );
};

export default OrderStatistics;