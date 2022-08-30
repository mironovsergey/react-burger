import type { FC } from 'react';

import { useSelector } from '../../services/hooks';

import styles from './order-list.module.css';

import OrderListItem from '../order-list-item/order-list-item';

type TOrderList = {
    title?: string;
};

const OrderList: FC<TOrderList> = ({ title }) => {
    const { message } = useSelector(({ ws }) => ws);

    return (
        <section className={styles.component}>
            {
                title && (
                    <h1 className="text text_type_main-large mb-5">
                        {title}
                    </h1>
                )
            }
            {
                message?.orders
                    ? (
                        <div className={styles.panel}>
                            <div className={styles.panel_outer}>
                                <div className={`${styles.panel_inner} custom-scroll`}>
                                    {
                                        message.orders.map((order) => (
                                            <OrderListItem key={order._id} order={order} />
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    )
                    : null
            }
        </section>
    );
};

export default OrderList;