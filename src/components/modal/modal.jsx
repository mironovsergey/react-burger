import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import {
    CloseIcon
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './modal.module.css';

import ModalOverlay from '../modal-overlay/modal-overlay';

const modalRoot = document.getElementById('modal-root');

const Modal = ({ title, children, onClose }) => {
    useEffect(() => {
        const handleKeyDown = (event) =>
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

Modal.propTypes = {
    title: PropTypes.string,
    children: PropTypes.element,
    onClose: PropTypes.func
}

export default Modal;