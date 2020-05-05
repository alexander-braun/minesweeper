import { SET_SOUND } from '../actions/constants'

const sound = (state = true, action) => {
    switch(action.type) {
        case SET_SOUND:
            return action.sound
        default: return state
    }
}

export default sound