import type { FC } from 'react';

import { useEffect } from 'react';
import { useDispatch } from '../../services/hooks';

import styles from './feed-order.module.css';

import { wsConnectionStart, wsConnectionStop } from '../../services/actions/ws';
import { wsUrl } from '../../utils/constants';

import OrderReceipt from '../../components/order-receipt/order-receipt';

const Order: FC = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(wsConnectionStart(`${wsUrl}/orders/all`));

        return () => {
            dispatch(wsConnectionStop());
        }
    }, [dispatch]);

    return (
        <div className={styles.container}>
            <OrderReceipt />
        </div>
    );
};

export default Order;