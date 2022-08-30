import type { TCategory } from './types';

export const apiUrl = 'https://norma.nomoreparties.space/api';

export const wsUrl = 'wss://norma.nomoreparties.space';

export const categories: TCategory[] = [
    { name: 'Булки', value: 'bun' },
    { name: 'Соусы', value: 'sauce' },
    { name: 'Начинки', value: 'main' }
];