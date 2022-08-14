import { useSelector } from 'react-redux';
import { Redirect, useLocation } from 'react-router-dom';

import styles from './forgot-password.module.css';

import ForgotPasswordForm from '../../components/forgot-password-form/forgot-password-form';

import { TLocationState } from '../../utils/types';

const ForgotPassword = () => {
    const { state } = useLocation<TLocationState>();
    const { user, userRequest } = useSelector(({ user }: any) => user);

    if (userRequest) {
        return null;
    }

    if (user) {
        return (
            <Redirect to={state?.from || '/'} />
        );
    }

    return (
        <div className={styles.container}>
            <h1 className="text text_type_main-medium mb-6">
                Восстановление пароля
            </h1>
            <ForgotPasswordForm />
        </div>
    );
};

export default ForgotPassword;