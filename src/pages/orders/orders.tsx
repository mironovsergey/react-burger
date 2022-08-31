import type { FC } from 'react';

import { useEffect } from 'react';
import { useDispatch } from '../../services/hooks';
import { getAccessToken } from '../../utils/helpers';

import styles from './orders.module.css';

import { wsConnectionStart, wsConnectionStop } from '../../services/actions/ws';
import { wsUrl } from '../../utils/constants';

import ProfileNav from '../../components/profile-nav/profile-nav';
import OrderList from '../../components/order-list/order-list';

const Orders: FC = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(wsConnectionStart(`${wsUrl}/orders?token=${getAccessToken()}`));

        return () => {
            dispatch(wsConnectionStop());
        }
    }, [dispatch]);

    return (
        <div className={styles.container}>
            <div className={`pt-30 pb-10`}>
                <ProfileNav />
            </div>
            <div className={`pt-10 pb-10`}>
                <OrderList />
            </div>
        </div>
    );
};

export default Orders;