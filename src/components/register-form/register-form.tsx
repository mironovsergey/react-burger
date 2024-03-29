import type { FC, FormEvent, ChangeEvent } from 'react';

import { useState } from 'react';

import { useSelector, useDispatch } from '../../services/hooks';

import { Link } from 'react-router-dom';

import { Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';

import Button from '../ui/button';

import styles from './register-form.module.css';

import { postRegister } from '../../services/actions/register-form';

type TRegisterForm = {
    name: string;
    email: string;
    password: string;
};

const RegisterForm: FC = () => {
    const {
        registerRequest,
        registerError
    } = useSelector(({ registerForm }) => registerForm);

    const dispatch = useDispatch();

    const [state, setState] = useState<TRegisterForm>({
        name: '',
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
        dispatch(postRegister(JSON.stringify(state)));
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
                    type={'text'}
                    name={'name'}
                    placeholder={'Имя'}
                    value={state.name}
                    onChange={handleChange}
                    error={false}
                    size={'default'}
                />
            </div>

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
                <Button type="primary" size="medium" disabled={registerRequest}>
                    {!registerRequest ? 'Зарегистрироваться' : 'Регистрация....'}
                </Button>
            </div>

            {
                registerError && (
                    <div className="text text_type_main-default text_color_error mt-6">
                        {registerError}
                    </div>
                )
            }

            <div className="text text_type_main-default text_color_inactive mt-20">
                {'Уже зарегистрированы? '}
                <Link to="/login" className="text text_color_accent">
                    Войти
                </Link>
            </div>
        </form>
    );
};

export default RegisterForm;