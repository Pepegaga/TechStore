import {combineReducers} from "redux";
import loginReducer from './loginReducer';
import cartReducer from './cartReducer'


export const rootReducer = combineReducers({
    login: loginReducer,
    cart: cartReducer
})