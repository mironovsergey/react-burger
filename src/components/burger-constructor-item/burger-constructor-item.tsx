import type { FC } from 'react';
import type { Identifier, XYCoord } from 'dnd-core';

import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import { useDispatch } from '../../services/hooks';

import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './burger-constructor-item.module.css';

import { removeIngredient, moveIngredient } from '../../services/actions/burger-constructor';

import type { TConstructorIngredient } from '../../utils/types';

type TBurgerConstructorItem = {
    ingredient: TConstructorIngredient,
    index: number
};

type TDragItem = {
    index: number;
    id: string;
    type: string;
};

const BurgerConstructorItem: FC<TBurgerConstructorItem> = ({ ingredient, index }) => {
    const dispatch = useDispatch();

    const ref = useRef<HTMLDivElement>(null);

    const [{ isDragging }, drag] = useDrag({
        type: 'constructorItem',
        item: () => {
            return { index }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        })
    });

    const [{ handlerId }, drop] = useDrop<
        TDragItem,
        void,
        { handlerId: Identifier | null }
    >({
        accept: 'constructorItem',
        collect: (monitor) => ({
            handlerId: monitor.getHandlerId()
        }),
        hover(item: TDragItem, monitor) {
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
            const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

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

    drag(drop(ref));

    return (
        <div className={`${styles.component} pl-8 ml-4 mr-4`} style={{ opacity }}
            ref={ref} data-handler-id={handlerId}>
            <DragIcon type="primary" />
            <ConstructorElement
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image}
                handleClose={() => dispatch(removeIngredient(ingredient.key))}
            />
        </div>
    );
};

export default BurgerConstructorItem;