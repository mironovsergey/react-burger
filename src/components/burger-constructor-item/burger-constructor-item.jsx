import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';
import PropTypes from 'prop-types';

import { ingredientPropType } from '../../utils/prop-types';

import {
    ConstructorElement,
    DragIcon
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './burger-constructor-item.module.css';

import { removeIngredient, moveIngredient } from '../../services/actions/burger-constructor';

const BurgerConstructorItem = ({ ingredient, index }) => {
    const dispatch = useDispatch();

    const ref = useRef(null);

    const [{ isDragging }, drag] = useDrag({
        type: 'constructorItem',
        item: () => {
            return { index }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        })
    });

    const [{ handlerId }, drop] = useDrop({
        accept: 'constructorItem',
        collect: (monitor) => ({
            handlerId: monitor.getHandlerId()
        }),
        hover(item, monitor) {
            if (!ref.current) {
                return;
            }

            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) {
                return;
            }

            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }

            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }

            dispatch(moveIngredient({ dragIndex, hoverIndex }));

            item.index = hoverIndex;
        }
    });

    const opacity = isDragging ? 0 : 1;

    return (
        <div className={`${styles.component} pl-8 ml-4 mr-4`} style={{ opacity }}
            ref={drag(drop(ref))} data-handler-id={handlerId}>
            <DragIcon type="primary" />
            <ConstructorElement
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image}
                handleClose={() => dispatch(removeIngredient(ingredient.id))}
            />
        </div>
    );
};

BurgerConstructorItem.propTypes = {
    ingredient: ingredientPropType.isRequired,
    index: PropTypes.number.isRequired
};

export default BurgerConstructorItem;