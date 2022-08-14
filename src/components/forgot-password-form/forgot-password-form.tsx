import type { FormEvent, ChangeEvent } from 'react';

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import {
    Input,
    Button
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './forgot-password-form.module.css';

import { postForgotPassword } from '../../services/actions/forgot-password-form';

type TForgotPasswordForm = {
    email: string;
};

const ForgotPasswordForm = () => {
    const {
        forgotPasswordRequest,
        forgotPasswordSuccess,
        forgotPasswordError
    } = useSelector(({ forgotPasswordForm }: any) => forgotPasswordForm);

    const dispatch = useDispatch();

    const [state, setState] = useState<TForgotPasswordForm>({
        email: ''
    });

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { target } = event;

        setState({
            ...state,
            [target.name]: target.value
        });
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // @ts-ignore
        dispatch(postForgotPassword(JSON.stringify(state)));
    };

    // Редирект на страницу сброса пароля
    if (forgotPasswordSuccess) {
        return (
            <Redirect
                to={{
                    pathname: '/reset-password'
                }}
            />
        )
    }

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
                    errorText={'Ошибка'}
                    size={'default'}
                />
            </div>

            <div className={`${styles.button}`}>
                {/* @ts-ignore */}
                <Button type="primary" size="medium" disabled={forgotPasswordRequest}>
                    {!forgotPasswordRequest ? 'Восстановить' : 'Восстановление....'}
                </Button>
            </div>

            {
                forgotPasswordError && (
                    <div className="text text_type_main-default text_color_error mt-6">
                        {forgotPasswordError}
                    </div>
                )
            }

            <div className="text text_type_main-default text_color_inactive mt-20">
                {'Вспомнили пароль? '}
                <Link to="/login" className="text text_color_accent">
                    Войти
                </Link>
            </div>
        </form>
    );
};

export default ForgotPasswordForm;