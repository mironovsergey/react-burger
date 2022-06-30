import { useSelector, } from 'react-redux';
import { Link, NavLink, useLocation } from 'react-router-dom';

import {
    Logo,
    BurgerIcon,
    ListIcon,
    ProfileIcon
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './app-header.module.css';

const AppHeader = () => {
    const { pathname } = useLocation();
    const { user, userRequest } = useSelector(({ user }) => user);

    return (
        <header className={styles.component}>
            <div className={styles.container}>
                <ul className={`${styles.nav} ${styles.nav_left}`}>
                    <li className={styles.nav_item}>
                        <NavLink
                            to="/"
                            className={styles.nav_link}
                            activeClassName={styles.nav_link_active}
                            exact
                        >
                            <BurgerIcon type="secondary" />
                            <span className="text text_type_main-default">
                                Конструктор
                            </span>
                        </NavLink>
                    </li>
                    <li className={styles.nav_item}>
                        <NavLink
                            to="/feed"
                            className={styles.nav_link}
                            activeClassName={styles.nav_link_active}
                        >
                            <ListIcon type="secondary" />
                            <span className="text text_type_main-default">
                                Лента заказов
                            </span>
                        </NavLink>
                    </li>
                </ul>
                <div className={styles.logo}>
                    {
                        pathname === '/' ?
                            (
                                <Logo />
                            )
                            :
                            (
                                <Link to="/">
                                    <Logo />
                                </Link>
                            )
                    }
                </div>
                <ul className={`${styles.nav} ${styles.nav_right}`}>
                    {
                        !userRequest && (
                            <li className={styles.nav_item}>
                                <NavLink
                                    to="/profile"
                                    className={styles.nav_link}
                                    activeClassName={styles.nav_link_active}
                                >
                                    <ProfileIcon type="secondary" />
                                    <span className="text text_type_main-default">
                                        {user?.name || 'Личный кабинет'}
                                    </span>
                                </NavLink>
                            </li>
                        )
                    }
                </ul>
            </div>
        </header>
    );
};

export default AppHeader;