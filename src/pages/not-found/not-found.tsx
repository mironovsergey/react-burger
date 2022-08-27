import type { FC } from 'react';

import styles from './not-found.module.css';

const NotFound: FC = () => {
    return (
        <div className={styles.container}>
            <div className="text text_type_digits-large">
                404
            </div>
        </div>
    );
};

export default NotFound;