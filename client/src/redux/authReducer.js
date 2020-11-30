import { AUTH } from "./types";

const initialState = {
    isAuth: false
};

export default function authReducer(state = initialState, action) {
    switch(action.type) {
        case AUTH: return {...state, 
            isAuth: action.payload.isAuth, 
        }
        default: return state
    }
}