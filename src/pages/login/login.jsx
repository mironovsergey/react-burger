import { useSelector } from 'react-redux';
import { Redirect, useLocation } from 'react-router-dom';

import styles from './login.module.css';

import LoginForm from '../../components/login-form/login-form';

const Login = () => {
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
                Вход
            </h1>
            <LoginForm />
        </div>
    );
};

export default Login;