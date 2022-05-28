import useResource from '../../hooks/use-resource';

import { apiUrl, categories } from '../../utils/constants';

import styles from './app.module.css';

import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

const App = () => {
    const { isLoading, hasError, data } = useResource(apiUrl);

    return (
        <div className={styles.component}>
            <AppHeader />
            <main className={styles.main}>
                {
                    isLoading && (
                        <div className={`${styles.notice}`}>
                            <div className="text text_type_main-large">
                                Загрузка....
                            </div>
                        </div>
                    )
                }
                {
                    hasError && (
                        <div className={`${styles.notice}`}>
                            <div className="text text_type_main-large">
                                Произошла ошибка
                            </div>
                        </div>
                    )
                }
                {
                    !(isLoading || hasError || data === null) && (
                        <div className={styles.container}>
                            <BurgerIngredients
                                categories={categories}
                                ingredients={data.data} />
                            <BurgerConstructor
                                ingredients={data.data} />
                        </div>
                    )
                }
            </main>
        </div>
    );
};

export default App;