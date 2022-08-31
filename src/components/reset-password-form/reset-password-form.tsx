import type { FC, FormEvent, ChangeEvent } from 'react';

import { useState } from 'react';

import { useSelector, useDispatch } from '../../services/hooks';

import { Link, Redirect } from 'react-router-dom';

import { Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';

import Button from '../ui/button';

import styles from './reset-password-form.module.css';

import { postResetPassword } from '../../services/actions/reset-password-form';

type TResetPasswordForm = {
    password: string;
    token: string;
};

const ResetPasswordForm: FC = () => {
    const {
        forgotPasswordSuccess
    } = useSelector(({ forgotPasswordForm }) => forgotPasswordForm);

    const {
        resetPasswordRequest,
        resetPasswordError
    } = useSelector(({ resetPasswordForm }) => resetPasswordForm);

    const dispatch = useDispatch();

    const [state, setState] = useState<TResetPasswordForm>({
        password: '',
        token: ''
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
        dispatch(postResetPassword(JSON.stringify(state)));
    };

    // Редирект на страницу восстановления пароля, в случае,
    // если переход был осущетсвлен по прямой ссылке
    if (!forgotPasswordSuccess) {
        return (
            <Redirect
                to={{
                    pathname: '/forgot-password'
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
                <PasswordInput
                    name={'password'}
                    value={state.password}
                    onChange={handleChange}
                    size={'default'}
                />
            </div>

            <div className={`${styles.input} mb-6`}>
                <Input
                    type={'text'}
                    name={'token'}
                    placeholder={'Введите код из письма'}
                    value={state.token}
                    onChange={handleChange}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                />
            </div>

            <div className={`${styles.button}`}>
                <Button type="primary" size="medium" disabled={resetPasswordRequest}>
                    {!resetPasswordRequest ? 'Сохранить' : 'Сохранение....'}
                </Button>
            </div>

            {
                resetPasswordError && (
                    <div className="text text_type_main-default text_color_error mt-6">
                        {resetPasswordError}
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

export default ResetPasswordForm;