const initialState = {
    number: 0,
}

export default function counterReducer(state = initialState, action) {
    switch (action.type) {
        case 'inc':
            return { number: state.number + 1 }
        default:
            return state
    }
}
