import type { FC, ReactNode } from 'react';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './modal.module.css';

import ModalOverlay from '../modal-overlay/modal-overlay';

type TModal = {
    title?: string;
    children: ReactNode;
    onClose: () => void;
};

const modalRoot = document.getElementById('modal-root') as HTMLDivElement;

const Modal: FC<TModal> = ({ title, children, onClose }) => {
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) =>
            event.key === 'Escape' ? onClose() : null;

        document.addEventListener('keydown', handleKeyDown);

        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    return createPortal(
        <div className={styles.component}>
            <div className={`${styles.dialog} pt-10 pr-10 pb-10 pl-10`}>
                <div className={styles.header}>
                    {
                        title && (
                            <h2 className={`${styles.title} text text_type_main-large`}>
                                {title}
                            </h2>
                        )
                    }
                    <button type="button" className={styles.close} onClick={onClose}>
                        <CloseIcon type="primary" />
                    </button>
                </div>
                <div className={styles.content}>
                    {children}
                </div>
            </div>
            <ModalOverlay onClose={onClose} />
        </div>,
        modalRoot
    );
};

export default Modal;