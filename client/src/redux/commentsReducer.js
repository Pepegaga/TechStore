import { ADD_COMMENT } from './types'

const initialState = {
    comments: [],
    fetchedComments: [],
}

export const commentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_COMMENT:
            return {
                ...state,
                comments: state.comments.concat([action.payload]),
            }
        default:
            return state
    }
}
