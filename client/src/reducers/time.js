import { SET_TIME } from '../actions/constants'

const time = (state = Infinity, action) => {
    switch(action.type) {
        case SET_TIME:
            console.log('SET_TIME:')
            return action.time
        default:
            return state
    }
}

export default time