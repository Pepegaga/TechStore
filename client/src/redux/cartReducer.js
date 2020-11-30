import {ADD_TO_CART, RERENDER_CART} from './types'

const initialState = {
    cart: [],
    rerenderTemp: null
}

export default function cartReducer(state = initialState, action){
    switch(action.type){
        case ADD_TO_CART: return(
            {...state, cart: [...state.cart,action.payload.cart]}
        )
        case RERENDER_CART: return(
            {...state, rerenderTemp: action.payload.cart}
        )
        default: return state
    }
}