import { loginReducer } from './Auth/Auth';
import { registerReducer } from './Auth/Register';
import { logoutReducer } from './Auth/Logout';

const RootReducer = {
    login: loginReducer,
    register: registerReducer,
    logout: logoutReducer,
};

export default RootReducer;
