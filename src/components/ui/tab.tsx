import type { FC, ReactNode } from 'react';

import { Tab as TabUI } from '@ya.praktikum/react-developer-burger-ui-components';

const Tab: FC<{
    active: boolean;
    value: string;
    onClick: (value: string) => void;
    children: ReactNode;
}> = TabUI;

export default Tab;