import { useState } from 'react';
import PropTypes from 'prop-types';

import { ingredientPropType } from '../../utils/prop-types';

import {
    ConstructorElement,
    DragIcon,
    CurrencyIcon,
    Button
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './burger-constructor.module.css';

import OrderDetails from '../order-details/order-details';
import Modal from '../modal/modal';

const BurgerConstructor = ({ ingredients }) => {
    const [isModalDetailsOpen, setIsModalDetailsOpen] = useState(false);

    // Первая попавшаяся булка
    const { name: bunName, price: bunPrice, image: bunImage } = ingredients
        .filter(({ type }) => type === 'bun')[0];

    // Список ингредиентов без булок
    const ingredientList = ingredients
        .filter(({ type }) => type !== 'bun')
        .map(({ _id, name, price, image }) => {
            return (
                <div key={_id} className={`${styles.item} pl-8 ml-4 mr-4`}>
                    <DragIcon type="primary" />
                    <ConstructorElement
                        text={name}
                        price={price}
                        thumbnail={image}
                    />
                </div>
            );
        });

    return (
        <section className={`${styles.component} pt-25 pb-25`}>
            <div className={styles.pane}>
                <div className={styles.pane_outer}>
                    <div className={`${styles.item} pl-8 ml-4 mr-4`}>
                        <ConstructorElement
                            type="top"
                            isLocked={true}
                            text={bunName}
                            price={bunPrice}
                            thumbnail={bunImage}
                        />
                    </div>
                    <div className={`${styles.pane_inner} custom-scroll`}>
                        {ingredientList}
                    </div>
                    <div className={`${styles.item} pl-8 ml-4 mr-4`}>
                        <ConstructorElement
                            type="bottom"
                            isLocked={true}
                            text={bunName}
                            price={bunPrice}
                            thumbnail={bunImage}
                        />
                    </div>
                </div>
            </div>

            <div className={`${styles.total} mt-10 ml-4 mr-4`}>
                <div className={styles.total_price}>
                    <span className={`${styles.total_value} text_type_main-large`}>
                        600
                    </span>
                    <CurrencyIcon type="primary" />
                </div>
                <Button
                    type="primary"
                    size="large"
                    onClick={() => setIsModalDetailsOpen(true)}
                >
                    <span>Оформить заказ</span>
                </Button>
                {
                    isModalDetailsOpen && (
                        <Modal onClose={() => setIsModalDetailsOpen(false)}>
                            <OrderDetails />
                        </Modal>
                    )
                }
            </div>
        </section>
    );
};

BurgerConstructor.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired
};

export default BurgerConstructor;