export type TCategory = {
    name: string;
    value: string;
};

export type TIngredient = {
    _id: string;
    name: string;
    type: string;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v?: number;
};

export type TConstructorIngredient = TIngredient & {
    key: string;
};

export type TLocationState = {
    from: {
        pathname: string;
    };
};

export interface TIngredientsResponse {
    success: boolean;
    data: TIngredient[];
}

export interface TOrderResponse {
    success: boolean;
    name: string;
    order: {
        number: number;
    };
}

export interface TRegisterResponse {
    success: boolean;
    accessToken: string;
    refreshToken: string;
    user: {
        email: string;
        name: string;
    };
}

export interface TLoginResponse {
    success: boolean;
    accessToken: string;
    refreshToken: string;
    user: {
        email: string;
        name: string;
    };
}

export interface TLogoutResponse {
    success: boolean;
    message: string;
}

export interface TUserResponse {
    success: boolean;
    message: string;
}

export interface TTokenResponse {
    success: boolean;
    accessToken: string;
    refreshToken: string;
}

export interface TForgotPasswordResponse {
    success: boolean;
    message: string;
}

export interface TResetPasswordResponse {
    success: boolean;
    message: string;
}