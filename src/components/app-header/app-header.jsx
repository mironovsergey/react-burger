import {
    Logo,
    BurgerIcon,
    ListIcon,
    ProfileIcon
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './app-header.module.css';

const AppHeader = () => {
    return (
        <header className={styles.component}>
            <div className={styles.container}>
                <ul className={`${styles.nav} ${styles.nav_left}`}>
                    <li className={`${styles.nav_item} ${styles.nav_item_active}`}>
                        <a href="/" className={styles.nav_link}>
                            <BurgerIcon type="primary" />
                            <span className="text text_type_main-default">
                                Конструктор
                            </span>
                        </a>
                    </li>
                    <li className={styles.nav_item}>
                        <a href="/feed" className={styles.nav_link}>
                            <ListIcon type="secondary" />
                            <span className="text text_type_main-default">
                                Лента заказов
                            </span>
                        </a>
                    </li>
                </ul>
                <div className={styles.logo}>
                    <Logo />
                </div>
                <ul className={`${styles.nav} ${styles.nav_right}`}>
                    <li className={styles.nav_item}>
                        <a href="/user" className={styles.nav_link}>
                            <ProfileIcon type="secondary" />
                            <span className="text text_type_main-default">
                                Личный кабинет
                            </span>
                        </a>
                    </li>
                </ul>
            </div>
        </header>
    );
};

export default AppHeader;