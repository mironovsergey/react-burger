import type { FC } from 'react';

import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { useSelector } from '../../services/hooks';

import styles from './ingredient-details.module.css';

import type { TIngredient } from '../../utils/types';

type TParams = {
    id: string;
};

const IngredientDetails: FC = () => {
    const { id } = useParams<TParams>();
    const { ingredients } = useSelector(({ burgerIngredients }) => burgerIngredients);

    const currentIngredient = useMemo(() => (
        ingredients.find((item: TIngredient) => item._id === id)
    ), [id, ingredients]);

    if (!currentIngredient) {
        return null;
    }

    return (
        <div className={`${styles.component} mb-5`}>
            <div className={`${styles.image} mb-4`}>
                <img src={currentIngredient.image_large} alt={currentIngredient.name} />
            </div>
            <div className={`${styles.name} text text_type_main-medium mb-8`}>
                {currentIngredient.name}
            </div>
            <div className={styles.props}>
                <div className={styles.props_item}>
                    <div className={`${styles.props_title} text text_type_main-default mb-2`}>
                        Калории,ккал
                    </div>
                    <div className={`${styles.props_value} text text_type_digits-default`}>
                        {currentIngredient.calories}
                    </div>
                </div>
                <div className={styles.props_item}>
                    <div className={`${styles.props_title} text text_type_main-default mb-2`}>
                        Белки,г
                    </div>
                    <div className={`${styles.props_value} text text_type_digits-default`}>
                        {currentIngredient.proteins}
                    </div>
                </div>
                <div className={styles.props_item}>
                    <div className={`${styles.props_title} text text_type_main-default mb-2`}>
                        Жиры,г
                    </div>
                    <div className={`${styles.props_value} text text_type_digits-default`}>
                        {currentIngredient.fat}
                    </div>
                </div>
                <div className={styles.props_item}>
                    <div className={`${styles.props_title} text text_type_main-default mb-2`}>
                        Углеводы,г
                    </div>
                    <div className={`${styles.props_value} text text_type_digits-default`}>
                        {currentIngredient.carbohydrates}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IngredientDetails;