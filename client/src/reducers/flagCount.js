import { SET_FLAGCOUNT, UPDATE_FLAGCOUNT } from '../actions/constants'

const flagCount = (state = 10, action) => {
    switch(action.type) {
        case UPDATE_FLAGCOUNT:
            return state + action.count
        case SET_FLAGCOUNT:
            return action.flagCount
        default: return state
    }
}

export default flagCount