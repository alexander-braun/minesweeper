import { SET_REVEALED, SET_REVEALED_ARR } from '../actions/constants'

const initialState = []

const revealed = (state = initialState, action) => {
    switch(action.type) {
        case SET_REVEALED :
            let position = action.revealed
            let newState = [...state]
            newState[position] = !state[position] || true
            return newState
        case SET_REVEALED_ARR:
            return action.revealedArr
        default:
            return state
    }
}

export default revealed