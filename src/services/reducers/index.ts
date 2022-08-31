import { combineReducers } from 'redux';
import { burgerIngredientsReducer } from './burger-ingredients';
import { burgerConstructorReducer } from './burger-constructor';
import { orderDetailsReducer } from './order-details';
import { registerFormReducer } from './register-form';
import { loginFormReducer } from './login-form';
import { profileFormReducer } from './profile-form';
import { forgotPasswordFormReducer } from './forgot-password-form';
import { resetPasswordFormReducer } from './reset-password-form';
import { userReducer } from './user';
import { wsReducer } from './ws';

export const rootReducer = combineReducers({
    burgerIngredients: burgerIngredientsReducer,
    burgerConstructor: burgerConstructorReducer,
    orderDetails: orderDetailsReducer,
    registerForm: registerFormReducer,
    loginForm: loginFormReducer,
    profileForm: profileFormReducer,
    forgotPasswordForm: forgotPasswordFormReducer,
    resetPasswordForm: resetPasswordFormReducer,
    user: userReducer,
    ws: wsReducer
});