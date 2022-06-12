import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

import styles from './app.module.css';

import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

const App = () => {
    return (
        <div className={styles.component}>
            <AppHeader />
            <DndProvider backend={HTML5Backend}>
                <main className={styles.main}>
                    <div className={styles.container}>
                        <BurgerIngredients />
                        <BurgerConstructor />
                    </div>
                </main>
            </DndProvider>
        </div>
    );
};

export default App;