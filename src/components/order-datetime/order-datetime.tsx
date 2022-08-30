import type { FC } from 'react';

import styles from './order-datetime.module.css';

import { declension, diffDays } from '../../utils/helpers';

type TOrderDatetime = {
    date: string | number | Date;
};

const OrderDatetime: FC<TOrderDatetime> = ({ date }) => {
    const days = diffDays(new Date(date), new Date());

    const createdDay = days === 0 ? 'Сегодня' : days === 1 ? 'Вчера'
        : `${days} ${declension(days, 'день,дня,дней')} назад`;

    const createdTime = new Date(date).toLocaleTimeString('ru-RU', {
        hour: 'numeric',
        minute: 'numeric',
        timeZoneName: 'short'
    });

    return (
        <div className={`${styles.component}`}>
            {`${createdDay} ${createdTime}`}
        </div>
    );
};

export default OrderDatetime;