import type { FC, FormEvent, ChangeEvent, MouseEvent } from 'react';

import { useState, useEffect, useMemo } from 'react';

import { useSelector, useDispatch } from '../../services/hooks';

import { Input } from '@ya.praktikum/react-developer-burger-ui-components';

import Button from '../ui/button';

import styles from './profile-form.module.css';

import { patchUser } from '../../services/actions/profile-form';

type TProfileForm = {
    name: string;
    email: string;
    password: string;
};

const ProfileForm: FC = () => {
    const dispatch = useDispatch();

    const {
        profileRequest,
        profileError
    } = useSelector(({ profileForm }) => profileForm);

    const { user } = useSelector(({ user }) => user);

    const initialState = useMemo(() => ({
        name: user?.name || '',
        email: user?.email || '',
        password: ''
    }), [user]);

    const [state, setState] = useState<TProfileForm>({ ...initialState });
    const [hasChanged, setChanged] = useState(false);

    useEffect(() => {
        setChanged(
            state.name !== initialState.name
            || state.email !== initialState.email
            || state.password !== initialState.password
        );
    }, [initialState, state]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { target } = event;

        setState({
            ...state,
            [target.name]: target.value
        });
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(patchUser(JSON.stringify(state)));
    };

    const handleReset = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setState({
            ...initialState
        });
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
                    icon={'EditIcon'}
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
                    icon={'EditIcon'}
                />
            </div>

            <div className={`${styles.input} mb-6`}>
                <Input
                    type={'password'}
                    name={'password'}
                    placeholder={'Пароль'}
                    value={state.password}
                    onChange={handleChange}
                    error={false}
                    size={'default'}
                    icon={'EditIcon'}
                />
            </div>

            {
                hasChanged && (
                    <div className={`${styles.buttons} mt-6`}>
                        <button
                            className={`${styles.button_link} text text_type_main-default text_color_accent`}
                            onClick={handleReset}
                        >
                            <span>Отмена</span>
                        </button>
                        <Button type="primary" size="medium" disabled={profileRequest}>
                            {!profileRequest ? 'Сохранить' : 'Сохранение....'}
                        </Button>
                    </div>
                )
            }

            {
                profileError && (
                    <div className="text text_type_main-default text_color_error mt-6">
                        {profileError}
                    </div>
                )
            }
        </form>
    );
};

export default ProfileForm;