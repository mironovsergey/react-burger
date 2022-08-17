import type { MouseEvent } from 'react';

import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import styles from './profile-nav.module.css';

import { postLogout } from '../../services/actions/user';

const ProfileNav = () => {
    const dispatch = useDispatch();

    const handleLogout = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        // @ts-ignore
        dispatch(postLogout());
    };

    return (
        <div className={styles.component}>
            <ul className={styles.nav}>
                <li className={styles.nav_item}>
                    <NavLink
                        to="/profile"
                        className={`${styles.nav_link} text text_type_main-medium`}
                        activeClassName={styles.nav_link_active}
                        exact
                    >
                        <span>Профиль</span>
                    </NavLink>
                </li>
                <li className={styles.nav_item}>
                    <NavLink
                        to="/profile/orders"
                        className={`${styles.nav_link} text text_type_main-medium`}
                        activeClassName={styles.nav_link_active}
                        exact
                    >
                        <span>История заказов</span>
                    </NavLink>
                </li>
                <li className={styles.nav_item}>
                    <button
                        className={`${styles.nav_link} text text_type_main-medium`}
                        onClick={handleLogout}
                    >
                        <span>Выход</span>
                    </button>
                </li>
            </ul>

            <div className="text text_type_main-default text_color_inactive mt-20">
                В этом разделе вы можете изменить свои персональные данные
            </div>
        </div>
    );
};

export default ProfileNav;