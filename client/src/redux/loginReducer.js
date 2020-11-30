import { SAVE_DATA, UPDATE_ADDRESS, UPDATE_NAME } from "./types";

const initialState = {
    name: '',
    id: 0,
    token: null,
    address: ''
};

export default function loginReducer(state = initialState, action) {
    switch(action.type) {
        case SAVE_DATA: return {...state, 
            name: action.payload.name,
            id: action.payload.id,
            token: action.payload.token,
            address: action.payload.address
        }
        case UPDATE_NAME: return {...state,
            name: action.payload.name
        }
        case UPDATE_ADDRESS: return {...state,
            address: action.payload.address
        }
        default: return state
    }
}

