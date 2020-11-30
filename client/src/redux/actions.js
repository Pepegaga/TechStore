import {ADD_COMMENT, SAVE_DATA, UPDATE_NAME, UPDATE_ADDRESS, ADD_TO_CART, RERENDER_CART} from "./types";

export function addComment(comment){
    return{
        type: ADD_COMMENT,
        payload: comment
    }
}

export function saveLocalData(data){
    return{
        type: SAVE_DATA,
        payload: {
            name: data.name,
            id: data.id,
            token: data.token,
            address: data.address
        }
    }
}

export function updateName(name){
    return{
        type: UPDATE_NAME,
        payload: {
            name: name
        }
    }
}

export function updateAddress(address){
    return{
        type: UPDATE_ADDRESS,
        payload: {
            address: address
        }
    }
}

export function addToCart(cartItem){
    return{
        type: ADD_TO_CART,
        payload: {
            cart: cartItem
        }
    }
}

export function rerenderCart(cartItem){
    return{
        type: RERENDER_CART,
        payload: {
            cart: cartItem
        }
    }
}