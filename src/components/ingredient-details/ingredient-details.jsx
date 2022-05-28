import { ingredientPropType } from '../../utils/prop-types';

import styles from './ingredient-details.module.css';

const IngredientDetails = ({ ingredient }) => {
    const {
        name,
        image_large,
        calories,
        proteins,
        fat,
        carbohydrates
    } = ingredient;

    return (
        <div className={`${styles.component} mb-5`}>
            <div className={`${styles.image} mb-4`}>
                <img src={image_large} alt={name} />
            </div>
            <div className={`${styles.name} text text_type_main-medium mb-8`}>
                {name}
            </div>
            <div className={styles.props}>
                <div className={styles.props_item}>
                    <div className={`${styles.props_title} text text_type_main-default mb-2`}>
                        Калории,ккал
                    </div>
                    <div className={`${styles.props_value} text text_type_digits-default`}>
                        {calories}
                    </div>
                </div>
                <div className={styles.props_item}>
                    <div className={`${styles.props_title} text text_type_main-default mb-2`}>
                        Белки,г
                    </div>
                    <div className={`${styles.props_value} text text_type_digits-default`}>
                        {proteins}
                    </div>
                </div>
                <div className={styles.props_item}>
                    <div className={`${styles.props_title} text text_type_main-default mb-2`}>
                        Жиры,г
                    </div>
                    <div className={`${styles.props_value} text text_type_digits-default`}>
                        {fat}
                    </div>
                </div>
                <div className={styles.props_item}>
                    <div className={`${styles.props_title} text text_type_main-default mb-2`}>
                        Углеводы,г
                    </div>
                    <div className={`${styles.props_value} text text_type_digits-default`}>
                        {carbohydrates}
                    </div>
                </div>
            </div>
        </div>
    );
};

IngredientDetails.propTypes = {
    ingredient: ingredientPropType.isRequired
};

export default IngredientDetails;