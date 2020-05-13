import { GET_POSTS, POST_ERROR, ADD_POST } from '../actions/constants'

const initialState = {
    posts: [],
    post: null,
    error: {}
}

const posts = (state = initialState, action) => {
    switch(action.type) {
        case GET_POSTS:
            return {
                ...state,
                posts: action.payload
            }
        case ADD_POST:
            return {
                ...state,
                posts: [...state.posts, action.payload]
            }
        case POST_ERROR:
            return {
                ...state,
                error: action.payload
            }
        default: return state
    }
}

export default posts