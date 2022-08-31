import type { FC } from 'react';

import styles from './ingredient-image.module.css';

type TIngredientImage = {
    src: string;
    alt: string;
    count?: number;
};

const IngredientImage: FC<TIngredientImage> = ({ src, alt, count }) => {
    return (
        <div className={`${styles.component}`}>
            <div className={styles.wrap}>
                <img src={src} alt={alt} />
                {
                    count && (
                        <div className={`${styles.count} text text_type_main-default`}>
                            {`+${count}`}
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default IngredientImage;