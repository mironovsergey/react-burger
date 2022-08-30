import { cookies } from '../services/cookie';

export const getAccessToken = () => {
    return String(cookies.get('accessToken')).replace(/^Bearer\s/, '');
};

export const formatNumber = (value: number): string => {
    return (String(value)).replace(/(\d{1,3}(?=(\d{3})+(?:\.\d|\b)))/g, "$1 ");
};

export const declension = (value: number, words: string): string => {
    const items = words.split(',');
    const array = [2, 0, 1, 1, 1, 2];

    const index = (value % 100 > 4 && value % 100 < 20)
        ? 2
        : array[(value % 10 < 5) ? value % 10 : 5];

    return items[index];
};

export const diffDays = (date1: Date, date2: Date): number => {
    const diff = new Date(+date1).setHours(12) - new Date(+date2).setHours(12);
    return Math.abs(Math.round(diff / 8.64e7));
}

