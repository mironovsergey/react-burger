import type { FC } from 'react';

import { useEffect } from 'react';
import { useDispatch } from '../../services/hooks';

import styles from './feed.module.css';

import { wsConnectionStart, wsConnectionStop } from '../../services/actions/ws';
import { wsUrl } from '../../utils/constants';

import OrderList from '../../components/order-list/order-list';
import OrderStats from '../../components/order-stats/order-stats';

const Feed: FC = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(wsConnectionStart(`${wsUrl}/orders/all`));

        return () => {
            dispatch(wsConnectionStop());
        }
    }, [dispatch]);

    return (
        <div className={styles.container}>
            <div className={`pt-10 pb-10`}>
                <OrderList title="Лента заказов" />
            </div>
            <div className={`pt-25 pb-10`}>
                <OrderStats />
            </div>
        </div>
    );
};

export default Feed;