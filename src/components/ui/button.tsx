import type { FC, ReactNode, SyntheticEvent } from 'react';

import { Button as ButtonUI } from "@ya.praktikum/react-developer-burger-ui-components";

const Button: FC<{
    type?: 'secondary' | 'primary';
    size?: 'small' | 'medium' | 'large';
    onClick?: (() => void) | ((e: SyntheticEvent) => void);
    disabled?: boolean;
    name?: string;
    htmlType?: 'button' | 'submit' | 'reset';
    children: ReactNode;
}> = ButtonUI;

export default Button;