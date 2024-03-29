import type { FC, FormEvent, ChangeEvent } from 'react';

import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useSelector, useDispatch } from '../../services/hooks';

import { Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';

import Button from '../ui/button';

import styles from './login-form.module.css';

import { postLogin } from '../../services/actions/login-form';

type TLoginForm = {
    email: string;
    password: string;
};

const LoginForm: FC = () => {
    const {
        loginRequest,
        loginError
    } = useSelector(({ loginForm }) => loginForm);

    const dispatch = useDispatch();

    const [state, setState] = useState<TLoginForm>({
        email: '',
        password: ''
    });

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { target } = event;

        setState({
            ...state,
            [target.name]: target.value,
        });
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(postLogin(JSON.stringify(state)));
    };

    return (
        <form
            className={styles.component}
            onSubmit={handleSubmit}
            autoComplete="off"
            noValidate
        >
            <div className={`${styles.input} mb-6`}>
                <Input
                    type={'email'}
                    name={'email'}
                    placeholder={'E-mail'}
                    value={state.email}
                    onChange={handleChange}
                    error={false}
                    size={'default'}
                />
            </div>

            <div className={`${styles.input} mb-6`}>
                <PasswordInput
                    name={'password'}
                    value={state.password}
                    onChange={handleChange}
                    size={'default'}
                />
            </div>

            <div className={`${styles.button}`}>
                <Button type="primary" size="medium" disabled={loginRequest}>
                    {!loginRequest ? 'Войти' : 'Вход....'}
                </Button>
            </div>

            {
                loginError && (
                    <div className="text text_type_main-default text_color_error mt-6">
                        {loginError}
                    </div>
                )
            }

            <div className="text text_type_main-default text_color_inactive mt-20">
                {'Вы — новый пользователь? '}
                <Link to="/register" className="text text_color_accent">
                    Зарегистрироваться
                </Link>
            </div>

            <div className="text text_type_main-default text_color_inactive mt-4">
                {'Забыли пароль? '}
                <Link to="/forgot-password" className="text text_color_accent">
                    Восстановить пароль
                </Link>
            </div>
        </form>
    );
};

export default LoginForm;