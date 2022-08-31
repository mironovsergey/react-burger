import type { FC } from 'react';

import { useSelector } from '../../services/hooks';
import { Redirect, useLocation } from 'react-router-dom';

import styles from './reset-password.module.css';

import ResetPasswordForm from '../../components/reset-password-form/reset-password-form';

import type { TLocationState } from '../../utils/types';

const ResetPassword: FC = () => {
    const { state } = useLocation<TLocationState>();
    const { user, userRequest } = useSelector(({ user }) => user);

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
            <ResetPasswordForm />
        </div>
    );
};

export default ResetPassword;