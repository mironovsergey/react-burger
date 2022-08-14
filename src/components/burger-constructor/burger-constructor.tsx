import { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useDrop } from 'react-dnd';

import {
    ConstructorElement,
    CurrencyIcon,
    Button
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './burger-constructor.module.css';

import { addIngredient, resetConstructor } from '../../services/actions/burger-constructor';
import { postOrder, toggleOrderModal, resetOrder } from '../../services/actions/order-details';

import BurgerConstructorItem from '../burger-constructor-item/burger-constructor-item';
import OrderDetails from '../order-details/order-details';
import Modal from '../modal/modal';

import { TConstructorIngredient } from '../../utils/types';

const BurgerConstructor = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [{ isHover }, dropRef] = useDrop({
        accept: 'ingredientsItem',
        collect: (monitor) => ({
            isHover: monitor.isOver()
        }),
        drop(ingredient) {
            dispatch(addIngredient(ingredient));
        },
    });

    const { user } = useSelector(({ user }: any) => user);

    const { bun, ingredients }: {
        bun: TConstructorIngredient,
        ingredients: TConstructorIngredient[]
    } = useSelector(({ burgerConstructor }: any) => burgerConstructor);

    const { isOrderModalShown } = useSelector(({ orderDetails }: any) => orderDetails);

    const handleOrderModalShow = () => {
        if (user) {
            dispatch(toggleOrderModal());
            // @ts-ignore
            dispatch(postOrder(JSON.stringify({
                ingredients: [...ingredients.map(({ _id }) => _id), bun._id]
            }))).then(() => {
                dispatch(resetConstructor());
            });
        } else {
            history.push('/login');
        }
    };

    const handleOrderModalHide = () => {
        dispatch(toggleOrderModal());
        dispatch(resetOrder());
    };

    // Итоговая цена
    const total = useMemo(() => (
        ingredients.reduce((acc, { price }) => acc + price, 0) + (bun ? bun.price * 2 : 0)
    ), [bun, ingredients]);

    return (
        <section className={`${styles.component} pt-25 pb-25`}>
            <div ref={dropRef} className={styles.panel}>
                <div className={styles.panel_outer}>
                    {
                        bun ?
                            <div className={`${styles.item} pl-8 ml-4 mr-4`}>
                                <ConstructorElement
                                    type="top"
                                    isLocked={true}
                                    text={`${bun.name} (верх)`}
                                    price={bun.price}
                                    thumbnail={bun.image}
                                />
                            </div>
                            :
                            <div className={
                                `${styles.dummy} ${styles.dummy_pos_top} ${isHover && styles.dummy_hover}`
                            } />
                    }
                    {
                        ingredients.length !== 0 ?
                            <div className={`${styles.panel_inner} custom-scroll`}>
                                {
                                    ingredients.map((ingredient, index) => (
                                        <BurgerConstructorItem
                                            key={ingredient.key}
                                            ingredient={ingredient}
                                            index={index}
                                        />
                                    ))
                                }
                            </div>
                            :
                            <div className={
                                `${styles.dummy} ${isHover && styles.dummy_hover}`
                            } />
                    }
                    {
                        bun ?
                            <div className={`${styles.item} pl-8 ml-4 mr-4`}>
                                <ConstructorElement
                                    type="bottom"
                                    isLocked={true}
                                    text={`${bun.name} (низ)`}
                                    price={bun.price}
                                    thumbnail={bun.image}
                                />
                            </div>
                            :
                            <div className={
                                `${styles.dummy} ${styles.dummy_pos_bottom} ${isHover && styles.dummy_hover}`
                            } />
                    }
                </div>
            </div>

            <div className={`${styles.total} mt-10 ml-4 mr-4`}>
                <div className={styles.total_price}>
                    <span className={`${styles.total_value} text_type_main-large`}>
                        {total}
                    </span>
                    <CurrencyIcon type="primary" />
                </div>
                {/* @ts-ignore */}
                <Button type="primary" size="large"
                    disabled={!(bun && ingredients.length)}
                    onClick={handleOrderModalShow}>
                    Оформить заказ
                </Button>
            </div>

            {
                isOrderModalShown && (
                    <Modal onClose={handleOrderModalHide}>
                        <OrderDetails />
                    </Modal>
                )
            }
        </section>
    );
};

export default BurgerConstructor;