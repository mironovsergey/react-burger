import { useSelector } from 'react-redux';
import { Redirect, useLocation } from 'react-router-dom';

import styles from './register.module.css';

import RegisterForm from '../../components/register-form/register-form';

const Register = () => {
    const { state } = useLocation();
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
                Регистрация
            </h1>
            <RegisterForm />
        </div>
    );
};

export default Register;