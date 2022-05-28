import styles from './order-details.module.css';

import image from '../../images/done.png';

const OrderDetails = () => {
    return (
        <div className={`${styles.component} mt-4 mb-20`}>
            <div className={`${styles.number} text text_type_digits-large mb-8`}>
                034536
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
        </div>
    );
};

export default OrderDetails;