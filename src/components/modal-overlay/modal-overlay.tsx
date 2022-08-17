import type { FC } from 'react';

import styles from './modal-overlay.module.css';

type TModalOverlay = {
    onClose: () => void;
};

const ModalOverlay: FC<TModalOverlay> = ({ onClose }) => {
    return <div className={styles.component} onClick={onClose} />;
};

export default ModalOverlay;