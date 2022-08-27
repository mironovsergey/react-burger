import type { FC, FormEvent, ChangeEvent } from 'react';

import { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

import { useSelector, useDispatch } from '../../services/hooks';

import { Input } from '@ya.praktikum/react-developer-burger-ui-components';

import Button from '../ui/button';

import styles from './forgot-password-form.module.css';

import { postForgotPassword } from '../../services/actions/forgot-password-form';

type TForgotPasswordForm = {
    email: string;
};

const ForgotPasswordForm: FC = () => {
    const {
        forgotPasswordRequest,
        forgotPasswordSuccess,
        forgotPasswordError
    } = useSelector(({ forgotPasswordForm }) => forgotPasswordForm);

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