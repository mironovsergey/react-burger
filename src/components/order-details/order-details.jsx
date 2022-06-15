import { useSelector } from 'react-redux';

import styles from './order-details.module.css';

import image from '../../images/done.png';

const OrderDetails = () => {
    const {
        order,
        orderRequest,
        orderError
    } = useSelector(({ orderDetails }) => orderDetails);

    return (
        <div className={`${styles.component} mt-4 mb-20`}>
            {
                orderRequest && (
                    <div className={styles.notice}>
                        <div className="text text_type_main-large">
                            Загрузка....
                        </div>
                    </div>
                )
            }
            {
                orderError && (
                    <div className={styles.notice}>
                        <div className="text text_type_main-large">
                            Произошла ошибка
                        </div>
                    </div>
                )
            }
            {
                !(orderRequest || orderError) && (
                    <>
                        <div className={`${styles.number} text text_type_digits-large mb-8`}>
                            {order?.number}
                        </div>
                        <div className={`${styles.caption} text text_type_main-medium mb-15`}>
                            идентификатор заказа
                        </div>
                        <div className={`${styles.image} mt-15 mb-15`}>
                            <img src={image} alt="OK" />
                        </div>
                        <div className={`${styles.text} text text_type_main-default mb-2`}>
                            Ваш заказ начали готовить
                        </div>
                        <div className={`${styles.text_muted} text text_type_main-default`}>
                            Дождитесь готовности на орбитальной станции
                        </div>
                    </>
                )
            }
        </div>
    );
};

export default OrderDetails;